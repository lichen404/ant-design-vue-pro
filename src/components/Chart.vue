<template>
  <div ref="chart"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
]);
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
