const express = require('express')
const getAll = require('../api/category/getAll')
const router = express.Router()

router.get('/', getAll)
module.exports = router