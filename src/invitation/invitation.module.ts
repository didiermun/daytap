import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService, PrismaService],
})
export class InvitationModule {}
