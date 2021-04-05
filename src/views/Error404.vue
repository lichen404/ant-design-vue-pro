<template>
  <div>
    <div>404</div>
    <IconFont type="icon-icon-404" style="font-size:100px" />
    <NotFound />
  </div>
</template>

<script>
import NotFound from "@/assets/404.svg";
export default {
  name: "Error404",
  components: {
    NotFound
  }
};
</script>

<style scoped></style>
