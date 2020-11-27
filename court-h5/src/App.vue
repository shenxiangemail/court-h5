<template>
	<div id="app" style="margin: 0;padding: 0s;">
		<router-view v-if="isReload" />
		</router-view>
	</div>
</template>

<script>
	// import top from './components/top.vue';
	// import courtNews from './components/courtNews.vue';
	// import notice from './components/notice.vue';
	// import seaGarden from './components/seaGarden.vue';
	// import unit from './components/unit.vue';
	// import politicalWork from './components/politicalWork.vue';
	// import imageLinks from './components/imageLinks.vue';
	// import advancedSwipe from './components/advancedSwipe.vue';
	// import bottom from './components/bottom.vue';
	// import left from './components/left.vue';
	// import right from './components/right.vue';
	export default {

		data: function() {

			return {
				isReload: true
			}
		},
		methods: {

		},
		//计算属性
		computed: {

		},
		//添加组件
		components: {

		},
		mounted() {

			/* 验证token是否过期 */
			var that = this;
			this.api.autoLogin(that, function(res) {});

			this.screenWidth = document.body.clientWidth;

			window.onresize = () => {
				return (() => {
					var screenWidth = document.body.clientWidth;
					if (that.screenWidth != screenWidth) {
						that.isReload = false;
						that.$nextTick(() => {
							that.isReload = true
						})
					}
				})();
			};
		}
	}
</script>

<style>
	#app {
		font-family: Helvetica, sans-serif;
		text-align: center;
		overflow: hidden;
	}

	body,
	div,
	ul {
		margin: 0px;
		padding: 0px;
	}
</style>
