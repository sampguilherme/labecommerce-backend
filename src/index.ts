import  express, { Request, Response}  from "express"
import cors from "cors"
import { users, products, purchases, createUser, getAllUsers } from "./database"
import { TProduct, TPurchase, TUser, Category } from "./types"

createUser("05", "ga@mil.com", "jweq")
console.log(getAllUsers())

const app = express();
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send("Pong!")
})

app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
    
})

app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    if(q.length < 1){
        res.status(400)
        throw new Error("'name' deve possuir pelo menos um caractere")
    }

    if(result.length < 1){
        res.status(404)
        throw new Error("Produto não encontrado")
    }

    res.status(200).send(result)
    } catch (error: any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})

app.post('/users', (req: Request, res: Response) => {
    const {id, email, password} = req.body as TUser

    const newUser =  {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send(users)
    console.log('Cadastro realizado com sucesso')
})

app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, category} = req.body as TProduct

    const newProduct = {
        id, 
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send(products)
    console.log('Produto cadastrado com sucesso!')
})

app.post ('/purchases', (req: Request, res: Response) => {
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send(purchases)
    console.log("Purchase realizado")
})

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = products.find((product) => {
        return product.id === id
    })

    res.status(200).send(result)
})
 
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id
    const result = purchases.find((purchase) => {
        return purchase.userId === id
    })

    res.status(200).send(result)
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id as string
    const userIndex = users.findIndex((user) => {
        return user.id === id
    })

    if(userIndex >= 0){
        users.splice(userIndex,1)
        res.status(200).send(users)
        console.log("Usuário deletado com sucesso")
    } else {
        res.status(404).send("Usuário não encontrado")
    }
    
})

app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string
    const productIndex = products.findIndex((product) => {
        return product.id === id
    })

    if(productIndex >= 0){
        products.splice(productIndex,1)
        res.status(200).send(products)
        console.log("Produto deletado com sucesso")
    } else {
        res.status(404).send("Produto não encontrado")
    }
})

app.put('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id 

    const newEmail = req.body.email as string || undefined
    const newPassword = req.body.password as string || undefined

    const user = users.find((user) => {
        return user.id === id
    })

    if(user){
        user.email = newEmail || user.id
        user.password = newPassword || user.password
        res.status(200).send("Usuário atualizado com sucesso")
    } else {
        res.status(200).send("Usuário não encontrado")
    }
})
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id 

    const newName = req.body.name as string || undefined
    const newPrice = req.body.price as number || undefined
    const newCategory = req.body.category as Category || undefined

    const product = products.find((product) => {
        return product.id === id
    })

    if(product){
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.category = newCategory || product.category
        res.status(200).send("Produto atualizado com sucesso")
    } else {
        res.status(200).send("Produto não encontrado")
    }
})