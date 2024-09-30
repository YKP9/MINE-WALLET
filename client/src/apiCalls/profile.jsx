import { axiosInstance } from ".";

// Edit & Update Profile

const EditProfile = async (payload) => {
    try {
        const { data } = await axiosInstance.put(
            "/api/v1/users/update-account-details",
            payload
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export { EditProfile }