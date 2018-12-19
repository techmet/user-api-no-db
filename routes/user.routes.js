const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
const m = require('../helpers/middlewares')

/* All users */
router.get('/', async (req, res) => {
    await user.getUsers()
    .then(users => res.json(users))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A user by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await user.getUser(id)
    .then(user => res.json(user))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new user */
router.post('/', m.checkFieldsPost, async (req, res) => {
    await user.insertUser(req.body)
    .then(user => res.status(201).json({
        message: `The user #${user.id} has been created`,
        content: user
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a user */
router.put('/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id

    await user.updateUser(id, req.body)
    .then(user => res.json({
        message: `The user #${id} has been updated`,
        content: user
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a user */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await user.deleteUser(id)
    .then(user => res.json({
        message: `The user #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router