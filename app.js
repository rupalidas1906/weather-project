const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

const query = req.body.cityname;
const appid="bf24a84c0e46ff3bba78b9f873670928";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;

https.get(url,function(response){

  console.log(response.statusCode);
  response.on("data",function(data){

    const weatherdata=JSON.parse(data);
    const temp = weatherdata.main.temp;
    const weatherdescription = weatherdata.weather[0].description;
    const icon= weatherdata.weather[0].icon;
    const imageurl="http://openweathermap.org/img/wn/"+icon +"@2x.png";

    res.write("<p>The weather is currently "+weatherdescription);
    res.write("<h1>The temp in "+query+ " is" +temp+" degress</h1>");
    res.write ("<img src="+imageurl+">");
    res.send();
  })
})
})

app.listen(3000,function (){
  console.log("server is running at port 3000");
})
