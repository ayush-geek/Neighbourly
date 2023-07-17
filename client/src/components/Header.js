import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    AppBar,
    Toolbar,
    Button,
    Typography,
    Tabs,
    Tab,
    useMediaQuery,
    styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const StyledAppBar = styled(AppBar)({
    backgroundColor: "#2196f3",
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
    "& .MuiTabs-indicator": {
        backgroundColor: "white",
    },
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

const Header = () => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");

    const [value, setValue] = useState();

    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            toast.success("Logout Successfully");
            navigate("/login");
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledAppBar position="sticky">
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Neighbourly
                </Typography>

                {isLogin && !isSmallScreen && (
                    <StyledTabs
                        textColor="inherit"
                        value={value}
                        onChange={(e, val) => setValue(val)}
                        centered
                    >
                        <Tab label="Posts" component={Link} to="/blogs" />
                        <Tab label="My Post" component={Link} to="/my-blogs" />
                        <Tab label="Create Post" component={Link} to="/create-blog" />
                    </StyledTabs>
                )}

                <Box sx={{ display: "flex" }}>
                    {!isLogin && (
                        <>
                            <Button
                                sx={{ marginX: 1, color: "white" }}
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                sx={{ marginX: 1, color: "white" }}
                                component={Link}
                                to="/register"
                            >
                                Register
                            </Button>
                        </>
                    )}
                    {isLogin && (
                        <Button
                            onClick={handleLogout}
                            sx={{ marginX: 1, color: "white" }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;
