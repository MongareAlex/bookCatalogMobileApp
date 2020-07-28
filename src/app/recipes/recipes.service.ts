import { Injectable } from '@angular/core';
import { Recipemodel } from './recipemodel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes  = new BehaviorSubject<Recipemodel[]>([]);

constructor() { }

loadRecipes() {

  console.log('loading recipes');
  this.recipes.next(
    [{
    id: '01',
    title: 'Recipe1',
    imageUrl: 'https://picsum.photos/50/50',
    ingredients: ['ingredients1', 'ingredients2', 'ingredients3', 'ingredients4']
    }, {
    id: '02',
    title: 'Recipe2',
    imageUrl: 'https://picsum.photos/50/50',
    ingredients: ['ingredients5', 'ingredients6', 'ingredients7', 'ingredients8']
    }, {
    id: '03',
    title: 'Recipe3',
    imageUrl: 'https://picsum.photos/50/50',
    ingredients: ['ingredients8', 'ingredients7', 'ingredients6', 'ingredients5']
    }, {
    id: '04',
    title: 'Recipe4',
    imageUrl: 'https://picsum.photos/50/50',
    ingredients: ['ingredients4', 'ingredients3', 'ingredients2', 'ingredients1']
    }]) ;
  }
getAllRecipes() {
  let recipes = [];
  this.recipes.subscribe((next) => {
    recipes = next;
  });
  return recipes;
  }

getRecipe(id: string) {

  let recipes = [];
  this.recipes.subscribe((next) => {
    recipes = next;
  });
  return recipes.find(el => {
  return el.id === id;
    });
  }
deleteRecipe(id: string) {
   let initialRecipes = [];
   this.recipes.subscribe(
        (next) => {
    initialRecipes = next;
    console.log('From delete' + initialRecipes.length + initialRecipes );
     }
   );
   const recipes = initialRecipes.filter(el => {
    return el.id !== id;
    });
   this.recipes.next(recipes);
   console.log('Emitting remaining recipes From delete()' + recipes.length + recipes);

  }
}
