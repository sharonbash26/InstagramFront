import { asyncStorageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

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

_createUsers()

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

function _createUsers() {
    let users = utilService.loadFromStorage('user')
    if (!users || !users.length) {
        users = [
            {
                _id: 'u1',
                fullname: 'yulie maor',
                username: 'Yulie maor',
                imgUrl: 'y1p.jpg',
                password: 123,
                createdAt: 1631031801011,
            },
            {
                _id: 'u2',
                fullname: 'sharon_bash',
                username: 'sharon_bash',
                imgUrl: 's2.jpg',
                password: 123,
                createdAt: 1631031801011,
            },
            {
                _id: 'u4',
                fullname: 'tomer',
                username: 'tomer123',
                imgUrl: 'tomer.jpg',
                password: 123,
                createdAt: 1631031801011
            },
            {
                _id: 'u5',
                fullname: 'yovel gran',
                username: 'yovel23',
                imgUrl: 'yoval.jpg',
                password: 123,
                createdAt: 16310323801011
            },
            {
                _id: 'u8',
                fullname: 'mor cohen',
                username: 'mor_cohen',
                imgUrl: 'mor.jpg',
                password: 123,
                createdAt: 163122323801011
            } ,
            {
                _id: 'u9',
                fullname: 'yosi shef',
                username: 'yosi',
                imgUrl: 'shef.jpg',
                password: 123,
                createdAt: 163122323801091
            } ,
            {
                _id: 'u11',
                fullname: 'shop dress',
                username: 'shopDressCode',
                imgUrl: 'shopdresslogo.jpg',
                password: 123,
                createdAt: 163122323891011
            },
            {
                _id: 'u3',
                fullname: 'bob butren',
                username: 'bob_bobi',
                imgUrl: "http://some-img",
                password: 123,
                createdAt: 183122323891011
            } ,
            {
                _id: 'u6',
                fullname: 'dob moshe',
                username: 'dob1954',
                imgUrl: "http://some-img",
                password: 123,
                createdAt: 183122773891011
            },
            {
                _id: 'u7',
                fullname: 'yael maronly',
                username: 'yael_77',
                imgUrl: "b2.jpg",
                password: 123,
                createdAt: 183171773891011
            },
            {
                _id: 'u10',
                fullname: 'News',
                username: 'Top-News',
                imgUrl: "newsp.jpg",
                password: 123,
                createdAt: 183161073891011
            },
            {
                _id: 'u12',
                fullname: 'Sport Center',
                username: 'Sport Center',
                imgUrl: "SpLogo.jpeg",
                password: 123,
                createdAt: 18313333891011
            },
            {
                _id: 'u13',
                fullname: 'BChoco',
                username: 'BChoco',
                imgUrl: "logoChoc.jpg",
                password: 123,
                createdAt: 183133232291011
            }
            
       ]

        utilService.saveToStorage('user', users)
    }
}

// ; (async () => {
//     await userService.signup({ fullname: 'Puki Norma', username: 'puki', password: '123' })
//     await userService.signup({ fullname: 'Master Adminov', username: 'admin', password: '123' })
//     await userService.signup({
//         username: 'yulie123',
//         fullname: "yuile23",
//         imgUrl: "y1p.jpg"
//     })
// })()



