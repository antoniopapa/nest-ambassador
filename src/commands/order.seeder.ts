import {NestFactory} from "@nestjs/core";
import {AppModule} from "../app.module";
import * as faker from "faker";
import {randomInt} from "crypto";
import {OrderService} from "../order/order.service";
import {OrderItemService} from "../order/order-item.service";

(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);

    const orderService = app.get(OrderService);
    const orderItemService = app.get(OrderItemService);

    for (let i = 0; i < 30; i++) {
        const order = await orderService.save({
            user_id: randomInt(2, 31),
            code: faker.lorem.slug(2),
            ambassador_email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            complete: true
        });

        for (let j = 0; j < randomInt(1, 5); j++) {
            await orderItemService.save({
                order,
                product_title: faker.lorem.words(2),
                price: randomInt(10, 100),
                quantity: randomInt(1, 5),
                admin_revenue: randomInt(10, 100),
                ambassador_revenue: randomInt(1, 10)
            })
        }
    }

    process.exit();
})();
