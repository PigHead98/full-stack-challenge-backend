import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNoteDto } from './create-note';

@InputType()
export class GqlCreateNoteDto extends PartialType(CreateNoteDto, InputType) {}
