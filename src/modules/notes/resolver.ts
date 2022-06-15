import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../shared/decorators';
import { ICurrentUser } from '../../shared/interfaces';
import { GqlCreateNoteDto } from './dtos/gql-create-note';
import { GqlRemoveAllDto } from './dtos/gql-remove-all';
import { NoteEntity } from './entity';
import { NoteService } from './service';

@Resolver(NoteEntity)
export class NoteResolver {
  constructor(private readonly service: NoteService) {}

  @Query(() => NoteEntity)
  async getNoteByUuid(
    @Args('uuid') uuid: string,
  ): Promise<NoteEntity | Partial<NoteEntity>> {
    return this.service.findByUuid(uuid);
  }

  @Query(() => [NoteEntity])
  async getAll(): Promise<NoteEntity[] | Partial<NoteEntity>[]> {
    const data = await this.service.findAllNote();
    return data;
  }

  @Mutation(() => NoteEntity)
  async createNote(
    @Args({ name: 'note', type: () => GqlCreateNoteDto })
    note: GqlCreateNoteDto,
    @CurrentUser()
    user: ICurrentUser,
  ): Promise<NoteEntity | Partial<NoteEntity>> {
    const noteEntity = NoteEntity.fromCreateGql(note, user);
    const noteFromDb = await this.service.create(noteEntity);

    return NoteEntity.fromMongoDb(noteFromDb);
  }

  @Mutation(() => GqlRemoveAllDto, { nullable: true })
  async removeAll(): Promise<GqlRemoveAllDto> {
    const count = await this.service.countAll();
    await this.service.removeAll();
    return { count };
  }

  @Mutation(() => [NoteEntity])
  async createNotes(
    @Args({ name: 'notes', type: () => [GqlCreateNoteDto] })
    notes: GqlCreateNoteDto[],
    @CurrentUser()
    user: ICurrentUser,
  ): Promise<NoteEntity[]> {
    const result = [];
    await this.service.removeAll();

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];

      const noteEntity = NoteEntity.fromCreateGql(note, user);

      const noteFromDb = await this.service.create(noteEntity);
      result.push(NoteEntity.fromMongoDb(noteFromDb));
    }

    return result;
  }
}
