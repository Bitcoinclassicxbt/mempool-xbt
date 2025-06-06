#!/bin/sh
__MEMPOOL_BACKEND_MAINNET_HTTP_HOST__=${BACKEND_MAINNET_HTTP_HOST:=127.0.0.1}
__MEMPOOL_BACKEND_MAINNET_HTTP_PORT__=${BACKEND_MAINNET_HTTP_PORT:=8999}
__MEMPOOL_FRONTEND_HTTP_PORT__=${FRONTEND_HTTP_PORT:=8080}

sed -i "s/__MEMPOOL_BACKEND_MAINNET_HTTP_HOST__/${__MEMPOOL_BACKEND_MAINNET_HTTP_HOST__}/g" /etc/nginx/conf.d/nginx-mempool.conf
sed -i "s/__MEMPOOL_BACKEND_MAINNET_HTTP_PORT__/${__MEMPOOL_BACKEND_MAINNET_HTTP_PORT__}/g" /etc/nginx/conf.d/nginx-mempool.conf

cp /etc/nginx/nginx.conf /patch/nginx.conf
sed -i "s/__MEMPOOL_FRONTEND_HTTP_PORT__/${__MEMPOOL_FRONTEND_HTTP_PORT__}/g" /patch/nginx.conf
cat /patch/nginx.conf > /etc/nginx/nginx.conf

if [ "${LIGHTNING_DETECTED_PORT}" != "" ];then
  export LIGHTNING=true
fi

# Runtime overrides - read env vars defined in docker compose

__MAINNET_ENABLED__=${MAINNET_ENABLED:=true}
__TESTNET_ENABLED__=${TESTNET_ENABLED:=false}
__TESTNET4_ENABLED__=${TESTNET_ENABLED:=false}
__SIGNET_ENABLED__=${SIGNET_ENABLED:=false}
__LIQUID_ENABLED__=${LIQUID_ENABLED:=false}
__LIQUID_TESTNET_ENABLED__=${LIQUID_TESTNET_ENABLED:=false}
__ITEMS_PER_PAGE__=${ITEMS_PER_PAGE:=10}
__KEEP_BLOCKS_AMOUNT__=${KEEP_BLOCKS_AMOUNT:=8}
__NGINX_PROTOCOL__=${NGINX_PROTOCOL:=http}
__NGINX_HOSTNAME__=${NGINX_HOSTNAME:=localhost}
__NGINX_PORT__=${NGINX_PORT:=8999}
__BLOCK_WEIGHT_UNITS__=${BLOCK_WEIGHT_UNITS:=4000000}
__MEMPOOL_BLOCKS_AMOUNT__=${MEMPOOL_BLOCKS_AMOUNT:=8}
__BASE_MODULE__=${BASE_MODULE:=mempool}
__ROOT_NETWORK__=${ROOT_NETWORK:=}
__MEMPOOL_WEBSITE_URL__=${MEMPOOL_WEBSITE_URL:=https://xbtscan.org}
__LIQUID_WEBSITE_URL__=${LIQUID_WEBSITE_URL:=https://liquid.network}
__MINING_DASHBOARD__=${MINING_DASHBOARD:=true}
__LIGHTNING__=${LIGHTNING:=false}
__AUDIT__=${AUDIT:=false}
__MAINNET_BLOCK_AUDIT_START_HEIGHT__=${MAINNET_BLOCK_AUDIT_START_HEIGHT:=0}
__TESTNET_BLOCK_AUDIT_START_HEIGHT__=${TESTNET_BLOCK_AUDIT_START_HEIGHT:=0}
__SIGNET_BLOCK_AUDIT_START_HEIGHT__=${SIGNET_BLOCK_AUDIT_START_HEIGHT:=0}
__ACCELERATOR__=${ACCELERATOR:=false}
__ACCELERATOR_BUTTON__=${ACCELERATOR_BUTTON:=true}
__SERVICES_API__=${SERVICES_API:=https://xbtscan.org/api/v1/services}
__PUBLIC_ACCELERATIONS__=${PUBLIC_ACCELERATIONS:=false}
__HISTORICAL_PRICE__=${HISTORICAL_PRICE:=true}
__ADDITIONAL_CURRENCIES__=${ADDITIONAL_CURRENCIES:=false}

# Export as environment variables to be used by envsubst
export __MAINNET_ENABLED__
export __TESTNET_ENABLED__
export __TESTNET4_ENABLED__
export __SIGNET_ENABLED__
export __LIQUID_ENABLED__
export __LIQUID_TESTNET_ENABLED__
export __ITEMS_PER_PAGE__
export __KEEP_BLOCKS_AMOUNT__
export __NGINX_PROTOCOL__
export __NGINX_HOSTNAME__
export __NGINX_PORT__
export __BLOCK_WEIGHT_UNITS__
export __MEMPOOL_BLOCKS_AMOUNT__
export __BASE_MODULE__
export __ROOT_NETWORK__
export __MEMPOOL_WEBSITE_URL__
export __LIQUID_WEBSITE_URL__
export __MINING_DASHBOARD__
export __LIGHTNING__
export __AUDIT__
export __MAINNET_BLOCK_AUDIT_START_HEIGHT__
export __TESTNET_BLOCK_AUDIT_START_HEIGHT__
export __SIGNET_BLOCK_AUDIT_START_HEIGHT__
export __ACCELERATOR__
export __ACCELERATOR_BUTTON__
export __SERVICES_API__
export __PUBLIC_ACCELERATIONS__
export __HISTORICAL_PRICE__
export __ADDITIONAL_CURRENCIES__

folder=$(find /var/www/mempool -name "config.js" | xargs dirname)
echo ${folder}
envsubst < ${folder}/config.template.js > ${folder}/config.js

exec "$@"
