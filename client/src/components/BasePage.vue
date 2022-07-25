<template>
  <div class="container">
    <el-row>
      <el-col :span="4" class="grid-content bg-purple-dark">
        <el-menu @select = 'handleselect'>
          <el-menu-item
            v-for="item in routers"
            :key="item.index"
            :index="item.index"
          >
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="grid-content bg-purple-light">
        <slot name="content"> </slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { RouteConfig, PathConfig } from "@/router/config";
export default {
  name: "Information-encryption",
  props: ["index"],
  data() {
    return {
      routers: RouteConfig,
      paths: PathConfig,
    };
  },
  created() {
    this.$store.commit("pageChange", this.index == null ? "0" : this.index);
  },
  methods: {
    handleselect(index) {
      let routePath = this.paths[index];
      this.$router.push(routePath);
      console.log(index);
    }
  },
};
</script>
<style>
.container {
  height: 1000px;
}
.el-row {
  height: 100%;
}
.bg-purple-dark {
  background: #685853;
}
.bg-purple-light {
  background: #edeff3;
}
.grid-content {
  height: 100%;
}
</style>