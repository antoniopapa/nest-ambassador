import {NestFactory} from "@nestjs/core";
import {AppModule} from "../app.module";
import {RedisService} from "../shared/redis.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user";


(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);

    const userService = app.get(UserService);

    const ambassadors: User[] = await userService.find({
        is_ambassador: true,
        relations: ['orders', 'orders.order_items']
    });

    const redisService = app.get(RedisService);
    const client = redisService.getClient();

    for (let i = 0; i < ambassadors.length; i++) {
        await client.zadd('rankings', ambassadors[i].revenue, ambassadors[i].name);
    }

    process.exit();
})();
