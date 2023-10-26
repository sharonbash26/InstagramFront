
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
    psts,
    addComment,
    getDefaultFilter,
    removeComment

}
window.cs = pstService


async function query(filterBy = {}) {
    let psts = await asyncStorageService.query(STORAGE_KEY)
    // if (filterBy.id) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     psts = psts.filter(pst => regex.test(pst.vendor) || regex.test(pst.description))
    // }
    // if (filterBy.price) {
    //     psts = psts.filter(pst => pst.price <= filterBy.price)
    // }
    console.log('filterBy', filterBy.id)
    if (filterBy.id) {
        // psts=psts.filter(pst.by._id===filterBy.id)

        psts = psts.filter(pst => pst.by._id === filterBy.id);


    }
    return psts
}

function getById(pstId) {
    return asyncStorageService.get(STORAGE_KEY, pstId)
}

async function remove(pstId) {
    // throw new Error('Nope')
    console.log('storgae key', STORAGE_KEY)
    await asyncStorageService.remove(STORAGE_KEY, pstId)
}
async function removeComment(commentId) {
    console.log('commentId', commentId)
    // 1. Find the post containing the comment
    let allPsts = await asyncStorageService.query(STORAGE_KEY);
    let foundPst = allPsts.find(pst => pst.comments.some(comment => comment.id === commentId));

    // 2. If post found, remove the comment from it
    if (foundPst) {
        foundPst.comments = foundPst.comments.filter(comment => comment.id !== commentId);
        // 3. Save the modified post back to storage
        await asyncStorageService.put(STORAGE_KEY, foundPst);
    } else {
        throw new Error('Comment not found!');
    }
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
        uploadTime: "now",
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
        ],
        likedBy: [
        ],
        tags: []
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
            imgUrl: "a1.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u101",
                fullname: "yuile23",
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
                        fullname: "sharon_bash",
                        imgUrl: "http://some-img"
                    },
                    txt: "וואו",
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
                    txt: "מהמםםםםםםםםם",
                },
                {
                    id: "c1003",
                    by: {
                        _id: "u107",
                        fullname: "Tomer12",
                        imgUrl: "http://some-img"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c1004",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "http://some-img"
                    },
                    txt: "מדהיםם",
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
        }, {
            _id: "s102",
            txt: "My last photo from party",
            imgUrl: "b2.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u109",
                fullname: "yaelK1",
                imgUrl: "s3.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },


            comments: [
                {
                    id: "c10099",
                    by: {
                        _id: "u1055",
                        fullname: "sharon_bash",
                        imgUrl: "http://some-img"
                    },
                    txt: "וואו",
                    likedBy: [ // Optional
                        {
                            "_id": "u105",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },
                {
                    id: "c10076",
                    by: {
                        _id: "u106",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    },
                    txt: "מהמםםםםםםםםם",
                },
                {
                    id: "c100323",
                    by: {
                        _id: "u1072",
                        fullname: "Tomer12",
                        imgUrl: "http://some-img"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c10041",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "http://some-img"
                    },
                    txt: "מדהיםם",
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
        },
        {
            _id: utilService.makeId(),
            txt: "wowwwwwwwwwwwww i cant believe!!!!!!!!!!",
            imgUrl: "e5.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: utilService.makeId(),
                fullname: "mor_cohen",
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
                        fullname: "sharon_bash",
                        imgUrl: "http://some-img"
                    },
                    txt: "וואו",
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
                    txt: "מהמםםםםםםםםם",
                },
                {
                    id: "c1003",
                    by: {
                        _id: "u107",
                        fullname: "Tomer12",
                        imgUrl: "http://some-img"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c1004",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "http://some-img"
                    },
                    txt: "מדהיםם",
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

async function addComment(pstId, comment) {
    const pst = await getById(pstId);
    if (!pst.comments) pst.comments = [];

    const newComment = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt: comment
    };

    pst.comments.push(newComment);
    await asyncStorageService.put(STORAGE_KEY, pst);

    return newComment;
}

function getDefaultFilter() {
    return { id: '' }
}


// TEST DATA
// asyncStorageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))