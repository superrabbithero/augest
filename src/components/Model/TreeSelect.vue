<template>
  <div class="tree-select">
    <div class="selectedGroups">
      <div class="selected-item" style="background-color: transparent;">{{ `知 识 点：` }}</div>
      <div v-for="[key,value] in Object.entries(selectedMap)" class="selected-item" @click="handleNodeClick(key,value)">{{value}}</div>
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
    },
    selectedMap: {
      type: Object,
      required: true
    }

  },
  data(){
    return{
      openNodes:[],
      itemColorList:['#E76747','#F4A261','#E9C46A','#2A9D8F','#00A7FF','#7d64ff'],
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



    // const selectedMap = reactive(new Map())
    const handleNodeClick = (id, name) => {
    // 处理节点点击
    if (props.selectedMap[id]) {
        delete props.selectedMap[id]; // 删除选中的节点
    } else {
        console.log(name);
        props.selectedMap[id] = name; // 添加新的节点
    }
    // console.log(props.selectedMap);
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

    return {getMaxId, maxId , handleNodeClick}

  },
  mounted(){
    this.getMaxId()
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
  margin: 10px 0 0 0;
  background-color: var(--box-hightlight);
  height: 100%;
  padding: 2px 5px;
  border-radius: 5px;
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
  font-family: SmileySans-Oblique;
  margin: 2px;
  padding: 2px 5px;
  border-radius: 5px;
  background: var(--button-highlight);
}
</style>
