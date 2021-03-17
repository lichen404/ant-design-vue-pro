<template>
  <div ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { debounce } from "lodash";
import { addListener, removeListener } from "resize-detector";
export default {
  name: "Chart",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option: {
      handler(val) {
        this.chart.setOption(val);
      }
    }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.chart.setOption(this.option);
    addListener(this.$refs.chart, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    }
  }
};
</script>

<style scoped></style>
