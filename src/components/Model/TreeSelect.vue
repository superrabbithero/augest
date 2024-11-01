<template>
  <div class="tree-select">
    {{`maxId:${maxId}`}}
    <div @click="console.log(treeData)">查看treeData</div>
    <div class="selectedGroups">
      <div v-for="(value, key) in selectedMap" class="selected-item">{{value[1]}}</div>
    </div>
    <ul>
      <tree-node
        v-for="(node,index) in treeData"
        :level="0"
        :itemColor="itemColorList[index]"
        :key="node.id"
        :node="node"
        :is-open="openNodes[node.id]"
        @toggle="toggleNode"
        @add="openChildren"
      />
    </ul>
  </div>
</template>

<script>
import { provide, ref ,reactive} from 'vue';
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
      itemColorList:['#E76747','#F4A261','#E9C46A','#2A9D8F','#2A9D8F','#7d64ff'],
      maxId:0
    }
  },
  setup(props) {
    const maxId = ref(0)
    const getMaxId = (nodes=props.treeData) => {
      nodes.forEach(node => {
        maxId.value = Math.max(maxId.value, node.id);
        if (node.children && node.children.length > 0) {
          getMaxId(node.children);
        }
      });
    }

    const selectedMap = reactive(new Map())
    const handleNodeClick = (id,name) => {
      // 处理节点点击
      if(selectedMap.has(id)){
        selectedMap.delete(id)
      }else{
        console.log(name)
        selectedMap.set(id,name)
      }
      console.log(selectedMap)
    };

    provide('handleNodeClick', handleNodeClick);

    const saveNode = (command,newNode, parentId) => {
      if(command == 'add'){
        saveAddNode(props.treeData, newNode, parentId)
      }
    }

    const saveAddNode = (nodes, newNode, parentId) => {
      let findFlag = false
      nodes.forEach(node => {
        if(node.id == parentId){
          newNode.id = maxId.value + 1
          node.children.push(newNode)
          maxId.value ++
          findFlag = true
          return
        }else if(node.children && node.children.length > 0){
          saveAddNode(node.children, newNode, parentId)
        }
      })
      if(findFlag){
        // this.$toast.show('添加成功','success')
        console.log(`添加知识点"${newNode.name}"成功`)
        return true
      }
    }

    provide('saveNode', saveNode);

    const isEditing = ref(false)

    const changeEditing = (flag) => {
      isEditing.value = flag
    }

    provide('changeEditing', changeEditing)

    provide('isEditing', isEditing)

    return {getMaxId, maxId, selectedMap}

  },
  mounted(){
    this.getMaxId()
    console.log(this.maxId)
  },
  methods:{
    openChildren(id){
      this.openNodes[id] = true;
    },
    toggleNode(id) {
      this.openNodes[id] = !this.openNodes[id];
    },
    
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

.selectedGroups {
  display: flex;
  flex-wrap: wrap;
}

.selected-item {
  margin: 2px;
  padding: 2px 5px;
  border-radius: 5px;
  background: #8c3636;
}
</style>
