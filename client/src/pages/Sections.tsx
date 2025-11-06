import { get_sections } from "../services/Videos"
import { Box, Typography, TextField } from "@mui/material"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import play_icon from "../assets/play_icon.svg"
import { useTheme } from "@mui/material/styles";

interface video_sections {
    id: number,
    name: string
    created_at: string
}

export const Sections = () => {
    const [sections, setSections] = useState<video_sections[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const theme = useTheme();


    const fetch_sections = async () => {
        try {
            const response = await get_sections()

            setSections(response.data)

        } catch (error) {
            console.error(error)
        }
    }

    const handle_query_change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const sections_data = sections.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function handle_ref(): void {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    useEffect(() => {
        fetch_sections()
        handle_ref();
    }, [])

    return (
        <Box sx={{
            height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", background: "linear-gradient(135deg, #ffffff 0%, rgba(206, 236, 255, 1) 100%)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        }}>
            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    marginTop: "20px",
                    background: "linear-gradient(90deg, #28bbff 0%, #00a8ff 50%, #0078d7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Video Sections
            </Typography>



            <TextField
                inputRef={inputRef}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    width: "500px",
                    borderRadius: "35px",
                    padding: "10px 15px",
                    marginTop: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    "& .MuiInputBase-root": {
                        fontSize: "16px",
                        fontWeight: 400,
                    },
                    "& .MuiInputBase-input": {
                        padding: "0 10px",
                        color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "& .Mui-focused": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }}
                variant="outlined"
                value={searchQuery}
                onChange={handle_query_change}
                placeholder="Search..."
            />


            <Box sx={{ width: "700px", height: "fit-content", marginTop: "15px", display: "flex", gap: 2, flexWrap: "wrap", padding: 2 }}>
                {sections_data.map((item) => (

                    <Box onClick={() => navigate(`/sections/${item.id}`)} sx={{
                        backgroundColor: theme.palette.background.paper,
                        width: "200px",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        padding: "15px",
                        gap: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        },
                    }}>


                        <img style={{ height: "50px", width: "50px" }} src={play_icon}></img>

                        <Typography>{item.name}</Typography>

                    </Box>

                ))}
            </Box>



        </Box>
    )
}
