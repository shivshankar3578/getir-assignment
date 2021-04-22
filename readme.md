# getir-assignment
App is deployed on heroku at https://getir-demo-shiva.herokuapp.com/

## Developement
### setup
```export mongo_uri=your_mongodb_connection_string```
```git clone https://github.com/shivshankar3578/getir-assignment```
### install dependancies

```
cd getir-assignment
npm install
```
### start server
``` npm start```


### test
``` curl --location --request GET 'https://getir-demo-shiva.herokuapp.com/records?startDate=2016-01-01&endDate=2016-12-31&minCount=3000&maxCount=4000' ```
