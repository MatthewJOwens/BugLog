import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async findAll(query = {}) {
    let notes = await dbContext.Notes.find(query).populate(
      "creator",
      "name picture"
    );
    return notes;
  }
  async findById(id) {
    let note = await dbContext.Notes.findById(id);
    if (!note) {
      throw new BadRequest("Invalid Id");
    }
    return note;
  }
  async create(rawData) {
    let data = await dbContext.Notes.create(rawData)
    return rawData
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list.")
    }
    return data
  }
  async delete(id) {
    let data = await dbContext.Notes.findOneAndRemove({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
  }
}

export const notesService = new NotesService();
