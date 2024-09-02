import { useEffect, useState, useContext } from 'react';
import { Box, FormControl, styled, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle.js';
import React from 'react';
import { useLocation,useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider.js';
import { API } from '../../service/api.js';

const UpdatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);
    const location = useLocation();
    const {id}=useParams()
    const navigate=useNavigate()

    const updateBlog=async()=>{
      console.log(post)
      
      const result=await API.updatePost(post)
      if(result.isSuccess){
        navigate(`/details/${id}`)
      }
      setPost(initialPost)
    }


    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getPostById(id)
            if(response.isSuccess){
                setPost(response.data)
            }
        }
        fetchData()
    },[])

    useEffect(() => {
      const getImage = async () => {
          if (file) {
              const formData = new FormData();
              formData.append('file', file);
  
              try {
                  const response = await API.uploadFile(formData);
                  console.log("response", response);
                  
                  if (response.isSuccess) {
                      const base64String=response.data.stringURL
                      const contentType =response.data.contentType;
                    
                      //console.log(base64String);
                      
                      setPost(prevPost => ({
                          ...prevPost,
                          picture: `data:${contentType};base64,${base64String}`
                        
                      }));
                      console.log("post.picture")
                      console.log(post.picture)
                      console.log("updated isSuccess");
                  } else {
                      console.error('Upload failed:', response);
                  }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
          }
      };
  
      getImage();
      setPost(prevPost => ({
          ...prevPost,
          categories: location.search?.split('=')[1] || 'All',
          username: account.username
      }));
  }, [file, location.search, account.username]);
  

    const handleChange = (e) => {
        setPost(prevPost => ({
            ...prevPost,
            [e.target.name]: e.target.value
        }));
        console.log(post)
    };

    return (
        <Container>
            <Image src={post.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'} alt="banner" />

            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <AddCircle fontSize='large' color='action' />
                </label>
                <input
                    type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setFile(selectedFile);
                    }}
                />
                <InputTextField
                    placeholder='title'
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                />
                <Button variant='contained' onClick={updateBlog}>Update</Button>
            </StyledFormControl>

            <Textarea
                minRows={5}
                placeholder='Tell your story......'
                name="description"
                value={post.description}
                onChange={handleChange}
            />
        </Container>
    );
};

const Container = styled(Box)({
    margin: '50px 100px',
});

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    font-size: 18px;
    border: none;
    &:focus-visible { outline: none; }
    margin: 15px;
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date() // Fixed typo from createdDarte to createdDate
};

export default UpdatePost;
