export type MethodsName = "post" | "get" | "put" | "patch" | "delete";


export type CartItem = {
  bookId: string,
  quantity: number
}

export type Cart = {
  id: string,
  userId: string,
  items: CartItem[]
}

