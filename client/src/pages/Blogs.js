import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("All"); // Default selected tag is "All"

    // Get all blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get("/api/v1/blog/all-blog");
            if (data?.success) {
                setBlogs(data?.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Get available tags
    const getAvailableTags = async () => {
        try {
            const { data } = await axios.get("/api/v1/tags");
            setAvailableTags(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
        getAvailableTags();
    }, []);

    // Handle tag selection
    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    return (
        <div>
            {/* Tag filter section */}
            <div>
                <h3>Filter by Tags:</h3>
                <select value={selectedTag} onChange={handleTagChange}>
                    <option value="All">All</option> {/* Change default value to "All" */}
                    {availableTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display blogs here based on selectedTag */}
            <div>
                {blogs &&
                    blogs
                        .filter((blog) => selectedTag === "All" || blog.tag === selectedTag) // Apply tag filtering
                        .map((blog) => (
                            <BlogCard
                                key={blog._id}
                                id={blog._id}
                                isUser={localStorage.getItem("userId") === blog.user?._id}
                                title={blog.title}
                                description={blog.description}
                                image={blog.image}
                                username={blog.user?.username}
                                time={blog.createdAt}
                                tag={blog.tag}
                            />
                        ))}
            </div>
        </div>
    );
};

export default Blogs;
