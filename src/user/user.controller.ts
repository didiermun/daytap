import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserGuard } from 'src/guards/user.guard';

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @UseGuards(UserGuard)
  async findAll(@Req() request: any) {
    console.log(request.user);
    return this.userService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  

  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Post('join/invitation/:code')
  async create(@Param('code') code: string,@Body() createUserDto: CreateUserDto) {
    return this.userService.create(code,createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

}
