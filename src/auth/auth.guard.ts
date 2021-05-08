import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        try {
            const jwt = request.cookies['jwt'];
            const {scope} = await this.jwtService.verify(jwt);

            const is_ambassador = request.path.toString().indexOf('api/ambassador') >= 0;

            return is_ambassador && scope === 'ambassador' || !is_ambassador && scope === 'admin';
        } catch (e) {
            return false;
        }
    }
}
