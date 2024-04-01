FROM node:18

RUN mkdir /deeptarget

WORKDIR /deeptarget

RUN npm install -g @angular/cli@16.2.12

COPY package.json package-lock.json ./

# npm clean install
RUN npm ci

COPY . .

EXPOSE 4200

CMD [ "ng", "serve", "--host", "0.0.0.0" ]