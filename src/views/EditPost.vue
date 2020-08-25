<template>
  <section class="section">
    <div class="container">
      <suspense>
        <template #default>
          <PostEditor />
        </template>
        <template #fallback>
          <Progress />
        </template>
      </suspense>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PostEditor from "@/components/PostEditor.vue";
import Progress from "@/components/Progress.vue";
export default defineComponent({
  name: "Home",
  components: {
    PostEditor,
    Progress,
  },
});
</script>
