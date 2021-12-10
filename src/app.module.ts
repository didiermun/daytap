import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitationModule } from './invitation/invitation.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './utils/jwt';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    InvitationModule, 
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
