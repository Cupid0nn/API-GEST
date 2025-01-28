import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/userentity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario.
   * @param user - Los datos del usuario a crear.
   * @returns El usuario creado.
   * @throws BadRequestException - Si ocurre un error al crear el usuario o si el correo electrónico ya está registrado.
   */
  async createUser(user: User): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (existingUser) {
        // Lanzar error si el correo electrónico ya está registrado
        throw new Error('El correo electrónico ya está registrado');
      }
    } catch (error) {
      // Lanzar excepción BadRequestException si ocurre un error
      throw new BadRequestException('Error al crear el usuario');
    }

    return this.userRepository.save(user);
  }

  /**
   * Obtiene todos los usuarios.
   * @returns Una lista de todos los usuarios.
   * @throws BadRequestException - Si ocurre un error al obtener los usuarios.
   */
  async fetchAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      // Lanzar excepción BadRequestException si ocurre un error
      throw new BadRequestException('Error al obtener los usuarios');
    }
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id - El ID del usuario a obtener.
   * @returns El usuario correspondiente al ID proporcionado.
   * @throws BadRequestException - Si ocurre un error al obtener el usuario.
   */
  async fetchUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
    } catch (error) {
      // Lanzar excepción BadRequestException si ocurre un error
      throw new BadRequestException('Error al obtener el usuario');
    }
  }

  /**
   * Actualiza los datos de un usuario existente.
   * @param id - El ID del usuario a actualizar.
   * @param user - Los nuevos datos del usuario.
   * @returns El usuario actualizado.
   * @throws BadRequestException - Si ocurre un error al actualizar el usuario o si el usuario no existe.
   */
  async updateUser(id: string, user: User): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id } });
      if (!existingUser) {
        // Lanzar error si el usuario no existe
        throw new Error('El usuario no existe');
      }
      return this.userRepository.save({ ...existingUser, ...user });
    } catch (error) {
      // Lanzar excepción BadRequestException si ocurre un error
      throw new BadRequestException('Error al actualizar el usuario');
    }
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - El ID del usuario a eliminar.
   * @returns void
   * @throws BadRequestException - Si ocurre un error al eliminar el usuario.
   */
  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.delete({ id });
    } catch (error) {
      // Lanzar excepción BadRequestException si ocurre un error
      throw new BadRequestException('Error al eliminar el usuario');
    }
  }
}
