import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../entity/userentity";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async fetchAllUsers(): Promise<User[]> {
        return this.userService.fetchAllUsers();
    }

    @Get(':id')
    async fetchUserById(@Param('id') id: string): Promise<User> {
        return this.userService.fetchUserById(id);
    }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return this.userService.createUser(user);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
