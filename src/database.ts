import { TUser, TProduct, TPurchase, Category } from "./types"

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
        name: "Camiseta-branca",
        price: 49.90,
        description: "Camiseta branca nike",
        image_url: "https://picsum.photos/200"
    },
    {
        id: "04",
        name: "Skate",
        price: 259.90,
        description: "Skate CBSKATE donout",
        image_url: "https://picsum.photos/200"
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

export function createUser(id: string, email: string, password: string): void {
    const newUser: TUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso!")
}

export function getAllUsers(): TUser[] {
    return users
}

export function createProduct (id: string, name: string, price: number, description: string, image_url: string): void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        description,
        image_url
    }

    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!")
}