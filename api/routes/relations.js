import express from 'express'
import { addRelation, deleteRelation, getRelations, getFollow, getFollower  } from '../controllers/relations.js'
const router = express.Router()


router.get('/', getRelations)
router.get('/follow', getFollow)
router.get('/follower', getFollower)
router.post('/', addRelation)
router.delete('/', deleteRelation)




export default router