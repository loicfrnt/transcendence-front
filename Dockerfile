FROM node:14.16.1

WORKDIR /frontend

COPY package.json ./ 

RUN npm install

COPY . .

EXPOSE 3008

CMD ["npm", "start"]`