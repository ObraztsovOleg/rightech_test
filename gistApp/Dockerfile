FROM node:lts-alpine

ARG PRODUCTION
ENV PRODUCTION $PRODUCTION

WORKDIR /usr/app
COPY ./ /usr/app

RUN if ["$PRODUCTION" = "1"]; \
        then npm ci && npm run build && chmod +x ./run.ch; \
        else npm ci && npm install -g ts-node && chmod +x ./run.sh; \
    fi
USER node

CMD [ "/bin/sh", "-c", "./run.sh"]