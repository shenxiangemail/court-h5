<template>
	<div style="width: 100%;display: flex;margin-top: 60px;overflow: hidden;">
		<div class="seaGarden_left"><img @click="toNewsList(title.own)" class="swiper_slide_image" style="margin-top: 20px;"
			 src="../assets/40.jpg" /></div>
		<div class="seaGarden_right swiper-container">
			<swiper ref="mySwiper" :options="swiperOptions" style="width: 90%;">
				<template v-for="item in seaGarden">
					<swiper-slide @click="toNewsDeatail(item)">
						<div class="seaGarden_swiper_border seaGarden_image_active" @click="toNewsDeatail(item)">
							<div><img class="swiper_slide_image" :src="item.pageUrl" /></div>
							<div class="seaGarden_swiper_border_title">{{item.titleName}}</div>
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
					autoplay: {
						delay: 3000,
						disableOnInteraction:  false,
						
					},
					slidesPerView: 6,
					spaceBetween: 15,
					// effect: 'slide',
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					loop: false,

					// Some Swiper option/callback...
				},
				seaGarden: [],
			}
		},
		//添加组件
		components: {

		},
		//接收传入的值
		props: ['title'],

		//定义方法
		methods: {
			prev() {
				this.swiper.slidePrev();
			},
			next() {
				this.swiper.slideNext();
			},

			// 跳转新闻列表
			toNewsList(item) {

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

				detail.classifyTypeOfOne = this.$props.title.menuCode;
				detail.classifyTypeOfTwo = this.$props.title.menuCode;

				/* 判断是否需要登录 */
				var that = this;
				var item = this.$props.title.own;
				var own = this.$props.title.own;
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
			this.swiper.slideTo(6, 1000, false);

			var that = this;
			this.api.findInformationWithPicture(that, that.$props.title.menuCode, 'ONE', 13, function(res) {
				var data = res.body.data;
				// for (var i = 0; i < data.length; i++) {
				// 	if (data[i].titleName.length > 6) {
				// 		data[i].titleName = data[i].titleName.substring(0, 5) + "..";
				// 	}
				// }
				that.seaGarden = data;
			})
		},

	}
</script>

<style>
	.seaGarden_left {
		width: 8.125rem;
		/* 	background-image: url(../assets/40.jpg); */
		height: 8.75rem;
		background-size: cover;

	}

	.swiper-button-disabled {
		display: none;
	}

	.seaGarden_right {
		margin-left: 1.25rem;
		flex: 5;
		display: flex;
	}

	.swiper-container {
		width: 89%;
		--swiper-theme-color: #4170bd;
		/* 设置Swiper风格 */
		--swiper-navigation-color: #4171bb;
		/* 单独设置按钮颜色 */
		--swiper-navigation-size: 30px;
		/* 设置按钮大小 */
	}

	.swiper_slide_image {
		width: 90%;
		margin: 5px;
		height: 7.75rem;
	}

	.swiper_slide_image:hover {
		cursor: pointer;
	}

	.seaGarden_swiper_border {
		border: #dddddd solid 0.0625rem;
	}

	.seaGarden_swiper_border_title {
		margin-bottom: 5px;
		color: rgb(51, 51, 51);
		min-height: 1.625rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 90%;
		margin: auto;
		font-size: 14px;
	}

	.seaGarden_image_active:hover {
		border: blue solid 0.0625rem;
		cursor: pointer;
	}
</style>
