<template>
  <div class="tree-select">
    <ul>
      <tree-node
        v-for="(node,index) in treeData"
        :level="0"
        :itemColor="itemColorList[index]"
        :key="node.id"
        :node="node"
        :is-open="openNodes[node.id]"
        @toggle="toggleNode"
      />
    </ul>
  </div>
</template>

<script>
import { provide } from 'vue';
import TreeNode from './TreeNode.vue'; // 引入子节点组件

export default {
  components: { TreeNode },
  props: {
    treeData: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      openNodes:[],
      itemColorList:['#E76747','#F4A261','#E9C46A','#2A9D8F','#2A9D8F','#7d64ff']
    }
  },
  mounted(){
    provide('handleNodeClick', this.handleNodeClick);
  },
  methods:{
    toggleNode(id) {
      this.openNodes[id] = !this.openNodes[id];
    },
    handleNodeClick(id){
      console.log("Clicked node ID:", id);
      // 处理点击的节点 id
    }

  }
};
</script>

<style scoped>
.tree-select {
  height: 100%;
  overflow: auto;
}

ul {
  margin: 0;
  padding-left: 0rem;
}

li::marker {
    color: red;
    unicode-bidi: isolate;
    font-variant-numeric: tabular-nums;
    text-transform: none;
    text-indent: 0px !important;
    text-align: start !important;
    text-align-last: start !important;
}
</style>
