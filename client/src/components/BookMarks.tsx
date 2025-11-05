
import { Box, Typography, IconButton, TextField } from "@mui/material";
import type { RefObject } from "react";
import AddIcon from '@mui/icons-material/Add';
import { create_bookmark, get_bookmarks, update_bookmark, delete_bookmark } from "../services/Videos";
import { useState, useEffect } from "react";
import { Delete, Done } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from "@mui/material/styles";
import time from "../assets/time.svg"

interface book_marks {
    id: number | undefined;
    filename: string;
    videoRef: RefObject<HTMLVideoElement | null>;
}

interface video_book_marks {
    id: number
    video_id: number
    timestamp_seconds: number
    description: string
    created_at: string
}

export const BookMarks = ({ filename, videoRef, id }: book_marks) => {
    const [descriptionForm, setDescriptionForm] = useState<string>("")
    const [showCreateBookMarks, setShowCreateBookMarks] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>()
    const [videoBookMarks, setVideoBookMarks] = useState<video_book_marks[]>([])
    const [editBookMark, setEditBookMark] = useState<boolean>(false)
    const [bookMarkId, setBookMarkId] = useState<number>()
    const [refreshDelete, setRefreshDelete] = useState(false)
    const theme = useTheme();


    const handle_description = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionForm(event.target.value);
    };

    function handle_create_bookmark(): void {

        if (!videoRef.current) return;

        setCurrentTime(videoRef.current.currentTime);

        videoRef.current.pause();

        console.log("Bookmark at:", currentTime, "seconds");

        setShowCreateBookMarks(true);

    }

    const create_book_mark = async () => {
        try {
            if (!videoRef.current) return;


            if (videoRef.current && descriptionForm?.trim()) {
                await create_bookmark(id, currentTime, descriptionForm);
            }

            setShowCreateBookMarks(false)

            videoRef.current.play();

        } catch (error) {
            console.error(error)
        }
    }

    const fetch_video_book_marks = async () => {
        try {

            const response = await get_bookmarks(id as number)

            setVideoBookMarks(response.data)

        } catch (error) {
            console.error(error)
        }
    }

    function jump_to_bookmark(seconds: number) {
        if (!videoRef.current) return;

        videoRef.current.currentTime = seconds;

        videoRef.current.play();
    }

    function handle_edit_book_mark(id: number) {
        if (!videoRef.current) return;

        videoRef.current.pause();

        setEditBookMark(true)

        setBookMarkId(id)
    }

    const edit_book_mark = async () => {
        try {

            if (videoRef.current && descriptionForm?.trim()) {
                await update_bookmark(bookMarkId as number, descriptionForm)
            }

            setBookMarkId(undefined)

            setDescriptionForm('')

            setEditBookMark(false)

        } catch (error) {
            console.error(error)
        }
    }

    const delete_video_book_mark = async (id: number) => {
        try {
            await delete_bookmark(id)

            setRefreshDelete((prev) => !prev)


        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch_video_book_marks()
    }, [id, showCreateBookMarks, editBookMark, refreshDelete])

    return (
        <Box
            sx={{
                flex: 1,
                backgroundColor: "#f4f4f4",
                padding: 2,
                borderLeft: "1px solid #ddd",
                display: "flex",
                flexDirection: "column",
                overflow: "scroll"
            }}
        >

            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>

                <Typography variant="h6">
                    Bookmarks
                </Typography>


                {showCreateBookMarks ? (
                    <IconButton sx={{ backgroundColor: "#28bbff" }} onClick={create_book_mark}>
                        <Done sx={{ color: "white" }} />

                    </IconButton>
                ) : (

                    <IconButton sx={{ backgroundColor: "#28bbff" }} onClick={handle_create_bookmark}>
                        <AddIcon sx={{ color: "white" }} />
                    </IconButton>
                )}

            </Box>

            {showCreateBookMarks ? (
                <TextField
                    sx={{ width: "350px", backgroundColor: theme.palette.background.paper, mb: 2 }}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={descriptionForm}
                    onChange={handle_description}
                />
            ) : (
                null
            )}


            {editBookMark === false ? (

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    {videoBookMarks.map((item) => (
                        <Box sx={{
                            cursor: "pointer",
                            width: "100%",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            justifyContent: "flex-start",
                            padding: "10px",
                            backgroundColor: theme.palette.background.paper,
                            border: "1px solid rgba(33, 150, 243, 0.2)",
                            borderRadius: 3,
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                boxShadow: "0 6px 18px rgba(33, 150, 243, 0.25)",
                                transform: "translateY(-4px)",
                                border: "1px solid rgba(33, 150, 243, 0.6)",
                            },
                        }}>

                            <img style={{ height: "40px", width: "40px" }} src={time}></img>

                            <Box onClick={() => jump_to_bookmark(item.timestamp_seconds)} sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography>{item.description}</Typography>

                                <Typography>{item.timestamp_seconds}</Typography>

                            </Box>


                            <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>

                                <IconButton onClick={() => handle_edit_book_mark(item.id)} sx={{ marginLeft: "auto" }}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton onClick={() => delete_video_book_mark(item.id)}>
                                    <Delete />
                                </IconButton>

                            </Box>
                        </Box>
                    ))}
                </Box>

            ) : (null)}



            {editBookMark ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                    <TextField
                        sx={{ width: "350px", backgroundColor: theme.palette.background.paper, mb: 2 }}
                        id="outlined-basic"
                        label="Edit Bookmark"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={descriptionForm}
                        onChange={handle_description}
                    />


                    <IconButton onClick={edit_book_mark}>
                        <Done />
                    </IconButton>

                </Box>
            ) : (
                null
            )}



        </Box>
    )
}
