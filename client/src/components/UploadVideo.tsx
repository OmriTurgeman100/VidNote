import { upload_video } from "../services/Videos"
import { useState } from "react";
import {

    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PropsData {
    section_id: any
    show_upload: boolean
    close_upload: () => void
}

export const UploadVideo = ({ section_id, show_upload, close_upload }: PropsData) => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const theme = useTheme();


    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        await upload_video(section_id, file as File, title);

        close_upload()
    };

    return (
        <Dialog open={show_upload} onClose={close_upload}>
            <DialogTitle sx={{ textAlign: "center" }}> Upload Video </DialogTitle>
            <form onSubmit={handleUpload}>
                <DialogContent
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ width: "400px" }}
                    />
                    <Button variant="outlined" component="label" sx={{ color: theme.palette.text.primary }}>
                        Select File
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </Button>
                    {file && <Typography variant="body2">{file.name}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: theme.palette.text.primary }} onClick={close_upload}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Upload
                    </Button>
                </DialogActions>
            </form>

        </Dialog>

    )
}
