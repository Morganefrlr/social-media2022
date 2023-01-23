
import AddPhoto from '@mui/icons-material/AddPhotoAlternate';
import {  useState } from 'react';
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const Postbar = ({userInfo}) => {
    
    const folderImg = "http://localhost:8800/images/"
    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState('')
    const upload = async () =>{
        try{
            const formData = new FormData()
            formData.append('file', file)
            const res = await makeRequest.post('/upload', formData)
            return res.data
        }catch(err){
            console.log(err)
        }
    }
    const queryClient = useQueryClient()

    const mutation = useMutation((newPost) => {
        return makeRequest.post('/post', newPost)
        },{
            onSuccess: ()=>{
                queryClient.invalidateQueries({ queryKey: ['posts']})
            }
    })

    const handleClick = async (e) => {
        e.preventDefault()
        let imgUrl = "";
        if(file) imgUrl = await upload()
        mutation.mutate({desc, img:imgUrl})
        setDesc("")
        setFile(null)
    }



    return (
        <div className="inputPostbar">
                <div className="inputPostbar_user">
                    <img src={userInfo && folderImg + userInfo.profilPic} alt="" className='input-profil' />
                    <textarea name="text" cols="40" rows="5" placeholder='Écrire un post' onChange={e => setDesc(e.target.value)} value={desc}></textarea>
                    {file && 
                    <img src={URL.createObjectURL(file)} alt="" className='file'/>
                    }
                </div>
                <div className="inputPostbar_bottom">
                    <div className='inputPostbar-icon'>
                        <input type="file" id='file' style={{display: 'none'}} onChange={e => setFile(e.target.files[0])} />
                        <label htmlFor="file">
                            <div className='inputPostbar-item'>
                                < AddPhoto className='icon' />
                                <span>Ajouter une photo</span>
                            </div>
                        </label>
                    </div>
                    <button onClick={handleClick}>Envoyer</button>
                </div>
        </div>
    );
};

export default Postbar;