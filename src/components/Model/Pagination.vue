<template>
    <div class="page-box" ref="pageBox">
        <IconWrapper @click="pre()" iconName="Left" theme="outline" :strokeWidth='4' fill="#ffc848" size="34" />
        <div class="page-item" v-if="currentPage>3 && totalPages>10" @click="toPage(1)">1</div>
        <div class="page-item" v-if="currentPage>4 && totalPages>10">...</div>
        <div v-for="item in currentList" :class="{'page-item':true,'active':item == currentPage}" @click="toPage(item)">{{item}}</div>
        <div class="page-item" v-if="currentPage<totalPages-3 && totalPages>10">...</div>
        <div class="page-item" v-if="currentPage<totalPages-2 && totalPages>10" @click="toPage(totalPages)">{{totalPages}}</div>
        <IconWrapper @click="next()" iconName="Right" theme="outline" :strokeWidth='4' fill="#ffc848" size="34" />
    </div>
</template>
<script>
export default {
    props:{
        totalPages:{
            type:Number,
            required:true,
        }
    },
    data() {
        return {
           currentPage:1,
           currentList:[],
        }
    },
    mounted() {
        if(this.totalPages>10){
            this.currentList=[1,2,3,4,5]
        }else{
            for(var i=1;i<=this.totalPages;i++){
                this.currentList.push(i)
            }
        }
    },

    
    methods: {
        pre(){
            if(this.currentPage>1){
                this.currentPage--
                this.$emit('page-change', this.currentPage);
            }
            if(this.totalPages>10){
                this.refreshlist()
            }
            
        },
        next(){
            if(this.currentPage<this.totalPages){
                this.currentPage++
                this.$emit('page-change', this.currentPage);
            }
            if(this.totalPages>10){
                this.refreshlist()
            }
        },
        toPage(index){
            if(this.currentPage != index){
                this.currentPage=index
                this.$emit('page-change', this.currentPage);
            }
            
            if(this.totalPages>10){
                this.refreshlist()
            }
        },
        refreshlist(){
            this.currentList = []
            if(this.totalPages - this.currentPage < 2){
                
                for(var i=this.totalPages-4;i<=this.totalPages;i++){
                    this.currentList.push(i)
                }
            }else if(this.currentPage <= 3){
                this.currentList=[1,2,3,4,5]
            }else{
                for(var i=this.currentPage-2;i<=this.currentPage+2;i++){
                    this.currentList.push(i)
                }
            }
        }
    },
}
</script>
<style>
    .page-box {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    .page-item{
        width: 30px;
        height: 30px;
        border-radius: 5px;
        background-color: var(--box-hightlight);
        line-height: 30px;
        text-align: center;
        margin-right: 5px;
        border: 2px solid var(--box-hightlight);
    }
    .page-item:hover {
        border: 2px solid #ffc848;
    }
    .page-item.active {
        border: 2px solid #ffc848;
        color: #fff;
        background-color: #ffc848;
    }
</style>