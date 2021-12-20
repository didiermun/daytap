import { Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
      ) {}

canActivate(context: ExecutionContext) {
const request = context.switchToHttp().getRequest();
// context.getHandler().
let token = request.headers.authorization;
if (!token) {
 return false;
}
token = token.split(' ')[1];
try{
    const user = this.jwtService.verify(token)
    if(!user){
       throw new HttpException('Re login', HttpStatus.FORBIDDEN);
    }

    return true;
}
catch (err) {
    console.log(err); 
    throw new HttpException('Invalid access token', HttpStatus.BAD_REQUEST);
}


// throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
}
}