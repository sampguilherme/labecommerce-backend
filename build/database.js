"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
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
];
exports.purchases = [
    {
        userId: "01",
        productId: "03",
        quantity: 5,
        totalPrice: exports.products[0].price * 5
    }
];
//# sourceMappingURL=database.js.map