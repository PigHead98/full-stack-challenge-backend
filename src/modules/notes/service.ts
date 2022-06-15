import { Injectable } from '@nestjs/common';
import { NoteEntity } from './entity';
import { NoteRepository } from './repo';
import { NoteDocument } from './schema';

@Injectable()
export class NoteService {
  constructor(private repository: NoteRepository) {}

  async findByUuid(uuid: string): Promise<NoteEntity | Partial<NoteEntity>> {
    const note = await this.repository.findByUuid(uuid);

    return NoteEntity.fromMongoDb(note);
  }

  async findAllNote(): Promise<NoteEntity[] | Partial<NoteEntity>[]> {
    const notes = await this.repository.findAll();

    return notes.map((n) => NoteEntity.fromMongoDb(n));
  }

  create(entity: NoteEntity | Partial<NoteEntity>) {
    return this.repository.create(entity.toCreateDto());
  }

  update(uuid: string, entity: NoteEntity): Promise<NoteDocument> {
    return this.repository.update(uuid, entity.toUpdateDto());
  }

  remove(uuid: string) {
    return this.repository.remove(uuid);
  }

  removeAll() {
    return this.repository.removeAll();
  }

  countAll() {
    return this.repository.countAll();
  }
}
