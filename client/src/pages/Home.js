

import Post from '../components/Post/Post'
import Postbar from '../components/Postbar/Postbar'


import { useQuery} from '@tanstack/react-query'
import {AuthContext} from '../context/authContext.js'
import { makeRequest } from '../axios.js';
import { useContext } from 'react';


const Home = () => {
    const { currentUser} = useContext(AuthContext)
    const userId = currentUser.id 
    
    const { data: dataUser } = useQuery(['user'], () => 
        makeRequest.get("/user/find/" + userId).then(res => {
        return res.data
     })
    )

    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get('/post').then(res => {
            return res.data
        })
    ) 
    
    
    
    return (
        <>
            < Postbar userInfo={dataUser}/> 
            {error ? "Il y a une erreur" : (isLoading ? "Chargement ..." : data.map(post => {
                return (
                    < Post post={post} key={post.id}/> 
                )
            }))}
        </>
    );
};

export default Home;