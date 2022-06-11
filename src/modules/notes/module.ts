import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteResolver } from './resolver';
import { Note, NoteSchema } from './schema';
import { NoteService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [],
  providers: [NoteService, NoteResolver],
  exports: [MongooseModule, NoteService],
})
export class NoteModule {}
