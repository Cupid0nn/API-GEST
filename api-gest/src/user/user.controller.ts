import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/userentity';
import { CreateUserDto } from '../entity/userdto';
import { UpdateUserDto } from '../entity/updateuserdto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async fetchAllUsers(): Promise<User[]> {
    try {
      return await this.userService.fetchAllUsers();
    } catch (error) {
      throw new HttpException('Error al obtener usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async fetchUserById(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.fetchUserById(id);
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Get('email/:email')
  async fetchUserByEmail(@Param('email') email: string): Promise<User> {
    try {
      return await this.userService.fetchUserByEmail(email);
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException('Error al crear usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException('Error al actualizar usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException('Error al eliminar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async loginUser(@Body('email') email: string, @Body('password') password: string): Promise<User> {
    try {
      return await this.userService.loginUser(email, password);
    } catch (error) {
      throw new HttpException('Error al iniciar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.registerUser(createUserDto);
    } catch (error) {
      throw new HttpException('Error al registrar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
