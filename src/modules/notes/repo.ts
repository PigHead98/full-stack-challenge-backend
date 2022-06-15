import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dtos/create-note';
import { UpdateNoteDto } from './dtos/update-note';
import { Note, NoteDocument } from './schema';
@Injectable()
export class NoteRepository {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>,
  ) {}

  async create(createCatDto: CreateNoteDto): Promise<NoteDocument> {
    const create = new this.noteModel(createCatDto);
    return create.save();
  }

  async findAll(): Promise<NoteDocument[]> {
    return this.noteModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<NoteDocument> {
    return this.noteModel
      .findOne({
        uuid,
      })
      .lean<NoteDocument>();
  }

  async update(uuid: string, data: UpdateNoteDto): Promise<NoteDocument> {
    return this.noteModel.findOneAndUpdate(
      {
        uuid,
      },
      data,
    );
  }

  async remove(uuid: string) {
    return this.noteModel.deleteOne({
      uuid,
    });
  }

  async removeAll() {
    return this.noteModel.deleteMany({});
  }

  async countAll() {
    return this.noteModel.countDocuments({});
  }
}
