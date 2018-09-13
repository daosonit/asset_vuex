<template>
    <div class="main-app min-height-100vh" v-loading="loading" element-loading-text="Đang tải dữ liệu..." empty-text=' '>
        <el-col :span="24" class="head-title">
            <el-col :span="16">Danh sách công việc Crawl</el-col>
        </el-col>
        <el-col :span="24"  style="height: 1px;background: #EEE; margin: 20px 0px"></el-col>
        <el-col :span="22" :offset="1">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="box-search">
                        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                          <el-form-item label="Tiêu đề">
                            <el-input v-model="formSearch.title" placeholder="Tiêu đề" style="width: 300px"></el-input>
                          </el-form-item>
                          <el-form-item label="Thời gian đăng">
                            <el-date-picker
                              v-model="formSearch.timeSend"
                              type="daterange"
                              placeholder="Chọn 1 khoảng thời gian">
                            </el-date-picker>
                          </el-form-item><el-form-item>
                            <el-button type="primary" icon="search" @click="onSubmitSearch">Tìm kiếm</el-button>
                          </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="24">
                    <el-row>
                        <el-table
                          :data="dataTable"
                          :default-sort = "{prop: 'time_send', order: 'descending'}"
                          empty-text=' '
                          style="width: 100%">
                          <el-table-column
                            label="Tiêu đề"
                            width="180">
                            <template scope="scope">
                                <p v-html="scope.row.title" class="cap_title"></p>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="Nội dung"
                            width="300">
                            <template scope="scope">
                                <p v-html="scope.row.raw_message_slpit"></p>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="Thông tin đăng"
                            width="300">
                            <template scope="scope">
                                <div class="extra_info">
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            <strong>Nguồn:</strong>
                                        </el-col>
                                        <el-col :span="14">
                                            <i class="fa fa-facebook-official" aria-hidden="true"></i>
                                            <a v-bind:href="scope.row.extra_info.to.links.url" v-html="scope.row.extra_info.to.name" target="_blank"></a>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            <strong>Công ty:</strong>
                                        </el-col>
                                        <el-col :span="14">
                                            <span v-html="scope.row.company" class="cap_all"></span>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            <strong>Người gửi:</strong>
                                        </el-col>
                                        <el-col :span="14">
                                            <a v-bind:href="scope.row.extra_info.from.links.url" v-html="scope.row.extra_info.from.name" target="_blank"></a>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            <strong>Email:</strong>
                                        </el-col>
                                        <el-col :span="14">
                                            <span v-html="scope.row.email + '&nbsp;'"></span>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            <strong>Số ĐT:</strong>
                                        </el-col>
                                        <el-col :span="14">
                                            <span v-html="scope.row.phone + '&nbsp;'"></span>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            <strong>Đăng lúc:</strong>
                                        </el-col>
                                        <el-col :span="14">
                                            <span v-html="scope.row.time_send + '&nbsp;'"></span>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            <strong>Mức lương:</strong>
                                        </el-col>
                                        <el-col :span="14">
                                            <span v-html="scope.row.salary_text + '&nbsp;'" class="salary"></span>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="24">
                                        <el-col :span="10" class="text-right">
                                            &nbsp;
                                        </el-col>
                                        <el-col :span="14">
                                            <el-tag
                                              :type="scope.row.status_text"
                                              close-transition>{{scope.row.status_label}}</el-tag>
                                        </el-col>
                                    </el-row>
                                </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="Tác vụ">
                            <template scope="scope">
                                <div class="text-center">
                                    <p><el-button v-if="scope.row.status !== 1" type="default" icon="upload2" @click="handlePublishJob(scope.row)">Duyệt tin</el-button></p>
                                    <p><el-button v-if="scope.row.status !== 2" type="danger" icon="delete2" :loading="loadingMarkSpam" @click="handleMarkSpamJob(scope.row)">Spam</el-button></p>
                                </div>
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

        <el-dialog 
            title="Duyệt tin crawl" 
            v-model="dialogFormGroupVisible" 
            size="large" 
            top="5%">
            <el-form :model="form" :label-position="labelPosition">
                <el-row :gutter="24">
                    <el-col :span="12" style="background: #EEE;padding: 15px;">
                        <el-form-item label="" :label-width="formLabelWidth">
                            <p>
                                <strong>Nguồn:&nbsp;</strong>
                                <i class="fa fa-facebook-official" aria-hidden="true"></i>
                                <a v-bind:href="form.source_link" v-html="form.source_name" target="_blank"></a>
                                <strong>Người gửi:&nbsp;</strong>
                                <a v-bind:href="form.from_link" v-html="form.from_name" target="_blank"></a>
                            </p>
                            <!-- <p v-html="form.raw_message" style="color: #333;" @mouseup="copyText()"  @contextmenu.prevent="$refs.ctxMenu.open"></p> -->
                            <p v-html="form.raw_message" style="color: #333;"></p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Tiêu đề:" :label-width="formLabelWidth">
                            <el-input v-model="form.title" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Nghành nghề:" :label-width="formLabelWidth">
                            <el-select 
                                v-model="form.valueCareer" 
                                multiple 
                                filterable 
                                placeholder="- Chọn nghành nghề -">
                                <el-option
                                  v-for="item in career"
                                  :label="item.label"
                                  :value="item.value"
                                  style="width: 100%">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="Mức lương:" :label-width="formLabelWidth">
                                    <el-select 
                                        v-model="form.valueSalary" 
                                        placeholder="- Chọn mức lương -"
                                        style="width: 100%">
                                        <el-option
                                          v-for="item in salary"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label=" " :label-width="formLabelWidth">
                                    <strong v-html="form.salary_text" style="margin-top: 5px;display: inline-block"></strong>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="Loại hình công việc:" :label-width="formLabelWidth">
                                    <el-select v-model="form.valueJobType" placeholder="- Chọn loại hình công việc -">
                                        <el-option
                                          v-for="item in jobTypeOptions"
                                          :label="item.label"
                                          :value="item.value"
                                          style="width: 100%">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Kinh nghiệm:" :label-width="formLabelWidth">
                                    <el-select v-model="form.valueExperience" placeholder="- Chọn kinh nghiệm -">
                                        <el-option
                                          v-for="item in experience"
                                          :label="item.label"
                                          :value="item.value"
                                          style="width: 100%">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="Cấp bậc:" :label-width="formLabelWidth">
                                    <el-select v-model="form.valueRank" placeholder="- Chọn cấp bậc -">
                                        <el-option
                                          v-for="item in rank"
                                          :label="item.label"
                                          :value="item.value"
                                          style="width: 100%">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Trình độ học vấn:" :label-width="formLabelWidth">
                                    <el-select v-model="form.valueEducation" placeholder="- Chọn trình độ học vấn -">
                                        <el-option
                                          v-for="item in education"
                                          :label="item.label"
                                          :value="item.value"
                                          style="width: 100%">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="Mô tả công việc:" :label-width="formLabelWidth">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 4}"
                              v-model="form.description">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Quyền lợi được hưởng:" :label-width="formLabelWidth">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 4}"
                              v-model="form.benefit">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Yêu cầu công việc:" :label-width="formLabelWidth">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 4}"
                              v-model="form.job_requirements">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Yêu cầu hồ sơ:" :label-width="formLabelWidth">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 4}"
                              v-model="form.cv_requirements">
                            </el-input>
                        </el-form-item>
                        <el-col :span="24"  style="height: 1px;background: #DDD; margin: 20px 0px"></el-col>
                        <el-form-item label="Công ty:" :label-width="formLabelWidth">
                            <el-input v-model="form.company" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="Số ĐT:" :label-width="formLabelWidth">
                                    <el-input v-model="form.phone" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Email:" :label-width="formLabelWidth">
                                    <el-input v-model="form.email" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-input v-model="form.user_id" type="hidden" class="hide"></el-input>
                <el-input v-model="form.user_facebook_profile_id" type="hidden" class="hide"></el-input>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormGroupVisible = false">Hủy</el-button>
                <el-button type="primary" :loading="loadingPublish" @click="onSubmitPublish">Hoàn thành</el-button>
            </span>
        </el-dialog>

        <context-menu id="context-menu" ref="ctxMenu">
            <li class="ctx-header"><i class="icon-docs icons"></i>&nbsp;Công cụ hỗ trợ nhập</li>
            <li class="ctx-item" @click="copyInfoJob('title')">Copy tiêu đề</li>
            <li class="ctx-item" @click="copyInfoJob('company')">Copy công ty</li>
            <li class="ctx-item" @click="copyInfoJob('description')">Copy mô tả công việc</li>
            <li class="ctx-item" @click="copyInfoJob('benefit')">Copy quyền lợi</li>
            <li class="ctx-item" @click="copyInfoJob('job_requirements')">Copy yêu cầu công việc</li>
            <li class="ctx-item" @click="copyInfoJob('cv_requirements')">Copy yêu cầu hồ sơ</li>
        </context-menu>

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
  .el-table .cell {
      word-break: break-word;
      padding: 10px 15px;
  }
  .ctx-menu, .ctx-header {
      font-size: 1.4rem!important;
  }
  .el-select {
    width: 100%;
  }
</style>

<script>

    import {mapActions} from 'vuex'
    import contextMenu from 'vue-context-menu'

    function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      var month = date.getMonth()+1;
      var day   = date.getDate();
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return date.getFullYear() + "-" + month + "-" + day;
    }

    export default {
        data () {
            return {
                loading: false,
                loadingPost: false,
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
                    raw_message: null,
                    title: null,
                    company: null,
                    phone: null,
                    email: null,
                    salary: null,
                    salary_text: null,
                    from_link: null,
                    from_name: null,
                    source_link: null,
                    source_name: null,
                    valueJobType: '',
                    valueExperience: '',
                    valueRank: '',
                    valueEducation: '',
                    valueSalary: '',
                    valueCareer: [],
                    benefit: null,
                    description: null,
                    job_requirements: null,
                    cv_requirements: null,
                    fb_content_id: 0
                },
                formSearch: {
                    timeSend: ''
                },
                jobTypeOptions: [],
                experience: [],
                rank: [],
                education: [],
                career: [],
                salary: [],
                labelPosition: 'top',
                formLabelWidth: '150px',
                loadingPublish: false,
                loadingMarkSpam: false,
                dialogTableVisible: false,
                temp_text: null,
                timeSend: ''
            }
        },
        computed :{
            
        },
        created () {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData',
        },
        methods: {
            fetchData () {
                this.loading = true
                this.dataTable = [];

                var params = {
                    params: {
                        page: this.$route.query.page, 
                        type: this.$route.query.type,
                        title: this.$route.query.title,
                        time_start: this.$route.query.time_start,
                        time_end: this.$route.query.time_end,
                    }
                }
                if (this.$route.query.title != '') {
                    this.formSearch.title = this.$route.query.title
                }
                // Lấy danh sách Job
                this.$store.dispatch('GET_LIST_JOB', params).then(response => {

                    if (this.$store.state.job_store.list_job != null) {
                        this.dataTable          = this.$store.state.job_store.list_job.data
                        this.dataTablePaginator = this.$store.state.job_store.list_job.meta.pagination
                    }

                    setTimeout(() => {
                        this.loading = false;
                    }, 300);

                }, error => {
                    
                })

            },

            handleCurrentChange(val) {
                var dateStart = new Date(this.formSearch.timeSend[0])
                var timeStart = formatDate(dateStart)
                var dateEnd = new Date(this.formSearch.timeSend[1])
                var timeEnd = formatDate(dateEnd)

                var query = { 
                    page: val, 
                    type: this.$route.query.type,
                    title: this.formSearch.title
                }
                if (!(this.formSearch.timeSend === '' || this.formSearch.timeSend[0] === null)) {
                    query.time_start = timeStart
                    query.time_end = timeEnd
                } else {
                    delete query.time_start
                    delete query.time_end
                    this.formSearch.timeSend = ''
                }
                    
                this.$router.push({ name: 'listing-job', query: query})
            },

            handlePublishJob(data) {
                this.dialogFormGroupVisible = true
                // Set form data
                this.form.raw_message   = data.raw_message
                this.form.title         = data.title
                this.form.company       = data.company
                this.form.phone         = data.phone
                this.form.email         = data.email
                this.form.salary        = data.salary
                this.form.salary_text   = data.salary_text
                this.form.from_link     = data.extra_info.from.links.url
                this.form.from_name     = data.extra_info.from.name
                this.form.source_link   = data.extra_info.to.links.url
                this.form.source_name   = data.extra_info.to.name
                this.form.fb_content_id = data.id
                // Set Attr Job
                this.jobTypeOptions = this.$store.getters.getDataAttrJob.model
                this.experience     = this.$store.getters.getDataAttrJob.experience
                this.rank           = this.$store.getters.getDataAttrJob.rank
                this.education      = this.$store.getters.getDataAttrJob.education
                this.career         = this.$store.getters.getDataAttrJob.category
                this.salary         = this.$store.getters.getDataAttrJob.salary
            },

            handleMarkSpamJob(data) {
                this.loadingMarkSpam = true
                this.$store.dispatch('MARK_SPAM_JOB_CRAWL', data).then(response => {
                    var statusMark = this.$store.getters.getStatusMarkSpamJob

                    var title   = 'Đánh dấu tin spam'
                    var message = 'Đánh dấu tin spam không thành công'
                    var type    = 'error'
                    if (statusMark.code === 200)
                    {
                        message = 'Đánh dấu tin spam thành công'
                        type    = 'success'
                    }

                    this.$notify({
                        title: title,
                        message: message,
                        type: type
                    });
                    this.loadingMarkSpam = false
                    this.fetchData()

                }, error => {
                    
                })
            },

            onSubmitPublish() {
                this.loadingPublish = true
                var userInfo = this.$store.getters.getUserInfo

                var dataPost = {
                    title: this.form.title,
                    career: this.form.valueCareer,
                    salary: this.form.valueSalary,
                    job_type: this.form.valueJobType,
                    experience: this.form.valueExperience,
                    rank: this.form.valueRank,
                    education: this.form.valueEducation,
                    description: this.form.description,
                    benefit: this.form.benefit,
                    job_requirements: this.form.job_requirements,
                    cv_requirements: this.form.cv_requirements,
                    company: this.form.company,
                    contact_name: this.form.name,
                    contact_email: this.form.email,
                    contact_phone: this.form.phone,
                    fb_content_id: this.form.fb_content_id,
                    user_id_publish: userInfo.id
                }
                this.$store.dispatch('PUBLISH_JOB_CRAWL', dataPost).then(response => {
                    this.loadingPublish = false
                    this.dialogFormGroupVisible = false

                    var title   = 'Duyệt tin'
                    var message = 'Duyệt tin thành công'
                    var type    = 'success'

                    this.$notify({
                        title: title,
                        message: message,
                        type: type
                    });

                    this.fetchData()

                }, error => {
                    
                })
            },

            copyInfoJob(type)
            {
                if (type === 'title')
                {
                    this.form.title = this.temp_text
                }
                if (type === 'company')
                {
                    this.form.company = this.temp_text
                }
                if (type === 'benefit')
                {
                    this.form.benefit = this.temp_text
                }
                if (type === 'description')
                {
                    this.form.description = this.temp_text
                }
                if (type === 'job_requirements')
                {
                    this.form.job_requirements = this.temp_text
                }
                if (type === 'cv_requirements')
                {
                    this.form.cv_requirements = this.temp_text
                }
            },

            getSelectionText() {
                var text = "";
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type != "Control") {
                    text = document.selection.createRange().text;
                }
                return text;
            },

            copyText() {
                this.temp_text = this.getSelectionText();
            },

            onSubmitSearch () {
                var dateStart = new Date(this.formSearch.timeSend[0])
                var timeStart = formatDate(dateStart)
                var dateEnd = new Date(this.formSearch.timeSend[1])
                var timeEnd = formatDate(dateEnd)

                var query = { 
                    page: this.$route.query.page, 
                    type: this.$route.query.type,
                    title: this.formSearch.title
                }
                if (!(this.formSearch.timeSend === '' || this.formSearch.timeSend[0] === null)) {
                    query.time_start = timeStart
                    query.time_end = timeEnd
                } else {
                    delete query.time_start
                    delete query.time_end
                    this.formSearch.timeSend = ''
                }
                    
                this.$router.push({ name: 'listing-job', query: query})
            }
        },

        components:{
            'context-menu': contextMenu
        }
    }
</script>