// src/routes/videosRouter.ts
import express from "express";
import upload from "../utils/FileUpload";
import * as videoController from "../controllers/videosController";

const router = express.Router();

router
  .route("/sections")
  .get(videoController.get_sections)
  .post(videoController.create_section);

router
  .route("/:videoId")
  .delete(videoController.delete_video);

router
  .route("/sections/:sectionId/videos")
  .get(videoController.get_videos_by_section)
  .post(upload.single("file"), videoController.upload_video)
  .delete(videoController.delete_section);

router
  .route("/:videoId/bookmarks")
  .get(videoController.get_bookmarks)
  .post(videoController.create_bookmark);

router
  .route("/bookmarks/:bookmarkId")
  .delete(videoController.delete_bookmark)
  .patch(videoController.update_bookmark);

export default router;
