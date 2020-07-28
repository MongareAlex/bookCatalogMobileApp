import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_Guards/auth.guard';

const routes: Routes = [
  {path: '',
  redirectTo: 'home/books' ,
   pathMatch: 'full'
},
  {path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [

    {
      path: 'recipes',
      loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesPageModule)
    },
    {
      path: 'home',
      loadChildren: () => import('./recipes/home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'author-detailed',
      loadChildren: () => import('./recipes/author-list/author-detailed/author-detailed.module').then( m => m.AuthorDetailedPageModule)
    },
    {
      path: 'gallery',
      loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
    }
  ]
},
 {
  path: 'login',
  loadChildren: () => import('./Auth/login/login.module').then( m => m.LoginPageModule)
},
{
  path: 'register',
  loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
},
{
  path: 'forgot-password',
  loadChildren: () => import('./Auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
},
{
  path: 'start',
  loadChildren: () => import('./start-page/start-page.module').then( m => m.StartPagePageModule)
},
{path:  '**', redirectTo: 'start' , pathMatch: 'full'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
