import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'



export const getComments = (req, res) =>{
    const q = 'SELECT c.*, u.id AS userId, surname, firstname, profilPic FROM comment AS c JOIN user AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC'

    db.query(q,[req.query.postId], (err, data) =>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addComment = (req,res) =>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')

    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
        const q = 'INSERT INTO comment(`desc`,`createdAt`, `userId`, `postId`) VALUES (?) '
        const values = [
            req.body.desc,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
            req.body.postId
        ]

        db.query(q, [values], (err, data) =>{
            if(err) return res.status(500).json(err)
            return res.status(200).json('Votre commentaire a bien été crée!')
        })

    })
}

export const deleteComment = (req, res) =>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json('Vous devez être connecté!')

    jwt.verify(token, 'secretKey', (err, userInfo) =>{
        if(err) return res.status(403).json('Token non valide!')
        const q = 'DELETE FROM comment WHERE id = ? AND `userId` = ? '
       

        db.query(q, [req.params.id, userInfo.id], (err, data) =>{
            if(err) return res.status(500).json(err)
            if(data.affectedRows > 0) return res.status(200).json('Votre post a bien été supprimé!')
            return res.status(403).json('Vous ne pouvez supprimé que votre post!')
        })

    })
}