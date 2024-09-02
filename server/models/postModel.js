import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
        // required:true
    },
    picture:{
        type:String,
        // required:true
    },
    username:{
        type:String,
        // required:true
    },
    categories:{
        type:String,
        // required:true
    },
    createdDate:{
        type:Date
    },

});

export default mongoose.model('posts',postSchema);
