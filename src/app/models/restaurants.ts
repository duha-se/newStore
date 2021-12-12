import { Restaurant } from './restaurant';

export class Restaurants {
    restaurants: Restaurant[];

    constructor(restaurants: Restaurants[]) {}
    
    getRestaurantById(id) {
        return this.restaurants.filter( rest => rest.id === id);
    }

}
