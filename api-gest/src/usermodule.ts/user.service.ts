import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entity/userentity";
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(user: User): Promise<User> {
        // Utilizar destructuring para excluir password y roles
        const { password,role , ...userWithoutSensitiveInfo } = user;
        return this.userRepository.save(userWithoutSensitiveInfo);
      }
      

  async fetchAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async fetchUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, user: User): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return this.userRepository.save({ ...existingUser, ...user });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }


}