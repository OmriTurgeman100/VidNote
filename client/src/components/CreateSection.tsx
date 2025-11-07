import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { create_section } from "../services/Videos";
import { useTheme } from "@mui/material/styles";
import { Done } from "@mui/icons-material";

interface PropsData {
    openUpload: boolean
    closeUpload: () => void

}

export const CreateSection = ({ openUpload, closeUpload }: PropsData) => {

    const [titleForm, setTitleForm] = useState<string>("")
    const theme = useTheme();

    const handle_title = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleForm(event.target.value);
    };

    const handle_create_section = async () => {
        try {

            await create_section(titleForm)

            closeUpload()



        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={openUpload} onClose={closeUpload}>

            <DialogTitle>
                Create Section
            </DialogTitle>

            <DialogContent>

                <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
                    <TextField
                        sx={{ width: "300px", backgroundColor: theme.palette.background.paper }}
                        id="outlined-basic"
                        label="Section Name"
                        variant="outlined"
                        value={titleForm}
                        onChange={handle_title}
                    />

                    <IconButton onClick={handle_create_section}>
                        <Done />
                    </IconButton>
                </Box>

            </DialogContent>

        </Dialog>
    )
}
