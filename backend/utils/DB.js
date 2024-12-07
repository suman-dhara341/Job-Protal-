const mongoose=require('mongoose')


const DB=async ()=>{
    try {
        mongoose.connect(process.env.DBURL)
    } catch (error) {
        console.log("DB connection failed",error);
    }
}

module.exports=DB