import {Component, OnInit} from '@angular/core';
import {DishService} from '../dishes/dish.service';
import {Dish} from '../Dish';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  private readonly destroy$ = new Subject();
  dish: Dish;

  constructor(private dishService: DishService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
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
