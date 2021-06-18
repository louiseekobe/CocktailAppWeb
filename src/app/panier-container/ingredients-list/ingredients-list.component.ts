import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/interfaces/ingredient.interface';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  @Input() public ingredients!:Ingredient[];
  constructor() { }

  ngOnInit(): void {
  }

}
