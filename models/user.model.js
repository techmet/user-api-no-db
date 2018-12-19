let users = require('../data/users.json')
const filename = './data/users.json'
const helper = require('../helpers/helper.js')

function getUsers() {
    return new Promise((resolve, reject) => {
        if (users.length === 0) {
            reject({
                message: 'no users available',
                status: 202
            })
        }

        resolve(users)
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
}

function insertUser(newUser) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(users) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newUser = { ...id, ...date, ...newUser }
        users.push(newUser)
        helper.writeJSONFile(filename, users)
        resolve(newUser)
    })
}

function updateUser(id, newUser) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
        .then(user => {
            const index = users.findIndex(p => p.id == user.id)
            id = { id: user.id }
            const date = {
                createdAt: user.createdAt,
                updatedAt: helper.newDate()
            } 
            users[index] = { ...id, ...date, ...newUser }
            helper.writeJSONFile(filename, users)
            resolve(users[index])
        })
        .catch(err => reject(err))
    })
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(users, id)
        .then(() => {
            users = users.filter(p => p.id !== id)
            helper.writeJSONFile(filename, users)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertUser,
    getUsers,
    getUser, 
    updateUser,
    deleteUser
}