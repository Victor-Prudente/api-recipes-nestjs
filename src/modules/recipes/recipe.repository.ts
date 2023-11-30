import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './entities/recipe.entity';
import { IRecipe, IRecipeAll } from 'src/shared/interfaces/recipe.interface';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
  ) {}

  create(createRecipe: IRecipe): Promise<Recipe> {
    return this.recipeModel.create(createRecipe);
  }

  async findAll(filter?: any): Promise<IRecipeAll> {
    const recipes: Recipe[] = await this.recipeModel
      .find(filter)
      .populate('authors', 'name -_id')
      .exec();
    const count: number = await this.recipeModel.countDocuments(filter).exec();

    const retorno = {
      recipes: recipes,
      count: count,
    };

    return retorno;
  }

  findOne(id: string): Promise<Recipe> {
    return this.recipeModel
      .findById(id)
      .populate('authors', 'name -_id')
      .exec();
  }

  findByName(name: string): Promise<Recipe> {
    return this.recipeModel.findOne({ name: name }).exec();
  }

  update(id: string, updateRecipe: Partial<IRecipe>): Promise<Recipe> {
    return this.recipeModel
      .findByIdAndUpdate(id, updateRecipe, { new: true })
      .exec();
  }

  remove(id: string): Promise<Recipe> {
    return this.recipeModel.findByIdAndRemove(id).exec();
  }
}
