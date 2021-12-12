export class Meal {
    name: {
        ar: string;
        en: string;
    };
    price: number;
    id: number;
    restaurantId: number;
    image: string;
    quantity: number;
    overallQuantity?: number;
    overallPrice?: number;
    restaurantName: {
        ar: string,
        en: string
    };
}
