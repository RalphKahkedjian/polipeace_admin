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
      marginTop:'80px'
    }}>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>User ID:</strong> {post.username}</p>
          <p><strong>Description:</strong> {post.description}</p>
          {post.picture_url && (
            <img
              src={post.picture_url}
              alt={`Post ${post.id}`}
              style={{ width: '200px', marginTop: '10px' }}
            />
          )}
        </div>
      ))}
      <PostCard />
    </div>
  );
}
