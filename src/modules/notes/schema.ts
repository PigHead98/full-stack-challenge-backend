import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  name: 'Note';

  @Prop({ type: String, index: true })
  uuid: string;

  @Prop()
  value: string;

  @Prop({ type: Date })
  time: Date;

  @Prop({ type: Date, default: Date.now() })
  createAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updateAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
