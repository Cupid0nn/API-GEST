import { 
  Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseGuards 
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/userentity';
import { CreateUserDto } from '../entity/userdto';
import { UpdateUserDto } from '../entity/updateuserdto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuarios') // Agrupa los endpoints en Swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos correctamente', type: [User] })
  @ApiResponse({ status: 500, description: 'Error al obtener usuarios' })
  async fetchAllUsers(): Promise<User[]> {
    try {
      return await this.userService.fetchAllUsers();
    } catch (error) {
      throw new HttpException('Error al obtener usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido correctamente', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async fetchUserById(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.fetchUserById(id);
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('email/:email')
  @ApiOperation({ summary: 'Obtener un usuario por email' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido correctamente', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async fetchUserByEmail(@Param('email') email: string): Promise<User> {
    try {
      return await this.userService.fetchUserByEmail(email);
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente', type: User })
  @ApiResponse({ status: 400, description: 'Error al crear usuario' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException('Error al crear usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente', type: User })
  @ApiResponse({ status: 400, description: 'Error al actualizar usuario' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException('Error al actualizar usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 500, description: 'Error al eliminar usuario' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException('Error al eliminar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado correctamente', type: User })
  @ApiResponse({ status: 500, description: 'Error al iniciar sesión' })
  async loginUser(@Body('email') email: string, @Body('password') password: string): Promise<User> {
    try {
      return await this.userService.loginUser(email, password);
    } catch (error) {
      throw new HttpException('Error al iniciar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente', type: User })
  @ApiResponse({ status: 500, description: 'Error al registrar usuario' })
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.registerUser(createUserDto);
    } catch (error) {
      throw new HttpException('Error al registrar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
