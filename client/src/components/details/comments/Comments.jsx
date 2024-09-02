import { Box,TextareaAutosize,Button,styled, } from "@mui/material";
import { useState,useContext,useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";


const initialValues = {
    name:'',
    postId:'',
    comments:'',
    date:new Date()
}

export const Comments = ({post}) =>{

    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const {account} = useContext(DataContext);

    //problem int his section
    useEffect(() => {
        const getData = async () => {
            console.log(post._id+" putting to get all comments")
            const response = await API.getAllComments(post._id);
            console.log(response)
            if (response.isSuccess) {
                setComments(response.data);   
            }
            console.log(comments)
        }
        getData();
    }, [post,toggle]);

    const handleChange = (e) =>{
        setComment({
            ...comment,
            name:account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async (e) =>{
        let response = await API.newComment(comment);
        console.log(response)

        if (response.isSuccess) {
            setComment(initialValues);
        }
        setToggle(!toggle);
    }

    return(
        <Box>
           <Container>
                <Image src={url} alt="dp" />
                <Styledtext
                    minRows={5}
                    placeholder="What's on your mind?"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
                <Button variant="container" color="primary" size="medium" style={{height:40}}
                onClick={(e) => addComment(e)}>Post</Button>
                <Button variant="container" color="primary" size="medium" style={{height:40}}
                onClick={(e) => setToggle(!toggle)}>Comment refesh Button</Button>
            </Container>    
            <Box>
                {
                    comments && comments.length>0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} toggle={toggle}/>
                    ))
                }
            </Box> 
        </Box>
    )
}

const Container = styled(Box)`
    margin-top: 100px;
    display:flex;
`;

const Image = styled('img')({
    width: 50,
    height:50,
    borderRadius:'50%'
});

const Styledtext = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin:0 20px;
`

export default Comments;
