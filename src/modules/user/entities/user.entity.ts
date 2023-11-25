import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'src/shared/interfaces/user.interface';

export class User implements IUser {
  id?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  role?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
