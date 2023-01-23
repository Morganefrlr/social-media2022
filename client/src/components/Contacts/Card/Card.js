import { Link } from 'react-router-dom';
import { AuthContext} from '../../../context/authContext.js'
import {  useContext  } from 'react';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../../axios.js'


const Card = ({user}) => {

    const { currentUser } = useContext(AuthContext)
    const folderImg = "http://localhost:8800/images/"
    console.log(user)

    const { data: relationData } = useQuery(['relations'], () => 
        makeRequest.get("/relation?followedUserId=" + user.userId).then(res => {
        return res.data
        })
   )
   const queryClient = useQueryClient()

   const mutation = useMutation((following)=>{
       if(following) {
          return makeRequest.delete('/relation?userId=' + user.userId)
       }
       
       return makeRequest.post('/relation', {userId: user.userId})
            
       },{
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries({ queryKey: ['relations'] })
       },
       
       
   })
    const handleFollow = () =>{
        mutation.mutate(relationData.includes(currentUser.id))
        
    }


    return (
        <div className="card">
            <img src={folderImg + user.profilPic} alt="" />
            <div className="card_bottom">
                <Link to={`../profil/${user.userId}`}>{user.firstname} {user.surname}</Link>    
                <button onClick={handleFollow}>{relationData && relationData.includes(currentUser.id)? "Ne plus suivre" : "Suivre"}</button>
            </div>
            
        </div>
    );
};

export default Card;