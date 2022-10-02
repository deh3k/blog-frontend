import { IUser } from './IUser'

export interface IComment {
  _id: string
  postId: string
  author: IUser
  text: string
  createdAt: string
}

export interface ICommentToUpd {
  id: string
  text: string
}

export interface IActionComment {
  id: string
  postId: string
  text: string
}