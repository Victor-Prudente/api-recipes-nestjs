import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RecipeSchema } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from './recipe.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
