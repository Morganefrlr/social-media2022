import express from "express"
const app = express()
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT || 8800
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





app.use((req,res, next) =>{
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(cookieParser())






const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage})
app.post('/api/upload', upload.single("file"), (req, res) =>{
    const file = req.file
    res.status(200).json(file.filename)
})

app.use('/images', express.static(path.join(__dirname + '/images')))
console.log(__dirname, '/images')






import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import testRoutes from './routes/test.js'
import postRoutes from './routes/post.js'
import likeRoutes from './routes/like.js'
import relationRoutes from './routes/relations.js'
import commentRoutes from './routes/comment.js'



app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/like', likeRoutes)
app.use('/api/relation', relationRoutes)
app.use('/api/', testRoutes)






/*

app.use(express.static(path.join(__dirname + "/client/public")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "/client/public" + '/index.html'));
});

*/

app.listen(PORT, () =>{
    console.log(`Connecté sur le port ${PORT}!`)
})