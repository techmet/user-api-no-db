const express = require('express')
const router = express.Router()

router.use('/api/v1/users', require('./user.routes'))

module.exports = router