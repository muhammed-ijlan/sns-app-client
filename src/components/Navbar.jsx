import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import axiosInstance from "../api/axiosConfig";

function Navbar() {

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post(`/auth/logout`);
            toast.success(res.data.message);
            dispatch(logout());
            navigate("/login");
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <Menu/> */}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Logo
                    </Typography>
                    {
                        currentUser &&
                        <Stack direction={"row"} gap={3} alignItems={"center"}>
                            {currentUser.firstName}
                            <Button color="error" variant="contained" onClick={handleLogout}>Logout</Button>
                        </Stack>
                    }
                    {
                        !currentUser &&
                        <Button color="success" variant="contained" >Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default Navbar