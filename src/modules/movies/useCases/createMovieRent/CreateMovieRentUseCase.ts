import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../lib/prisma";
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO): Promise<void> {
    //Verificar se filme existe
    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })

    if (!movieExists) {
      throw new AppError("Movie does not exists!")
    }

    //Verificar se já está alugado
    const movieAlreadyRented = await prisma.movieRent.findFirst({
      where: {
        movieId
      }
    })

    if (movieAlreadyRented) {
      throw new AppError("Movie already rented!")
    }

    //Verificar se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!userExists) {
      throw new AppError("User does not exists!")
    }

    //Criar locação
    await prisma.movieRent.create({
      data: {
        movieId,
        userId,
      }
    })
  }
}
