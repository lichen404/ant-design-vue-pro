<template>
  <div>
    {{ $t("message")["app.dashboard.analysis.timeLabel"] }}:
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height:400px"></Chart>
    <pre v-highlightjs="chartCode"><code class="html">

    </code></pre>
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import request from "@/utils/request";
import chartCode from "!!raw-loader!../../components/Chart";

export default {
  name: "Analysis",
  components: {
    Chart
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { id: 12345 }
      }).then(res => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data
            }
          ]
        };
      });
    }
  },
  data() {
    return {
      chartOption: {},
      chartCode
    };
  }
};
</script>

<style scoped></style>
