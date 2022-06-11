import { Module } from '@nestjs/common';
import { NoteModule } from '../modules/notes/module';
import { NoteResolver } from '../modules/notes/resolver';

@Module({
  imports: [NoteModule],
  providers: [NoteResolver],
  controllers: [],
  exports: [],
})
export class GqlModule {}
