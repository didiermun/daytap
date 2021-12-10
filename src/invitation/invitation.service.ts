import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class InvitationService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateInvitationDto) {
    const number = Math.floor(Math.random() * 90000);
    const code: number = number + 10000;
    return await this.prisma.invitation.create({
      data: { code: code, email: data.email },
    });
  }

  async findAll() {
    return await this.prisma.invitation.findMany();
  }

  async findOne(id: string) {
    const code = await this.prisma.user.findFirst({ where: { id: id } });
    if (!code) {
      throw new HttpException(
        'User that you are requesting is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return code;
  }

  async update(email: string) {
    const number = Math.floor(Math.random() * 90000);
    const code: number = number + 10000;
    return await this.prisma.invitation.update({
      where: { email: email },
      data: { code: code },
    });
  }

  async remove(id: string) {
    return await this.prisma.invitation.delete({
      where: {
        id,
      },
    });
  }
}
