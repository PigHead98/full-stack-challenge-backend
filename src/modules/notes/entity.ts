import { Field, ObjectType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
import { ICurrentUser } from '../../shared/interfaces';
import { ClearNilProperties } from '../../shared/utils';
import { CreateNoteDto } from './dtos/create-note';
import { GqlCreateNoteDto } from './dtos/gql-create-note';
import { UpdateNoteDto } from './dtos/update-note';
import { Note, NoteDocument } from './schema';

@ObjectType()
export class NoteEntity {
  @Field(() => String, {
    nullable: true,
  })
  uuid: string;

  @Field(() => String)
  value: string;

  @Field(() => Date)
  time: Date;

  createdBy = 'system';

  createAt: Date;
  updateAt: Date;

  constructor(data: NoteEntity | Partial<NoteEntity>) {
    super();

    this.uuid = data.uuid;
    this.time = data.time;
    this.value = data.value;
    this.createdBy = data.createdBy;
  }

  toCreateDto(): CreateNoteDto {
    const result = {
      value: this.value,
      time: this.time,
      createdBy: this.createdBy,
      uuid: this.uuid,
    };

    return result;
  }

  toUpdateDto(): UpdateNoteDto {
    return {
      value: this.value,
      time: this.time,
    };
  }

  static toEntity(data: any): Partial<NoteEntity> {
    const result: Partial<NoteEntity> = {
      uuid: data.uuid,
      value: data.value,
      time: data.time,
      createAt: data.createAt,
      updateAt: data.updateAt,
    };

    return ClearNilProperties<NoteEntity>(result);
  }

  static fromCreateGql(note: GqlCreateNoteDto, user: ICurrentUser): NoteEntity {
    const entity = this.toEntity(note);
    entity.createdBy = user.username || 'system';
    entity.uuid = entity.uuid || uuid();

    return new NoteEntity(entity);
  }

  static fromMongoDb(note: NoteDocument): NoteEntity | Partial<NoteEntity> {
    return this.toEntity(new NoteEntity(note));
  }
}
