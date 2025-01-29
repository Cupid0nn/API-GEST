import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/userentity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
    
})
export class UserModule {}