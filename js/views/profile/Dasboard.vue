<template>
    <div class="main-app min-height-100vh" v-loading="loading" element-loading-text="Đang tải dữ liệu..." empty-text=' '>
        <el-col :span="24" class="head-title">
            <el-col :span="16">Bảng điều khiển</el-col>
        </el-col>
        <el-col :span="24"  style="height: 1px;background: #EEE; margin: 20px 0px"></el-col>
        <el-col :span="22" :offset="1">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="box-search">
                        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                          <el-form-item label="Thời gian">
                            <el-date-picker
                              v-model="formSearch.timeSend"
                              type="daterange"
                              :editable="timeEditable"
                              format="dd/MM/yyyy"
                              placeholder="Chọn 1 khoảng thời gian">
                            </el-date-picker>
                          </el-form-item><el-form-item>
                            <el-button type="primary" icon="search" @click="onSubmitStatistic">Thống kê</el-button>
                          </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 30px;">
                <div class="col-lg-6 col-md-6">
                    <div class="panel info-box panel-white">
                        <div class="panel-body">
                            <div class="info-box-stats">
                                <p><span class="counter default_type">{{ dataStatistic.data.job_processed }}</span></p>
                                <span class="info-box-title">Công việc đã duyệt</span>
                            </div>
                            <div class="info-box-icon">
                                <i class="icon-check icons"></i>
                            </div>
                            <div class="info-box-progress">
                                <div class="progress progress-xs progress-squared bs-n">
                                    <div class="progress-bar progress-bar-info progress_bar_default_type" title="70%" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style=" width: 70%">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="panel info-box panel-white">
                        <div class="panel-body">
                            <div class="info-box-stats">
                                <p><span class="counter default_type">{{ dataStatistic.data.job_published }}</span></p>
                                <span class="info-box-title">Công việc đã đăng Mywork</span>
                            </div>
                            <div class="info-box-icon">
                                <i class="icon-cloud-upload icons"></i>
                            </div>
                            <div class="info-box-progress">
                                <div class="progress progress-xs progress-squared bs-n">
                                    <div class="progress-bar progress-bar-success progress_bar_default_type" title="70%" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style=" width: 70%">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-row>
        </el-col>
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
                timeEditable: false,
                dataStatistic: {
                    data: {
                        job_processed: 0,
                        job_published: 0
                    }
                },
                formSearch: {
                    timeSend: []
                }
            }
        },
        computed :{
            
        },
        created () {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
            if (typeof this.$route.query.time_start !== 'undefined') {
                this.formSearch.timeSend[0] = new Date(this.$route.query.time_start + ' 00:00:00 UTC')
                this.formSearch.timeSend[1] = new Date(this.$route.query.time_end + ' 00:00:00 UTC')
            }
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                this.loading = true

                var params = {
                    params: {
                        time_start: this.$route.query.time_start,
                        time_end: this.$route.query.time_end,
                    }
                }

                this.$store.dispatch('STATISTIC_JOB', params).then(response => {
                    this.dataStatistic = this.$store.getters.getDataStatisticJob
                    setTimeout(() => {
                        this.loading = false;
                    }, 300);
                }, error => {
                    
                })
            },

            onSubmitStatistic () {
                var query = {}
                
                if (!(this.formSearch.timeSend.length === 0 || this.formSearch.timeSend[0] === null)) {
                    var dateStart = new Date(this.formSearch.timeSend[0])
                    var timeStart = formatDate(dateStart)
                    var dateEnd = new Date(this.formSearch.timeSend[1])
                    var timeEnd = formatDate(dateEnd)

                    query.time_start = timeStart
                    query.time_end = timeEnd
                } else {
                    delete query.time_start
                    delete query.time_end
                    this.formSearch.timeSend = []
                }
                    
                this.$router.push({ name: 'dashboard', query: query})
            }
        }
    }
</script>