<template>
  <div class="system-log"><FormLists :formArr="formArr"></FormLists></div>
</template>

<script>
import FormLists from '@/components/formLists'
export default {
  name: 'system-log',
  components: { FormLists },
  data() {
    return {
      formArr: [
        { type: 'upload', label: '用户头像', prop: 'avatar', upType: 'img' },
        { type: 'input', label: '用户名', prop: 'username', req: true },
        { type: 'input', label: '联系电话', prop: 'telephone', req: true, check: 'phone' },
        { type: 'input', label: '邮箱', prop: 'email', req: true, check: 'email' },
        { type: 'address', label: '地址', prop: 'address', req: true },
        { type: 'input', label: '密码', prop: 'password', req: true, check: 'pass' },
        {
          type: 'input',
          label: '确认密码',
          prop: 'repassword',
          req: true,
          check: 'pass',
          confirm: true
        }
      ]
    }
  },
  mounted() {}
}
</script>
