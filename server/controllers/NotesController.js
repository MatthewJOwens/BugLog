import express from "express";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";
import auth0Provider from "@bcwdev/auth0provider";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }
  async getAll(req, res, next) {
    try {
      let notes = await notesService.findAll()
      return res.send(notes);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let note = await notesService.findById(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.user.email;
      let data = notesService.create(req.body);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await notesService.edit(req.params.id, req.user.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await notesService.delete(req.params.id)
      return res.send("Successfully delete note.")
    } catch (error) {

    }
  }
}
