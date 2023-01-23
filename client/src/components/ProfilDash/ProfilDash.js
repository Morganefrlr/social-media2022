
import Mail from '@mui/icons-material/MailOutline';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/Twitter';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Pinterest from '@mui/icons-material/Pinterest';
import Reddit from '@mui/icons-material/Reddit';
import YouTube from '@mui/icons-material/YouTube';
import ProfilUpdate from './ProfilUpdate/ProfilUpdate';
import { AuthContext} from '../../context/authContext';
import { useState, useContext  } from 'react';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios.js';

const ProfilDash = ({user}) => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const folderImg = "http://localhost:8800/images/"
    const { currentUser } = useContext(AuthContext)
    

    const { data: relationData } = useQuery(['relations'], () => 
        makeRequest.get("/relation?followedUserId=" + user.id).then(res => {
        return res.data
        })
   )
   const queryClient = useQueryClient()

   const mutation = useMutation((following)=>{
       if(following) {
          return makeRequest.delete('/relation?userId=' + user.id)
       }
       
       return makeRequest.post('/relation', {userId: user.id})
            
       },{
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries({ queryKey: ['relations'] })
       },
       
   })
    const handleFollow = () =>{
        mutation.mutate(relationData.includes(currentUser.id))
    }



    const { data: relationFollower } = useQuery(['followers'], () => 
    makeRequest.get("/relation/follower/").then(res => { 
    return res.data
    })
    )
    const { data: relationFollow } = useQuery(['follows'], () => 
    makeRequest.get("/relation/follow/").then(res => {
    return res.data
    })
    )







    return (
        <div className='profilDash'>
            <div className="profilImg">
                <img src={ folderImg + user.profilPic} alt="" />
            </div>
            <div className="profilContainer">
                <div className="profilUser">
                    <p className='profilName'>{user.firstname} {user.surname}</p>
                    <p className='profilWork'>{user.work}</p>
                    <a className='profilMail'href={`mailto:${user.email}`}>< Mail /></a>
                </div>
                <div className="profilSocialMedia">
                    {user.facebook ? (
                        <div><a href={user.facebook}>< Facebook className='icon valide'/></a></div>
                    ): (< Facebook className='icon invalide'/>) } 
                    {user.instagram ? (
                        <div><a href={user.instagram}>< Instagram className='icon valide'/></a></div>
                    ): (< Instagram className='icon invalide'/>) } 
                    {user.twitter ? (
                        <div><a href={user.twitter}>< Twitter className='icon valide'/></a></div>
                    ): (< Twitter className='icon invalide'/>) } 
                    {user.linkedIn ? (
                        <div><a href={user.linkedIn}>< LinkedIn className='icon valide'/></a></div>
                    ): (< LinkedIn className='icon invalide'/>) } 
                    {user.pinterest ? (
                        <div><a href={user.pinterest}>< Pinterest className='icon valide'/></a></div>
                    ): (< Pinterest className='icon invalide'/>) } 
                    {user.reddit ? (
                        <div><a href={user.reddit}>< Reddit className='icon valide'/></a></div>
                    ): (< Reddit className='icon invalide'/>) } 
                    {user.youtube ? (
                        <div><a href={user.youtube}>< YouTube className='icon valide'/></a></div>
                    ): (< YouTube className='icon invalide'/>) } 
                </div>
                {user.id === currentUser.id ? (<button onClick={() =>setOpenUpdate(true)}>Mettre à jour</button>) : (<button onClick={handleFollow}>{relationData && relationData.includes(currentUser.id)? "Suivi" : "S'abonner"}</button>)}
                {user.id === currentUser.id && 
                    <div className="profilFriends">
                        <p>{relationFollow && relationFollow.length} <br />SUIVIS</p>
                        <hr />
                        <p>{relationFollower && relationFollower.length} <br />ABONNÉS</p>
                    </div>
                }
            </div>
            {openUpdate && <ProfilUpdate setOpenUpdate={setOpenUpdate} user={user}/> }
            
        </div>
    );
};

export default ProfilDash;
