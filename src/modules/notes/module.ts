import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from '../../configs/service';
import { NoteRepository } from './repo';
import { NoteResolver } from './resolver';
import { Note, NoteSchema } from './schema';
import { NoteService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Note.name, schema: NoteSchema }],
      configService.DB_CHALLENGE_NAME,
    ),
  ],
  controllers: [],
  providers: [NoteRepository, NoteService, NoteResolver],
  exports: [NoteService],
})
export class NoteModule {}
