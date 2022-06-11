import { ObjectType, PickType } from '@nestjs/graphql';
import { NoteEntity } from '../entity';

@ObjectType()
export class CreateNoteDto extends PickType(NoteEntity, [
  'title',
  'content',
  'createdBy',
]) {}
