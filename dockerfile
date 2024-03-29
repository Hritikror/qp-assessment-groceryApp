FROM node:18.15.0
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
#COPY .env .env
RUN npm run build
EXPOSE 3000
CMD ["./wait-for-it.sh", "postgres:5432", "--", "npm", "run", "start:prod"]
