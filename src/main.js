import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        data: [],
        names:[],
        modal:false,
        vpis:'default',
    },
    mutations: {
        addItem(state, newItem) {
            state.data.push(newItem)
        },
        clearData(state){
            state.data = []
        },
        clearNames(state){
            state.names = []
        },
        addName(state, newName) {
            state.names.push(newName)
        },
        editModal(state,newStatus){
            state.modal = newStatus
        },
        editVpis(state,newVpis){
            state.vpis = newVpis
        },
    },
});

createApp(App).use(store).mount('#app')
