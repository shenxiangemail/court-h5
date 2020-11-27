<template>
	<div>
		<div>
			<div ref="adbox" class="right_fixed" style="display: flex;flex-direction: column;" v-show="active1 && imgSrc1 !=''"
			 v-if="imgSrc1.isFloating !=1">
				<div style="display: flex;" class="right_image_active"><img :src="imgSrc1.pageUrl" :style="{'width':imgSrc1.width +'px','height':imgSrc1.height +'px'}"
					 @click="openUrl(imgSrc1.linkUrl)"></div>
				<div style="text-align: left;font-size: 1.125rem;padding-top: 0.5rem" class="right_active_color" v-on:click="close(1)">关闭</div>
			</div>
			<div v-show="active1 && imgSrc1 !=''" v-if="imgSrc1.isFloating ==1">
				<testRight time='0' x1='10' y1='200' :linkUrl='imgSrc1.linkUrl' :width='imgSrc1.width' :height='imgSrc1.height' :url='imgSrc1.pageUrl'
				 style="width: 100%;"></testRight>
			</div>.
			<div ref="adbox1" class="right_fixed" style="display: flex;flex-direction: column;justify-content: flex-start;margin-top: 30px;"
			 v-show="active2 && imgSrc2 !=''" v-if="imgSrc2.isFloating !=1">
				<div style="display: flex;" class="right_image_active"><img :src="imgSrc2.pageUrl" :style="{'width':imgSrc2.width +'px','height':imgSrc2.height +'px'}"
					 @click="openUrl(imgSrc2.linkUrl)"></div>
				<div style="text-align: left;font-size: 1.125rem;padding-top: 0.5rem" class="right_active_color" v-on:click="close(2)">关闭</div>
			</div>
			<div v-show="active2 && imgSrc2 !=''" v-if="imgSrc2.isFloating ==1">
				<testRight time='5000' x1='10' y1='450' :linkUrl='imgSrc2.linkUrl' :url='imgSrc2.pageUrl' :width='imgSrc2.width'
				 :height='imgSrc2.height'></testRight>
			</div>
			<div ref="adbox2" class="right_fixed" style="display: flex;flex-direction: column;justify-content: flex-start;margin-top: 10px;"
			 v-show="active3 && imgSrc3 !=''" v-if="imgSrc3.isFloating !=1">
				<div style="text-align: left;font-size: 1.125rem;padding-top: 0.5rem" class="right_active_color" v-on:click="close(3)">关闭</div>
				<div style="display: flex;" class="right_image_active"><img :src="imgSrc3.pageUrl" :style="{'width':imgSrc1.width +'px','height':imgSrc1.height +'px'}"
					 @click="openUrl(imgSrc3.linkUrl)"></div>
			</div>
			<div v-show="active3 && imgSrc3 !=''" v-if="imgSrc3.isFloating ==1">
				<testRight time='10000' x1='20' y1='650' :linkUrl='imgSrc3.linkUrl' :url='imgSrc3.pageUrl' :width='imgSrc3.width'
				 :height='imgSrc3.height'></testRight>
			</div>
		</div>
	</div>
</template>

<script>
	import testRight from './test_right.vue'
	export default {

		//数据
		data: function() {
			return {
				active1: true,
				active2: true,
				active3: true,
				imgSrc1: '',
				imgSrc2: '',
				imgSrc3: '',

				x: 50,
				y: 200,
				y1: 100,
				xin: true,
				yin: true,
				step: 1,
				delay: 100,
				itl: null,
				showAdbox: true
			}
		},

		//接收传入的值
		props: ['titleName'],

		//定义方法
		methods: {
			/* 点击关闭按钮 */
			close(number) {
				if (number == 1) {
					this.active1 = false;
				} else if (number == 2) {
					this.active2 = false;
				} else if (number == 3) {
					this.active3 = false;
				}
			},
			/* 打开外连接 */
			openUrl(linkUrl) {
				// 判断是内部连接还是外部：内部连接实例：http://localhost:8070/#/newsList?item=17451f534112717&type=title ;type用来表示是分辨是几级标题或者具体资讯内容，
				//如果是标题则不用上传type,如果是具体资讯则要上传type=title
				if (linkUrl.indexOf('?item') == -1) {
					window.open(linkUrl);
				} else {
					// 内部标题连接,判断是几级标题或者资讯具体内容
					if (linkUrl.indexOf('&type=title') == -1) {
						//一级或二级标题
						let unionId = linkUrl.substring(linkUrl.indexOf('=') + 1, linkUrl.length);
						let item = {}; //二级标题
						let own = {};//一级标题
						let flag = false;
						var allMeunStr = localStorage.getItem("allMeun");
						var allMeun = [];
						if (allMeunStr != '') {
							allMeun = JSON.parse(allMeunStr);
						}
						// console.info(allMeun)
						for (var i = 0; i < allMeun.length; i++) {
							if (allMeun[i].unionId == unionId) {
								item = allMeun[i];
								own = allMeun[i];
								flag = true;
								break;
							}
						}
						if(item.parentId != '-1'){
							for (var i = 0; i < allMeun.length; i++) {
								if (allMeun[i].unionId == item.parentId) {
									own = allMeun[i];
									break;
								}
							}
						}
						if (flag) {
							let path = linkUrl.substring(linkUrl.indexOf('#') + 1, linkUrl.indexOf('?'));
							let routerJump = this.$router.resolve({
								path: path,
								query: {
									item: JSON.stringify(item),
									own: JSON.stringify(own),
								}
							})
							window.open(routerJump.href, '_blank');
						} else {
							this.$message({
								showClose: true,
								message: '配置链接有误',
								type: 'warning'
							});
							return;
						}
					}else{
						// 内部资讯详情连接，根据unionId获取资讯详情
						
						this.$message({
							showClose: true,
							message: '暂不支持跳转详情',
							type: 'warning'
						});
						return;
						
					}
				}
				
			},
			movebox() {
				if (document.documentElement.scrollTop > 400) {
					if (this.$refs.adbox != undefined && this.imgSrc1.isFloating != 1) {
						this.$refs.adbox.style.top = this.y1  + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
					}
					if (this.$refs.adbox1 != undefined && this.imgSrc2.isFloating != 1) {
						this.$refs.adbox1.style.top = this.y1 + 200 + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
					}
					if (this.$refs.adbox2 != undefined && this.imgSrc3.isFloating != 1) {
						this.$refs.adbox2.style.top = this.y1 + 500 + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
					}
				} else {
					if (this.$refs.adbox != undefined && this.imgSrc1.isFloating != 1) {
						this.$refs.adbox.style.top = this.y + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
					}
					if (this.$refs.adbox1 != undefined && this.imgSrc2.isFloating != 1) {
						this.$refs.adbox1.style.top = this.y + 200 + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
					}
					if (this.$refs.adbox2 != undefined && this.imgSrc3.isFloating != 1) {
						this.$refs.adbox2.style.top = this.y + 400 + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
					}
				}
			},

		},
		computed: {

		},
		components: {
			testRight,
		},
		mounted() {
			var that = this;
			that.api.findFloatingWindow(that, 6, function(res) {
				var data1 = res.body.data;
				var data = [];
				var floatData = [];
				var fixData = [];
				var dataParam = [];
				//先排序将浮动放在最后
				for (var i = 0; i < data1.length; i++) {
					if (data1[i].isFloating == 1) {
						floatData.push(data1[i]);
					} else {
						fixData.push(data1[i]);
					}
				};
				data = fixData.concat(floatData);
				for (var i = 0; i < data.length; i++) {
					if (i % 2 == 0) {
						dataParam.push(data[i])
					}
				}
				
				for (var i = 0; i < dataParam.length; i++) {
					var key = 'imgSrc' + (i + 1);
					that[key] = dataParam[i];
				}
				setInterval(that.movebox, that.delay);
			})
		}

	}
</script>

<style scoped>
	.right_fixed {
		position: absolute;
		bottom: 0;
		max-width: 210px;
		max-height: 152px;
		right: 0.625rem;
		z-index: 998;
	}

	.right_fixed1 {
		position: absolute;
		bottom: 0;
		max-width: 210px;
		max-height: 203px;
		right: 0.625rem;
		top: 400px;
	}

	.right_fixed2 {
		position: absolute;
		bottom: 0;
		max-width: 210px;
		max-height: 203px;
		right: 0.625rem;
		top: 650px;
	}

	.right_fixed3 {
		position: absolute;
		bottom: 0;
		max-width: 210px;
		max-height: 203px;
		right: 0.625rem;
		top: 800px;
	}

	.right_active_color:hover {
		color: red;
	}

	.right_image_active:hover {
		/* border: #0000FF solid 0.1875rem; */
		cursor: pointer;
	}
</style>
