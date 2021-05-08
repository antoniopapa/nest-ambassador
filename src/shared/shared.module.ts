import {CacheModule, Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import * as redisStore from 'cache-manager-redis-store';
import {RedisService} from "./redis.service";

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        }),
        CacheModule.register({
            store: redisStore,
            host: 'redis',
            port: 6379,
        })
    ],
    providers: [RedisService],
    exports: [
        JwtModule,
        CacheModule,
        RedisService
    ]
})
export class SharedModule {
}
