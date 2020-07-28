import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipemodel } from '../recipemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
recipe: Recipemodel;
  constructor(private recipeService: RecipesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log('getting recipe');
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('recipeId')){
          this.router.navigate(['recipes']);
        }
        const recipeId = paramMap.get('recipeId');
        this.recipe = this.recipeService.getRecipe(recipeId);
        console.log(this.recipeService.getAllRecipes().length);
      }
    );
  }

  removeRecipe(){
    this.alertCtrl.create({
      header: 'Are You Sure',
      message: 'Do you really want to Delete his recipe?',
      buttons: [{
        text: 'Cancel',
        role: 'Cancel'
      }, {
        text: 'Delete',
      handler: () => {
        this.recipeService.deleteRecipe(this.recipe.id);
        this.router.navigate(['recipes']);
      } }]
    }).then(alertEl => {
      alertEl.present();
    });

  }

}
