import colors from 'vuetify/es5/util/colors'

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - ITS',
		title: 'Intellegence Tutoring System',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		],
		script: [
			{ src: 'https://cdn.jsdelivr.net/npm/@wiris/mathtype-generic@7.28.1/wirisplugin-generic.min.js' }
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/api.js', mode: 'client' },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
		'@nuxtjs/auth-next',
		'@nuxtjs/moment',
	],
	auth: {
		// Options
		redirect: {
			login: '/',
			logout: '/',
			callback: '/',
			home: '/apps/beranda'
		},
		strategies: {
			local: { 
				token: {
					property: 'data.token',
					global: true,
					required: true,
					type: 'Bearer'
				},
				user: {
					property: 'data',
					  autoFetch: true
				},
				endpoints: {
					login: { 
						url: `${process.env.API_URL}/akun/masuk/scola`, 
					},
					logout: false,
					user: {
						url: `${process.env.API_URL}/akun/info`, 
						propertyName: 'dataasdfsdf',
					},
				},
			},
			google: {
				clientId: '459074254974-e0l81r9tif92osj98ksurom0jq9v4hcc.apps.googleusercontent.com',
				endpoints: {
					logout: `${process.env.FRONTEND_URL}`
				},
				redirectUri: `${process.env.FRONTEND_URL}/masuk`,
				responseType: 'token id_token',
				codeChallengeMethod: '',
			},
		}
	},
	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			name: 'ITS',
			short_name: 'ITS',
			description: 'Intellegence Tutoring System',
			lang: 'en',
		}
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
		dark: false,
		themes: {
			dark: {
			primary: colors.blue.darken2,
			accent: colors.grey.darken3,
			secondary: colors.amber.darken3,
			info: colors.teal.lighten1,
			warning: colors.amber.base,
			error: colors.deepOrange.accent4,
			success: colors.green.accent3
			},
			light:{
				primary:'#4268F6'
			}
		}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	},

	env: {
		API_URL: process.env.API_URL,
		// FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
		FRONTEND_URL: process.env.FRONTEND_URL,
	},
}
