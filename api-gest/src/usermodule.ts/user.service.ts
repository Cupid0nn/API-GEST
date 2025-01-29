import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/userentity';
import { CreateUserDto } from '../entity/userdto';
import { UpdateUserDto } from '../entity/updateuserdto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async fetchUserById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneOrFail({ where: { id } });
      return await this.userRepository.save({ ...existingUser, ...updateUserDto });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
