const express =  require('express');

const app = express();


app.get('/user',(req,res) => {
    res.send({"firstName":"John","lastName":"Doe"});
});

app.post('/user',(req,res) => {
    res.send('data successfully added to database');
});

app.delete('/user',(req,res) => {
    res.send('data successfully deleted from database');
});

app.put('/user',(req,res) => {
    res.send('data successfully updated in database');
});
//  routes<-|     |->routes handler
// app.use('/',(req,res) => {
//     res.send('Hello from home express server');
// });

app.listen(9999 , () => {
    console.log('Server is running on port 9999');
});