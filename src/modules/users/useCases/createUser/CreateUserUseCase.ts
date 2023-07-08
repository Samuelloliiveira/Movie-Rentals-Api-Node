import { User } from '@prisma/client'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { prisma } from '../../../../lib/prisma'
import { AppError } from '../../../../errors/AppError'

export class CreateUserUseCase {
  async execute({ name, email }: CreateUserDTO): Promise<User> {
    //Verificando se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    //Se existe ele retorna um erro
    if (userAlreadyExists) {
      throw new AppError("User already exists!")
    }

    //Se não existe ele cadastra um novo usuário
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })

    return user
  }
}