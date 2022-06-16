const express = require("express")
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoals} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleWare')
router.get('/', protect, getGoals)

router.post('/',protect, setGoal)

router.put('/:id',protect, updateGoal)

router.delete('/:id', protect, deleteGoals)

module.exports = router