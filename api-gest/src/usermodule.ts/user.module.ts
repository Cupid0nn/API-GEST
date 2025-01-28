import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    controllers: [],
    providers: [UserRepository, UserService],
    exports: [],
})
export class UserModule {}