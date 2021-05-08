import {Injectable} from '@nestjs/common';
import {AbstractService} from "../shared/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "./order";
import {Repository} from "typeorm";

@Injectable()
export class OrderService extends AbstractService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>
    ) {
        super(orderRepository);
    }
}
