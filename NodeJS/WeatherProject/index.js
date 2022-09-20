// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// c3f580e71c23162aa86a7e51f4b85b67

const hp=require("http");
const fs=require("fs");
const request=require("requests");
const d=fs.readFileSync("home.html","utf-8");
const replaceval=(tempval,orgval)=>{
    let temperature=tempval.replace("{%tempval%}",orgval.main.temp);
    temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min);
    temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max);
    temperature=temperature.replace("{%location%}",orgval.name);
    temperature=temperature.replace("{%country%}",orgval.sys.country);
    temperature=temperature.replace("{%temps%}",orgval.weather[0].main);
    return temperature;
}

const server=hp.createServer((req,res)=>{
    if(req.url=="/"){
        request("https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=c3f580e71c23162aa86a7e51f4b85b67")
        .on("data",(chunk)=>{
            const data=JSON.parse(chunk);
            const arrData=[data];
            // console.log(arrData[0].main.temp);
            const realTimeData=arrData.map((val)=>replaceval(d,val)).join("");
            res.write(realTimeData);
        })
        .on("end",(err)=>{
            if(err)return console.log("Error!!!");
            res.end();
        })
    }
})
server.listen(3000,"127.0.0.1");


