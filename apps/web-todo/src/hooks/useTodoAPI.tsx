import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { createAPI } from "../service";

export const useTodoAPI = () => {
	const { getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

	// init Axios Instance for the API
	// ensure instance created only once.
	const api = useMemo(() => axios.create({
		// baseURL: import.meta.env.VITE_API_URL ?? "http://localhost"
        baseURL: "https://ec2-54-164-189-111.compute-1.amazonaws.com"
	}), []);

    const authorizationParams = {
        audience: "https://dev-unr521cluqvwc41c.us.auth0.com/api/v2/",
        scope: "openid_profile_email"
    }

	// Intercept requests to add authorization header
	useEffect(() => {
		const addAuthInterceptor = async () => {
			let authToken;
			try {
				authToken = await getAccessTokenSilently({
					authorizationParams
				});
			} catch (e) {
				authToken = await getAccessTokenWithPopup({
					authorizationParams
				});
			}

			api.interceptors.request.use(async (config) => {
				// If the token exists, add it to the headers
				if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
				return config;
			}, (error) => {
				return Promise.reject(error)
			})
		}
		addAuthInterceptor()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api]);

	// const service = createAPI(api);
	return {api, ...createAPI(api)};
}
