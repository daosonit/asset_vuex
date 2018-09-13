<template>
    <div class="main-app min-height-100vh" v-loading="loading" element-loading-text="Đang tải dữ liệu..." empty-text=' '>
        <el-col :span="24" class="head-title">
            <el-col :span="16">Tài khoản Facebook đã kết nối</el-col>
            <el-col :span="8" class="pull-right text-right">
                <el-button type="primary" size="small" icon="plus" @click="dialogFormGroupVisible = true">Thêm mới Group/Page</el-button>
            </el-col>
        </el-col>
        <el-col :span="24"  style="height: 1px;background: #EEE; margin: 20px 0px"></el-col>
        <el-col :span="20" :offset="2">
            <el-row v-if="userFacebookProfile" :gutter="20">
                <el-col :span="4">
                    <el-card :body-style="{ padding: '0px' }">
                        <img v-bind:src="userFacebookProfile.images.avatar" class="image">
                        <div style="padding: 14px;" class="text-center">
                            <span v-html="userFacebookProfile.name"></span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="20">
                    <el-row>
                        <el-table
                          :data="dataTable"
                          style="width: 100%">
                          <el-table-column
                            prop="group_id"
                            label="Group Id"
                            width="180">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="Tên Group">
                          </el-table-column>
                          <el-table-column
                            prop="link"
                            label="Link">
                          </el-table-column>
                          <el-table-column
                            label="Kích hoạt"
                            width="120">
                                <template scope="scope">
                                    <!-- <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="edit" size="small"></el-button>
                                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" icon="delete" size="small"></el-button> -->
                                    <el-switch on-text="" off-text="" v-model="scope.row.crawl_status" @change="hanleActiveCrawl(scope.row)"></el-switch>
                                </template>
                           </el-table-column>
                           <el-table-column
                            label="Lấy tin"
                            width="120">
                                <template scope="scope">
                                    <el-button @click="handleTryCrawl(scope.row)" type="warning" size="small">Lấy thử</el-button>
                                </template>
                           </el-table-column>
                        </el-table>
                        <div class="block text-right" style="margin-top: 20px">
                            <el-pagination
                              @current-change="handleCurrentChange"
                              :current-page="dataTablePaginator.current_page"
                              :page-size="dataTablePaginator.per_page"
                              layout="total, prev, pager, next"
                              :total="dataTablePaginator.total">
                            </el-pagination>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>

        <el-dialog title="Thêm mới Group/Page" v-model="dialogFormGroupVisible">
            <el-form :model="form" :label-position="labelPosition">
                <el-form-item label="Group/Page Id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-input v-model="form.user_id" type="hidden" class="hide"></el-input>
                <el-input v-model="form.user_facebook_profile_id" type="hidden" class="hide"></el-input>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormGroupVisible = false">Hủy</el-button>
                <el-button type="primary" :loading="loadingCreateGroup" @click="onSubmitCreateGroup">Hoàn thành</el-button>
            </span>
        </el-dialog>

        <el-dialog title="Dữ liệu Crawl Demo (25 bài mới nhất)" v-model="dialogTableVisible">
            <el-table 
            :data="gridData" 
            :default-sort = "{prop: 'created_time', order: 'descending'}"
            v-loading="loadingCrawl" 
            element-loading-text="Đang lấy dữ liệu từ Facebook..." 
            empty-text=' '>
                <el-table-column property="message" label="Message" width="300"></el-table-column>
                <el-table-column property="created_time" label="Tạo lúc"></el-table-column>
                <el-table-column property="from.name" label="Bởi"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>

    import {mapActions} from 'vuex'

    export default {
        data () {
            return {
                loading: false,
                loadingCrawl: false,
                error: null,
                userFacebookProfile: null,
                dialogFormGroupVisible: false,
                dataTable: [],
                dataTablePaginator: [],
                form: {
                    name: '',
                    link: '',
                    id: '',
                    user_id: 1,
                    user_facebook_profile_id: 1,
                },
                labelPosition: 'top',
                formLabelWidth: '150px',
                loadingCreateGroup: false,
                gridData: [],
                dialogTableVisible: false,
            }
        },
        computed :{
            
        },
        mounted () {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData',
            'dataTable': function () {
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }
        },
        methods: {
            fetchData () {
                this.loading = true
                // Lấy thông tin facebook profile
                if (this.$store.state.facebook_store.facebook_profile != null)
                {
                    this.userFacebookProfile = this.$store.state.facebook_store.facebook_profile
                }
                else
                {
                    this.$store.dispatch('GET_FACEBOOK_PROFILE').then(response => {

                    this.userFacebookProfile = this.$store.state.facebook_store.facebook_profile

                    }, error => {
                        
                    })
                }

                // Lấy danh sách group
                if (this.$store.state.facebook_store.first_list_group != null && (this.$route.query.page === 1 || this.$route.query.page == null))
                {
                    this.dataTable          = this.$store.state.facebook_store.first_list_group.data
                    this.dataTablePaginator = this.$store.state.facebook_store.first_list_group.meta.pagination
                }
                else
                {
                    this.$store.dispatch('GET_LIST_GROUP', {params: {page: this.$route.query.page}}).then(response => {

                        if (this.$store.state.facebook_store.list_group != null) {
                            this.dataTable          = this.$store.state.facebook_store.list_group.data
                            this.dataTablePaginator = this.$store.state.facebook_store.list_group.meta.pagination
                        }

                    }, error => {
                        
                    })
                }

            },

            handleCurrentChange(val) {
                this.$router.push({ name: 'facebook-profile', query: { page: val }})
            },

            hanleActiveCrawl(data)
            {
                this.$store.dispatch('ACTIVE_CRAWL', data).then(response => {
                    var title   = 'Bỏ kích hoạt'
                    var message = 'Bỏ kích hoạt lấy tin thành công'
                    if (this.$store.state.facebook_store.user_fb_group.status)
                    {
                        title   = 'Kích hoạt'
                        message = 'Kích hoạt lấy tin thành công'
                    }

                    this.$notify({
                        title: title,
                        message: message,
                        type: 'success'
                    });
                }, error => {
                    
                })
            },
            
            onSubmitCreateGroup()
            {
                this.loadingCreateGroup = true
                var userInfo = this.$store.getters.getUserInfo
                this.form.user_id = userInfo.id

                this.$store.dispatch('CREATE_GROUP', this.form).then(response => {
                    // Reset form
                    this.form = {
                        name: '',
                        link: '',
                        id: '',
                        user_id: 1,
                        user_facebook_profile_id: 1,
                    }

                    this.loadingCreateGroup = false
                    this.dialogFormGroupVisible = false
                    this.$notify({
                        title: 'Tạo mới Group',
                        message: 'Tạo mới một group thành công',
                        type: 'success'
                    });

                    this.fetchData()

                }, error => {
                    
                })

            },

            handleTryCrawl(data)
            {
                this.dialogTableVisible = true
                this.loadingCrawl = true
                this.gridData = []

                this.$store.dispatch('CRAWL_DATA_FACEBOOK_GROUP', data).then(response => {
                    this.gridData = this.$store.state.facebook_store.data_crawl_fb
                    this.loadingCrawl = false
                }, error => {
                    
                })
            }
        }
    }
</script>