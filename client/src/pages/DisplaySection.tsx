import { get_videos_by_section } from "../services/Videos"
import { useEffect, useState } from "react"
import { Box, IconButton, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { VideoPlayer } from "../components/VideoPlayer"
import { useTheme } from "@mui/material/styles";
import video from "../assets/video.svg"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { UploadVideo } from "../components/UploadVideo"
import { Settings } from "@mui/icons-material"
import { DeleteVideos } from "../components/DeleteVideos"

interface section_videos {
  id: number
  title: string
  filename: string
  created_at: string
}

export const DisplaySection = () => {
  const [sectionVideos, setSectionVideos] = useState<section_videos[]>([])
  const [FileName, setFileName] = useState<string>("")
  const [VideoId, setVideoId] = useState<number>()
  const [showUpload, setShowUpload] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const theme = useTheme();
  const { id } = useParams()



  const fetch_section_videos = async () => {
    try {
      const response = await get_videos_by_section(id)

      setSectionVideos(response.data)

      setFileName(response.data[0]["filename"])

      setVideoId(response.data[0]["id"])

    } catch (error) {
      console.error(error)
    }
  }

  function select_video(filename: string, video_id: number) {

    setFileName(filename)

    setVideoId(video_id)

  }

  useEffect(() => {
    fetch_section_videos()

  }, [id, showUpload, showDelete])

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f8f9fa"
      }}
    >

      <VideoPlayer filename={FileName} id={VideoId} ></VideoPlayer>


      <Box sx={{ width: "100%", display: "flex", gap: 1, alignItems: "center", padding: "15px", marginTop: "15px" }}>


        {sectionVideos.map((item) => (
          <Box key={item.id} onClick={() => select_video(item.filename, item.id)}
            sx={{
              cursor: "pointer",
              width: "fit-content",
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

            <img style={{ height: "50px", width: "50px" }} src={video}></img>

            <Typography sx={{ fontSize: "20px" }}>{item.title}</Typography>

          </Box>

        ))}
      </Box>


      <IconButton
        onClick={() => setShowUpload(true)}
        sx={{
          background: "linear-gradient(135deg, #00e0ff, #0078ff)",
          color: "white",
          width: 56,
          height: 56,
          position: "fixed",
          bottom: 24,
          right: 24,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #00c4ff, #0062cc)",
            transform: "scale(1.08)",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <FileUploadIcon sx={{ fontSize: 28 }} />
      </IconButton>

      <IconButton
        onClick={() => setShowDelete(true)}
        sx={{
          background: "linear-gradient(135deg, #00e0ff, #0078ff)",
          color: "white",
          width: 56,
          height: 56,
          position: "fixed",
          bottom: 24,
          right: 96,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #00c4ff, #0062cc)",
            transform: "scale(1.08)",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Settings sx={{ fontSize: 28 }} />
      </IconButton>


      <UploadVideo section_id={id} show_upload={showUpload} close_upload={() => setShowUpload(false)}></UploadVideo>

      <DeleteVideos videos={sectionVideos} show_delete={showDelete} close_delete={() => setShowDelete(false)}></DeleteVideos>



    </Box>
  )

}
