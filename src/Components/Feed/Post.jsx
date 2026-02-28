import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import { Users } from "../../dummyData";
import { useState } from "react";
import { useProfile, CURRENT_USER_ID } from "../../context/ProfileContext";

const Post = ({ post, deletePost, toggleLike, addComment }) => {
  const { profile } = useProfile();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const isOwnPost = post.userId === CURRENT_USER_ID;

  // For own posts, use live profile data; for others, use dummyData
  const user = isOwnPost
    ? { profilePicture: profile.image, username: profile.name, userId: "@Ashutoshbunkar1987" }
    : Users.find((u) => u.id === post.userId) || {
      profilePicture: "/images/s1.png",
      username: "Unknown User",
      userId: "@unknown",
    };

  const shareHandle = () => {
    navigator.clipboard?.writeText(`Check out this post by ${user.username}!`)
      .then(() => alert("Post link copied to clipboard!"))
      .catch(() => alert("Post shared!"));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    const comment = {
      id: Date.now(),
      text: commentText.trim(),
      // Store userId so we can resolve name/avatar dynamically
      userId: CURRENT_USER_ID,
      username: profile.name,
      avatar: profile.image,
      date: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };
    addComment(post.id, comment);
    setCommentText("");
  };

  const comments = post.comments || [];

  // Resolve comment display: if a comment was made by the current user,
  // always show their latest profile pic/name (not the stale snapshot).
  const resolveComment = (c) => {
    // Match by userId, OR by missing userId (legacy comments made before this field existed)
    if (c.userId === CURRENT_USER_ID || c.userId === undefined) {
      return { ...c, username: profile.name, avatar: profile.image };
    }
    return c;
  };

  return (
    <div className="w-full bg-surface-light rounded-2xl shadow-soft border border-gray-100 overflow-hidden mb-6">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
              src={user.profilePicture}
              alt={user.username}
            />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-tight hover:underline cursor-pointer">{user.username}</span>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{post.date}</span>
              </div>
            </div>
          </div>
          {isOwnPost && (
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              onClick={() => deletePost(post.id)}
              title="Delete Post"
            >
              <RiDeleteBin6Line className="text-lg" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-4">
          {post.desc && <p className="text-gray-800 text-[15px] mb-4 whitespace-pre-wrap">{post.desc}</p>}
          {post.photo && (
            <div className="rounded-xl overflow-hidden border border-gray-100 max-h-[500px] flex items-center justify-center bg-gray-50">
              <img className="w-full h-auto object-contain max-h-[500px]" src={post.photo} alt="Post content" />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 py-3 border-b border-gray-100 mb-2">
          <div className="flex items-center gap-2">
            <FaHeart className={post.isLiked ? "text-red-500" : "text-gray-400"} />
            <span className="font-medium text-gray-700">{post.like}</span>
          </div>
          <div className="flex gap-4">
            <span
              className="hover:underline cursor-pointer font-medium"
              onClick={() => setShowComments(!showComments)}
            >
              {comments.length} comments
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-1 mt-1">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors ${post.isLiked ? "text-red-500 hover:bg-red-50" : "text-gray-500 hover:bg-gray-100"
              }`}
            onClick={() => toggleLike(post.id)}
          >
            <FaHeart className={post.isLiked ? "scale-110 transition-transform" : ""} />
            <span>Like</span>
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors ${showComments ? "text-primary-600 bg-primary-50" : "text-gray-500 hover:bg-gray-100"
              }`}
            onClick={() => setShowComments(!showComments)}
          >
            <FaRegComment className="text-lg" />
            <span>Comment</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={shareHandle}
          >
            <FaShare className="text-lg" />
            <span>Share</span>
          </button>
        </div>

        {/* Real Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {comments.length > 0 && (
              <div className="max-h-60 overflow-y-auto space-y-3 mb-4 scrollbar-hide">
                {comments.map((c) => {
                  const resolved = resolveComment(c);
                  return (
                    <div key={resolved.id} className="flex gap-3">
                      <img src={resolved.avatar || "/images/s1.png"} className="w-8 h-8 rounded-full object-cover shrink-0" alt={resolved.username} />
                      <div className="bg-gray-100 rounded-2xl px-4 py-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">{resolved.username}</span>
                          <span className="text-xs text-gray-400">{resolved.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-0.5">{resolved.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {comments.length === 0 && (
              <p className="text-sm text-gray-400 text-center mb-4">No comments yet. Be the first!</p>
            )}

            <div className="flex gap-3 items-center">
              <img src={profile.image} className="w-8 h-8 rounded-full object-cover shrink-0" alt="You" />
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitComment();
                }}
              />
              <button
                className="text-primary-600 font-bold text-sm hover:text-primary-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                disabled={!commentText.trim()}
                onClick={handleSubmitComment}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
