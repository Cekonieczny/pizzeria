import { Component } from '@angular/core';
import {DishType} from './DishType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dishType: DishType;
  title = 'pizzeria';
}