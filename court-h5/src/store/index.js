import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		adminName: '',
	},
	mutations: {
		setToken(state, token) {
			console.info("setToken: " + token);
			state.token = token;
			localStorage.setItem("token", token);
		},

		setAdminName(state, adminName) { 
			state.adminName = adminName;
			localStorage.setItem("adminName", adminName);
		},
	},
	getters: {
		getToken: state => {
			state.token = localStorage.getItem("token");
			if (state.token == null) {
				state.token = "";
			}
			console.info("getToken: " + state.token);
			return state.token;
		},
		getAdminName: state => {
			state.adminName = localStorage.getItem("adminName");
			return state.adminName;
		}
	},
})

export default store
