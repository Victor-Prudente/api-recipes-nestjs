export interface IRecipe {
  name: string;
  ingredients: string;
  prepareMode: string;
  imageUrl?: string;
  authorId: string;
}

export interface IRecipeAll {
  recipes: IRecipe[];
  count: number;
}
