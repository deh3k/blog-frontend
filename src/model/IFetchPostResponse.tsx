import { IPost } from "./IPost"

export interface IFetchPostResponse {
  posts: IPost[]
  totalCount: number
}
