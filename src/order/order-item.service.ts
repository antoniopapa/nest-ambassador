import {Injectable} from '@nestjs/common';
import {AbstractService} from "../shared/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OrderItem} from "./order-item";

@Injectable()
export class OrderItemService extends AbstractService {
    constructor(
        @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>
    ) {
        super(orderItemRepository);
    }
}
