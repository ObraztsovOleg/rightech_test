FROM node:lts-alpine

ARG PRODUCTION

WORKDIR /usr/app
COPY ./ /usr/app

RUN if ["$PRODUCTION" = "1"]; \
        then npm ci && npm run build; \
        else npm ci && npm install -g ts-node; \
    fi


CMD [ "/bin/sh", "-c", "if [\"$PRODUCTION\" = \"1\"]; then npm run prod \"$@\"; else npm start \"$@\"; fi"]