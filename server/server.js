const express = require ('express');
const path = require('path');


var app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public' );


app.use(express.static(publicPath));//express static middleware- must be public

// app.get('/',(req, res)=>{
//     res.send('index.html');    
// });


app.listen(port, ()=>{
    console.log(`Server is up on the port ${port}`);
});