export interface ProductInterface {
  _id: string
  title: string
  src: string
  subImages: string[]
  price: number
  categories: string
  rates:number
  comments: CommentInterface[]
  description: string
  keywords: string[]
}
export interface CommentInterface {
  client: string
  content: {txt:string,time:string}
  response:{txt:string,time:string}
  rates:number
}

export interface Category {
  _id: string
  name: string
  src: string
  keywords: [string]
}

export interface Story {
  _id: string
  title: string
  src: string
  subImages: string[]
  price: number
  categories: string[]
  type: string
  size: String
  color: String[]
  quantity: number
  description: string
  keywords: string[]
}
export interface Tools {
  _id: string
  name: string
  price: number
  src: string
  tag: string
  minMax: [number, number]
}
export interface Tags {
  _id: string
  name: string
  src: string
}
export interface Order {
  _id: string
  ticketID: string
  status: string
  address: string
  client: string
  products: [ProductInterface]
  totalPrice: number
  attachment: string
}
export interface Information {
  address: string
  houseNumber: number
  houseUnit: number
  zipCode: number
  lat: number
  long: number
  _id?: string
}
export interface ClientProfile {
  _id: string
  client: string
  email: string
  chat: string
  name: string
  nationalCode: string
  information: Information[]
  favorites: string[]
  seens: string[]
  time: string
}
export interface ClientInterface {
  _id: string
  phone: number
  password: string
  time: string
  keyV: string
}
export interface Notification {
  _id: string
  title: string
  content: string
  code: string
  time: string
}
export interface Chat {
  content: string
  sender: '*u&$e#' | '&a(D^m$n@'
  time: string
}

export interface MessageInterface {
  id: string
  client: string
  chats: Chat[]
}
