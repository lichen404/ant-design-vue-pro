<template>
  <div>
    <a-form layout="horizontal" :form="form" :style="'padding:24px 10px'">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入密码' }]
            }
          ]"
          type="password"
          placeholder="请输入付款密码"
        />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 8px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Step2",
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 6 }
      },
      buttonItemLayout: {
        wrapperCol: { span: 6, offset: 9 }
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
      const { form, $store, step } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...step, ...values }
          });
        }
      });
    },
    onPrev() {
      this.$router.push("/form/step-form/info");
    }
  }
};
</script>

<style></style>
