import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'




export const getPosts = (req, res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')
    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
    
        const q = `SELECT p.*, u.id AS userId, surname, firstname, profilPic FROM post AS p JOIN user AS u ON (u.id = p.userId) 
                    LEFT JOIN relationship AS r 
                    ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? 
                    OR p.userId=? ORDER BY p.createdAt DESC`

        db.query(q,[userInfo.id,userInfo.id], (err, data) =>{
            if(err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
    
}

export const addPost = (req, res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')

    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
        const q = 'INSERT INTO post(`desc`, `img`, `createdAt`, `userId`) VALUES (?) '
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id
        ]

        db.query(q, [values], (err, data) =>{
            if(err) return res.status(500).json(err)
            return res.status(200).json('Votre post a bien été crée!')
        })

    })
}

export const deletePost = (req, res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')

    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
        const q = 'DELETE FROM post WHERE id = ? AND `userId` = ? '
       

        db.query(q, [req.params.id, userInfo.id], (err, data) =>{
            if(err) return res.status(500).json(err)
            if(data.affectedRows > 0) return res.status(200).json('Votre post a bien été supprimé!')
            return res.status(403).json('Vous ne pouvez supprimé que votre post!')
        })

    })
    
}







/*   const userId = req.body.userId
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')

    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
        const q = userId !== 'non defini' ?
                            `SELECT p.*, u.id AS userId, surname, firstname, profilPic FROM post AS p JOIN user AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
                            : `SELECT p.*, u.id AS userId, surname, firstname, profilPic FROM post AS p JOIN user AS u ON (u.id = p.userId) LEFT JOIN relationship AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`
        const values = userId !== 'non defini' ? [userId] : [userInfo.id, userInfo.id]

        db.query(q, values, (err, data) =>{
            if(err) return res.status(500).json(err)
            return res.status(200).json(data)
        })

    })  */