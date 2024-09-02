import mongoose from "mongoose";

const connection=async(URL)=>{
    try {
        await mongoose.connect(URL)
        //purane vala url parser depricate ho chuka hai isliye apko new vala use ker na hai that is URL
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error while connecting database ",error)
    }
}

export default connection