import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// import {getters} from './getters'
import { router } from './../router'
import { server } from './../router/routes/server'

let ms = require.context('./modules', false, /\.js$/)

let modules = {}
ms.keys().forEach(k => {
    let n = k.substring(2, k.length - 3)
    modules[n] = ms(k).default
})
export const store = new Vuex.Store({
    modules,
})