import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/shared/service/cocktail.service';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.scss']
})
export class CocktailFormComponent implements OnInit {
  public cocktailForm!:FormGroup;
  public cocktail!:Cocktail;


  constructor(private fb:FormBuilder, private cocktailService:CocktailService, private route:Router, private activatedRoute:ActivatedRoute ) { }

  // name:string;
  // img?:string;
  // description:string;
  // ingredients:Ingredient[];
  public get ingredients(){
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    //recuperer l'indice d'un cocktail
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      const index = paramMap.get('index')!;
      if(index !== null){
        console.log(index);
        
        this.cocktail = this.cocktailService.getCocktail(+index);
      }
      
    })
    this.initForm(this.cocktail);
  }
  
  //pemret de definir un cocktail dans le formulaire
  //de telle sorte que s'il est null on a des valeu par defaut
  private initForm(
    cocktail: Cocktail = { name: "", description: "", img: "", ingredients: [] }
  ): void {
    this.cocktailForm = this.fb.group({
      name: [cocktail.name, Validators.required],
      img: [cocktail.img, Validators.required],
      description: [cocktail.description, Validators.required],
      ingredients: this.fb.array(
        cocktail.ingredients.map(ingredient =>
          this.fb.group({
            name: [ingredient.name, Validators.required],
            quantity: [ingredient.quantity, Validators.required]
          })
        ),
        Validators.required
      )
    });
  }

  public addIngredients():void{
    this.ingredients.push(this.fb.group({
      name:['', Validators.required],
      quantity:[0, Validators.required]
    })
    );
  }

  public submit(): void{
    if(this.cocktail){
      this.cocktailService.editCocktail(this.cocktailForm.value);
    }else{
      //ajouter un cocktail
      this.cocktailService.addCocktail(this.cocktailForm.value);
    }
    
    //on doit retourner d'un cran en arrière
    //on utilise la methode navigate qui prend un objet et un tableau en paramètre
    this.route.navigate(['..'], {relativeTo: this.activatedRoute})
  }

}
