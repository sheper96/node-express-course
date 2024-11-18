const express = require('express')
const { products } = require("./data");

const app = express()

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res, next) => {
    res.json({ message: "It worked!" });
})

app.get("/api/v1/products", (req, res, next) => {
    res.json(products);
})

app.get("/api/v1/products/:productId", function (req, res) {
    const productId = parseInt(req.params.productId)
    const product = products.find(p => p.id === productId)


    if (!product) {
        res.status(404).json(
            { message: "That product was not found." }
        )
    }

    res.json(product)
})

app.get("/api/v1/query", (req, res, next) => {
    const { search, limit, price } = req.query;

    let filteredProducts = products

    if (search) {
        filteredProducts = filteredProducts.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit))
    }

    if (price) {
        filteredProducts = filteredProducts.filter(p => p.price < price)
    }

    res.json(filteredProducts);
})

app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});