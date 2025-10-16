rm -rf .env
env | grep '^APP_' | while IFS='=' read -r name value; do
    echo "${name#APP_}=$value" >> .env
done


npm install
npm run generate