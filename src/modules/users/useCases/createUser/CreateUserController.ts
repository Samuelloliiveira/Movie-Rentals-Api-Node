import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

//Recebe as informações da rota e passa para o CreateUserUseCase
export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email } = req.body

    const createUserUseCase = new CreateUserUseCase()

    const result = await createUserUseCase.execute({ name, email })

    /** Se der certo ele retorna o usuário que vem de CreateUserUseCase */
    return res.status(201).json(result)
  }
}