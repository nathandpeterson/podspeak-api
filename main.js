const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
process.env.NODE_ENV ? null : app.use(morgan('dev'))
app.disable('x-powered-by')

const expressGraphQL = require('express-graphql')

const schema = require('./schema/schema')
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

const router = require('./router.js')
app.use('/api', router)

app.use('/', (req, res, next) => {
    res.json({message: 'Hello, you hit the route root.'})
  })
  
  app.use((req, res, next) => {
      const status = 404
      const message = `Could not find route matching: ${req.method} ${req.path}`
      next({ status, message })
    })
    
    app.use((err, req, res, next) => {
      if (!process.env.NODE_ENV) console.log(err)
      const status = err.status || 500
      const message = err.message || 'Something went wrong!'
      res.status(status).json({ error: { message } })
    })

const listener = () => console.log(`Listening on Port ${port} :)`)

app.listen(port, listener)