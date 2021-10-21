// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
// import { Reflector } from '@nestjs/core'
// import { JwtService } from '@nestjs/jwt'

// @Injectable()
// export class UserGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly reflector: Reflector,
//   ) {}

//   canActivate(context: ExecutionContext): boolean {
//     const ctx = GqlExecutionContext.create(context).getContext()
//     if (!ctx.req.headers.authorization) {
//       throw new UnauthorizedException();
//     }

//     ctx.user = this.jwtService.verify(ctx.req.headers.authorization)

//     const roles = this.reflector.get<string[]>('roles', context.getHandler())

//     if (!roles) return true

//     if (roles.includes(ctx.user.role)) {
//       return true
//     } else {
//       throw new ForbiddenError('Not authorized')
//     }
//   }
// }
