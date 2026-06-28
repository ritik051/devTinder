const express =  require('express');

const app = express();


app.use('/',(req,res) => {
    res.send({"firstName":"","lastName":""});
});

app.use('/user',(req,res) => {
    res.send({"firstName":"user","lastName":""});
});
app.use('/user/hello',(req,res) => {
    res.send({"firstName":"user","lastName":"hello"});
});
//  routes<-|     |->routes handler
// app.use('/',(req,res) => {
//     res.send('Hello from home express server');
// });

app.listen(9999 , () => {
    console.log('Server is running on port 9999');
});