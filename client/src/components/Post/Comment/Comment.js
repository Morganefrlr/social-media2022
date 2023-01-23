
import SendIcon from '@mui/icons-material/Send';



import { useState} from 'react';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../../axios';
import moment from 'moment';
import {AuthContext} from '../../../context/authContext.js'
import { useContext } from 'react';




const Comment = ({postId}) => {
    const { currentUser} = useContext(AuthContext)
    const folderImg = "http://localhost:8800/images/"
    const [desc,setDesc] = useState("")

    const { isLoading, error, data } = useQuery(['comments'], () => 
    makeRequest.get("/comment?postId=" + postId).then(res => {
       return res.data
    })
   )
   const queryClient = useQueryClient()

   const mutation = useMutation((newComment)=>{
       return makeRequest.post('/comment', newComment)
       },{
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries({ queryKey: ['comments'] })
       },
   })

   const handleClick = async (e) => {
       e.preventDefault()
       mutation.mutate({desc, postId })
       setDesc("")
    }
    
    
    
    return (
        <div className="comments">
            <div className="inputComment">
                <div className="commentUser">
                    <img src={folderImg + currentUser.profilPic} alt="" />
                </div>
                <textarea name="text" cols="40" rows="2" placeholder='Écrire un commentaire' onChange={e=>setDesc(e.target.value)} value={desc}></textarea>
                <button onClick={handleClick}>< SendIcon className='sendIcon'/></button>
            </div>
            {error ? "Il y a une erreur" : (isLoading ? "Chargement ..." : data.map(comment =>{
                return (
                    <div className="comment" key={comment.id}>
                        <div className="info">
                            <div className="commentUser">
                                <img src={folderImg + comment.profilPic} alt="" />
                                <span>{comment.surname} {comment.firstname}</span>
                            </div>
                            <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                        </div>
                        <div className="comment-bottom">
                            <span className='commentText'>{comment.desc}</span>
                            
                        </div>
                        
                    </div>
                )
            }))}
        </div>
    );
};

export default Comment;