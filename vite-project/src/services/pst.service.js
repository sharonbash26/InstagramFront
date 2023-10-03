
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'postDB'
const BASE_URL = 'pst/'


//pst===post in Instagram

export const pstService = {
    query,
    getById,
    save,
    remove,
    getEmptyPst,
    addPstMsg
}
// window.cs = pstService


async function query() {
    return httpService.get(BASE_URL)
}

function getById(pstId) {
    return httpService.get(`pst/${pstId}`)
}

async function remove(pstId) {
    return httpService.delete(`pst/${pstId}`)
}
async function save(pst) {
    var savedPst
    if (pst._id) {
        savedPst = await httpService.put(`pst/${pst._id}`, pst)

    } else {
        savedPst = await httpService.post('pst', pst)
    }
    return savedPst
}

async function addPstMsg(pstId, txt) {
    const savedMsg = await httpService.post(`pst/${pstId}/msg`, { txt })
    return savedMsg
}


function getEmptyPst() {
    return {
        _id: utilService.makeId(),
        txt: "",
        imgUrl: "",
        by: {
            _id: utilService.makeId(),
            fullName: "",
            imgUrl: ""
        },

        comments: [
            {
                id: utilService.makeId(),
                by: {
                    _id: utilService.makeId(),
                    fullname: "",
                    imgUrl: ""
                },
                txt: "good one!",
                likedBy: [
                    {
                        "_id": utilService.makeId(),
                        "fullname": "",
                        "imgUrl": ""
                    }
                ]
            }],
        tags: ["fun", "romantic"]
    }
}





