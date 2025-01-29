import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './userdto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
