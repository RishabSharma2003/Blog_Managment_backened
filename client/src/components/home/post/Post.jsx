import { Box ,Typography, styled} from "@mui/material";


export const addElipsis = (str,limit) =>{
    return str.length > limit ? str.substring(0, limit) + '...' : str;
}

const Post = ({post}) =>{

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    return(
    <Container>
        <Image src={url} alt="blog"/>
        <Title>{post.categories}</Title>
        <Heading>{addElipsis(post.title,20)}</Heading>
        <Title>{post.username}</Title>
        <Details>{addElipsis(post.description,100)}</Details>
    </Container>
    )
}
const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 300px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Title = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

export default Post;