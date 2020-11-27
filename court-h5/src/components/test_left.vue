<template>
	<div>
		<div id="adbox" ref="adbox" v-show="showAdbox" @mouseenter="enterbox" @mouseleave="leavebox">
			<img :src="url" alt="" :style="{'width':width +'px','height':height +'px'}" @click="openUrl(linkUrl)">
			<b @click="closebox">×</b>
		</div>
		<div>{{getTime}}</div>
	</div>
</template>
<style scoped>
	#adbox {
		/* width: 100%; */
		/* height: 150px; */
		position: absolute;
		z-index: 999;
	}

	#adbox img {
		border: none;
	}

	#adbox b {
		position: absolute;
		right: 5px;
		top: 0;
		cursor: pointer;
		color: #666;
	}
</style>
<script>
	export default {

		data() {

			return {
				// x: this.$props.x1,
				// y: this.$props.y1,	
				x: 50,
				y: 350,
				xin: true,
				yin: true,
				step: 1,
				delay: 10,
				itl: null,
				showAdbox: true,
				timeOut: this.$props.time,
			}
		},
		//接收传入的值
		props: ['x1', 'y1', 'url', 'width', 'height', 'linkUrl', 'time'],
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.routeEnterShowAdbox();
			})
		},
		beforeRouteLeave(to, from, next) {
			next(vm => {});
			clearInterval(this.itl);
		},
		computed: {
			getTime: function() {

				return ''
			}
		},
		methods: {
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
						let own = {}; //一级标题
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
						if (item.parentId != '-1') {
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
					} else {
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
			closebox() {
				this.showAdbox = false;
				clearInterval(this.itl)
			},
			leavebox() {
				var that = this;
				if (that.showAdbox == false) {
					clearInterval(that.itl)
				} else {
					// setTimeout(setInterval(this.movebox, this.delay),500000);
					that.itl = setInterval(that.movebox, that.delay)
				}
			},
			enterbox() {
				clearInterval(this.itl)
			},
			movebox() {
				var that = this;
				var L = 0;
				var T = 0;
				// var R = document.documentElement.clientWidth - that.$refs.adbox.offsetWidth; //浏览器显示宽度-adbox宽度，不随滚动条变化而变化
				// var B = document.documentElement.clientHeight - that.$refs.adbox.offsetHeight; //浏览器显示高度-adbox高度，不随滚动条变化而变化
				// that.$refs.adbox.style.left = that.x + document.documentElement.scrollLeft + "px"; //adbox初始左+滚动条最左端到浏览器最左端的距离
				// that.$refs.adbox.style.top = that.y + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
				var R = document.documentElement.clientWidth - this.$el.querySelector('#adbox').offsetWidth; //浏览器显示宽度-adbox宽度，不随滚动条变化而变化
				var B = document.documentElement.clientHeight - this.$el.querySelector('#adbox').offsetHeight; //浏览器显示高度-adbox高度，不随滚动条变化而变化
				this.$el.querySelector('#adbox').style.left = that.x + document.documentElement.scrollLeft + "px"; //adbox初始左+滚动条最左端到浏览器最左端的距离
				this.$el.querySelector('#adbox').style.top = that.y + document.documentElement.scrollTop + "px"; //adbox初始高+滚动条顶端到浏览器顶端的距离
				that.x = that.x + that.step * (that.xin ? 1 : -1);
				if (that.x < L) {
					that.xin = true;
					that.x = L;
				}
				if (that.x > R) {
					that.xin = false;
					that.x = R;
				}
				that.y = that.y + that.step * (that.yin ? 1 : -1);
				if (that.y < T) {
					that.yin = true;
					that.y = T;
				}
				if (that.y > B) {
					that.yin = false;
					that.y = B;
				}
			},
			routeEnterShowAdbox() {
				that.itl = setInterval(that.movebox, that.delay)
			},
		},
		mounted() {
			// this.leavebox();
			var that = this;
			setTimeout(function() {
				that.leavebox();
			}, that.timeOut)
		}
	}
</script>
