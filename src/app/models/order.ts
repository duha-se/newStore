import { OrderDestination } from './orderDestination';
import { OrderPerson } from './orderPeron';

export class Order{
  id: string;
  userDetails: OrderPerson;
  destinations: OrderDestination[];
  subtotalCost: number;
  dlvrTotalCost: number;
  totalCost: number;
}
