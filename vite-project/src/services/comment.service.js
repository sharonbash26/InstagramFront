import { httpService } from './http.service'
import { asyncStorageService } from './async-storage.service'
import { userService } from './user.service'


export const commentService = {
  add,
  query,
  remove
}

function query() {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`comment${queryStr}`)
  return asyncStorageService.query('comment')
}

async function remove(commentId) {
  // await httpService.delete(`comment/${commentId}`)
  await asyncStorageService.remove('comment', commentId)
}

async function add({txt, aboutUserId}) {
  // const addedComment = await httpService.post(`comment`, {txt, aboutUserId})
  
  // const aboutUser = await userService.getById(aboutUserId)

  // const commentToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutUser: {
  //     _id: aboutUser._id,
  //     fullname: aboutUser.fullname,
  //     imgUrl: aboutUser.imgUrl
  //   }
  // }

  // commentToAdd.byUser.score += 10
  // await userService.update(commentToAdd.byUser)
  // const addedComment = await asyncStorageService.post('comment', commentToAdd)
  return addedComment
}