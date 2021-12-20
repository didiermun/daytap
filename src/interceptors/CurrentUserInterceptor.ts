import {NestInterceptor,ExecutionContext,CallHandler,Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService, private jwtService: JwtService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {

    const request = context.switchToHttp().getRequest();

    let token = request.headers.authorization;
    // if (!token) {
    //    return false;
    // }
    try{
    const user = this.jwtService.verify(token.split(' ')[1] || '')
    request.currentUser = user;
    }
    catch(e){

    }
    // const { userId } = request.session || {};
    // if (userId) {
    //   const user = await this.userService.findOne(userId);
    //   request.currentUser = user;
    // }

    return handler.handle();
  }
}