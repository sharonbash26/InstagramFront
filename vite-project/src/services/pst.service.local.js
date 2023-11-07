import { asyncStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'pst'

var psts = _createPst()

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
    removeComment,
    getUserPostCount
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
    console.log('filterby', filterBy)
    if (filterBy.by) {
        // psts=psts.filter(pst.by._id===filterBy.id)
        console.log('ENTERED')
        console.log(filterBy)
        psts = psts.filter(pst => pst.by._id === filterBy.by);

    }
    return psts
}

async function getUserPostCount(userId) {
    const psts = await query()
    let pstCount = 0
    psts.forEach(pst => { if (pst.by._id === userId) pstCount++ })
    return pstCount
}

function getById(pstId) {
    return asyncStorageService.get(STORAGE_KEY, pstId)
}

async function remove(pstId) {
    await asyncStorageService.remove(STORAGE_KEY, pstId)
}
async function removeComment(commentId) {
    // 1. Find the post containing the comment
    let allPsts = await asyncStorageService.query(STORAGE_KEY);
    let foundPst = allPsts.find(pst => pst.comments.some(comment => comment.id === commentId));

    // 2. If post found, remove the comment from it
    if (foundPst) {
        foundPst.comments = foundPst.comments.filter(comment => comment.id !== commentId);
        // 3. Save the modified post back to storage
        const updatedPost = await asyncStorageService.put(STORAGE_KEY, foundPst);
        return updatedPost
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
        txt: "",
        imgUrl: "",
        uploadTime: "now",
        by: userService.getLoggedinUser(),
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
    let psts = utilService.loadFromStorage(STORAGE_KEY)
    console.log('posts', psts)
    if (!psts || !psts.length) {
        psts = [{
            _id: "1",
            txt: "Best trip ever",
            imgUrl: "a1.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u1",
                fullname: "yuile23",
                imgUrl: "y1p.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },


            comments: [
                {
                    id: "c1",
                    by: {
                        _id: "u2",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
                    },
                    txt: "וואו",
                    likedBy: [ // Optional
                        {
                            "_id": "u3",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },

                {
                    id: "c2",
                    by: {
                        _id: "u4",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c3",
                    by: {
                        _id: "u5",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
                    },
                    txt: "מדהיםם",
                }
            ],
            likedBy: [
                {
                    _id: "u3",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u6",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            tags: ["fun", "romantic"]
        }, {
            _id: "2",
            txt: "My last photo from party",
            imgUrl: "yael.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u7",
                fullname: "yaelK1",
                imgUrl: "b2.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },


            comments: [
                {
                    id: "c4",
                    by: {
                        _id: "u2",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
                    },
                    txt: "וואו",
                    likedBy: [ // Optional
                        {
                            "_id": "u3",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },
                {
                    id: "c5",
                    by: {
                        _id: "u6",
                        fullname: "Dob",
                        imgUrl: "bob.jpg"
                    },
                    txt: "מהמםםםםםםםםם",
                },
                {
                    id: "c6",
                    by: {
                        _id: "u4",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםם",
                },
                {
                    id: "c7",
                    by: {
                        _id: "u5",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
                    },
                    txt: "מדהיםם",
                }
            ],
            likedBy: [
                {
                    _id: "u3",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u6",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            tags: ["fun", "romantic"]
        },
        {
            _id: "3",
            txt: "wow i cant believe!!!!!!!",
            imgUrl: "e5.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u8",
                fullname: "mor_cohen",
                imgUrl: "mor.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },


            comments: [
                {
                    id: "c8",
                    by: {
                        _id: "u2",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
                    },
                    txt: "וואו",
                    likedBy: [ // Optional
                        {
                            "_id": "u3",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },
                {
                    id: "c9",
                    by: {
                        _id: "u6",
                        fullname: "Dob",
                        imgUrl: "bob.jpg"
                    },
                    txt: "מהמםםםםםםםםם",
                },
                {
                    id: "c10",
                    by: {
                        _id: "u4",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c11",
                    by: {
                        _id: "u5",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
                    },
                    txt: "מדהיםם",
                }
            ],
            likedBy: [
                {
                    _id: "u3",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u6",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            tags: ["fun", "romantic"]
        },
        {
            _id: "4",
            txt: "תראוו מה הכנתיי בעצמיי",
            imgUrl: "food5.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u1",
                fullname: "yuile23",
                imgUrl: "y1p.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },


            comments: [
                {
                    id: "c12",
                    by: {
                        _id: "u2",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
                    },
                    txt: "וואו",
                    likedBy: [ // Optional
                        {
                            "_id": "u3",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },

                {
                    id: "c13",
                    by: {
                        _id: "u4",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c14",
                    by: {
                        _id: "u5",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
                    },
                    txt: "מדהיםם",
                }
            ],
            likedBy: [
                {
                    _id: "u3",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u6",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            tags: ["fun", "romantic"]
        },
        {
            _id: "5",
            txt: "נעמה הבכורה שליי בת 5",
            imgUrl: "yulidat.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u1",
                fullname: "yuile23",
                imgUrl: "y1p.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },


            comments: [
                {
                    id: "c15",
                    by: {
                        _id: "u2",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
                    },
                    txt: "וואו",
                    likedBy: [ // Optional
                        {
                            "_id": "u3",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },

                {
                    id: "c16",
                    by: {
                        _id: "u4",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c17",
                    by: {
                        _id: "u5",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
                    },
                    txt: "מדהיםם",
                }
            ],
            likedBy: [
                {
                    _id: "u3",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u6",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            tags: ["fun", "romantic"]
        },
        {
            _id: "6",
            txt: "תראוו מה הכנתי לאכול בעצמיי",
            imgUrl: "food2.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u1",
                fullname: "yuile23",
                imgUrl: "y1p.jpg"
            },
            loc: { // Optional
                lat: 11.11,
                lng: 22.22,
                name: "Tel Aviv"
            },


            comments: [
                {
                    id: "c18",
                    by: {
                        _id: "u2",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
                    },
                    txt: "וואו",
                    likedBy: [ // Optional
                        {
                            "_id": "u3",
                            "fullname": "Bob",
                            "imgUrl": "http://some-img"
                        }
                    ]
                },

                {
                    id: "c19",
                    by: {
                        _id: "u4",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c20",
                    by: {
                        _id: "u5",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
                    },
                    txt: "מדהיםם",
                }
            ],
            likedBy: [
                {
                    _id: "u3",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u6",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            tags: ["fun", "romantic"]
        },



            {
                    _id: "7",
                    txt:"אטליז יוסי  מבצע רק היום",
                    imgUrl: "food7.jpg",
                    uploadTime: utilService.randomTimeString(),
                    by: {
                        _id: "u9",
                        fullname: "Yossi Cohen",
                        imgUrl: "shef.jpg"
                    },
                    loc: { // Optional
                        lat: 11.11,
                        lng: 22.22,
                        name: "Tel Aviv"
                    },


                    comments: [
                        {
                            id: "c21",
                            by: {
                                _id: "u2",
                                fullname: "sharon_bash",
                                imgUrl: "s2.jpg"
                            },
                            txt: "וואו",
                            likedBy: [ // Optional
                                {
                                    "_id": "u3",
                                    "fullname": "Bob",
                                    "imgUrl": "http://some-img"
                                }
                            ]
                        },

                        {
                            id: "c22",
                            by: {
                                _id: "u4",
                                fullname: "Tomer12",
                                imgUrl: "tomer.jpg"
                            },
                            txt: "מדהיםםםםםםם",
                        },
                        {
                            id: "c23",
                            by: {
                                _id: "u5",
                                fullname: "Yovel",
                                imgUrl: "yoval.jpg"
                            },
                            txt: "מדהיםם",
                        }
                    ],
                    likedBy: [
                        {
                            _id: "u3",
                            fullname: "Bob",
                            imgUrl: "http://some-img"
                        },
                        {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "http://some-img"
                        }
                    ],
                    tags: ["fun", "romantic"]
                }, {
                    _id: "8",
                    txt: "!!!שימו לב:שיין נגדנו !! ומוכרת דגל פלסטין באתר",
                    imgUrl: "news5.jpeg",
                    uploadTime: utilService.randomTimeString(),
                    by: {
                        _id: "u10",
                        fullname: "TopNews",
                        imgUrl: "newsp.jpg"
                    },
                    loc: { // Optional
                        lat: 11.11,
                        lng: 22.22,
                        name: "Tel Aviv"
                    },


                    comments: [
                        {
                            id: "c24",
                            by: {
                                _id: "u7",
                                fullname: "yael",
                                imgUrl: "b2.jpg"
                            },
                            txt: "נמחוקקקק את האפלקצייההההה עכשווווווווווו",
                            likedBy: [ // Optional
                                {
                                    "_id": "u3",
                                    "fullname": "Bob",
                                    "imgUrl": "http://some-img"
                                }
                            ]
                        },
                        {
                            id: "c25",
                            by: {
                                _id: "u6",
                                fullname: "Dob",
                                imgUrl: "bob.jpg"
                            },
                            txt: "לאאאא מאמיןןן כמה כסףףף בזבזזנווו שם",
                        },
                        {
                            id: "c26",
                            by: {
                                _id: "u4",
                                fullname: "Tomer12",
                                imgUrl: "tomer.jpg"
                            },
                            txt:"די הגיעעעע זמןןן שנקנההה רק כחול לבןןןןק ",
                        },
                        {
                            id: "c27",
                            by: {
                                _id: "u5",
                                fullname: "Yovel",
                                imgUrl: "yoval.jpg"
                            },
                            txt: "בסדר מי צריך אותם יותר גם ככה איכות על הפניםם ",
                        }
                    ],
                    likedBy: [
                        {
                            _id: "u3",
                            fullname: "Bob",
                            imgUrl: "http://some-img"
                        },
                        {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "http://some-img"
                        }
                    ],
                    tags: ["fun", "romantic"]
                },












                {
                    _id: "9",
                    txt: "!!!בנותת זארה בחרה צד ",
                    imgUrl: "zara.jpeg",
                    uploadTime: utilService.randomTimeString(),
                    by: {
                        _id: "u10",
                        fullname: "TopNews",
                        imgUrl: "newsp.jpg"
                    },
                    loc: { // Optional
                        lat: 11.11,
                        lng: 22.22,
                        name: "Tel Aviv"
                    },


                    comments: [
                        {
                            id: "c28",
                            by: {
                                _id: "u7",
                                fullname: "yael",
                                imgUrl: "b2.jpg"
                            },
                            txt: "נמחוקקקק את האפלקצייההההה עכשווווווווווו",
                            likedBy: [ // Optional
                                {
                                    "_id": "u3",
                                    "fullname": "Bob",
                                    "imgUrl": "http://some-img"
                                }
                            ]
                        },
                        {
                            id: "c29",
                            by: {
                                _id: "u6",
                                fullname: "Dob",
                                imgUrl: "bob.jpg"
                            },
                            txt: "לאאאא מאמיןןן כמה כסףףף בזבזזנווו שם",
                        },
                        {
                            id: "c30",
                            by: {
                                _id: "u4",
                                fullname: "Tomer12",
                                imgUrl: "tomer.jpg"
                            },
                            txt:"די הגיעעעע זמןןן שנקנההה רק כחול לבןןןןק ",
                        },
                        {
                            id: "c31",
                            by: {
                                _id: "u5",
                                fullname: "Yovel",
                                imgUrl: "yoval.jpg"
                            },
                            txt: "בסדר מי צריך אותם יותר גם ככה איכות על הפניםם ",
                        }
                    ],
                    likedBy: [
                        {
                            _id: "u3",
                            fullname: "Bob",
                            imgUrl: "http://some-img"
                        },
                        {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "http://some-img"
                        }
                    ],
                    tags: ["fun", "romantic"]
                },










             {
                _id: "10",
                txt: "כול החנות במבצע-20 אחוז הנחה",
                imgUrl: "shop-dress.jpg",
                uploadTime: utilService.randomTimeString(),
                by: {
                    _id: "u11",
                    fullname: "shopDressCode",
                    imgUrl: "shopdresslogo.jpg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },


                comments: [
                    {
                        id: "c32",
                        by: {
                            _id: "u7",
                            fullname: "yael",
                            imgUrl: "b2.jpg"
                        },
                        txt: "יואוו כמה היא עולהה??",
                        likedBy: [ // Optional
                            {
                                "_id": "u3",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c33",
                        by: {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "bob.jpg"
                        },
                        txt: "יש לכם גיפט קארד?",
                    },
                    {
                        id: "c34",
                        by: {
                            _id: "u4",
                            fullname: "Tomer12",
                            imgUrl: "tomer.jpg"
                        },
                        txt:"די הגיעעעע זמןןן שנקנההה רק כחול לבןןןןק ",
                    },
                    {
                        id: "c35",
                        by: {
                            _id: "u5",
                            fullname: "Yovel",
                            imgUrl: "yoval.jpg"
                        },
                        txt: "איפה אתם נמצאים?",
                    }
                ],
                likedBy: [
                    {
                        _id: "u3",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u6",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                tags: ["fun", "romantic"]
            },
            {
                _id: "11",
                txt: "מי רוצה את המושלמת הזאת?נוחה וקלילה",
                imgUrl: "shop3.jpg",
                uploadTime: utilService.randomTimeString(),
                by: {
                    _id: "u11",
                    fullname: "shopDressCode",
                    imgUrl: "shopdresslogo.jpg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },


                comments: [
                    {
                        id: "c36",
                        by: {
                            _id: "u7",
                            fullname: "yael",
                            imgUrl: "b2.jpg"
                        },
                        txt: "יואוו כמה היא עולהה??",
                        likedBy: [ // Optional
                            {
                                "_id": "u6",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c37",
                        by: {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "bob.jpg"
                        },
                        txt: "יש לכם גיפט קארד?",
                    },
                    {
                        id: "c38",
                        by: {
                            _id: "u4",
                            fullname: "Tomer12",
                            imgUrl: "tomer.jpg"
                        },
                        txt:"די הגיעעעע זמןןן שנקנההה רק כחול לבןןןןק ",
                    },
                    {
                        id: "c39",
                        by: {
                            _id: "u5",
                            fullname: "Yovel",
                            imgUrl: "yoval.jpg"
                        },
                        txt: "איפה אתם נמצאים?",
                    }
                ],
                likedBy: [
                    {
                        _id: "u3",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u6",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                tags: ["fun", "romantic"]
            },
            // {
            //     _id: utilService.makeId(),
            //     txt: "איןן כמו ארוחת בוקר ישראלית וטובה",
            //     imgUrl: "food1.jpg",
            //     uploadTime: utilService.randomTimeString(),
            //     by: {
            //         _id: utilService.makeId(),
            //         fullname: "mor_cohen",
            //         imgUrl: "mor.jpg"
            //     },
            //     loc: { // Optional
            //         lat: 11.11,
            //         lng: 22.22,
            //         name: "Tel Aviv"
            //     },


            //     comments: [
            //         {
            //             id: "c1001",
            //             by: {
            //                 _id: "u105",
            //                 fullname: "sharon_bash",
            //                 imgUrl: "s2.jpg"
            //             },
            //             txt: "וואו",
            //             likedBy: [ // Optional
            //                 {
            //                     "_id": "u105",
            //                     "fullname": "Bob",
            //                     "imgUrl": "http://some-img"
            //                 }
            //             ]
            //         },
            //         {
            //             id: "c1002",
            //             by: {
            //                 _id: "u106",
            //                 fullname: "Dob",
            //                 imgUrl: "bob.jpg"
            //             },
            //             txt: "מהמםםםםםםםםם",
            //         },
            //         {
            //             id: "c1003",
            //             by: {
            //                 _id: "u107",
            //                 fullname: "Tomer12",
            //                 imgUrl: "tomer.jpg"
            //             },
            //             txt: "מדהיםםםםםםם",
            //         },
            //         {
            //             id: "c1004",
            //             by: {
            //                 _id: "u108",
            //                 fullname: "Yovel",
            //                 imgUrl: "yoval.jpg"
            //             },
            //             txt: "מדהיםם",
            //         }
            //     ],
            //     likedBy: [
            //         {
            //             _id: "u105",
            //             fullname: "Bob",
            //             imgUrl: "http://some-img"
            //         },
            //         {
            //             _id: "u106",
            //             fullname: "Dob",
            //             imgUrl: "http://some-img"
            //         }
            //     ],
            //     tags: ["fun", "romantic"]    
            // }
            {
                _id: "12",
                txt: "אימון חינם בשעה 18:00 פתוח לקהל הרחב",
                imgUrl: "sportMvca.jpg",
                uploadTime: utilService.randomTimeString(),
                by: {
                    _id: "u12",
                    fullname: "Sport Center",
                    imgUrl: "SpLogo.jpeg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },


                comments: [
                    {
                        id: "c40",
                        by: {
                            _id: "u7",
                            fullname: "yael",
                            imgUrl: "b2.jpg"
                        },
                        txt: "תודהה לכם ",
                        likedBy: [ // Optional
                            {
                                "_id": "u6",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c41",
                        by: {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "bob.jpg"
                        },
                        txt: "המאמנים הכי מדהימים שיש",
                    },
                    {
                        id: "c42",
                        by: {
                            _id: "u4",
                            fullname: "Tomer12",
                            imgUrl: "tomer.jpg"
                        },
                        txt:"יואוו איזה שווה חבל שאני במילואים",
                    },
                    {
                        id: "c43",
                        by: {
                            _id: "u5",
                            fullname: "Yovel",
                            imgUrl: "yoval.jpg"
                        },
                        txt: "איפה אתם נמצאים?",
                    }
                ],
                likedBy: [
                    {
                        _id: "u3",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u6",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                tags: ["fun", "romantic"]
            },
            {
                _id: "13",
                txt: "טיפים לבטן שטוחה-קדימה לעבודה",
                imgUrl: "baten.gif",
                uploadTime: utilService.randomTimeString(),
                by: {
                    _id: "u12",
                    fullname: "Sport Center",
                    imgUrl: "SpLogo.jpeg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },


                comments: [
                    {
                        id: "c44",
                        by: {
                            _id: "u7",
                            fullname: "yael",
                            imgUrl: "b2.jpg"
                        },
                        txt: "כול דבר שאני מנסה לא עובד לי",
                        likedBy: [ // Optional
                            {
                                "_id": "u6",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c45",
                        by: {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "bob.jpg"
                        },
                        txt: "הטיפ שלי הוא תפסיקו כבר לאכולל",
                    },
                    {
                        id: "c46",
                        by: {
                            _id: "u4",
                            fullname: "Tomer12",
                            imgUrl: "tomer.jpg"
                        },
                        txt:"תקשיבו להם הם מקצוענים",
                    },
                    {
                        id: "c47",
                        by: {
                            _id: "u5",
                            fullname: "Yovel",
                            imgUrl: "yoval.jpg"
                        },
                        txt: "איפה אתם נמצאים?",
                    }
                ],
                likedBy: [
                    {
                        _id: "u3",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u6",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                tags: ["fun", "romantic"]
            },
            {
                _id: "14",
                txt: "שיעורי פילטאיס כול יום ב16:00 עם נטלי",
                imgUrl: "pilatus.jpg",
                uploadTime: utilService.randomTimeString(),
                by: {
                    _id: "u12",
                    fullname: "Sport Center",
                    imgUrl: "SpLogo.jpeg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },


                comments: [
                    {
                        id: "c48",
                        by: {
                            _id: "u7",
                            fullname: "yael",
                            imgUrl: "b2.jpg"
                        },
                        txt:"היא מעולהה",
                        likedBy: [ // Optional
                            {
                                "_id": "u6",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c49",
                        by: {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "bob.jpg"
                        },
                        txt: "wow i loveee youu",
                    },
                    {
                        id: "c50",
                        by: {
                            _id: "u4",
                            fullname: "Tomer12",
                            imgUrl: "tomer.jpg"
                        },
                        txt:"יואוו אני לא יכול בשעה הזו אוףף תחליפו ",
                    },
                    {
                        id: "c51",
                        by: {
                            _id: "u5",
                            fullname: "Yovel",
                            imgUrl: "yoval.jpg"
                        },
                        txt: "מתי מאיה תחזור?",
                    }
                ],
                likedBy: [
                    {
                        _id: "u3",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u6",
                        fullname: "Dob",
                        imgUrl: "http://some-img"
                    }
                ],
                tags: ["fun", "romantic"]
            },
            {
                _id: "15",
                txt: "הכירו את טל מאמן אצלנו כבר 7 שנים",
                imgUrl: "tal.jpg",
                uploadTime: utilService.randomTimeString(),
                by: {
                    _id: "u12",
                    fullname: "Sport Center",
                    imgUrl: "SpLogo.jpeg"
                },
                loc: { // Optional
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                },


                comments: [
                    {
                        id: "c52",
                        by: {
                            _id: "u7",
                            fullname: "yael",
                            imgUrl: "b2.jpg"
                        },
                        txt:"נראה קשוחח",
                        likedBy: [ // Optional
                            {
                                "_id": "u6",
                                "fullname": "Bob",
                                "imgUrl": "http://some-img"
                            }
                        ]
                    },
                    {
                        id: "c49",
                        by: {
                            _id: "u6",
                            fullname: "Dob",
                            imgUrl: "bob.jpg"
                        },
                        txt: "wow i loveee youu",
                    },
                    {
                        id: "c50",
                        by: {
                            _id: "u4",
                            fullname: "Tomer12",
                            imgUrl: "tomer.jpg"
                        },
                        txt:"לא אוהב אותו בכללל הוא מפחיד  ",
                    },
                    {
                        id: "c51",
                        by: {
                            _id: "u5",
                            fullname: "Yovel",
                            imgUrl: "yoval.jpg"
                        },
                        txt: "תותחחחח אחייי",
                    }
                ],
                likedBy: [
                    {
                        _id: "u3",
                        fullname: "Bob",
                        imgUrl: "http://some-img"
                    },
                    {
                        _id: "u6",
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
    const updatedPost = await asyncStorageService.put(STORAGE_KEY, pst);
    return updatedPost
}

function getDefaultFilter() {
    return { id: '' }
}



