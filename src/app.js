const express =  require('express');

const app = express();


app.use('/hello',(req,res) => {
    res.send('Hello from hello express server');
});

app.use('/test',(req,res) => {
    res.send('Hello from test express server');
});
//routes<-|   |->routes handler
app.use('/',(req,res) => {
    res.send('Hello from home express server');
});

app.listen(9999 , () => {
    console.log('Server is running on port 9999');
});