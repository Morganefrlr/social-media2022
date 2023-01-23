import express from 'express'
const router = express.Router()
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js'

router.get('/find/:userId', getUser)
router.get('/all/', getAllUsers)
router.put('/', updateUser)
router.delete('/', deleteUser)



export default router