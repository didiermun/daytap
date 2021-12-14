import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Post('invitation/:code')
  async create(@Param('code') code: string,@Body() createUserDto: CreateUserDto) {
    return this.userService.create(code,createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
