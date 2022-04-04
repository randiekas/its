export default function ({ $axios }, inject) {
	// Create a custom axios instance
	// $auth.$storage.getUniversal("authToken")
	const api = $axios.create({
		headers: {"Authorization": localStorage.getItem("auth.authToken")}
	})
  
	// Set baseURL to something different
	api.setBaseURL(process.env.API_URL)
	// Inject to context as $api
	inject('api', api)
}