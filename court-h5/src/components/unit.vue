<template>
	<div style="width: 100%;max-width: 18.375rem;min-width: 18.375rem;">
		<div class="app_unit_title unit_title_name" @click="toUnitList(title.own)" @mouseover="twoTitleMouseover(title.own)">
			<div>部门风采</div>
		</div>
		<div>
			<div style="display: flex;margin-left: 0.625rem;margin-right: 0.625rem;flex-flow: row wrap;margin-top: 1.25rem;">
				<template v-for="item in twoTitle" :class="{margin_top_10 : item < 2}">
					<div class="unit_title unit_name_active" style="min-width: 4.2rem;" @mouseover="twoTitleMouseover(item)" @click="toUnitList(item)">{{item.menuName}}</div>
				</template>
			</div>
		</div>
		<div>
			<ul style="width: 100%;color: #3d7dc7;padding-inline-start: 25px;padding-left: 25px;">
				<template v-for="item in unitInfo ">
					<li style="width: 100%;padding-top: 15px;list-style: none;" @click="toNewsDeatail(item)">
						<div style="display: flex;width: 100%;color: #333333;overflow: hidden">
							<div style="flex: 4;justify-content: flex-start;align-items: center;display: flex;font-size: 0.875rem;" class="unit_title_active">
								<div style="font-size: 10px;border-radius: 50%;width: 5px;height: 5px;background-color:  #3d7dc7;margin-right: 15px;"></div>
								<div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 185px;">{{item.titleName}}</div>
							</div>
						</div>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {

		//数据
		data: function() {
			return {
				unitInfo: [],
				courtNewsTitleSelect: {},
			}
		},

		//接收传入的值
		props: ['title'],

		//定义方法
		methods: {

			// 跳转部门列表
			toUnitList(item) {
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
							path: '/department',
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(this.title.own)
							}
						})
					}
				} else {
					// 跳转新闻列表
					that.$router.push({
						path: '/department',
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(this.title.own)
						}
					})
				}
			},
			twoTitleMouseover(item) {
				var that = this;
				this.courtNewsTitleSelect = item;
				this.api.findInformation(that, item.menuCode, 'TWO', 6, function(res) {
					var data = res.body.data;
					// for (var i = 0; i < data.length; i++) {
					// 	if (data[i].titleName.length > 12) {
					// 		data[i].titleName = data[i].titleName.substring(0, 12) + "....";
					// 	}
					// }
					that.unitInfo = data;
				})
			},
			/* 跳转详情 */
			toNewsDeatail(detail) {
				/* 判断是否需要登录 */
				var that = this;
				var item = this.courtNewsTitleSelect;
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
						//跳转新闻详情
						var own = that.$props.title.own;
						// that.$router.push({
						// 	path: '/newsList',
						// 	query: {
						// 		item: JSON.stringify(item),
						// 		own: JSON.stringify(this.title.own),
						// 		detail: JSON.stringify(detail)
						// 	}
						// })
						let routerJump = this.$router.resolve({
							path: '/department',
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(this.title.own),
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
					// 		own: JSON.stringify(this.title.own),
					// 		detail: JSON.stringify(detail)
					// 	}
					// })
					
					let routerJump = this.$router.resolve({
						path: '/department',
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(this.title.own),
							detail: JSON.stringify(detail)
						}
					})
					window.open(routerJump.href, '_blank');
				}
			}

		},
		computed: {
			twoTitle() {
				var that = this;
				var twoTitle = [];
				if (that.$props.title.twoTitle != undefined && that.$props.title.twoTitle.length > 0) {
					twoTitle = JSON.parse(that.$props.title.twoTitle);
				}
				return twoTitle;
			}
		},
		mounted() {
			var that = this;
			this.courtNewsTitleSelect = that.$props.title.own;
			this.api.findInformation(that, that.$props.title.menuCode, 'ONE', 6, function(res) {
				var data = res.body.data;
				// for (var i = 0; i < data.length; i++) {
				// 	if (data[i].titleName.length > 12) {
				// 		data[i].titleName = data[i].titleName.substring(0, 12) + "....";
				// 	}
				// }
				that.unitInfo = data;
			})
		}

	}
</script>

<style>
	.unit_title {
		background-image: url(../assets/52.jpg);
		background-size: cover;
		/* flex: 1; */
		padding: 5px;
		margin: 6px;
		border: #ececec solid 0.0625rem;
		color: #8b8b8b;
		font-size: 0.875rem;
	}

	.margin_top_10 {
		margin-top: 15px;
	}

	.unit_name_active:hover {
		background-color: #0074D9 !important;
		background-image: none;
		color: #FFFFFF;
		cursor: pointer;
	}

	.unit_title_active:hover {
		color: #0074D9;
		cursor: pointer;
	}

	.unit_title_name:hover {
		cursor: pointer;
	}
</style>
