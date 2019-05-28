export class Product {

    productName: string;
    categoryId: string;
    price: number;
    image: string;

    constructor(productName: string, categoryId: string, price: number, image: string) {

        this.productName = productName;
        this.categoryId = categoryId;
        this.price = price;
        this.image = image;

    }

}