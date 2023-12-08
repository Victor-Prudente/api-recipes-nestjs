import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FilterQuery } from 'mongoose';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @UseGuards(AuthGuard)
  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const id = req.params.id;
          const filename = `${id}.jpeg`; // Modificação: Nome do arquivo com o ID da receita
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadImage(@Param('id') id: string) {
    const imageUrl = `${id}.jpeg`;

    // Salvar informações no banco de dados usando a variável 'image'
    await this.recipeService.updateImage(id, imageUrl);

    return { message: 'Imagem enviada com sucesso!' };
  }

  @Get()
  findAll(@Query() filter?: FilterQuery<CreateRecipeDto>) {
    return this.recipeService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
