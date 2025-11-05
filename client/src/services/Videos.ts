// src/api/videos.ts 
import api from "./Http";

export const get_sections = async () => {
    const response = await api.get("/api/v1/videos/sections");
    return response.data;
};

export const create_section = async (name: string) => {
    const response = await api.post("/api/v1/videos/sections", { name });
    return response.data;
};

export const delete_section = async (sectionId: string | number) => {
    const response = await api.delete(
        `/api/v1/videos/sections/${sectionId}/videos`
    );
    return response.data;
};

export const get_videos_by_section = async (
    sectionId: string | undefined
) => {
    const response = await api.get(
        `/api/v1/videos/sections/${sectionId}/videos`
    );
    return response.data;
};

export const upload_video = async (
    sectionId: string | number,
    file: File,
    title: string
) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const response = await api.post(
        `/api/v1/videos/sections/${sectionId}/videos`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const delete_video = async (videoId: string | number) => {
    const response = await api.delete(`/api/v1/videos/${videoId}`);
    return response.data;
};

export const get_bookmarks = async (videoId: string | number) => {
    const response = await api.get(`/api/v1/videos/${videoId}/bookmarks`);
    return response.data;
};

export const create_bookmark = async (
    videoId: number | undefined,
    timestamp_seconds: number | undefined,
    description: string,

) => {
    const response = await api.post(
        `/api/v1/videos/${videoId}/bookmarks`,
        {
            timestamp_seconds: timestamp_seconds,
            description: description
        }
    );
    return response.data;
};

export const delete_bookmark = async (bookmarkId: string | number) => {
    const response = await api.delete(
        `/api/v1/videos/bookmarks/${bookmarkId}`
    );
    return response.data;
};

export const update_bookmark = async (
    bookmarkId: string | number,
    description: string
) => {
    const response = await api.patch(
        `/api/v1/videos/bookmarks/${bookmarkId}`,
        { description }
    );
    return response.data;
};
