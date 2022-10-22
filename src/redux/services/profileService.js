/** @format */
import axios from "axios";
import { CONFIG } from "../../api/MatterApi";

const getProfile = async () => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_URL}/api/get-profile/`,
		CONFIG,
	);

	return response.data;
};

const profileService = {
	getProfile,
};

export default profileService;
