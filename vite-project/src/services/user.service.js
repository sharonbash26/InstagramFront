import { asyncStorageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore
}

window.userService = userService


function getUsers() {
    return asyncStorageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await asyncStorageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return asyncStorageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}


// made some changes
async function update({ _id, imgUrl }) {
    // const user = await asyncStorageService.get('user', _id)
    const user = getLoggedinUser()
    user.imgUrl = imgUrl
    // await asyncStorageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    console.log('user from service', user)
    return user
}

async function login(userCred) {
    const users = await asyncStorageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'emptyUser.jpeg'
    // if (!userCred.imgUrl) userCred.imgUrl = 's2.jpg'
    const user = await asyncStorageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    const { _id, fullname, imgUrl, username } = user
    const userToSave = { _id, fullname, imgUrl, username }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123'})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123'})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123'})
// })()



