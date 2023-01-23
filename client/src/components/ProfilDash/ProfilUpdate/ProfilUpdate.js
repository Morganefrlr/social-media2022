import { useState} from "react";
import { makeRequest } from "../../../axios.js";
import { useMutation, useQueryClient } from '@tanstack/react-query'



const ProfilUpdate = ({setOpenUpdate, user}) => {

    const folderImg = "http://localhost:8800/images/"
    const [profile, setProfil] = useState(null)
    const [texts, setTexts] = useState({
        username:user.username,
        surname:user.surname,
        firstname:user.firstname,
        email:user.email,
        work:user.work,
        facebook:user.facebook,
        instagram:user.instagram,
        twitter:user.twitter,
        linkedin:user.linkedin,
        pinterest:user.pinterest,
        reddit:user.reddit,
        youtube:user.youtube,

    })

    const upload = async (file) =>{
        try{
            const formData = new FormData()
            formData.append("file", file)
            const res = await makeRequest.post('/upload', formData)
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    const handleChange =(e)=>{
        setTexts((prev) =>({...prev, [e.target.name]: [e.target.value]}))
    }

    const queryClient = useQueryClient()

    const mutation = useMutation((user)=>{
        return makeRequest.put('/user', user)
        },{
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })
    
    const handleClick = async (e) => {
        e.preventDefault()
        let profilUrl = user.profilPic;

        profilUrl = profile ? await upload(profile) : user.profilPic


   
        mutation.mutate({...texts, profilPic:profilUrl })
        setOpenUpdate(false)
    }


    
 
    
    
    
    
   


    return (
        <div className="profilUpdate">
            <form>
                <button className="update-close" onClick={() =>setOpenUpdate(false)}>X</button>
                <span>Modifier le profil</span>
                <div className="update-box-user">
                    <div className="update-box-user_img" >
                        <img src={profile ? URL.createObjectURL(profile) : folderImg + user.profilPic} alt="" />
                        <label>Votre photo de profil</label>
                        <input type="file" onChange={e =>setProfil(e.target.files[0])}/>
                    </div>
                    <div className="update-box-user_name">
                        <div className='update-input'>
                            <input type="text" name="username" className="" placeholder="Nom d'utilisateur" onChange={handleChange}/>
                            <label>Votre nom d'utilisateur</label>
                        </div>
                        <div className='update-input'>
                            <input type="text" name="surname" className="" placeholder="Nom de famille" onChange={handleChange}/>
                            <label>Votre nom de famille</label>
                        </div>
                        <div className='update-input'>
                            <input type="text" name="firstname" className=""  placeholder="Prénom" onChange={handleChange}/>
                            <label>Votre prénom</label>
                        </div>
                    </div>
                </div>
                <div className="update-box-info">
                    <div className='update-input'>
                        <input type="email" name="email" className=""  placeholder="Email" onChange={handleChange}/>
                        <label>Votre email</label>
                    </div>
                    <div className='update-input'>
                        <input type="text" name="work" className=""  placeholder="Quel poste occupez vous?" onChange={handleChange}/>
                        <label>Votre poste</label>
                    </div>
                </div>
                <div className="update-box-social">
                    <span>Réseaux Sociaux</span>
                    <div className="update-social">
                        <div className="update-social_part">
                            <div className='update-input'>
                                <input type="text" name="facebook" className=""  placeholder="https://www.facebook.com/" onChange={handleChange}/>
                                <label>Facebook</label>
                            </div>
                            <div className='update-input'>
                                <input type="text" name="instagram" className=""  placeholder="https://www.instagram.com/" onChange={handleChange}/>
                                <label>Instagram</label>
                            </div>
                            <div className='update-input'>
                                <input type="text" name="twitter" className=""  placeholder="https://www.twitter.com/" onChange={handleChange}/>
                                <label>Twitter</label>
                            </div>
                            <div className='update-input'>
                                <input type="text" name="linkedin" className=""  placeholder="https://www.linkedin.com/" onChange={handleChange}/>
                                <label>LinkedIn</label>
                            </div>
                        </div>
                        <div className="update-social_part">
                            <div className='update-input'>
                                <input type="text" name="pinterest" className=""  placeholder="https://www.pinterest.com/" onChange={handleChange}/>
                                <label>Pinterest</label>
                            </div>
                            <div className='update-input'>
                                <input type="text" name="reddit" className=""  placeholder="https://www.reddit.com/" onChange={handleChange}/>
                                <label>Reddit</label>
                            </div>
                            <div className='update-input'>
                                <input type="text" name="youtube" className=""  placeholder="https://www.youtube.com/" onChange={handleChange}/>
                                <label>Youtube</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="update-btn" onClick={handleClick}>Mettre à jour</button>
            </form>
            
        </div>
    );
};

export default ProfilUpdate;