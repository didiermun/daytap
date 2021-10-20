import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [InvitationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
