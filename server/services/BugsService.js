import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async findAll(query = {}, pageNumber) {
    let bugs = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    )
    // .skip((pageNumber-1)*20).limit(20);
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
    return data
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail, closed: false }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug or it is closed.")
    }
    return data
  }
  async delete(id) {
    let data = await dbContext.Bugs.findOneAndRemove({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
  }
  async getNotesByBugId(bugId) {
    let notes = await dbContext.Notes.find({ bug: bugId })
    if (!notes) {
      throw new BadRequest("Invalid ID")
    }
    return notes
  }
}

export const bugsService = new BugsService();
