import { Args, Query, Resolver } from '@nestjs/graphql';
import { NoteEntity } from './entity';
import { NoteService } from './service';

@Resolver(NoteEntity)
export class NoteResolver {
  constructor(private readonly service: NoteService) {}

  @Query(() => NoteEntity)
  async getNoteByUuid(@Args('uuid') uuid: string): Promise<NoteEntity> {
    return this.service.findByUuid(uuid);
  }
}
