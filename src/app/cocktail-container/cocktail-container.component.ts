import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cocktail } from '../shared/interfaces/cocktail.interface';
import { CocktailService } from '../shared/service/cocktail.service';

@Component({
  selector: 'app-cocktail-container',
  templateUrl: './cocktail-container.component.html',
  styleUrls: ['./cocktail-container.component.scss']
})
export class CocktailContainerComponent implements OnInit, OnDestroy{

  public cocktails : Cocktail[] = [];

  public subcription:Subscription = new Subscription();


  constructor(private cocktailService:CocktailService) { }

  ngOnInit(): void {
    this.subcription.add(this.cocktailService.cocktails$.subscribe((cocktails:Cocktail[])=>{
      this.cocktails = cocktails;
    }));
    
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
