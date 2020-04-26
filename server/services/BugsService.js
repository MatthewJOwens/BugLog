import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async findAll(query = {}) {
    let bugs = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
    return bugs;
  }
  async findById(id) {
    let bug = await dbContext.Bugs.findById(id);
    if (!bug) {
      throw new BadRequest("Invalid Id");
    }
    return bug;
  }
  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return rawData
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list.")
    }
    return data
  }
  async delete(id) {
    let data = await dbContext.Bugs.findOneAndRemove({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
  }
  async getNotesByBugId(bug) {
    let notes = await dbContext.Notes.find({ bugId: bug.id })
    if (!notes) {
      throw new BadRequest("Invalid ID")
    }
  }
}

export const bugsService = new BugsService();
