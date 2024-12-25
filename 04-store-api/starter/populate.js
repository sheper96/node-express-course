const connectDB = require('./db/connect')
const Product = require('./models/product')
const { dbURI } = require('./config')

const jsonProducts = require('./products.json')

const start = async () => {
  try {
    console.log(dbURI)
    await connectDB(dbURI)
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log('Success')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
