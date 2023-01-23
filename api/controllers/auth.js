import { db } from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'




export const register = (req, res) =>{
    const q = 'SELECT * FROM user WHERE email = ?'
    db.query(q,[req.body.email], (err,data) =>{
        if (err) return res.status(500).json(err)
        if(data.length) return res.status(409).json('Utilisateur déjà enregistré!')

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const q = 'INSERT INTO user (`username`, `email`,`surname`,`firstname`, `password`) VALUE (?)'
        const values = [req.body.username, req.body.email,req.body.surname,req.body.firstname, hashedPassword]

        db.query(q,[values], (err, data) =>{
            if (err) return res.status(500).json(err)
            return res.status(200).json('Utilisateur créé correctement!!')
        })
    })
}

export const login = (req, res) =>{
    const q = 'SELECT * FROM user WHERE email = ?'
    db.query(q, [req.body.email], (err, data) =>{
        if (err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json('Mot de passe ou Email invalide!')

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if(!checkPassword) return res.status(400).json('Mot de passe ou Email invalide!')

        const token = jwt.sign({id:data[0].id}, 'secretKey')
        const {password, ...others} = data[0]

        res.cookie('accessToken', token, {
            httpOnly: true,
        }).status(200).json(others)
    })

}

export const logout = (req, res) =>{
    res.clearCookie('accessToken', {
        secure:true,
        sameSite:'none'
    }).status(200).json("L'utilisateur a bien été deconnecté!")
}