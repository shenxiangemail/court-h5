<template>
	<div style="width: 100%;display: flex;margin-top: 60px;overflow: hidden;flex-direction: column; border: #dddddd solid 0.0625rem;min-width: 1063px;">
		<div @click="toNewsList(imageSwipe,index)" :style="advancedSwiperTopStype(imageSwipe,index)" style="height: 2.9rem;color: #FFFFFF;width: 100%;background-size: cover;line-height: 2.9rem;"
		 class="advancedSwipe_title_name">{{imageSwipe[index].name}}</div>
		<div class="advanced_right swiper-container" style="margin-bottom: 2.5rem;min-height: 11.625rem;">
			<swiper ref="mySwiper" :options="swiperOptions" style="width: 85%;">
				<template v-for="item,index in advancedInfo">
					<swiper-slide class="advancedSwipe_swiper_slide">
						<div class="advanced_swiper_border advancedSwipe_image_active" @click="toNewsDeatail(item)">
							<div><img class="advabce_swiper_slide_image" :src="item.pageUrl" /></div>
							<div ref="titleNameRef" class="advanced_swiper_border_title">{{item.titleName}}</div>
						</div>
					</swiper-slide>
				</template>
			</swiper>
			<div class="swiper-button-prev" slot="button-prev" @click="prev"></div>
			<div class="swiper-button-next" slot="button-next" @click="next"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'carrousel',
		//数据
		data: function() {
			return {
				swiperOptions: {
					speed: 1000,
					autoplay: true,
					slidesPerView: 6,
					spaceBetween: 7,
					// effect: 'slide',
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					loop: false,

					// Some Swiper option/callback...
				},
				advancedInfo: [],
			}
		},
		//添加组件
		components: {

		},
		//接收传入的值
		props: ['imageSwipe', 'index'],

		//定义方法
		methods: {
			prev() {
				this.swiper.slidePrev();
			},
			next() {
				this.swiper.slideNext();
			},
			advancedSwiperTopStype(imageSwipe, index) {
				return 'background-image: url(' + require('../assets/' + imageSwipe[index].image) + ');'
			},
			// 跳转新闻列表
			toNewsList(imageSwipe, index) {
				var item = imageSwipe[index].own;
				var that = this;
				// 判断是否需要登录
				if (item.isSeeOfVisitor == '0') {
					// 判断token是否存在
					if (localStorage.getItem("token") == null || localStorage.getItem("token") == '') {
						this.$confirm('请登录后查看, 是否前往登录?', '提示', {
							confirmButtonText: '前往',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							that.$router.push({
								path: '/login'
							})
						}).catch(() => {

						});
					} else {
						//跳转新闻列表
						that.$router.push({
							path: '/newsList',
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(item)
							}
						})
					}
				} else {
					// 跳转新闻列表
					that.$router.push({
						path: '/newsList',
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(item)
						}
					})
				}
			},
			/* 跳转详情 */
			toNewsDeatail(detail) {

				detail.classifyTypeOfOne = this.$props.imageSwipe[this.$props.index].menuCode;
				detail.classifyTypeOfTwo = this.$props.imageSwipe[this.$props.index].menuCode;

				/* 判断是否需要登录 */
				var that = this;
				var item = this.$props.imageSwipe[this.$props.index].own;
				var own = this.$props.imageSwipe[this.$props.index].own;
				// 判断是否需要登录
				if (item.isSeeOfVisitor == '0') {
					// 判断token是否存在
					if (localStorage.getItem("token") == null || localStorage.getItem("token") == '') {
						this.$confirm('请登录后查看, 是否前往登录?', '提示', {
							confirmButtonText: '前往',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							that.$router.push({
								path: '/login'
							})
						}).catch(() => {

						});
					} else {
						//跳转新闻详
						// that.$router.push({
						// 	path: '/newsList',
						// 	query: {
						// 		item: JSON.stringify(item),
						// 		own: JSON.stringify(own),
						// 		detail: JSON.stringify(detail)
						// 	}
						// })
						let routerJump = this.$router.resolve({
							path: '/newsList',
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(own),
								detail: JSON.stringify(detail)
							}
						})
						window.open(routerJump.href, '_blank');
					}
				} else {
					// 跳转新闻详情
					// that.$router.push({
					// 	path: '/newsList',
					// 	query: {
					// 		item: JSON.stringify(item),
					// 		own: JSON.stringify(own),
					// 		detail: JSON.stringify(detail)
					// 	}
					// })
					
					let routerJump = this.$router.resolve({
						path: '/newsList',
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(own),
							detail: JSON.stringify(detail)
						}
					})
					window.open(routerJump.href, '_blank');
				}
			},
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			},

		},
		mounted() {
			this.swiper.slideTo(6, 1000, false)

			var that = this;
			this.api.findInformationWithPicture(that, that.$props.imageSwipe[that.$props.index].menuCode, 'ONE', 13, function(
				res) {
				var data = res.body.data;
				// for (var i = 0; i < data.length; i++) {
				// 	if (data[i].titleName.length > 6) {
				// 		data[i].titleName = data[i].titleName.substring(0, 5) + "..";
				// 	}
				// }
				that.advancedInfo = data;
			})
			var target = this.$refs.mySwiper;
			console.info(target);
			var initLeft = 0;
			// setInterval(function() {
			// 	initLeft++;
			// 	// if (initLeft >= target.currentStyle.width / 2) {
			// 	// 	initLeft = 0;
			// 	// }
			// 	if(initLeft > 40){
			// 		initLeft = 0;
			// 	}
			// 	// target.style = 'transform: translateX(-' + initLeft + 'px)';
			// }, 16)
		},

	}
</script>

<style>
	.advanced_left {
		width: 8.125rem;
		/* 	background-image: url(../assets/40.jpg); */
		height: 8.75rem;
		background-size: cover;

	}

	.swiper-button-disabled {
		display: none;
	}

	.advanced_right {
		/* margin-left: 1.25rem; */
		flex: 5;
		display: flex;
		margin-top: 2.5rem;
		margin-left: auto;
	}

	.swiper-container {
		width: 95%;
		--swiper-theme-color: #cac8c9;
		/* 设置Swiper风格 */
		--swiper-navigation-color: #cac8c9;
		/* 单独设置按钮颜色 */
		--swiper-navigation-size: 2.5rem;
		/* 设置按钮大小 */
	}

	.advabce_swiper_slide_image {
		width: 100%;
		/* margin: 5px; */
		height: 9.75rem;
		object-fit: cover;
		min-width: 8rem;
	}

	.advanced_swiper_border {
		/* border: #dddddd solid 0.0625rem; */
		flex: 1;
	}

	.advanced_swiper_border_title {
		/* padding-bottom: 5px; */
		color: #FFFFFF;
		background-color: #484745;
		min-height: 1.625rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-left: 10px;
		padding-right: 10px;
		margin: auto;
		font-size: 14px;
		line-height: 25px;
	}

	.advancedSwipe_swiper_slide {
		
	}

	.advancedSwipe_image_active:hover {
		/* border: #0000FF solid 0.0825rem; */
		cursor: pointer;
	}

	.advancedSwipe_title_name:hover {
		cursor: pointer;
	}
</style>
