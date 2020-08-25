<template>
  <form @submit.prevent="handleSubmit">
    <FormInput type="text" name="用户名" v-model="username" :error="usernameStatus.message" />
    <FormInput type="text" name="邮箱" v-model="email" :error="emailStatus.message" />
    <FormInput type="password" name="密码" v-model="password" :error="passwordStatus.message" />
    <FormInput type="password" name="确认密码" v-model="password2" :error="password2Status.message" />

    <div class="select">
      <select v-model="rule">
        <option value="user">用户</option>
        <option value="visitor">游客</option>
      </select>
    </div>
    <button
      class="button is-primary is-pulled-right"
      :disabled="!usernameStatus.valid || !passwordStatus.valid"
    >注册</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import FormInput from "@/components/FormInput.vue";
import { validate, Status, required, length } from "@/utils/validators";
import { User } from '@/types';
import { useStore } from '@/store';
import { useModel } from '@/utils/useModel';
export default defineComponent({
  name: "Signup",
  components: {
    FormInput,
  },
  setup() {
    const username = ref("username");
    const email = ref("746078001@qq.com");
    const password = ref("123123");
    const password2 = ref("123123");
    const rule = ref("user");
    const store = useStore();
    const model = useModel();

    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [
        required(),
        length({ min: 5, max: 10 }),
      ]);
    });
    const emailStatus = computed<Status>(() => {
      return validate(email.value, [required(), length({ min: 5, max: 40 })]);
    });
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [
        required(),
        length({ min: 5, max: 20 }),
      ]);
    });
    const password2Status = computed<Status>(() => {
      return validate(password2.value, [
        required(),
        length({ min: 5, max: 20 }),
      ]);
    });

    const handleSubmit = async (e:any) =>{
        if(password.value !== password2.value){
            return;
        }
        const user:User = {
            id: -1,
            username: username.value,
            passowrd: password.value,
            email: email.value,
            rule:rule.value
        }
        store.createUser(user)
        model.hideModel();
    }

  
    return {
      username,
      email,
      password,
      password2,
      usernameStatus,
      emailStatus,
      passwordStatus,
      password2Status,
      rule,
      handleSubmit
    };
  },
});
</script>

<style scoped>
form {
  background: #fff;
  padding: 15px;
}
</style>
