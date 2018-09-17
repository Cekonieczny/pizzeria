import { Component, OnInit, } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Router} from '@angular/router';
import {OrderConfirmationService} from '../order-confirmation/order-confirmation.service';

@Component({
  selector: 'app-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})


export class OrderSummaryComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private shoppingCartService: ShoppingCartService,
              private router: Router,
              private orderConfirmationService: OrderConfirmationService) {
  }


  personalDataForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
    }),
  });

  public submitOrder() {
    /*this.shoppingCartService.submitOrder(this.personalDataForm.value).subscribe(order => {
      this.router.navigateByUrl(`order-details/${order.id}`);
    });*/
    this.setOrderConfirmation();
    this.shoppingCartService.submitOrder(this.personalDataForm.value).subscribe();
  }

  private setOrderConfirmation() {
    this.orderConfirmationService.setDishesToOrder(this.shoppingCartService.dishesToOrder);
    this.orderConfirmationService.setPersonalData(this.personalDataForm.value);
  }

  ngOnInit() {
  }

}
