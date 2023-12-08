import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { IRecipe } from 'src/shared/interfaces/recipe.interface';

const transformRecipe = (doc: any, ret: any) => {
  ret.id = ret._id;

  delete ret._id;
  delete ret.__v;
};

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({
  timestamps: true,
  collection: 'recipes',
  virtuals: true,
  toJSON: { virtuals: true, transform: transformRecipe },
  toObject: { virtuals: true, transform: transformRecipe },
})
export class Recipe implements IRecipe {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ingredients: string;

  @Prop({ required: true })
  prepareMode: string;

  @Prop({ required: false })
  urlImage?: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  authorId: string;
}

const RecipeSchema = SchemaFactory.createForClass(Recipe);

RecipeSchema.virtual('author', {
  ref: 'User',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
});

export { RecipeSchema };
