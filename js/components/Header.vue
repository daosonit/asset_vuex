<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <span class="logo">
                    <i class="icon-mustache icons"></i>
                </span>
            </el-col>
            <el-col :span="20" style="padding: 0px;">
                <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1" class="pull-right" style="margin-right: 20px">
                        <el-tooltip class="item" effect="dark" content="Đăng xuất" placement="bottom-end">
                            <a href="/auth/logout"><i class="icon-logout icons" style="font-size: 20px;"></i></a>
                        </el-tooltip>
                    </el-menu-item>
                    <el-menu-item index="1" class="pull-right" style="margin-right: 20px">
                        <el-tooltip class="item" effect="dark" content="Thông tin cấu hình" placement="bottom-end">
                            <router-link :to="{ name: 'facebook-profile'}"><i class="icon-settings icons" style="font-size: 20px;"></i></router-link>
                        </el-tooltip>
                    </el-menu-item>
                    <el-menu-item index="1" class="pull-right" style="margin-right: 20px">
                        <span>{{ userInfo.name }}</span>
                    </el-menu-item>
                    <el-menu-item index="2" class="pull-right hidden">
                        <el-input
                          placeholder="Tìm kiếm"
                          icon="search">
                        </el-input>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                userInfo: this.$store.getters.getUserInfo
            }
        }
    }
</script>