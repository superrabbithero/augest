<template>
	<div class="card-content main-content" style="text-align: left;">
        <div class="icon-item" v-for="icon in svgIconResult">
			<div class="cube">
				<svg-icon :name="icon.default.id.slice(5)" className="icon"></svg-icon>
				<div class="icon-name">{{icon.default.id.slice(5)}}</div>
			</div>
			<div class="icon-copy" @click="copyToClipboard(icon.default.content)">
				<svg-icon name="copy" className="icon-icon"></svg-icon>
			</div>
		</div>
    </div>
</template>

<script>
import svgIconResult from "@/icons"

export default {
  data(){
    return{
    	svgIconResult
    }
  },
  mounted(){
  	console.log(svgIconResult)
  },
  methods: {
    async copyToClipboard(content) {
      try {
        await navigator.clipboard.writeText(content);
        this.$toast.show('复制成功','success')
      } catch (err) {
        this.$toast.show(err,'error')
      }
    },
  }
};
</script>

<style>
.main-content{
	width: calc(100% - 80px);
	display: flex;
	flex-wrap: wrap
}

.icon-item{
	width: calc(12.5% - 10px);
	padding-top: calc(12.5% - 10px);
	margin: 5px;
	box-sizing: border-box;
	position: relative;
	border-radius: 8px;
	border: 1px solid var(--box-bgc);
}

@media (max-width: 850px) {
	.icon-item {
		width: calc(16.66% - 10px);
		padding-top: calc(16.66% - 10px);
		margin: 5px;
		box-sizing: border-box;
		position: relative;
		border-radius: 8px;
		border: 1px solid var(--box-bgc);
	}

}

@media (max-width: 500px) {
	.icon-item {
		width: calc(25% - 10px);
		padding-top: calc(25% - 10px);
		margin: 5px;
		box-sizing: border-box;
		position: relative;
		border-radius: 8px;
		border: 1px solid var(--box-bgc);
	}

	.icon-name {
		display: none;
	}

}

.icon-item:hover {
	border: 1px solid var(--color-border-default);
}

.cube{
	position: absolute;
	top: 0;
    left: 0;
    right: 0;
    bottom: 0;


	align-items: center;
	display: flex;
	align-items: center;
    justify-content: center;
    flex-direction: column;

    font-size: 12px;
}

.icon-name {
	margin-top: 1em;
}

.icon {
	width: 20% !important;
	height: 20% !important;
	min-width: 25px;
	min-height: 25px;
}

.icon-copy{
	opacity: 0;
	position: absolute;
	top: 4px;
	right: 6px;
	cursor: pointer;
}

.icon-item:hover .icon-copy{
	opacity: 1
}

.icon-icon{
	width: 18px !important;
	height: 18px !important;
}

</style>