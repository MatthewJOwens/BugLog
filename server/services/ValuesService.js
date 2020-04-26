import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ValuesService {
  async findAll(query = {}) {
    let values = await dbContext.Values.find(query).populate(
      "creator",
      "name picture"
    );
    return values;
  }
  async findById(id) {
    let value = await dbContext.Values.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
  async create(rawData) {
    let data = await dbContext.Values.create(rawData)
    return rawData
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Values.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list.")
    }
    return data
  }
  async delete(id) {
    let data = await dbContext.Values.findOneAndRemove({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
  }
}

export const valuesService = new ValuesService();
