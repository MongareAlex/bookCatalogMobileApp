import { Component, OnInit } from '@angular/core';
import { Recipemodel } from './recipemodel';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
 recipes?: Recipemodel[];
  constructor(public recipeService: RecipesService) { }

  ngOnInit() {
    this.recipeService.loadRecipes();
    this.recipeService.recipes.subscribe((value) => {
      this.recipes = value;
    });
  }
  reloadRecipes(){
    this.recipeService.loadRecipes();
  }
}
