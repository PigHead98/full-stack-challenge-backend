import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  name: 'Note';

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Date, default: Date.now() })
  createAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updateAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
