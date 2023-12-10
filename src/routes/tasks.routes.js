import { Router } from 'express'
import { authRequiered } from '../middlewares/validateToken.js'
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks.controller.js'

const router = Router()

router.get('/tasks', authRequiered, getTasks)
router.get('/tasks/:id', authRequiered, getTask)
router.post('/tasks', authRequiered, createTask)
router.delete('/tasks/:id', authRequiered, deleteTask)
router.put('/tasks/:id', authRequiered, updateTask)

export default router
