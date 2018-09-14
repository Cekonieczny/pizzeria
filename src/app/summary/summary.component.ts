import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private shoppingCartService: ShoppingCartService,
              private router: Router) {
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

  submitOrder() {
    this.shoppingCartService.submitOrder(this.personalDataForm.value).subscribe(order => {
      this.router.navigateByUrl(`order-details/${order.id}`);
    });
  }

  ngOnInit() {
  }

}
