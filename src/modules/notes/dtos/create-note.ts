import { ObjectType, PickType } from '@nestjs/graphql';
import { NoteEntity } from '../entity';

@ObjectType()
export class CreateNoteDto extends PickType(NoteEntity, [
  'value',
  'createdBy',
  'time',
]) {}
