/**
 * Router for Facebook Manager
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Import App Components
 */

// Layout
import Layout from '../../containers/Layout.vue';

// Module
import FacebookConnect from '../../views/connect/Facebook.vue';
import FacebookProfile from '../../views/profile/FacebookProfile.vue';
import Dasboard from '../../views/profile/Dasboard.vue';


export default
{
    path: '/account',
    redirect: '/account/dashboard',
    component: Layout,
    children: [
        { name: 'connect-facebook', path: 'connect-facebook', component: FacebookConnect },
        { name: 'facebook-profile', path: 'facebook-profile', component: FacebookProfile },
        { name: 'dashboard', path: 'dashboard', component: Dasboard },
    ]
};