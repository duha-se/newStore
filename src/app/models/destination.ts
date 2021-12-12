import { City } from './city';
import { Neighbourhood } from './neighbourhood';

export class Destination {
    id: string;
    destinationName: string;
    city: City;
    neighbourhood: Neighbourhood;
    streetAddress: string;
    contactName: string;
    tel: string;
    email?: string;
    deliveryCost: number;
}
