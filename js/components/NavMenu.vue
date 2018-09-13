<template>
  <div>
    <el-col :span="4">
        <el-menu mode="vertical" class="el-menu-vertical height_100vh">
            <el-menu-item-group title="Trang chủ">
                <el-menu-item index="1">
                    <router-link :to="{ name: 'dashboard'}">
                        <i class="icon-speedometer icons"></i>&nbsp;Bảng điểu khiển
                    </router-link>
                </el-menu-item>
            </el-menu-item-group>
            <!-- <el-menu-item-group title="Website">
              <el-menu-item index="3"><i class="icon-magic-wand icons"></i>&nbsp;Kết nối</el-menu-item>
            </el-menu-item-group> -->
            <el-menu-item-group title="Công việc">
                <el-menu-item index="4">
                    <router-link :to="{ name: 'listing-job'}">
                        <i class="icon-layers icons"></i>&nbsp;Tất cả công việc
                    </router-link>
                </el-menu-item>
                <el-menu-item index="5">
                    <router-link :to="{ name: 'listing-job', query: { type: 'pending' }}">
                        <i class="icon-hourglass icons"></i>&nbsp;Công việc chờ duyệt
                    </router-link>
                </el-menu-item>
                <el-menu-item index="6">
                    <router-link :to="{ name: 'listing-job-publish' }">
                        <i class="icon-check icons"></i>&nbsp;Công việc đã duyệt
                    </router-link>
                </el-menu-item>
                <el-menu-item index="7">
                    <router-link :to="{ name: 'listing-job', query: { type: 'spam' }}">
                        <i class="icon-trash icons"></i>&nbsp;Công việc bị hủy
                    </router-link>
                </el-menu-item>
            </el-menu-item-group>
        </el-menu>
    </el-col>
  </div>
</template>