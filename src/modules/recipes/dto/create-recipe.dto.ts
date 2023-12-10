import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IRecipe } from 'src/shared/interfaces/recipe.interface';

export class CreateRecipeDto implements IRecipe {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'O ingrediente deve ser uma string' })
  @IsNotEmpty({ message: 'O ingrediente não pode ser vazio' })
  ingredients: string;

  @IsString({ message: 'O modo de preparo deve ser uma string' })
  @IsNotEmpty({ message: 'O modo de preparo não pode ser vazio' })
  prepareMode: string;

  @IsOptional()
  imageUrl?: string;

  @IsNotEmpty({ message: 'o autor não pode ser vazio' })
  @IsString({ message: 'O author deve ser uma string' })
  authorId: string;
}
