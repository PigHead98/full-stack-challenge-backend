import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async update(id: Types.ObjectId, data: UpdateNoteDto): Promise<NoteDocument> {
    return this.noteModel.findOneAndUpdate(
      {
        _id: id,
      },
      data,
    );
  }

  async remove(id: Types.ObjectId) {
    return this.noteModel.remove({
      _id: id,
    });
  }
}
