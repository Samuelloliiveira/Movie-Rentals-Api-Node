import 'express-async-errors'
import express, { NextFunction, Request, Response, } from 'express'
import { routes } from './routes'
import { AppError } from './errors/AppError'

const app = express()

app.use(express.json())

app.use(routes)

//Middleware para a tratamento de erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  //Se for um erro da aplicação, onde nós criamos o tratamento
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  //Se não for um erro da aplicação
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(3333, () => {
  console.log('HTTP server running on http://localhost:3333 🔥')
})