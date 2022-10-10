const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/services",{
    // useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connection sucessful");
}).catch((err)=>{
    console.log(err);
});