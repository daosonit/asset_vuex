<template>
    <div class="main-app min-height-100vh" v-loading="loading" element-loading-text="Đang tải dữ liệu..." empty-text=' '>
        <el-col :span="24" class="head-title">
            <el-col :span="4">Kết nối tài khoản Facebook</el-col>
        </el-col>
        <el-col :span="24"  style="height: 1px;background: #EEE; margin: 20px 0px"></el-col>
        <el-col :span="16" :offset="4">
            <a v-bind:href="loginUrl" @click="HandlerLoadding">
                <el-button type="primary"><i class="fa fa-facebook-official" aria-hidden="true"></i>&nbsp;Kết nối Facebook</el-button>
            </a>
        </el-col>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                error: null,
                loginUrl: null
            }
        },
        created () {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData',
            'loginUrl' : function() {
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }
        },
        methods: {
            fetchData () {
                this.loading = true

                if (this.$store.getters.getLinkFbAuth != null)
                {
                    this.loginUrl = this.$store.getters.getLinkFbAuth
                }
                else
                {
                    this.$store.dispatch('GET_FACEBOOK_CONNECT').then(response => {

                        this.loginUrl = this.$store.getters.getLinkFbAuth

                    }, error => {
                        
                    })
                }
                              
            },
            removeLink() {
                this.$store.state.linkFbAuth = null
            },
            HandlerLoadding() {
                this.loading = true
            }
        }
    }
</script>