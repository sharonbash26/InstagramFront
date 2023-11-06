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
    console.log('filterby', filterBy)
    if (filterBy.by) {
        // psts=psts.filter(pst.by._id===filterBy.id)
        console.log('ENTERED')
        console.log(filterBy)
        psts = psts.filter(pst => pst.by._id === filterBy.by);

    }
    return psts
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
        by:userService.getLoggedinUser() ,
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
            _id: "s10100000000000000000000000000000000000000000",
            txt: "Best trip ever",
            imgUrl: "a1.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u101",
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
                    id: "c1001",
                    by: {
                        _id: "u105",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
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
                    id: "c1003",
                    by: {
                        _id: "u107",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c1004",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
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
            imgUrl: "yael.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u109",
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
                    id: "c10099",
                    by: {
                        _id: "u1055",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
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
                        imgUrl: "bob.jpg"
                    },
                    txt: "מהמםםםםםםםםם",
                },
                {
                    id: "c100323",
                    by: {
                        _id: "u1072",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםם",
                },
                {
                    id: "c10041",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
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
            txt: "wow i cant believe!!!!!!!",
            imgUrl: "e5.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: utilService.makeId(),
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
                    id: "c1001",
                    by: {
                        _id: "u105",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
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
                        imgUrl: "bob.jpg"
                    },
                    txt: "מהמםםםםםםםםם",
                },
                {
                    id: "c1003",
                    by: {
                        _id: "u107",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c1004",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
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
            _id: "s12222221",
            txt: "תראוו מה הכנתיי בעצמיי",
            imgUrl: "food11.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u101",
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
                    id: "c1001",
                    by: {
                        _id: "u105",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
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
                    id: "c1003",
                    by: {
                        _id: "u107",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c1004",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
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
            _id: "s101909999999999999999999999999999999999999",
            txt: "נעמה הבכורה שליי בת 5",
            imgUrl: "yulidat.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u101",
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
                    id: "c1001",
                    by: {
                        _id: "u105",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
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
                    id: "c1003",
                    by: {
                        _id: "u107",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c1004",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
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
            _id: "s101",
            txt: "תראוו מה הכנתי לאכול בעצמיי",
            imgUrl: "food11.jpg",
            uploadTime: utilService.randomTimeString(),
            by: {
                _id: "u101",
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
                    id: "c1001",
                    by: {
                        _id: "u105",
                        fullname: "sharon_bash",
                        imgUrl: "s2.jpg"
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
                    id: "c1003",
                    by: {
                        _id: "u107",
                        fullname: "Tomer12",
                        imgUrl: "tomer.jpg"
                    },
                    txt: "מדהיםםםםםםם",
                },
                {
                    id: "c1004",
                    by: {
                        _id: "u108",
                        fullname: "Yovel",
                        imgUrl: "yoval.jpg"
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



// {
//         _id: utilService.makeId(),
//         txt:"אטליז יוסי  מבצע רק היום",
//         imgUrl: "food7.jpg",
//         uploadTime: utilService.randomTimeString(),
//         by: {
//             _id: utilService.makeId(),
//             fullname: "Yossi Cohen",
//             imgUrl: "shef.jpg"
//         },
//         loc: { // Optional
//             lat: 11.11,
//             lng: 22.22,
//             name: "Tel Aviv"
//         },


//         comments: [
//             {
//                 id: utilService.makeId(),
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "sharon_bash",
//                     imgUrl: "s2.jpg"
//                 },
//                 txt: "וואו",
//                 likedBy: [ // Optional
//                     {
//                         "_id": "u105",
//                         "fullname": "Bob",
//                         "imgUrl": "http://some-img"
//                     }
//                 ]
//             },

//             {
//                 id: utilService.makeId(),
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: "Tomer12",
//                     imgUrl: "tomer.jpg"
//                 },
//                 txt: "מדהיםםםםםםם",
//             },
//             {
//                 id: utilService.makeId(),
//                 by: {
//                     _id: "u108",
//                     fullname: "Yovel",
//                     imgUrl: "yoval.jpg"
//                 },
//                 txt: "מדהיםם",
//             }
//         ],
//         likedBy: [
//             {
//                 _id: "u105",
//                 fullname: "Bob",
//                 imgUrl: "http://some-img"
//             },
//             {
//                 _id: "u106",
//                 fullname: "Dob",
//                 imgUrl: "http://some-img"
//             }
//         ],
//         tags: ["fun", "romantic"]
//     }, {
//         _id: "s1025",
//         txt: "!!!שימו לב:שיין נגדנו !! ומוכרת דגל פלסטין באתר",
//         imgUrl: "news5.jpeg",
//         uploadTime: utilService.randomTimeString(),
//         by: {
//             _id: "u1095",
//             fullname: "TopNews",
//             imgUrl: "newsp.jpg"
//         },
//         loc: { // Optional
//             lat: 11.11,
//             lng: 22.22,
//             name: "Tel Aviv"
//         },


//         comments: [
//             {
//                 id: "c1009922",
//                 by: {
//                     _id: "u1055",
//                     fullname: "yael",
//                     imgUrl: "b2.jpg"
//                 },
//                 txt: "נמחוקקקק את האפלקצייההההה עכשווווווווווו",
//                 likedBy: [ // Optional
//                     {
//                         "_id": "u105",
//                         "fullname": "Bob",
//                         "imgUrl": "http://some-img"
//                     }
//                 ]
//             },
//             {
//                 id: "c10076",
//                 by: {
//                     _id: "u106",
//                     fullname: "Dob",
//                     imgUrl: "bob.jpg"
//                 },
//                 txt: "לאאאא מאמיןןן כמה כסףףף בזבזזנווו שם",
//             },
//             {
//                 id: "c100323",
//                 by: {
//                     _id: "u1072",
//                     fullname: "Tomer12",
//                     imgUrl: "tomer.jpg"
//                 },
//                 txt:"די הגיעעעע זמןןן שנקנההה רק כחול לבןןןןק ",
//             },
//             {
//                 id: "c10041",
//                 by: {
//                     _id: "u108",
//                     fullname: "Yovel",
//                     imgUrl: "yoval.jpg"
//                 },
//                 txt: "בסדר מי צריך אותם יותר גם ככה איכות על הפניםם ",
//             }
//         ],
//         likedBy: [
//             {
//                 _id: "u105",
//                 fullname: "Bob",
//                 imgUrl: "http://some-img"
//             },
//             {
//                 _id: "u106",
//                 fullname: "Dob",
//                 imgUrl: "http://some-img"
//             }
//         ],
//         tags: ["fun", "romantic"]
//     },
    
//  {
//     _id: "s1025111",
//     txt: "כול החנות במבצע-20 אחוז הנחה",
//     imgUrl: "shop-dress.jpg",
//     uploadTime: utilService.randomTimeString(),
//     by: {
//         _id: "u109509",
//         fullname: "shopDressCode",
//         imgUrl: "shopdresslogo.jpg"
//     },
//     loc: { // Optional
//         lat: 11.11,
//         lng: 22.22,
//         name: "Tel Aviv"
//     },


//     comments: [
//         {
//             id: "c1009922",
//             by: {
//                 _id: "u1055",
//                 fullname: "yael",
//                 imgUrl: "b2.jpg"
//             },
//             txt: "יואוו כמה היא עולהה??",
//             likedBy: [ // Optional
//                 {
//                     "_id": "u105",
//                     "fullname": "Bob",
//                     "imgUrl": "http://some-img"
//                 }
//             ]
//         },
//         {
//             id: "c10076",
//             by: {
//                 _id: "u106",
//                 fullname: "Dob",
//                 imgUrl: "bob.jpg"
//             },
//             txt: "יש לכם גיפט קארד?",
//         },
//         {
//             id: "c100323",
//             by: {
//                 _id: "u1072",
//                 fullname: "Tomer12",
//                 imgUrl: "tomer.jpg"
//             },
//             txt:"די הגיעעעע זמןןן שנקנההה רק כחול לבןןןןק ",
//         },
//         {
//             id: "c10041",
//             by: {
//                 _id: "u108",
//                 fullname: "Yovel",
//                 imgUrl: "yoval.jpg"
//             },
//             txt: "איפה אתם נמצאים?",
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
// },
// {
//     _id: "s1025111",
//     txt: "מי רוצה את המושלמת הזאת?נוחה וקלילה",
//     imgUrl: "shop3.jpg",
//     uploadTime: utilService.randomTimeString(),
//     by: {
//         _id: "u109509",
//         fullname: "shopDressCode",
//         imgUrl: "shopdresslogo.jpg"
//     },
//     loc: { // Optional
//         lat: 11.11,
//         lng: 22.22,
//         name: "Tel Aviv"
//     },


//     comments: [
//         {
//             id: "c1009922",
//             by: {
//                 _id: "u1055",
//                 fullname: "yael",
//                 imgUrl: "b2.jpg"
//             },
//             txt: "יואוו כמה היא עולהה??",
//             likedBy: [ // Optional
//                 {
//                     "_id": "u105",
//                     "fullname": "Bob",
//                     "imgUrl": "http://some-img"
//                 }
//             ]
//         },
//         {
//             id: "c10076",
//             by: {
//                 _id: "u106",
//                 fullname: "Dob",
//                 imgUrl: "bob.jpg"
//             },
//             txt: "יש לכם גיפט קארד?",
//         },
//         {
//             id: "c100323",
//             by: {
//                 _id: "u1072",
//                 fullname: "Tomer12",
//                 imgUrl: "tomer.jpg"
//             },
//             txt:"די הגיעעעע זמןןן שנקנההה רק כחול לבןןןןק ",
//         },
//         {
//             id: "c10041",
//             by: {
//                 _id: "u108",
//                 fullname: "Yovel",
//                 imgUrl: "yoval.jpg"
//             },
//             txt: "איפה אתם נמצאים?",
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
// },{
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



