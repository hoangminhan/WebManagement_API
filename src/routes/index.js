const loginRouter = require('./login')
const authRouter = require('./auth')
const guestRouter = require('./guest')
const accountRouter = require('./account')
const productRouter = require('./product')
const categoryRouter = require('./category')

const route = (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/guests', guestRouter)
  app.use('/api/categories', categoryRouter)
  app.use('/api/accounts', accountRouter)
  app.use('/api/products', productRouter)
  app.use('/api/login', loginRouter)
}

module.exports = route