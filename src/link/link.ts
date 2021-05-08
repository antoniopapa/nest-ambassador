import {User} from "../user/user";
import {Product} from "../product/product";
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "../order/order";

@Entity('links')
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'link_products',
        joinColumn: {name: 'link_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'product_id', referencedColumnName: 'id'}
    })
    products: Product[];

    @OneToMany(() => Order, order => order.link, {
        createForeignKeyConstraints: false
    })
    @JoinColumn({
        referencedColumnName: 'code',
        name: 'code'
    })
    orders: Order[];
}
