import { createContext, useContext, useState } from "react";
import { loadProfile, saveProfile, fileToBase64 } from "../utils/storage";

const ProfileContext = createContext(null);

export const CURRENT_USER_ID = 10; // Ashutosh Bunkar in dummyData

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(() => loadProfile());

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
        saveProfile(newProfile);
    };

    const updateAvatar = async (file) => {
        const base64 = await fileToBase64(file);
        const updated = { ...profile, image: base64 };
        updateProfile(updated);
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, updateAvatar }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const ctx = useContext(ProfileContext);
    if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
    return ctx;
}
