export class CreateOrderDto {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    country: string;
    city: string;
    zip: string;
    code: string
    products: {
        product_id: number;
        quantity: number;
    }[]
}
