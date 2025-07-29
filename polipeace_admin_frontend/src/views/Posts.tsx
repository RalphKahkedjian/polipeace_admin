import { useEffect, useState } from "react";
import axiosClient from "../Services/axiosClient";
import { Post } from "../models/Post";
import PostCard from "../components/Posts/PostCard";


export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axiosClient.get('/posts')
      .then(({ data }) => {
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
          data.posts.forEach((post: any) => {
          console.log("Username:", post.user.name);
          });
        }
      })
      .catch((err) => {
        console.log("An error occurred: ", err);
      });
  }, []);

  return (
    <div style={{
      marginTop:'80px',
    }}>
      {posts.map((post) => (
        <div key={post.id} style={{padding: "30px", marginBottom: "30px" }}>
            <PostCard description={post.description} created_at={new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} username={post.user.name} picture_url={post.picture_url} />
        </div>
      ))}
    </div>
  );
}
