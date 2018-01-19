import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Roast chicken and vegetables',
    //         'This is a delicious rustic style roast dinner',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHyMT-YBFHCat-MAeN5kRVaYUdk0JyP-n0_6iM4yu-aHcCS8_',
    //         [
    //             new Ingredient('large chicken', 1),
    //             new Ingredient('onions', 3),
    //             new Ingredient('carrots', 4),
    //             new Ingredient('potatoes', 5),
    //             new Ingredient('squash', 2)
    //         ]
    //     ),
    //     new Recipe('Grilled salmon salad',
    //         'This is a wonderfully fresh meal for those hot summer days',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM7L__brPt6lusuKYkgUDEOZCwChhbmegqqcinAWZBY4mxwQLY',
    //         [
    //             new Ingredient('salmon steaks', 4),
    //             new Ingredient('onions', 1),
    //             new Ingredient('carrots', 2),
    //             new Ingredient('capsicum', 4),
    //             new Ingredient('lemon (or lime)', 2)
    //         ]
    //     )
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        /* use slice() to get a copy of the array, not the reference object */
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
       this.shoppingListService.addIngredients(ingredients);
    }

}
