<template>
  <router-link :to="to" data-test="post" class="panel-block">
    <div>
      <a>{{post.title}}</a>
      <div>{{post.created.format("YYYY-MM-DD")}}</div>
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Post } from "@/types/index";
export default defineComponent({
  name: "TimeLinePost",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    return {
      to: `/posts/${props.post.id}`,
    };
  },
});
</script>
