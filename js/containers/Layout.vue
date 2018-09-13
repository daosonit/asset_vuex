<template>
    <div>
        <div class="nav__menu"> 
            <header-account></header-account>
        </div>
        <div class="main">
            <nav-menu></nav-menu>
            <el-col :span="20" class="min-height-100vh container-app">
                <el-row :gutter="20" class="no-margin">
                    <router-view keep-alive></router-view>
                </el-row>
            </el-col>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import { store } from '../app';

    import Header from '../components/Header.vue';
    import NavMenu from '../components/NavMenu.vue';

    export default {
        data () {
            return {
                loading: false,
                error: null,
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch('GET_DATA_ATTRIBUTE_JOB')
            })
        },
        methods: {
            ...mapActions([
                'GET_DATA_ATTRIBUTE_JOB'
            ]),
        },
        components:{
            'header-account': Header,
            'nav-menu': NavMenu,
        }
    }
</script>