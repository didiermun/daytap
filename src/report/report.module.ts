import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from 'src/utils/jwt';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports:[
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService, PrismaService],
})
export class ReportModule {}
