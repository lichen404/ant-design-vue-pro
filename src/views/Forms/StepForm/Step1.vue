<template>
  <a-form :form="form" layout="horizontal">
    <a-form-item
      label="付款账户"
      :labelCol="formItemLayout.labelCol"
      :wrapperCol="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'payAccount',
          {
            initialValue: step.payAccount,
            rules: [{ required: true, message: '请输入付款账户' }]
          }
        ]"
        placeholder="请输入付款账户"
      ></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleSubmit">下一步</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: "Step1",
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },

      },
      form: this.$form.createForm(this)
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>

<style scoped></style>
