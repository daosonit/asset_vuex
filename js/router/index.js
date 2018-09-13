import Vue from 'vue'
import Router from 'vue-router'

/**
 * Import routers list module
 */
import AccountFacebookRouter from './account/facebook'
import AccountJobRouter from './account/job'

Vue.use(Router)

const routeLists = []
const routes = routeLists.concat(
    AccountFacebookRouter,
    AccountJobRouter
)

export default new Router({ 
    routes: routes,
    mode: 'history'
})