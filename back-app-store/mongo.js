const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://doadmin:5zX1y4GeH82u63K9@mystoredb-57efe7b6.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=mystoredb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("mongodb connected");
})
.catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
})



const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})

const users = mongoose.model("users",newSchema)

module.exports= users
