const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/product/create')
const getAll = require('../api/product/getAll')
const update = require('../api/product/update')
const remove = require('../api/product/delete')

router.delete('/:_id', auth, remove)
router.put('/:_id', auth, update)
router.post('/', auth, create)
router.get('/', getAll)

module.exports = router
