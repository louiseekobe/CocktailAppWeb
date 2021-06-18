import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/interfaces/ingredient.interface';
import { PanierService } from '../shared/service/panier.service';

@Component({
  selector: 'app-panier-container',
  templateUrl: './panier-container.component.html',
  styleUrls: ['./panier-container.component.scss']
})
export class PanierContainerComponent implements OnInit, OnDestroy{
  public ingredients!:Ingredient[];
  public subcription!:Subscription;

  constructor(private panierService:PanierService) { }

  ngOnInit(): void {
    this.subcription = this.panierService.ingredients$.subscribe((ingredient:Ingredient[])=>{
      this.ingredients = ingredient;
    })
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
