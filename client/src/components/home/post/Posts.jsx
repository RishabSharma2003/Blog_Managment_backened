import { useEffect, useState } from "react";
import { API } from "../../../service/api";
import { Box, Grid } from "@mui/material";
import Post from "./Post";
import { useSearchParams, Link } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPost({ category: category || '' });

            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [category]);

    return (
        <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
            <Grid container spacing={2} direction="row" wrap="nowrap">
                {posts && posts.length > 0 ? (
                    posts.map(post => (
                        <Grid item key={post._id} sx={{ flexShrink: 0, width: 250 }}>
                            <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Post post={post} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                        No posts available
                    </Box>
                )}
            </Grid>
        </Box>
    );
}

export default Posts;
