import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtworkDocument = Artwork & Document;

@Schema()
export class Artwork {
  @Prop({ required: true, maxlength: 99 })
  title: string;

  @Prop({ required: true, maxlength: 50 })
  artist: string;

  @Prop({
    required: true,
    enum: ['painting', 'sculpture', 'photography', 'digital', 'installation'],
  })
  type: string;

  @Prop({ required: true, min: 0.01 })
  price: number;

  @Prop({ default: true })
  availability: boolean;
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);
