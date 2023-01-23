import { db } from '../connect.js'
import jwt from 'jsonwebtoken'



export const getRelations = (req,res) =>{
    const q = 'SELECT followerUserId FROM relationship WHERE followedUserId = ?'
    
    db.query(q,[req.query.followedUserId], (err, data) =>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data.map(relationship=>relationship.followerUserId))
    })
}


export const getFollow = (req,res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in!")

    jwt.verify(token, "secretKey", (err,userInfo) =>{
        if(err) return res.status(403).json('Token is not valid!')
        
        const q = "SELECT r.*, u.id AS userId, surname, firstname, profilPic FROM relationship AS r JOIN user AS u ON(u.id = r.followedUserId) WHERE followerUserId = ?"
           

        db.query(q,[userInfo.id], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })  
    })
}

export const getFollower = (req,res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in!")

    jwt.verify(token, "secretKey", (err,userInfo) =>{
        if(err) return res.status(403).json('Token is not valid!')
        
        const q = "SELECT r.*, u.id AS userId, surname, firstname, profilPic FROM relationship AS r JOIN user AS u ON(u.id = r.followerUserId) WHERE followedUserId = ?"
           

        db.query(q,[userInfo.id], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })  
    })
}


export const addRelation = (req,res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in!")

    jwt.verify(token, "secretKey", (err,userInfo) =>{
        if(err) return res.status(403).json('Token is not valid!')
        
        const q = "INSERT INTO relationship (`followerUserId`, `followedUserId`) VALUES (?)"
        const values = [
            userInfo.id,
            req.body.userId
        ]

        db.query(q,[values], (err, data)=>{
        if(err) return (
            console.log(req.body.userId),
            res.status(500).json(err))
        return res.status(200).json('following ok')
    })  
    })
}


export const deleteRelation = (req,res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in!")

    jwt.verify(token, "secretKey", (err,userInfo) =>{
        if(err) return res.status(403).json('Token is not valid!')
        
        const q = "DELETE FROM relationship WHERE `followerUserId` = ? AND `followedUserId` = ? "
    

        db.query(q,[userInfo.id, req.query.userId], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('unfollow ok')
    })  
    })
}
