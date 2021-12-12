import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

// services
import { Ma3zoomService } from '../ma3zoom.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

export enum cartCheckoutPages {
  MealsCart,
  Destinations,
  MealPerDestination,
  OrderDistribution,
  Payment
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayLoginDialog = false;

  allMeals = [];
  allDestinations = [];
  order = new Order();

  mealCartDisabled: boolean;
  destinationDisbaled: boolean;
  orderDistDisabled: boolean;
  paymentDisabled: boolean;

  cartCheckoutPages = cartCheckoutPages;
  pageLabels: MenuItem[];
  stepperIndex = 0;
  cartPageIndex = cartCheckoutPages.MealsCart;

  constructor(private m3azoomService: Ma3zoomService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getCartOrderLocalStorage();
    this.initLabels();
    this.getCart();
    this.initObservers();
  }

  initObservers() {
    this.orderService.destChange$.subscribe(change => {
      this.allDestinations = this.orderService.getOrderDestinations();
    });
    this.orderService.totalCost$.subscribe(change => {
      this.order = this.orderService.getOrder();
    });
  }

  initLabels() {
    this.pageLabels = this.pageLabelsMeth();
    this.mealCartDisabled = false;
    this.destinationDisbaled = true;
    this.orderDistDisabled = true;
    this.paymentDisabled = true;
  }

  getCart() {
    this.order = this.orderService.getOrder();
    this.allDestinations = this.orderService.getOrderDestinations();
  }

  isLoggedIn() {
    if (this.m3azoomService.ma3zoomLoggedIn) {
      this.navigate('Destinations');
    } else {
      this.displayLoginDialog = true;
    }
  }

  submitOrder() {
    this.orderService.submitOrder();
  }

  navigate(to) {
    switch (to) {
      case 'MealCart':
        this.cartPageIndex = cartCheckoutPages.MealsCart;
        this.mealCartDisabled = false;
        this.destinationDisbaled = true;
        this.orderDistDisabled = true;
        this.paymentDisabled = true;
        break;
      case 'Destinations':
        this.cartPageIndex = cartCheckoutPages.Destinations;
        this.mealCartDisabled = true;
        this.destinationDisbaled = false;
        this.orderDistDisabled = true;
        this.paymentDisabled = true;
        break;
      case 'MealPerDestination':
        this.cartPageIndex = cartCheckoutPages.MealPerDestination;
        break;
      case 'OrderDist':
        this.cartPageIndex = cartCheckoutPages.OrderDistribution;
        this.mealCartDisabled = true;
        this.destinationDisbaled = true;
        this.orderDistDisabled = false;
        this.paymentDisabled = true;
        break;
      case 'Payment':
        this.cartPageIndex = cartCheckoutPages.Payment;
        this.mealCartDisabled = true;
        this.destinationDisbaled = true;
        this.orderDistDisabled = true;
        this.paymentDisabled = false;
        break;
    }
  }

  pageLabelsMeth() {
    return [
      {
        label: 'Meal',
        command: (event: any) => {
          this.cartPageIndex = cartCheckoutPages.MealsCart;
        }
      },
      {
        label: 'Destinations',
        command: (event: any) => {
          this.cartPageIndex = cartCheckoutPages.Destinations;
        }
      },
      {
        label: 'Manage',
        command: (event: any) => {
          this.cartPageIndex = cartCheckoutPages.MealPerDestination;
        }
      },
      {
        label: 'Order',
        command: (event: any) => {
          this.cartPageIndex = cartCheckoutPages.OrderDistribution;
        }
      },
      {
        label: 'Payment',
        command: (event: any) => {
          this.cartPageIndex = cartCheckoutPages.Payment;
        }
      }
  ];
  }

}
