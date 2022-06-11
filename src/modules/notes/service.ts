import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { NoteEntity } from './entity';
import { NoteRepository } from './repo';
import { NoteDocument } from './schema';

@Injectable()
export class NoteService {
  constructor(private repository: NoteRepository) {}

  async findByUuid(uuid: string): Promise<NoteEntity> {
    const note = await this.repository.findByUuid(uuid);

    return NoteEntity.fromMongoDb(note);
  }

  create(entity: NoteEntity | Partial<NoteEntity>) {
    return this.repository.create(entity.toCreateDto());
  }

  update(id: string, entity: NoteEntity): Promise<NoteDocument> {
    return this.repository.update(new Types.ObjectId(id), entity.toUpdateDto());
  }

  remove(id: string) {
    return this.repository.remove(new Types.ObjectId(id));
  }
}
