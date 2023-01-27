import  express, { Request, Response}  from "express"
import cors from "cors"
import { users, products, purchases, createUser, getAllUsers } from "./database"
import { TProduct, TUser, Category } from "./types"
import { db } from "./database/knex"

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

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.select('*').from('users')
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.select('*').from('products')
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        const result = await db('products').where({name: q})

        if(q.length < 1){
            res.status(400)
            throw new Error("'name' deve possuir pelo menos um caractere")
        }

        if(result.length < 1){
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post('/users', async(req: Request, res: Response) => {
    try {
        const {id, email, password} = req.body as TUser

        const newUser =  {
            id,
            email,
            password
        }

        await db('users').insert(newUser)
        res.status(201).send('Cadastro realizado com sucesso')
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post('/products', async (req: Request, res: Response) => {
    try {
        const {id, name, price, category} = req.body as TProduct

        const newProduct = {
            id,
            name,
            price,
            category
        }

        await db('products').insert(newProduct)
        res.status(201).send('Produto cadastrado com sucesso!')
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

app.post ('/purchases', async (req: Request, res: Response) => {
    try {
        const {id, total_price, paid, delivered_at, buyer_id} = req.body

        const newPurchase = {
            id,
            total_price,
            paid,
            delivered_at,
            buyer_id
        }

        await db('purchases').insert(newPurchase)
        res.status(201).send("Purchase realizado")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

app.get('/products/:id', async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await db('products').where({id: id})

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await db('purchases').where({buyer_id: id})
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

app.put('/users/:id', (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})
app.put('/products/:id', async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string || undefined
        const newPrice = req.body.price as number || undefined
        const newCategory = req.body.category as Category || undefined

        const [product] = await db('products').where({id: id})

        if(product){
            const updatedProduct = {
                name: newName || product.name,
                price: isNaN(newPrice) ? product.price : newPrice,
                category: newCategory || product.category
            }
            await db('products').update(updatedProduct).where({id: id})
            res.status(200).send({message: "Produto atualizado com sucesso"})
        } else {
            res.status(404).send("Produto não encontrado")
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if(!id){
            res.status(400)
            throw new Error("É necessário informar um id")
        }

        const [purchase] = await db('purchases').where({id: id})
        
        if(purchase){
            await db('purchases').del().where({id: id})
            res.status(200).send("Purchase deletado com sucesso!")
        } else {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})