import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/shared/service/cocktail.service';
import { PanierService } from 'src/app/shared/service/panier.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {
  public cocktail!:Cocktail;
  public index!:string
  constructor(private panierService: PanierService, private activatedRoute : ActivatedRoute, private cocktailService:CocktailService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.index = paramMap.get('index')!;
      console.log(this.index);
      this.cocktail = this.cocktailService.getCocktail(+this.index);
    })
  }

  public addtoPanier():void{
    this.panierService.addtoPanier(this.cocktail.ingredients);
  }


}
