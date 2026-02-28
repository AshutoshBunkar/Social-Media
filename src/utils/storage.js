/**
 * localStorage helper utility for persisting app state.
 */

const KEYS = {
    POSTS: "socialapp_posts",
    PROFILE: "socialapp_profile",
};

// ─── Posts ────────────────────────────────────────────

export function loadPosts(defaultPosts) {
    try {
        const stored = localStorage.getItem(KEYS.POSTS);
        if (stored) {
            const parsed = JSON.parse(stored);
            // If user deleted all posts, reset to defaults
            if (parsed.length === 0) {
                localStorage.removeItem(KEYS.POSTS);
                return defaultPosts.map((p) => ({
                    ...p,
                    comments: [],
                    isLiked: false,
                }));
            }
            // Ensure every post has a comments array
            return parsed.map((p) => ({
                ...p,
                comments: p.comments || [],
                isLiked: p.isLiked || false,
            }));
        }
    } catch {
        // corrupted data – fall back to defaults
    }
    // Seed default posts with comments array
    return defaultPosts.map((p) => ({
        ...p,
        comments: [],
        isLiked: false,
    }));
}

export function savePosts(posts) {
    try {
        localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
    } catch {
        console.warn("Failed to save posts to localStorage");
    }
}

// ─── Profile ──────────────────────────────────────────

const DEFAULT_PROFILE = {
    image: "/images/s1.png",
    name: "Ashutosh Bunkar",
    bio: "Software Developer | Tech Enthusiast",
};

export function loadProfile() {
    try {
        const stored = localStorage.getItem(KEYS.PROFILE);
        if (stored) return JSON.parse(stored);
    } catch {
        // corrupted data
    }
    return { ...DEFAULT_PROFILE };
}

export function saveProfile(profile) {
    try {
        localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch {
        console.warn("Failed to save profile to localStorage");
    }
}

// ─── Image helpers ────────────────────────────────────

/**
 * Convert a File object to a base64 data-URL string.
 * Returns a Promise that resolves with the data-URL.
 */
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
