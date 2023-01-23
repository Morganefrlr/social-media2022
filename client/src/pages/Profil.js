

import Post from '../components/Post/Post'
import ProfilDash from '../components/ProfilDash/ProfilDash';
import { useParams } from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../axios.js'
import {AuthContext} from '../context/authContext.js'
import { useContext } from 'react';




const Profil = () => {


    const id = useParams()
    const userId = parseInt(id.id)
    const { currentUser} = useContext(AuthContext)

        

    const { data:posts } = useQuery(['posts'], () =>
    makeRequest.get('/post').then(res => {
        return res.data
    })
    ) 
    const {isLoading, error, data } = useQuery(['user'], () => 
        makeRequest.get("/user/find/" + userId).then(res => {
        return res.data
     })
    )

   let postsUser=[]
   const result = () => {
    if(posts){
        for(let i=0; i<posts.length; i++){
            if(userId === posts[i].userId){
                postsUser = posts.filter(el => el.userId === userId)
                
            }
        } 
    }
    
   }
   result()

    return (
        <>
            {error ? "Il y a une erreur" : (isLoading ? "Chargement en cours ...." : <ProfilDash user={data}/>)}  
            
            {postsUser && currentUser.id !== userId ?
            (postsUser.map(post => {
                return (
                    < Post post={post} key={post.id}/> 
                )
            })) : (<></>)}  
        </>
    );
};

export default Profil;
