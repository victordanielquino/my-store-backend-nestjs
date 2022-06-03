import {Product} from "./product.entity";

export class Category {
    id:number;
    name: string;
    products: Product[];
}