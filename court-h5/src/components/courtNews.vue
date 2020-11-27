<template>
	<div class="courtNews_body">
		<div class="courtNews_body_title" :style="courtNewsBodyStyle">
			<div class="courtNews_body_title_t courtNews_title_name_active" @mouseover="titleMouseover(title[index].own)" @click="toNewsList(title[index].own)">{{title[index].name}}</div>
			<div class="courtNews_body_title_two">
				<div class="courtNews_title_name_active" @click="toNewsList(twoTitleFirst)" @mouseover="titleMouseover(twoTitleFirst)">{{twoTitleFirst.menuName}}&nbsp;</div>
				<div class="courtNews_title_name_active" v-show="Object.keys(twoTitleSecond).length > 0" @mouseover="titleMouseover(twoTitleSecond)"
				 @click="toNewsList(twoTitleSecond)">|&nbsp;{{twoTitleSecond.menuName}}&nbsp;</div>
				<el-dropdown v-if="twoTitle.length > 0">
					<span class="el-dropdown-link">
						<i class="el-icon-d-arrow-right courtNews_title_name_active"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<template v-for="(item,index) in twoTitle">
							<div @mouseover="titleMouseover(item)" @click="toNewsList(item)">
								<el-dropdown-item v-if='index > 1'>{{item.menuName}} </el-dropdown-item>
							</div>
						</template>
					</el-dropdown-menu>
				</el-dropdown>

			</div>
		</div>
		<div style="min-height: 172px">
			<ul style="color: #920784;padding-inline-start: 20px;padding-top:10px;padding-left: 20px;">
				<template v-for="item in informationTitle"></template>
				<template v-for="item in informationTitles ">
					<li style="padding-top: 8px;list-style: none;" @click="toNewsDeatail(item)">
						<div style="display: flex;color: #333333;overflow: hidden;" class="courtNews_body_title_active">
							<div style="display: flex;align-items: center;">
								<div style="font-size: 10px;border-radius: 50%;width: 4px;height: 4px;background-color:  #920784;margin-right: 15px;"></div>
								<div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 190px;">{{item.titleName}}</div>
							</div>
							<div class="courtNews_title_new_image" v-show="item.isNew == 1"></div>
							<div style="margin-right: 0.625rem;margin-left: auto;">{{item.gmtPublished}}</div>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<div style="color: #b0b0b0;display:flex;justify-content: flex-end; margin-right: 20px; margin-top: 10px;margin-bottom: 10px;">责任部门：{{responsibleDepartment}}</div>
	</div>
</template>

<script>
	export default {

		//数据
		data: function() {
			return {
				data: this.$props.title[this.$props.index].twoTitle,
				responsibleDepartment: this.$props.title[this.$props.index].own.responsibleDepartment,
				informationTitles: [],
				courtNewsTitleSelect: this.$props.title[this.$props.index].own,
				page: 6,
			}
		},

		//接收传入的值
		props: ['title', 'index'],

		//定义方法
		methods: {
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
						var own = that.$props.title[this.$props.index].own;
						that.$router.push({
							path: '/newsList',
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(own),
								detail: "",
							}
						})
					}
				} else {
					// 跳转新闻列表
					var own = that.$props.title[this.$props.index].own;
					that.$router.push({
						path: '/newsList',
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(own),
							detail: "",
						}
					})
				}

			},
			/* 鼠标悬停二级标题 */
			titleMouseover(item) {

				/* 办公室变动 */
				this.responsibleDepartment = item.responsibleDepartment;
				/* 标题变动 */
				var level = 'TWO';
				if (item.parentId == '-1') {
					level = 'ONE';
				}
				this.courtNewsTitleSelect = item;
				this.findInformation(item.menuCode, level, this.page);
			},

			/* 获取新闻标题 */
			findInformation(informationCode, classifyLevel, number) {
				var that = this;
				that.api.findInformation(that, informationCode, classifyLevel, number, function(res) {
					var data = res.body.data;
					// for (var i = 0; i < data.length; i++) {
					// 	if (data[i].titleName.length > 12) {
					// 		data[i].titleName = data[i].titleName.substring(0, 12) + "....";
					// 	}
					// }
					that.informationTitles = res.body.data;
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
						var own = that.$props.title[this.$props.index].own;
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
					var own = that.$props.title[this.$props.index].own;
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
			}
		},
		computed: {
			courtNewsBodyStyle() {
				return 'background-image: url(' + require('../assets/' + this.$props.title[this.$props.index].url) + ')';
			},
			twoTitleFirst() {
				var data = this.data;
				if (data.length > 0) {
					if (data[0].menuName.length > 4) {
						data[0].menuName = data[0].menuName.substring(0, 4) + "..";
					}
					return data[0];
				} else {
					return ''
				}
			},
			twoTitleSecond() {
				var data = this.data;
				if (data.length > 1) {
					if (data[1].menuName.length > 4) {
						data[1].menuName = data[1].menuName.substring(0, 4) + "..";
					}
					return data[1];
				} else {
					return ''
				}
			},
			twoTitle() {
				this.courtNewsTitleSelect = this.$props.title[this.$props.index].own,
					this.responsibleDepartment = this.$props.title[this.$props.index].own.responsibleDepartment
				var data = this.data;
				if (data.length > 2) {
					// 删除数组前面两个数据
					// data.splice(0, 2);
					return data;
				} else {
					return ''
				}
			},
			informationTitle() {
				var menuCode = this.$props.title[this.$props.index].own.menuCode;
				if (menuCode != undefined) {
					this.findInformation(menuCode, "ONE", this.page);
				}
				return ''
			}
		},
		mounted() {



		}

	}
</script>

<style scoped>
	.courtNews_body {
		width: 100%;
		/* height: 18.75rem; */
		border: #dddddd solid 0.0625rem;
		font-size: 0.875rem;
	}

	.courtNews_body_title {
		display: flex;
		align-items: center;
		/* justify-content: center; */
		height: 3.1rem;
		/* background-image: url(../assets/1.jpg); */
		background-size: cover;
		color: #920784;

	}

	.courtNews_body_title_t {
		padding-left: 5rem;
		font-size: 1.125rem;
		/* font-weight: 600; */
	}

	.courtNews_body_title_two {
		display: flex;
		align-items: center;
		margin-left: auto;
		font-size: 0.875rem;
		margin-right: 0.625rem;
	}

	.courtNews_body_title_active:hover {
		color: #920784 !important;
		cursor: pointer;
	}

	.courtNews_title_name_active:hover {
		cursor: pointer;
		color: #409EFF;
	}

	.el-dropdown-link {
		cursor: pointer;
		/* color: #409EFF; */
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.demonstration {
		display: block;
		/* color: #8492a6; */
		font-size: 14px;
		margin-bottom: 20px;
	}

	.courtNews_title_new_image {
		background-image: url(../assets/new.gif);
		background-size: cover;
		width: 33px;
		height: 13px;
		margin-left: 15px;
	}
</style>
