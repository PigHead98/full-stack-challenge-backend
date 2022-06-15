import { ObjectType, PickType } from '@nestjs/graphql';
import { NoteEntity } from '../entity';

@ObjectType()
export class UpdateNoteDto extends PickType(NoteEntity, ['value', 'time']) {}
