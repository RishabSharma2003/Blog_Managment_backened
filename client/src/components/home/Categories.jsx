import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';



const Categories = () => {

    const [searchParams] =useSearchParams();
    const category = searchParams.get('category');
    console.log(category)
    


  return (
    <>
        <StyledLink to={`/create?category=${category || ''}`}>
            <StyledButton variant='contained'>Create Blog</StyledButton>
        </StyledLink>

        <StyledTable>
            <TableHead>
                <TableRow>
                    <TableCell><StyledLink to='/'>All Categories</StyledLink></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map((c)=>{
                        return(
                            <TableRow key={c.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${c.type}`}>{c.type}</StyledLink>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </StyledTable>
    </>
  )
}
const categories=[
    {id:1,type:'Music'},
    {id:2,type:'Movies'},
    {id:3,type:'Sports'},
    {id:4,type:'Tech'},
    {id:5,type:'Fasion'}
]

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color:inherit;
`
export default Categories
