import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitationModule } from './invitation/invitation.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './utils/jwt';

@Module({
  imports: [
    InvitationModule, 
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
