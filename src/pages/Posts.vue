<!--
 * @Author: XunL
 * @Date: 2021-07-14 00:37:18
 * @LastEditTime: 2021-07-14 02:09:48
 * @Description: file content
-->
<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapState, mapActions } from "vuex";

export default {
  name: "PostList",
  metaInfo: {
    title: "Posts",
  },
  data() {
    return {
      // posts: []
    };
  },
  computed: {
    ...mapState(["posts"]),
  },

  // Vue SSR 特殊为服务端渲染提供的一个生命周期钩子函数
  serverPrefetch() {
    // 发起 action，返回 Promise
    // this.$store.dispatch('getPosts')
    return this.getPosts();
  },
  methods: {
    ...mapActions(["getPosts"]),
  },
};
</script>

<style></style>
