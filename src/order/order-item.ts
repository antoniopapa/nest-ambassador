import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    admin_revenue: number;

    @Column()
    ambassador_revenue: number;

    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({name: 'order_id'})
    order: Order;
}
