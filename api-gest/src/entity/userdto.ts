import { IsEmail, IsEnum, IsNotEmpty, Length, IsBoolean } from 'class-validator';
import { UserRole } from '../entity/userentity'; // Reemplaza con la ruta correcta

export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  @IsBoolean()
  isActive: boolean = true;
}
