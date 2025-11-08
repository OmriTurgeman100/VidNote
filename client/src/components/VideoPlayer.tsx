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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const previousRateRef = useRef<number>(1)

  const holdTimerRef = useRef<number | null>(null)
  const isMouseDownRef = useRef<boolean>(false)
  const holdActiveRef = useRef<boolean>(false)
  const suppressClickRef = useRef<boolean>(false)

  const HOLD_THRESHOLD = 150 // ms – adjust if you want

  const startHoldTimer = () => {
    const video = videoRef.current
    if (!video) return

    // Clear existing timer just in case
    if (holdTimerRef.current !== null) {
      clearTimeout(holdTimerRef.current)
    }

    holdTimerRef.current = window.setTimeout(() => {
      if (!isMouseDownRef.current || !videoRef.current) return

      // Now we consider this a "hold"
      holdActiveRef.current = true
      suppressClickRef.current = true

      previousRateRef.current = video.playbackRate || 1
      video.playbackRate = 2
    }, HOLD_THRESHOLD)
  }

  const clearHoldTimer = () => {
    if (holdTimerRef.current !== null) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLVideoElement>) => {
    // Only react to left button
    if (e.button !== 0) return

    isMouseDownRef.current = true
    holdActiveRef.current = false
    suppressClickRef.current = false

    startHoldTimer()
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (e.button !== 0) return

    isMouseDownRef.current = false
    clearHoldTimer()

    const video = videoRef.current
    if (!video) return

    // If we were in a hold, restore the previous rate
    if (holdActiveRef.current) {
      video.playbackRate = previousRateRef.current || 1
      // Don't reset suppressClickRef here – click handler will use it
    }
  }

  const handleMouseLeave = () => {
    isMouseDownRef.current = false
    clearHoldTimer()

    const video = videoRef.current
    if (!video) return

    if (holdActiveRef.current) {
      video.playbackRate = previousRateRef.current || 1
    }

    holdActiveRef.current = false
    suppressClickRef.current = false
  }

  const handleClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    // If we did a hold, cancel the click so it doesn't pause
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClickRef.current = false
      holdActiveRef.current = false
    }
    // If not a hold, this is just a normal click: let browser toggle play/pause
  }

  return (
    <Box
      sx={{
        height: "80%",
        width: "100%",
        display: "flex",
      }}
    >
      <Box sx={{ flex: 3, backgroundColor: "#14141B" }}>
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
          }}
          src={`http://localhost:3001/uploads/${filename}`}
          controls
          onMouseDown={handleMouseDown} // * A mouse button is pressed over an element
          onMouseUp={handleMouseUp} // * The mouse button is released over an element
          onMouseLeave={handleMouseLeave} // * The pointer is moved out of an element
          onClick={handleClick}
        />
      </Box>

      <BookMarks filename={filename} id={id} videoRef={videoRef} />
    </Box>
  )
}
