import commentModel from "../models/commentModel.js"

export const newComment = async (req,res) => {
    try{
       
        const comment =await new commentModel(req.body).save();
        // console.log(comment)

        res.status(200).json({ msg:'commsnt saved successfully'})
    } catch (error) {
        res.status(500).json({ msg: error.message})
    }
}

export const getComments = async(req,res) => {
    try{
        console.log(req.params.id+" "+"req.params.id")
        
        const comments = await commentModel.find({postId: req.params.id});
        console.log(comments);

        res.status(200).send(comments);
    } catch (error) {
        res.status(500).json({ msg: error.message})
    }
}

export const deleteComment = async (req,res) => {
    try{
        const comments = await commentModel.findByIdAndDelete(req.params.id);
        // console.log(comments)
        //await comments.delete();

        res.status(200).json({msg: 'comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message})
    }
}