import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  create(createRecipeDto: CreateRecipeDto) {
    return this.recipeRepository.create(createRecipeDto);
  }

  findAll(filter?) {
    return this.recipeRepository.findAll(filter);
  }

  findOne(id: string) {
    return this.recipeRepository.findOne(id);
  }

  findByName(name: string) {
    return this.recipeRepository.findByName(name);
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepository.update(id, updateRecipeDto);
  }

  remove(id: string) {
    return this.recipeRepository.remove(id);
  }
}
