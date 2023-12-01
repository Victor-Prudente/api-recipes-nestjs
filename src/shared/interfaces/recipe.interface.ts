export interface IRecipe {
  name: string;
  ingredients: string;
  prepareMode: string;
  urlImage?: string;
  authorsIds: string[];
}

export interface IRecipeAll {
  recipes: IRecipe[];
  count: number;
}
