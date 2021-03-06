import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { hash, validatePassword } from 'src/utils/hashPassword';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt.strategy';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService,) {}

  async create(code: string,data: CreateUserDto) {
    const codeFound = await this.prisma.invitation.findFirst({
      where: { code: parseInt(code), email: data.email, },
    });

    if (!codeFound) {
      throw new HttpException('Code provided not found', HttpStatus.NOT_FOUND);
    }

    if (codeFound.isUsed){
      throw new HttpException('Email and Code has already been used to create account.', HttpStatus.CONFLICT)
    }

    const hashedPassword = await hash(data.password)
    
    const createUser =  await this.prisma.user.create({ data: {
        email: data.email,
        lname: data.lname,
        fname: data.fname,
        password: hashedPassword,
        profile: data.profile,
      },
    });
    await this.prisma.invitation.update({
      where: { id: codeFound.id },
      data:{isUsed: true}
    })

    return createUser;
  }

  async validateUser(payload:JwtPayload){
    return await this.prisma.user.findFirst({ where: { id: payload.username}})
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      throw new HttpException(
        'User that you are requesting is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email},
    });
    if (!user) {
      throw new HttpException('Wrong credentials', HttpStatus.FORBIDDEN)
    }

    const doPasswordsMatch = await validatePassword(
      loginDto.password,
      user.password,
    )

    if (!doPasswordsMatch) {
      throw new HttpException('Invalid email or password', HttpStatus.FORBIDDEN)
    }

    const token = this.jwtService.sign(user)

    return {token, user};

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
