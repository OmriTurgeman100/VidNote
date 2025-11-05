
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  DialogTitle
} from "@mui/material";
import { delete_video } from "../services/Videos";
import { Delete } from "@mui/icons-material";


interface section_videos {
  id: number
  title: string
  filename: string
  created_at: string
}

interface PropsData {
  videos: section_videos[]
  show_delete: boolean
  close_delete: () => void
}


export const DeleteVideos = ({ videos, show_delete, close_delete }: PropsData) => {

  const handle_delete_video = async (video_id: number) => {
    try {

      await delete_video(video_id)

      close_delete()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={show_delete} onClose={close_delete}>



      <DialogTitle> Videos Settings Menu</DialogTitle>

      <DialogContent>

        {videos.map((item) => (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            <Typography sx={{ fontSize: "19px" }}>
              {item.title}

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
