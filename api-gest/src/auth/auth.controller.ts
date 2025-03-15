import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Autenticación') // Agrupa los endpoints en Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con credenciales válidas' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso. Devuelve el token de acceso' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
