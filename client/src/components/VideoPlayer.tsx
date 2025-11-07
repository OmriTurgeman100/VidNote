import { Box } from "@mui/material"
import { useRef } from "react"
import { BookMarks } from "./BookMarks"

interface video_player {
  id: number | undefined
  section_id?: number
  title?: string
  filename: string
  created_at?: string
}

export const VideoPlayer = ({ filename, id }: video_player) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (

    <Box
      sx={{
        height: "80%",
        width: "100%",
        display: "flex",
      }}
    >

      <Box sx={{ flex: 3, backgroundColor: '#14141B' }}>
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
          }}
          src={`http://localhost:3001/uploads/${filename}`}
          controls
        />
      </Box>

      <BookMarks filename={filename} id={id} videoRef={videoRef} />
    </Box>

  )
}
