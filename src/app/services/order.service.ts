import { Injectable } from '@angular/core';

// models
import { Order } from '../models/order';
import { OrderDestination } from '../models/orderDestination';
import { Meal } from '../models/meal';
import { Ma3zoomUser } from '../models/Ma3zoomUser';
import { OrderPerson } from '../models/orderPeron';

// services
import { Ma3zoomService } from '../ma3zoom.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  observeDestination = new Subject<string>();
  destChange$ = this.observeDestination.asObservable();

  observeTotalCost = new Subject<string>();
  totalCost$ = this.observeTotalCost.asObservable();

  orderDestinatioObj = new OrderDestination();
  orderDestinationArr = [];

  order = new Order();

  constructor( private ma3zoomService: Ma3zoomService){
  }

  calculateTotalCosts(source) {
     const numOfDestinations = this.order.destinations.length;

     this.calculateSubtotalCost();
     this.calculateTotalDlvCost();
     this.calculateTotalOrderCost();
     this.calculateDestination();
     this.observeTotalCost.next('costUpdate');
     this.updateLocalStorageCartOrder();
  }

  calculateDestination() {
    const destinations = this.order.destinations;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < destinations.length ; i++) {
      let destSubtotal = 0;
      // tslint:disable-next-line: prefer-for-of
      for ( let j = 0 ; j < destinations[i].meals.length ; j++) {
        destSubtotal += destinations[i].meals[j].price * destinations[i].meals[j].quantity;
      }
      destinations[i].subTotalPerDestination = destSubtotal;
      destinations[i].totalPerDestination = destSubtotal + destinations[i].deliveryCost;
    }
  }

  calculateTotalOrderCost() {
    const order: Order = this.order;

    this.order.totalCost = order.dlvrTotalCost + order.subtotalCost;
  }

  calculateTotalDlvCost() {
    const destinations: OrderDestination[] = this.order.destinations;
    let totalCost = 0;

    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0 ; i < destinations.length ; i++) {
      totalCost += destinations[i].deliveryCost;
    }
    this.order.dlvrTotalCost = totalCost;
  }

  calculateSubtotalCost() {
    let overAllPrice = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.orderDestinationArr.length ; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0 ; j < this.orderDestinationArr[i].meals.length ; j++) {

        const price = this.orderDestinationArr[i].meals[j].price;
        const quantity = this.orderDestinationArr[i].meals[j].quantity;
        overAllPrice += quantity * price;
      }
    }
    this.order.subtotalCost = overAllPrice;
  }

  // goal of the method:
  // if no meals selected for the destination, dilevery cost is 0
  calculateDlvrCostPerDestination() {
    const orderDestinations = this.order.destinations;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < orderDestinations.length ; i++) {
      let dlvrCost = 0;
      orderDestinations[i].deliveryCost = dlvrCost;
      const meals: Meal[] = orderDestinations[i].meals;
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0 ; j < meals.length ; j++) {
        if (meals[j].quantity) {
          dlvrCost = orderDestinations[i].neighbourhood.dlvrCost;
          orderDestinations[i].deliveryCost = dlvrCost;
          break;
        }
      }
    }
  }

  // meal controller

  removeMeal(mealIndex, meal: Meal) {
    // this.mealsService.removeMeal(mealIndex);
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0 ; i < this.orderDestinationArr.length ; i++) {
      this.orderDestinationArr[i].meals.splice(mealIndex, 1);
    }
    this.order.destinations = this.orderDestinationArr;
    this.calculateDlvrCostPerDestination();
    this.calculateTotalCosts('mealManagement');
  }

  

  // calculateOverallPerMeal() {
  //   const meals: Meal[] = this.mealsService.getMeals();
  //   for (let i = 0 ; i < meals.length ; i++) {
  //     let overallPricePerMeal = 0;
  //     let overallQuantityPerMeal = 0;
  //     // tslint:disable-next-line: prefer-for-of
  //     for ( let j = 0 ; j < this.orderDestinationArr.length ; j++) {
  //       const meal: Meal = this.orderDestinationArr[j].meals[i];
  //       overallPricePerMeal += meal.price * meal.quantity;
  //       overallQuantityPerMeal += meal.quantity;
  //     }
  //     meals[i].overallPrice = overallPricePerMeal;
  //     meals[i].overallQuantity = overallQuantityPerMeal;
  //     this.mealsService.setMeal(i, meals[i]);
  //   }
  // }

  // handleMealServiceOverall(mealIndex, meal, operation) {
  //   const currentMeal = this.mealsService.getMeal(mealIndex);
  //   if (operation === '+') {
  //     meal.overallQuantity = currentMeal.overallQuantity + 1;
  //     meal.overallPrice = currentMeal.price * meal.overallQuantity;
  //   } else {
  //     meal.overallQuantity = currentMeal.overallQuantity - 1;
  //     meal.overallPrice = currentMeal.price * meal.overallQuantity;
  //   }
  //   this.mealsService.setMeal(mealIndex, meal);
  // }

  handleMealQuantity(mealIndex, destinationIndex, operation) {
    const meals: Meal[] = Object.assign([], this.order.destinations[destinationIndex].meals);
    const meal: Meal = Object.assign({}, this.order.destinations[destinationIndex].meals[mealIndex]);

    if (operation === '-') {
      if ( meal.quantity > 0) {
        meal.quantity--;
      } else {
        return;
      }
    } else {
        meal.quantity++;
    }
    const mealOverallPrice = meal.quantity * meal.price;
    meal.overallPrice = mealOverallPrice;
    meals[mealIndex] = meal;

    // this.handleMealServiceOverall(mealIndex, meal, operation);

    this.orderDestinationArr[destinationIndex].meals = meals;
    this.order.destinations[destinationIndex].meals = meals;
    this.calculateDlvrCostPerDestination();
    this.calculateTotalCosts('mealManagement');

  }

  // destination controller

  // newDestinationToOrder(destination: Destination) {
  //   // meals arr
  //   const mealsArr = this.mealsService.getDefaultValueMeals();
  //   this.orderDestinatioObj.meals = Object.assign([], mealsArr);

  //   // destination obj
  //   this.orderDestinatioObj.id = destination.id;
  //   this.orderDestinatioObj.destinationName = destination.destinationName;
  //   this.orderDestinatioObj.city = destination.city;
  //   this.orderDestinatioObj.neighbourhood = destination.neighbourhood;
  //   this.orderDestinatioObj.streetAddress = destination.streetAddress;
  //   this.orderDestinatioObj.contactName = destination.contactName;
  //   this.orderDestinatioObj.tel = destination.tel;
  //   this.orderDestinatioObj.email = destination.email;

  //   this.observeDestination.next('destinationChange');
  //   this.orderDestinationArr.push(this.orderDestinatioObj);
  //   localStorage.setItem('orderDestinations', JSON.stringify(this.orderDestinationArr));

  //   this.order.destinations = this.orderDestinationArr;

  //   // toDo handle destination cost
  //   this.calculateDlvrCostPerDestination();

  //   this.calculateTotalCosts('destinationManagement');

  //   this.orderDestinatioObj = new OrderDestination();

  //   this.handleUser();
  // }

  // removeDestination(index) {
  //   this.destinationService.removeOrderDestination(index);
  //   this.orderDestinationArr.splice(index, 1);
  //   this.order.destinations = this.orderDestinationArr;
  //   this.calculateOverallPerMeal();
  //   this.calculateTotalCosts('destinationManagement');
  // }

  handleUser() {
    const user: Ma3zoomUser = this.ma3zoomService.getMa3zoomUser();

    this.order.userDetails = new OrderPerson();
    this.order.userDetails.firstname = user.firstName;
    this.order.userDetails.lastname = user.lastName;
    this.order.userDetails.provider = user.provider;
  }

  updateLocalStorageCartOrder() {
    localStorage.setItem('orderDestinations', JSON.stringify(this.orderDestinationArr));
    localStorage.setItem('cartOrder', JSON.stringify(this.order));
  }

  getCartOrderLocalStorage() {
    if (JSON.parse(localStorage.getItem('cartOrder'))) {
      this.order = JSON.parse(localStorage.getItem('cartOrder'));
    }
  }

  // setRestaurantsName() {
  //   this.mealsService.setRestaurantsName();
  // }

  submitOrder() {
    this.ma3zoomService.sendOrder(this.order).subscribe( response => {
      if (response?.id) {
        alert('Order with order id: ' + response.id + ' has been added');
        this.clearOrderLocalStorage();
        window.location.reload();
      }
    });
  }

  clearOrderLocalStorage() {
    localStorage.removeItem('orderDestinations');
    localStorage.removeItem('cartOrder');
    localStorage.removeItem('allMeals');
    localStorage.removeItem('defaultValueMeals');
  }

  // getters

  // getMeals() {
  //   return this.mealsService.getMeals();
  // }

  getOrderDestinations() {
    if (this.orderDestinationArr.length === 0 && localStorage.getItem('orderDestinations')) {
      this.orderDestinationArr = JSON.parse(localStorage.getItem('orderDestinations'));
    }
    return this.orderDestinationArr;
  }

  getOrder() {
    return this.order;
  }
}
