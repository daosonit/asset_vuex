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
import Jobs from '../../views/jobs/Listing.vue';
import JobPublish from '../../views/jobs/ListingPublish.vue';


export default
{
    path: '/account',
    component: Layout,
    children: [
        { name: 'listing-job', path: 'jobs', component: Jobs},
        { name: 'listing-job-publish', path: 'jobs/publish', component: JobPublish},
    ]
};