import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
    const userId = req.params.userId
    const q = 'SELECT * FROM user WHERE id=?'

    db.query(q,[userId], (err, data) => {
        if(err) return res.status(500).json(err)
        const {password, ...info} = data[0]
        return res.json(info)
    })

}
export const getAllUsers = (req, res) => {

    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')
    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
    
        const q = `SELECT * FROM user`

        db.query(q,[userInfo.id], (err, data) =>{
            if(err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}



export const updateUser = (req, res) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Vous n'êtes pas identifié!")

    jwt.verify(token, "secretKey", (err, userInfo) =>{
        if(err) return res.status(403).json("Token invalide")

        const q = "UPDATE user SET `username`=?,`email`=?,`surname`=?,`firstname`=?,`work`=?,`profilPic`=?,`facebook`=?,`instagram`=?,`twitter`=?,`linkedin`=?,`pinterest`=?,`reddit`=?,`youtube`=? WHERE id=?"
        
        db.query(q,[req.body.username,req.body.email,req.body.surname,req.body.firstname,req.body.work,req.body.profilPic,req.body.facebook,req.body.instagram,req.body.twitter,req.body.linkedin,req.body.pinterest,req.body.reddit,req.body.youtube, userInfo.id],(err, data) =>{
            if(err) return res.status(500).json(err)
            if(data.affectedRows > 0) return res.json("Profil mis à jour!")
        })
    })
}


export const deleteUser = (req, res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')

    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
        const q = 'DELETE FROM user WHERE id = ?'
       console.log(userInfo.id)

        db.query(q, [userInfo.id], (err, data) =>{
            if(err) return res.status(500).json(err)
            if(data.affectedRows > 0) return res.status(200).json('Votre post a bien été supprimé!')
            return res.status(403).json('Vous ne pouvez supprimé que votre post!')
        })

    })
    
}