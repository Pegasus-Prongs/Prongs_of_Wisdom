import BlogPost from "./blogpost.types";
import blogPosts from './blog_data.json';

// Ensure the imported type matches the JSON structure
const posts: BlogPost[] = blogPosts;

export default posts;