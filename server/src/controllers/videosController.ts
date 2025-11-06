// src/controllers/videosController.ts
import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { initDB } from "../database/database";
import { deleteFile } from "../utils/DeleteVideo";

export const get_sections = CatchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const db = await initDB();
    const data = await db.all(
      "SELECT * FROM sections ORDER BY created_at DESC"
    );

    res.status(200).json({
      data,
    });
  }
);

export const create_section = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const db = await initDB();

    const result = await db.run("INSERT INTO sections (name) VALUES (?)", name);

    const section = await db.get(
      "SELECT * FROM sections WHERE id = ?",
      result.lastID
    );

    res.status(201).json({
      data: section,
    });
  }
);

export const upload_video = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { sectionId } = req.params;
    const { title } = req.body;
    const file = req.file;

    if (!sectionId) {
      return res.status(400).json({ message: "sectionId param is required" });
    }

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    if (!file) {
      return res.status(400).json({ message: "video file is required" });
    }

    const db = await initDB();

    const result = await db.run(
      "INSERT INTO videos (section_id, title, filename) VALUES (?, ?, ?)",
      sectionId,
      title,
      file.filename
    );

    const video = await db.get(
      "SELECT * FROM videos WHERE id = ?",
      result.lastID
    );

    res.status(201).json({
      data: video,
    });
  }
);

export const get_videos_by_section = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { sectionId } = req.params;

    if (!sectionId) {
      return res.status(400).json({ message: "sectionId param is required" });
    }

    const db = await initDB();
    const videos = await db.all(
      "SELECT * FROM videos WHERE section_id = ? ORDER BY created_at",
      sectionId
    );

    res.status(200).json({
      data: videos,
    });
  }
);

export const create_bookmark = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { videoId } = req.params;
    const { timestamp_seconds, description } = req.body;

    if (!videoId) {
      return res.status(400).json({ message: "videoId param is required" });
    }

    if (timestamp_seconds === undefined) {
      return res.status(400).json({ message: "timestamp_seconds is required" });
    }

    const db = await initDB();

    const result = await db.run(
      "INSERT INTO bookmarks (video_id, timestamp_seconds, description) VALUES (?, ?, ?)",
      videoId,
      Number(timestamp_seconds),
      description ?? null
    );

    const bookmark = await db.get(
      "SELECT * FROM bookmarks WHERE id = ?",
      result.lastID
    );

    res.status(201).json({
      data: bookmark,
    });
  }
);

export const get_bookmarks = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({ message: "videoId param is required" });
    }

    const db = await initDB();
    const bookmarks = await db.all(
      "SELECT * FROM bookmarks WHERE video_id = ? ORDER BY timestamp_seconds",
      videoId
    );

    res.status(200).json({
      data: bookmarks,
    });
  }
);

export const delete_bookmark = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { bookmarkId } = req.params;

    if (!bookmarkId) {
      return res.status(400).json({ message: "bookmarkId param is required" });
    }

    const db = await initDB();
    const bookmark = await db.get(
      "SELECT * FROM bookmarks WHERE id = ?",
      bookmarkId
    );

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    await db.run("DELETE FROM bookmarks WHERE id = ?", bookmarkId);

    res.status(200).json({
      data: bookmark,
    });
  }
);

export const update_bookmark = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { bookmarkId } = req.params;
    const { description } = req.body;

    if (!bookmarkId) {
      return res.status(400).json({ message: "bookmarkId param is required" });
    }

    const db = await initDB();
    const bookmark = await db.get(
      "SELECT * FROM bookmarks WHERE id = ?",
      bookmarkId
    );

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    await db.run(
      "UPDATE bookmarks SET description = ? WHERE id = ?",
      description.trim(),
      bookmarkId
    );

    const updated = await db.get(
      "SELECT * FROM bookmarks WHERE id = ?",
      bookmarkId
    );

    res.status(200).json({
      data: updated,
    });
  }
);

export const delete_video = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({ message: "videoId param is required" });
    }

    const db = await initDB();
    const video = await db.get("SELECT * FROM videos WHERE id = ?", videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await db.run("DELETE FROM videos WHERE id = ?", videoId);

    await deleteFile(video.filename);

    res.status(200).json({
      data: video,
    });
  }
);

export const delete_section = CatchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { sectionId } = req.params;

    if (!sectionId) {
      return res.status(400).json({ message: "sectionId param is required" });
    }

    const db = await initDB();
    const section = await db.get(
      "SELECT * FROM sections WHERE id = ?",
      sectionId
    );

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const videos = await db.all(
      "SELECT * FROM videos WHERE section_id = ?",
      sectionId
    );

    for (const video of videos) {
      await deleteFile(video.filename);
    }

    await db.run("DELETE FROM videos WHERE section_id = ?", sectionId);

    await db.run("DELETE FROM sections WHERE id = ?", sectionId);

    res.status(200).json({
      data: section,
    });
  }
);

