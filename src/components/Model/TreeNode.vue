<template>
  <div v-if="node.id == -1" class="node-item">
    <div @click="toggle" class="node-edit" tabindex="1">
      <div class="left">
        <div class="dot" :style="{backgroundColor:itemColor}" v-show="level==0"></div>
        <input type="text" />
        <span v-show="node.children.length">({{node.children.length}})</span>
      </div>
      <div class="right">
        <div :style="{fontSize:'12px',color:itemColor,marginRight:'6px'}">保存</div>
        <div :style="{fontSize:'12px',color:itemColor}" @click="cancel">取消</div>
      </div>
    </div>
  </div>
  <div v-else class="node-item">
    <div @click="toggle" class="node-name" tabindex="1">
      <div class="left">
        <div class="dot" :style="{backgroundColor:itemColor}" v-show="level==0"></div>
        {{ node.name }}
        <span v-show="node.children.length">({{node.children.length}})</span>
      </div>
      <div class="right">
        <svg-icon @click="addNode" @click.stop class="node-btn" name="letter-plus01" size="18" :fill="itemColor"></svg-icon>
        <svg-icon @click="cancel" v-show="!node.children.length" class="node-btn" name="delete02" size="16" :fill="itemColor"></svg-icon>
      </div>
    </div>

    <div v-if="isOpen && node.children.length" class="node-children" >
      <div class="line" :style="{borderColor:itemColor,borderLeftStyle:level==0 ? 'solid':'dotted',top:level==0 ? '-10px':'0',height:level==0 ? 'calc(100% + 5px)':'calc(100% - 5px)'}"></div>
      <tree-node
        v-for="child in node.children"
        :key="child.id"
        :level="level+1"
        :itemColor="itemColor"
        :node="child"
        :is-open="openNodes[child.id]"
        @toggle="toggleNode"
        @delete = "deleteNode"
      />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    level:{
      type: Number,
      required: true
    },
    itemColor:{
      type:String,
      default:'#fff'
    }
  },
  data(){
    return {
      openNodes:[],
      itemColorList:['#E76747','#F4A261','#E9C46A','#2A9D8F','#2A9D8F','#7d64ff'],
      handleNodeClick : null,
      isAdding:false,
    }
  },
  mounted(){
    this.handleNodeClick = inject('handleNodeClick')
  },
  methods: {
    toggle() {
      if (this.node.children && this.node.children.length > 0) {
        this.$emit('toggle', this.node.id);
      }
    },
    toggleNode(id) {
      this.openNodes[id] = !this.openNodes[id]; // 直接赋值更新状态
      // console.log(this.openNodes)
    },
    deleteNode(id) {
      // console.log("删除：",id)
      // console.log(this.node.children)
      for(var i=0;i<this.node.children.length;i++){
        if(this.node.children[i].id == id){
          // console.log(`find node's id is:${i}`)
          this.node.children.splice(i,1)
          // console.log("success")
        }
      }
    },
    addNode() {
      if(this.isAdding){
        return
      }else{
        const newnode = {
          "id":-1,
          "name":"",
          "children":[]
        }
        this.node.children.push(newnode)
        this.handleNodeClick(this.node.id)
        this.isAdding = true
      }
    },
    cancel() {
      this.$emit('delete', this.node.id);
    }
  }
};
</script>

<style scoped>
.node-item{
  font-family: SmileySans-Oblique;
  cursor: pointer;
  margin-top: 2px;
}

.node-children{
  box-sizing: border-box;
  padding-left: 0.5rem;
  padding-top: 5px;
  position: relative;
  margin-left: 7px;
}
.node-name, .node-edit{
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
  border-radius: 5px;
}
.node-name .left,.node-name .right,.node-edit .left,.node-edit .right{
  display: flex;
  align-items: center;
}

.node-name .right{
  opacity: 0;
}

.line {
  position: absolute;
  border-left: 2px solid;
  left: 1px;
}

.node-name:focus {
  background-color: var(--box-hightlight);
}
.node-name:focus .right{
  opacity: 1;
}
@media(any-hover:hover){
  .node-name:focus {
    background-color: unset;
  }
  .node-name:focus .right{
    opacity: 0;
  }
  .node-name:hover {
    background-color: var(--box-hightlight);
  }
  .node-name:hover .right{
    opacity: 1;
  }
}
.dot {
  width: 8px; /* 圆点的直径 */
  height: 8px; /* 圆点的直径 */
  border-radius: 50%; /* 圆形 */
  margin-right: 6px; /* 圆点与内容之间的间距 */
}
</style>
