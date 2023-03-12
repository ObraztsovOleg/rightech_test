if [ "$PRODUCTION" = "1" ];
    then echo "1 $PRODUCTION" && npm run prod;
    else echo "2 $PRODUCTION" && npm start;
fi