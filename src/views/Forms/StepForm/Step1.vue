<template>
  <a-form :form="form" layout="horizontal" :style="'padding:24px 10px'">
    <a-form-item
      label="付款账户"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'payAccount',
          {
            initialValue: step.payAccount,
            rules: [{ required: true, message: '请输入付款账号' }]
          }
        ]"
        placeholder="请输入付款账号"
      />
    </a-form-item>
    <a-form-item
      label="收款账户"
      :labelCol="formItemLayout.labelCol"
      :wrapperCol="formItemLayout.wrapperCol"
    >
      <receiver-account
        v-decorator="[
          'receiveAccount',
          {
            initialValue: step.receiveAccount,
            rules: [
              {
                required: true,
                message: '请输入收款账号',
                validator: (rule, value, callback) => {
                  if (value && value.number) {
                    callback();
                  } else {
                    callback(false);
                  }
                }
              }
            ]
          }
        ]"
      ></receiver-account>
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">下一步</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import ReceiverAccount from "@/components/ReceiverAccount";
export default {
  name: "Step1",
  components: {
    ReceiverAccount
  },
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
