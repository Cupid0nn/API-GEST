import { IsEmail, IsEnum, IsNotEmpty, Length, IsBoolean } from 'class-validator';
import { UserRole } from '../entity/userentity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Mateo Pérez', description: 'Nombre completo del usuario' })
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiProperty({ example: 'mateo@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securePassword123', description: 'Contraseña del usuario' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'USER', enum: UserRole, description: 'Rol del usuario' })
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;

  @ApiProperty({ example: '2025-03-13T00:00:00Z', description: 'Fecha de creación del usuario' })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ example: '2025-03-13T00:00:00Z', description: 'Fecha de última actualización del usuario' })
  @IsNotEmpty()
  updatedAt: Date;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo' })
  @IsBoolean()
  isActive: boolean = true;
}
