import { TUser, TProduct, TPurchase } from "./types"

export const users: TUser[] = [
    {
        id: "01",
        email: "naruto@gmail.com",
        password: "seila023"
    },
    {
        id: "02",
        email: "naosei2@gmail.com",
        password: "naosei023"
    }
]

export const products: TProduct[] = [
    {
        id: "03",
        name: "Sucrilhos",
        price: 17.90,
        category: "Cereal"
    },
    {
        id: "04",
        name: "Banana",
        price: 5.79,
        category: "fruta"
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "01",
        productId: "03",
        quantity: 5,
        totalPrice: products[0].price * 5
    }
]