import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreateNoteDto } from './dtos/create-note';
import { UpdateNoteDto } from './dtos/update-note';
import { Note, NoteDocument } from './schema';

@ObjectType()
export class NoteEntity extends Note {
  private _id: Types.ObjectId;

  @Field()
  id: string;

  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  content: string;

  createAt: Date;
  updateAt: Date;

  constructor(data: NoteEntity | Partial<NoteEntity>) {
    super();

    if (data.id) {
      this._id = new Types.ObjectId(data.id);
      this.id = data.id;
    }

    this.content = data.content;
    this.title = data.title;
  }

  getObjectId() {
    return this._id;
  }

  toCreateDto(): CreateNoteDto {
    return {
      title: this.title,
      content: this.content,
    };
  }

  toUpdateDto(): UpdateNoteDto {
    return {
      title: this.title,
      content: this.content,
    };
  }

  static fromSchema(note: NoteDocument): NoteEntity {
    return new NoteEntity(note);
  }
}
