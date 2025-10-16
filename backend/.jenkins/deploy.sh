rm -rf .env
env | grep '^APP_' | while IFS='=' read -r name value; do
    echo "${name#APP_}=$value" >> .env
done

if [ "$CLEAN_DIST" = "true" ]; then
    rm -rf ./dist
fi

npm install
npm update
npm run strapi build
pm2 reload ${PM2_PROCESS} || pm2 startOrRestart ecosystem.config.js