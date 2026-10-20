#!/usr/bin/env bash
set -euo pipefail

# Run as root from an uploaded checkout. Only the four public assets are served.
[[ $EUID -eq 0 ]] || { echo 'Ejecuta este script como root.' >&2; exit 1; }
SOURCE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
for file in index.html styles.css data.js game.js; do
    [[ -s "$SOURCE/$file" ]] || { echo "Falta $file" >&2; exit 1; }
done

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y nginx certbot python3-certbot-nginx ca-certificates

RELEASE="/var/www/jairogames/releases/$(date -u +%Y%m%dT%H%M%S)-$$"
install -d -m 755 "$RELEASE"
for file in index.html styles.css data.js game.js; do
    install -m 644 "$SOURCE/$file" "$RELEASE/$file"
done
ln -s "$RELEASE" /var/www/jairogames/current.next
mv -Tf /var/www/jairogames/current.next /var/www/jairogames/current

# Preserve the HTTPS configuration on later releases.
if [[ ! -e /etc/nginx/sites-available/jairogames ]]; then
    install -m 644 "$SOURCE/deploy/nginx.conf" /etc/nginx/sites-available/jairogames
fi
ln -sfn /etc/nginx/sites-available/jairogames /etc/nginx/sites-enabled/jairogames

if command -v ufw >/dev/null && ufw status | grep -q '^Status: active'; then
    ufw allow 'Nginx Full'
fi

nginx -t
systemctl enable --now nginx
systemctl reload nginx

if [[ ! -s /etc/letsencrypt/live/jairogames.online/fullchain.pem ]]; then
    certbot --nginx --non-interactive --agree-tos --register-unsafely-without-email \
        --redirect -d jairogames.online -d www.jairogames.online
fi

systemctl enable --now certbot.timer
nginx -t
echo "Publicado: $RELEASE"
