
import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
    Typography,
    DialogTitle
} from "@mui/material";
import { delete_section } from "../services/Videos";
import { Delete } from "@mui/icons-material";



interface sections_data {
    id: number
    name: string
    created_at: string
}

interface PropsData {
    sections: sections_data[]
    show_delete: boolean
    close_delete: () => void
}



export const DeleteSections = ({ sections, show_delete, close_delete }: PropsData) => {

    const handle_delete_video = async (section_id: number) => {
        try {

            await delete_section(section_id)

            close_delete()

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={show_delete} onClose={close_delete}>



            <DialogTitle> Videos Sections Menu</DialogTitle>

            <DialogContent>

                {sections.map((item) => (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                        <Typography sx={{ fontSize: "19px" }}>
                            {item.name}

                        </Typography>

                        <IconButton onClick={() => handle_delete_video(item.id)}>
                            <Delete />
                        </IconButton>

                    </Box>

                ))}



            </DialogContent>

        </Dialog>
    )
}
