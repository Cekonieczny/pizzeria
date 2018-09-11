import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishService} from '../dishes/dish.service';
import {Dish} from '../models/Dish';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  dish: Dish;

  constructor(private dishService: DishService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getDishById();
  }

  getDishById() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dishService.getDishById(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(dish => this.dish = dish);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
