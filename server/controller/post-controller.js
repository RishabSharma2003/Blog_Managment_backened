import postModel from "../models/postModel.js"

export const createPost = async (req,res) => {
    try{
        const post=await new postModel(req.body).save();
        console.log(req.body.title)
        //console.log(post);
        res.status(200).send('saved successfully')
    }catch(error){
        res.status(500).send(`Error while saving post ${error}`)
    }
}

export const getALLPost = async (req,res) => {
    let category=req?.query?.category
    let posts
    try{
        if(category){
            posts=await postModel.find({categories:category})
        }else{
            posts=await postModel.find({})
        }
        
        //console.log(posts)
        res.status(200).send(posts)
    }catch(error){
        res.status(500).send(`Error while saving post ${error}`)
        
    }

}

export const getPost = async (req,res) =>{
    try {
        const post = await postModel.findById(req.params.id)
        // console.log(post)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const updatePost = async (req,res) =>{
    try {
        const post = await postModel.findById(req.params.id)
        if(!post){
            res.status(404).send("post not found")
        }
        await postModel.findByIdAndUpdate(req.params.id,{$set:req.body})
        res.status(200).json("post updated successfully")
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await postModel.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ msg: error.message });
    }
};

