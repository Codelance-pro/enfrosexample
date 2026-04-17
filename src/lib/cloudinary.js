import axios from 'axios';

// ----------------------------------------------------------------------------
// Cloudinary Configuration
// ----------------------------------------------------------------------------
// TODO: Replace these with your actual Cloudinary Cloud Name and Upload Preset.
// 1. Create a free account at https://cloudinary.com
// 2. Go to Settings -> Upload -> Add upload preset
// 3. Signing Mode: "Unsigned"
// 4. Save and copy the preset name.
// 5. Copy your Cloud Name from the dashboard.
// ----------------------------------------------------------------------------
const CLOUD_NAME = 'dx1ilsdlv';
const UPLOAD_PRESET = 'vendor_images';

export const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new Error("Image upload failed");
    }
};
