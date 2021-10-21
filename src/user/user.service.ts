import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService}  from '../prisma.service'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(code: string,data: CreateUserDto) {
    const codeFound = await this.prisma.invitation.findFirst({
      where: { code: parseInt(code), email: data.email},
    })

    if(!codeFound){
      throw new HttpException('Code provided not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.user.create({data: {
      email: data.email,
      lname: data.lname,
      fname: data.fname,
      password: data.password,
      profile: data.profile
    }})
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({ where: {id: id}});
    if(!user){
      throw new HttpException('User that you are requesting is not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({ where: {email: loginDto.email, password: loginDto.password}})
    if(!user){
      throw new HttpException('Wrong credentials', HttpStatus.NOT_FOUND)
    }

    return 'Loged successfully';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({ 
      where: {id: id}, 
      data: {
        email: updateUserDto.email
      }
    })
  }

  async remove(id: string) {
    return await this.prisma.user.delete({where: {id: id}})
  }
}
