import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../shared/decorators';
import { ICurrentUser } from '../../shared/interfaces';
import { GqlCreateNoteDto } from './dtos/gql-create-note';
import { NoteEntity } from './entity';
import { NoteService } from './service';

@Resolver(NoteEntity)
export class NoteResolver {
  constructor(private readonly service: NoteService) {}

  @Query(() => NoteEntity)
  async getNoteByUuid(@Args('uuid') uuid: string): Promise<NoteEntity> {
    return this.service.findByUuid(uuid);
  }

  @Mutation(() => NoteEntity)
  async createNote(
    @Args({ name: 'note', type: () => GqlCreateNoteDto })
    note: GqlCreateNoteDto,
    @CurrentUser()
    user: ICurrentUser,
  ): Promise<NoteEntity> {
    const noteEntity = NoteEntity.fromCreateGql(note, user);
    const noteFromDb = await this.service.create(noteEntity);

    return NoteEntity.fromMongoDb(noteFromDb);
  }
}
