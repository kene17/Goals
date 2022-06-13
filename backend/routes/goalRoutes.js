const express = require("express")
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoals} = require('../controllers/goalController')

router.get('/', getGoals)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoals)

module.exports = router