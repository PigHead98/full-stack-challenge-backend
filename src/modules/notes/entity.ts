import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { uuid } from 'uuidv4';
import { ICurrentUser } from '../../shared/interfaces';
import { ClearNilProperties } from '../../shared/utils';
import { CreateNoteDto } from './dtos/create-note';
import { GqlCreateNoteDto } from './dtos/gql-create-note';
import { UpdateNoteDto } from './dtos/update-note';
import { Note, NoteDocument } from './schema';

@ObjectType()
export class NoteEntity extends Note {
  private _id: Types.ObjectId;
  id: string;

  @Field(() => String, {
    nullable: true,
  })
  uuid: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content = '';

  createdBy = 'system';

  createAt: Date;
  updateAt: Date;

  constructor(data: NoteEntity | Partial<NoteEntity>) {
    super();

    if (data.id) {
      this._id = new Types.ObjectId(data.id);
      this.id = data.id;
    }

    this.uuid = data.uuid;
    this.content = data.content;
    this.title = data.title;
    this.createdBy = data.createdBy;
  }

  getObjectId() {
    return this._id;
  }

  toCreateDto(): CreateNoteDto {
    const result = {
      title: this.title,
      content: this.content,
      createdBy: this.createdBy,
      uuid: this.uuid,
    };

    return result;
  }

  toUpdateDto(): UpdateNoteDto {
    return {
      title: this.title,
      content: this.content,
    };
  }

  static toEntity(data: any): Partial<NoteEntity> {
    const result: Partial<NoteEntity> = {
      id: data.id,
      uuid: data.uuid,
      title: data.title,
      content: data.content,
      createAt: data.createAt,
      updateAt: data.updateAt,
    };

    return ClearNilProperties<NoteEntity>(result);
  }

  static fromCreateGql(note: GqlCreateNoteDto, user: ICurrentUser): NoteEntity {
    const entity = this.toEntity(note);
    entity.createdBy = user.username;
    entity.uuid = uuid();

    return new NoteEntity(entity);
  }

  static fromMongoDb(note: NoteDocument): NoteEntity {
    return new NoteEntity(note);
  }
}
