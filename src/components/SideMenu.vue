<template>
  <a-menu
    :selectedKeys="selectedKeys"
    :openKeys.sync="openKeys"
    mode="inline"
    :theme="theme"
  >
    <template v-for="item in menuData">
      <sub-menu :menu-info="item" :key="item.path" />
    </template>
  </a-menu>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from "@/utils/auth";

export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    },
    collapsed: {
      required: true,
      type: Boolean
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
    collapsed(val) {
      this.openKeys = val ? [] : this.openKeysMap[val];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (const item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          continue;
        }
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }

      return menuData;
    }
  }
};
</script>
