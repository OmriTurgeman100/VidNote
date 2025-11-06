import { NavLink, Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import logo from "../assets/navbar_logo.svg"

export const Navbar = () => {
    const theme = useTheme();

    return (
        <div className="root-layout">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    alignItems: "center",
                    backgroundColor: theme.palette.background.paper,
                    padding: "15px",
                    position: "sticky",
                    top: 0,
                    zIndex: theme.zIndex.appBar,
                }}
            >

                <Typography
                    sx={{
                        marginRight: "auto",
                        fontWeight: "bold",
                        fontSize: "20px",
                        background: "linear-gradient(90deg, #00B4DB, #0083B0, #006494)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    VIDNOTE
                </Typography>



                <NavLink to="/"> Home </NavLink>

                <NavLink to="/sections"> Sections </NavLink>

                <NavLink to="/about">About</NavLink>

            </Box>

            <main>
                <Outlet />
            </main>
        </div>
    );
};