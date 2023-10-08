import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
        tag: "",
    });

    // input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/blog/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
                tag: inputs.tag || "General",
            });
            if (data?.success) {
                toast.success("Blog Created");
                navigate("/my-blogs");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    width: "70%",
                    maxWidth: "600px",
                    border: 3,
                    borderRadius: 10,
                    padding: 3,
                    margin: "auto",
                    boxShadow: "10px 10px 20px #ccc",
                    display: "flex",
                    flexDirection: "column",
                    mt: 5,
                    backgroundColor: "#f7f7f7",
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    color="#333"
                    mb={3}
                >
                    Create A Post
                </Typography>
                <InputLabel sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Title
                </InputLabel>
                <TextField
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    required
                />
                <InputLabel sx={{ fontSize: "16px", fontWeight: "bold", mt: 2 }}>
                    Description
                </InputLabel>
                <TextField
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                />
                <InputLabel sx={{ fontSize: "16px", fontWeight: "bold", mt: 2 }}>
                    Image URL
                </InputLabel>
                <TextField
                    name="image"
                    value={inputs.image}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    required
                />
                <InputLabel sx={{ fontSize: "16px", fontWeight: "bold", mt: 2 }}>
                    Tag
                </InputLabel>
                <TextField
                    name="tag"
                    value={inputs.tag}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <Box mt={3} display="flex" justifyContent="center">
                    <Button type="submit" color="primary" variant="contained">
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default CreateBlog;
