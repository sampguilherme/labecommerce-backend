export enum Category {
    CLOTHES_AND_SHOES = "Roupas e calçados",
    SKATE = "Skate",
    FOOD = "Comida"
}

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: Category
}

export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}