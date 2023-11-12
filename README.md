# MsAuth_Tripster
MsAuth_TripsterTs
npm install express @types/express --save
npm install mongoose
npm i --save-dev @types/mysql
tsc
node dist/index.js
docker build -t auth_ms .
docker run --env-file=./.env -p 3003:3003 -d auth_ms