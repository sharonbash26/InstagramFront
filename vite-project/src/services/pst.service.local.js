
import { asyncStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'pst'

var psts = _createPst()
console.log('create psts startttttt', psts)

export const pstService = {
    query,
    getById,
    save,
    remove,
    getEmptyPst,
    addPstMsg,
    psts
    
}
window.cs = pstService


async function query() {
    var psts = await asyncStorageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     psts = psts.filter(pst => regex.test(pst.vendor) || regex.test(pst.description))
    // }
    // if (filterBy.price) {
    //     psts = psts.filter(pst => pst.price <= filterBy.price)
    // }
    return psts
}

function getById(pstId) {
    return asyncStorageService.get(STORAGE_KEY, pstId)
}

async function remove(pstId) {
    // throw new Error('Nope')
    await asyncStorageService.remove(STORAGE_KEY, pstId)
}

async function save(pst) {
    var savedPst
    if (pst._id) {
        savedPst = await asyncStorageService.put(STORAGE_KEY, pst)
    } else {
        // Later, owner is set by the backend
        // pst.owner = userService.getLoggedinUser()
        savedPst = await asyncStorageService.post(STORAGE_KEY, pst)
    }
    return savedPst
}

async function addPstMsg(pstId, txt) {
    // Later, this is all done by the backend
    const pst = await getById(pstId)
    if (!pst.msgs) pst.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    pst.msgs.push(msg)
    await asyncStorageService.put(STORAGE_KEY, pst)

    return msg
}

function getEmptyPst() {
    return {
        _id: "",
        txt: "",
        imgUrl: "",
        uploadTime:'now',
        by: {
            _id: "",
            fullname: "",
            imgUrl: ""
        },
        loc: {
            lat: 11.11,
            lng: 22.22,
            name: "Tel Aviv"
        },

        comments: [
            {
                id: "",
                by: {
                    _id: "",
                    fullname: "",
                    imgUrl: ""
                },
                txt: "",
                likedBy: [
                    {
                        "_id": "",
                        "fullname": "",
                        "imgUrl": ""
                    }
                ]
            },
            {
                id: "",
                by: {
                    _id: "",
                    fullname: "",
                    imgUrl: ""
                },
                txt: "",
            }
        ],
        likedBy: [
        ],
        tags: ["", ""]
    }
}

function _createPst() {
    console.log('create post in Instagram start')
    let psts = utilService.loadFromStorage(STORAGE_KEY)
    console.log('posts', psts)
    if (!psts || !psts.length) {
        psts = [{
            _id: "s101",
            txt: "Best trip ever",
            imgUrl: "",
            uploadTime:utilService.randomTimeString(),
            by: {
                _id: "u101",
                fullname: "sharonbash",
                imgUrl: "s3.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },

            comments: [
                {
                    id: "c1001",
                    by: {
                        _id: "u105",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    txt: "good one!",
                    likedBy: [ // Optional
                        {
                            "_id": "u105",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },
                {
                    id: "c1002",
                    by: {
                        _id: "u106",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    },
                    txt: "not good!",
                }
            ],
            likedBy: [
                {
                    _id: "u105",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u106",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            tags: ["fun", "romantic"]
        }
        ]

    }

    utilService.saveToStorage(STORAGE_KEY, psts)
    return psts

}

// TEST DATA
// asyncStorageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))