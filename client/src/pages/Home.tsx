import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.light})`,
                overflow: "hidden",
                position: "relative",
            }}
        >

            <Box
                component={motion.div}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                sx={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: theme.palette.primary.main,
                    opacity: 0.1,
                    top: 100,
                    left: -100,
                }}
            />
            <Box
                component={motion.div}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 7, repeat: Infinity }}
                sx={{
                    position: "absolute",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: theme.palette.secondary.main,
                    opacity: 0.1,
                    bottom: -120,
                    right: -100,
                }}
            />


            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        mb: 3,
                        fontSize: { xs: "2rem", md: "3rem" },
                    }}
                >
                    Welcome to{" "}
                    <Box
                        component="span"
                        sx={{
                            background: "linear-gradient(90deg, #2196f3, #00bcd4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        VidNote
                    </Box>
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        opacity: 0.8,
                        mb: 4,
                    }}
                >
                    Create bookmarks on videos, organize them into sections, and more.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayCircleOutlineIcon />}
                    onClick={() => navigate("/sections")}
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.2,
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                >
                    Get Started
                </Button>
            </motion.div>
        </Box>
    );
};
