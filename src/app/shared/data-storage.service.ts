import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {

    // https://ng-udemy-444fe.firebaseio.com/data.json

    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://ng-udemy-444fe.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get('https://ng-udemy-444fe.firebaseio.com/recipes.json')
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (const recipe of recipes) {
                        if (!recipe.ingredients) {
                            recipe.ingredients = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );

    }

}
