const express = require('express')
const app = express()
const port = process.env.PORT || 3002

app.use(express.json({extended: false}));

const validator = require('validator');


//@route GET /
//@desc Demo to check server is up
//@acces  PUBLIC 

app.get('/',(req,res)=>{
    res.send("Hey ! Its working fine!");
})


//@route POST /details
//@desc Processing data and validation checks
//@acces  PUBLIC 

app.post('/details',(req,res)=>{
    const str = req.body.data;
    var data = str.split(",");
    const checkValidPhone = new RegExp("^[7-9][0-9]{9}$");
    try{
        var validEmail = validator.isEmail(data[1]);
        var validPhone = true;
        if(data[2].length != 10 ){
            validPhone = false;
        } 
        

    res.status(200).json(
        {
            name: {
                valueProvided: data[0],
                isValid: true
            },
            email: {
                valueProvided: data[1],
                isValid: validEmail
            },
            mobile: {
                valueProvided: data[2],
                isValid: checkValidPhone.test(data[2])
            }
        }
    );
    }
    catch(e){
        res.status(500).send(e);
    }
})



app.listen(port,()=>{
    console.log("Server up on localhost:"+port);
})
