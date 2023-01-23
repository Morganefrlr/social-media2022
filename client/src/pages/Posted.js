import Post from '../components/Post/Post'
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../axios.js'
import {AuthContext} from '../context/authContext.js'
import { useContext } from 'react';


const Posted = () => {
    const { currentUser} = useContext(AuthContext)

        

    const { data:posts } = useQuery(['posts'], () =>
    makeRequest.get('/post').then(res => {
        return res.data
    })
    ) 

   let postsUser=[]
   const result = () => {
    if(posts){
        for(let i=0; i<posts.length; i++){
            if(currentUser.id=== posts[i].userId){
                postsUser = posts.filter(el => el.userId === currentUser.id)
                
            }
        } 
    }
    
   }
   result()

    return (
        <>
            
            {postsUser && postsUser.map(post => {
                return (
                    < Post post={post} key={post.id}/> 
                )
            })} 
        </>
    );
};

export default Posted;