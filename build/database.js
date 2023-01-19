"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
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
];
exports.products = [
    {
        id: "03",
        name: "Camiseta branca",
        price: 49.90,
        category: types_1.Category.CLOTHES_AND_SHOES
    },
    {
        id: "04",
        name: "Skate",
        price: 259.90,
        category: types_1.Category.SKATE
    }
];
exports.purchases = [
    {
        userId: "01",
        productId: "03",
        quantity: 5,
        totalPrice: exports.products[0].price * 5
    }
];
function createUser(id, email, password) {
    const newUser = {
        id,
        email,
        password
    };
    exports.users = [...exports.users, newUser];
    console.log("Cadastro realizado com sucesso!");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=database.js.map