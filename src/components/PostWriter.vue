<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">博客标题</div>
          <div class="control">
            <input data-test="post-title" type="text" v-model="title" class="input" />
            {{title}}
          </div>
        </div>
      </div>
    </div>
    <!-- 写的内容 -->
    <div class="columns">
      <div class="column is-one-half">
        <div
          data-test="markdown"
          contenteditable
          id="markdown"
          ref="contentEditable"
          @input="handleEdit"
        />
      </div>
      <div class="column is-one-half">
        <div v-html="html"></div>
      </div>
    </div>
    <!-- 保存 -->
    <div class="columns">
      <div class="column">
        <button
          data-test="submit-post"
          @click="handleSubmit"
          class="button is-primary is-pulled-right"
        >保存</button>
        <button
          @click="$router.go(-1)"
          class="button is-danger"
        >取消</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { Post, Period } from "@/types";
//@ts-ignore
import { parse, MarkedOptions } from "marked";
import { highlightAuto } from "highlight.js";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "PostWriter",
  components: {},
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props, ctx) {
    const title = ref(props.post.title);
    const contentEditable = ref<null | HTMLDivElement>(null);
    const html = ref("");

    const markdown = ref(props.post.markdown);

    const handleEdit = () => {
      //@ts-ignore
      markdown.value = contentEditable.value.innerText;
    };

    const options: MarkedOptions = {
      highlight: (code: string) => highlightAuto(code).value,
    };

    const update = (value: string) => {
      html.value = parse(value, options);
    };

    //保存
    const handleSubmit = () => {
      const post: Post = {
        ...props.post,
        title: title.value,
        markdown: markdown.value,
        html: html.value,
      };
      ctx.emit("save", post);
    };

    watch(() => markdown.value, debounce(update, 500), { immediate: true });

    onMounted(() => {
      // @ts-ignore
      contentEditable.value.innerText = markdown.value;
    });

    return { title, contentEditable, handleEdit, markdown, html, handleSubmit };
  },
});
</script>