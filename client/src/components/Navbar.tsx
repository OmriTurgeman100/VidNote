import { NavLink, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/navbar_logo.svg"

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

                <img style={{ width: "200px", height: "40px", marginRight: "auto" }} src={logo}></img>

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