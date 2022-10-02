import { IUser } from "./IUser"

export interface IPost {
  _id: string
  title: string
  img?: string
  tags: string[]
  text: string
  categories: string[]
  author: IUser
  createdAt: string
  viewsCount: number
  commentsCount: number
}

export interface IPostData {
  title: string
  img?: string
  tags: string[]
  text: string
  categories: string[]
}

export interface IUpdatePostData {
  postId: string
  title: string
  img?: string
  tags: string[]
  text: string
  categories: string[]
}