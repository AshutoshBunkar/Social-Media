import Share from "../Share/Share";
import Post from "./Post";
import { Posts as DefaultPosts } from "../../dummyData";
import { useState, useCallback } from "react";
import { loadPosts, savePosts } from "../../utils/storage";

const Feed = () => {
  const [posts, setPosts] = useState(() => loadPosts(DefaultPosts));

  // Helper that updates state AND persists
  const updatePosts = useCallback((updater) => {
    setPosts((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      savePosts(next);
      return next;
    });
  }, []);

  const addPost = (newPost) => {
    updatePosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = (id) => {
    updatePosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleLike = (id) => {
    updatePosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, like: p.isLiked ? p.like - 1 : p.like + 1 }
          : p
      )
    );
  };

  const handleAddComment = (postId, comment) => {
    updatePosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), comment], comment: (p.comment || 0) + 1 }
          : p
      )
    );
  };

  return (
    <div className="flex-1 px-4 py-6 md:px-8 max-w-3xl mx-auto w-full">
      <div className="space-y-6">
        <Share addPost={addPost} />
        <div className="space-y-6">
          {posts.map((p) => (
            <Post
              key={p.id}
              post={p}
              deletePost={handleDeletePost}
              toggleLike={handleToggleLike}
              addComment={handleAddComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
