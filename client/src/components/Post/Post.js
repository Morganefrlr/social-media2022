import Hearticon from '@mui/icons-material/FavoriteBorderOutlined';
import Hearticonfull from '@mui/icons-material/FavoriteOutlined';
import Texticon from '@mui/icons-material/TextsmsOutlined';
import Dotsicon from '@mui/icons-material/MoreHoriz';

import Comment from './Comment/Comment';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import moment from 'moment';
import { makeRequest } from '../../axios';
import { useQuery ,useMutation, useQueryClient } from '@tanstack/react-query'

const Post = ({post}) => {

    const { currentUser } = useContext(AuthContext)
    const folderImg = "http://localhost:8800/images/"
    const [commentOpen, setCommentOpen]= useState(false)
    const [menuOpen, setMenuOpen]= useState(false)
  

    const { isLoading, error, data } = useQuery(['likes', post.id], () => 
    makeRequest.get("/like?postId=" + post.id).then(res => {
       return res.data
    })
   )
   
   
   const queryClient = useQueryClient()

   const mutation = useMutation((licked)=>{
       if(licked) {
          return makeRequest.delete('/like?postId=' + post.id); 
       }
       
       return makeRequest.post('/like', {postId: post.id})

       },{
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries({ queryKey: ['likes'] })
       },
   })

   const deleteMutation = useMutation((postId)=>{ 
       return makeRequest.delete('/post/' + postId)

       },{
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries({ queryKey: ['posts'] })
       },
   })

   const handleLike = () => {
       mutation.mutate(data.includes(currentUser.id))
   }
   const handleDelete = () => {
       deleteMutation.mutate(post.id)
   }

   const handleClick = () => {
     window.location = `http://localhost:3000/profil/${post.userId}`
   }




   
    return (
        <div className="post">
            <div className="userPost">
                <img src={folderImg + post.profilPic} alt="" />
                <div className="userPost_info">
                    <span className="userPost-lien" onClick={handleClick}>{post.firstname} {post.surname}</span>
                    
                    <span className="datePost">{moment(post.createdAt).fromNow()}</span>
                </div>
                
                {menuOpen ?
                    (<div className="userPost_menu">
                        <button>Modifier</button>
                        <button onClick={handleDelete} >Supprimer</button>
                        <button onClick={() =>setMenuOpen(false)}>X</button>
                    </div>) : ( 
                    <div className="userPost_dots">
                        <Dotsicon className="dots" onClick={() =>setMenuOpen(true)}/>
                    </div>)   
                }
            </div>
            <div className="contentPost">
                <span>{post.desc}</span>
                {post.img &&  <img src={folderImg + post.img} alt="" />}
            </div>
            <div className="iconPost">
                <div className="commentPost">
                    <div className="item">
                        {error ? "Il y a une erreur" : (isLoading ? "Chargement ..." : data.includes(currentUser.id) ? < Hearticonfull className='heartfull' onClick={handleLike} /> :  < Hearticon className='icon' onClick={handleLike} />) } 
                        {data && data.length} likes
                    </div>
                   <div className="item">
                        < Texticon className='icon' onClick={() => setCommentOpen(!commentOpen)}/>
                        Commentaires
                   </div> 
                </div>
                
            </div>
            {commentOpen && < Comment postId={post.id} />}  
        </div>
    );
};

export default Post;