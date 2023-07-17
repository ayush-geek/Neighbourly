import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({
    title,
    description,
    image,
    username,
    time,
    id,
    isUser,
    tag,
}) {
    const navigate = useNavigate();
    const [showDescription, setShowDescription] = React.useState(false);

    const handleEdit = () => {
        navigate(`/blog-details/${id}`);
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
            if (data?.success) {
                toast.success("Blog Deleted");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Format timestamp to DD-MM-YYYY HH:mm
    const formattedTime = new Date(time).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Card
            sx={{
                width: "40%",
                margin: "auto",
                mt: 2,
                padding: 2,
                boxShadow: "5px 5px 10px #ccc",
                ":hover:": {
                    boxShadow: "10px 10px 20px #ccc",
                },
            }}
        >
            {isUser && (
                <Box display={"flex"}>
                    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <ModeEditIcon color="info" />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username}
                    </Avatar>
                }
                title={username}
                subheader={formattedTime} // Display formatted time
            />
            <CardMedia
                component="img"
                height="400px" // Set a fixed height to maintain the aspect ratio
                image={image}
                alt="Paella dish"
                sx={{
                    cursor: "pointer",
                    objectFit: "cover", // Maintain aspect ratio without stretching
                    width: "100%", // Make sure the image covers the entire width of the CardMedia
                }}
                onClick={() => setShowDescription(!showDescription)}
            />
            <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                    {title} {/* Use h5 for an attractive title */}
                </Typography>
                {showDescription && (
                    <Typography variant="body2" color="text.secondary">
                        Description: {description} {/* Use body2 for description */}
                    </Typography>
                )}
                <Typography variant="body2" color="text.primary">
                    #{tag} {/* Replace "Tag:" with "#" */}
                </Typography>
            </CardContent>
        </Card>
    );
}
