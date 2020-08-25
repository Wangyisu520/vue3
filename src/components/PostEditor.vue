<template>
  <PostWriter :post="post" @save="save" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PostWriter from "@/components/PostWriter.vue";
import { Post } from "@/types";
import moment from "moment";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "PostEditor",
  components: { PostWriter },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const id = route.params.id as string;

    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }
    const post = store.getState().posts.all[id];

    const save = async (post: Post) => {
      await store.updatePost(post);
      router.push("/");
    };
    return { post, save };
  },
});
</script>
