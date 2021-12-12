import { Destination } from './destination';
import { Meal } from './meal';

export class OrderDestination {
    id: Destination['id'];
    destinationName: Destination['destinationName'];
    city: Destination['city'];
    neighbourhood: Destination['neighbourhood'];
    streetAddress: Destination['streetAddress'];
    contactName: Destination['contactName'];
    tel: Destination['tel'];
    email?: Destination['email'];
    deliveryCost: Destination['deliveryCost'];
    meals: Meal[];
    subTotalPerDestination: number;
    totalPerDestination: number;
}
