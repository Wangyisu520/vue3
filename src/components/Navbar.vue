<template>
  <nav class="navbar is-dark topNav">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <i class="fa fa-home"></i>
        </router-link>
      </div>
      <div class="navbar-menu" id="topNav">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">博客</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <!-- 登陆后显示用户名 -->
            <div class="field is-grouped" v-if="auth">
              <div class="control">
                <button style="margin-right:10px" class="button is-small">
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span>Admin</span>
                </button>
                <button @click="signout" class="button is-info is-outlined is-small">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span>退出</span>
                </button>
              </div>
            </div>
            <!-- 登陆 注册 -->
            <div class="field is-grouped" v-else>
              <div class="control">
                <button @click="signup" style="margin-right:10px" class="button is-small">
                  <span class="icon">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span>注册</span>
                </button>
                <button @click="signin" class="button is-info is-outlined is-small">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span>登陆</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="#modal" v-if="model.visible">
      <!-- 插入组件/动态组件 -->
      <component :is="component" />
    </teleport>
  </nav>
</template>
<script lang="ts">
import { defineComponent, ref, computed, shallowRef } from "vue";
import { useModel } from "@/utils/useModel";
import Signup from "@/views/Signup.vue";
import Signin from "@/views/Signin.vue";
import { useStore } from '@/store';
export default defineComponent({
  name: "Navbar",
  components: {},
  setup() {
    const model = useModel();
    const component = shallowRef();
    const store = useStore()
    const auth = computed(()=> store.getState().loginUser.currentUserId)
    const signup = () => {
      component.value = Signup;
      model.showModel();
    };
    const signin = () => {
      component.value = Signin;
      model.showModel();
    };
    const signout = async () =>{
      await store.signOut()
    }
    return {signout, auth,component, signup, signin, model };
  },
});
</script>
