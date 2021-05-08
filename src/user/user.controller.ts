import {ClassSerializerInterceptor, Controller, Get, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import {UserService} from "./user.service";
import {AuthGuard} from "../auth/auth.guard";
import {User} from "./user";
import {RedisService} from "../shared/redis.service";
import {Response} from "express";

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    constructor(
        private readonly userService: UserService,
        private redisService: RedisService) {
    }


    @Get('admin/ambassadors')
    async ambassadors() {
        return this.userService.find({
            is_ambassador: true
        });
    }

    @Get('ambassador/rankings')
    async rankings(
        @Res() response: Response
    ) {
        const client = this.redisService.getClient();

        client.zrevrangebyscore('rankings', '+inf', '-inf', 'withscores', (err, result) => {
            let score;

            response.send(result.reduce((o, r) => {
                if (isNaN(parseInt(r))) {
                    return {
                        ...o,
                        [r]: score
                    }
                } else {
                    score = parseInt(r);
                    return o;
                }
            }, {}));
        });
    }
}
