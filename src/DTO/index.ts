export interface Product {
  _id: string
  title: string
  src: string
  price: number
  calories:number
  categories: string
  description: string
  keywords: string[]
}

export interface  Category{
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
  minMax:[number,number]
}
export interface Tags {
  _id: string
  name: string
  src: string
}
