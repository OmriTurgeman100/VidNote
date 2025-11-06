import { get_sections } from "../services/Videos"
import { Box, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Sections = () => {
    const [sections, setSections] = useState<video_sections[]>([])
    const navigate = useNavigate()

    interface video_sections {
        id: number,
        name: string
        created_at: string
    }

    const fetch_sections = async () => {
        try {
            const response = await get_sections()

            setSections(response.data)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch_sections()
    }, [])

    return (
        <Box sx={{ height: "90vh", display: "flex", flexDirection: "column", alignItems: "center", margin: "25px" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>Video Sections</Typography>


            <Box sx={{ backgroundColor: "black", width: "700px", height: "fit-content", marginTop: "15px", display: "flex", gap: 2, flexWrap: "wrap", padding: 2 }}>
                {sections.map((item) => (

                    <Box sx={{backgroundColor: "white", width: "200px", height: "200px"}}> 

                        <Typography>{item.name}</Typography>

                    </Box>

                ))}
            </Box>



        </Box>
    )
}
