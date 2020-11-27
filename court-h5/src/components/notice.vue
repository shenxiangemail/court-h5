<template>
	<div class="notice_body">
		<!-- <div class="notice_title notice_title_name_active" @click="toNewsList(title.own)">{{titleName.name}}</div> -->
		<div class="notice_title">
			<div class="notice_title_name_active" @click="toNewsList(title.own)" @mouseover="titleMouseover(title.own)">{{titleName.name}}</div>
			<div class="notice_body_title_two">
				<div class="notice_title_name_active" style="color: #53b6f8" @mouseover="titleMouseover(twoTitleFirst)" @click="toNewsList(twoTitleFirst)">{{twoTitleFirst.menuName}}&nbsp;</div>
				<el-dropdown v-if="twoTitle.length > 0">
					<span class="el-dropdown-link">
						<i class="el-icon-d-arrow-right courtNews_title_name_active" style="color: #53b6f8"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<template v-for="(item,index) in twoTitle">
							<div @mouseover="titleMouseover(item)" @click="toNewsList(item)">
								<el-dropdown-item v-if='index > 0'>{{item.menuName}} </el-dropdown-item>
							</div>
						</template>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div v-if="titleName.menuCode != 'COURT_ANNOUNCEMENT' ">
			<ul style=" width: 100%;color: #920784;padding-left: 20px;min-height: 146px;">
				<template v-for="item in noticeInfo ">
					<li style="width: 100%;padding-top: 8px;list-style: none;" @click="toNewsDeatail(item)">
						<div style="display: flex;width: 100%;color: #333333;align-items: center;">
							<div style="margin-right: 10px;color: #5b84ec;"><i class="el-icon-caret-right"></i></div>
							<div class="notice_body_title_active">{{item.titleName}}</div>
							<div class="courtNews_title_new_image" v-show="item.isNew == 1 "></div>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<div v-if="titleName.menuCode == 'COURT_ANNOUNCEMENT' ">
			<vueSeamless :data="noticeInfo" class="seamless-warp" :class-option="classOption">
				<ul style=" width: 100%;color: #920784;padding-left: 20px;min-height: 146px;">
					<template v-for="item in noticeInfo ">
						<li style="width: 100%;padding-top: 15px;list-style: none;" @click="toNewsDeatail(item)">
							<div style="display: flex;width: 100%;color: #333333;align-items: center;">
								<div style="margin-right: 10px;color: #5b84ec;"><i class="el-icon-caret-right"></i></div>
								<div class="notice_body_title_active">{{item.titleName}}</div>
							</div>
						</li>
					</template>
				</ul>
			</vueSeamless>
		</div>
		<div style="margin-top: 10px; display: flex;align-items: center;margin-bottom: 10px;justify-content: flex-end;margin-right: 20px;color: #b0b0b0;">责任部门：{{responsibleDepartment}}</div>
	</div>
</template>

<script>
	import vueSeamless from 'vue-seamless-scroll'
	export default {

		//数据
		data: function() {
			return {
				title: this.$props.titleName,
				noticeInfo: [],
				classOption: {
					step: 0.8, // 数值越大速度滚动越快
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 100 // 单步运动停止的时间(默认值1000ms)
				},
				responsibleDepartment: this.$props.titleName.own.responsibleDepartment,
				page: 15,
				courtNoticeSelect: this.$props.titleName.own,
			}
		},

		//接收传入的值
		props: ['titleName'],

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
						// if (that.$props.titleName.menuCode == "ANNOUNCEMENT") {
						//跳转新闻列表
						that.$router.push({
							path: '/announcement',
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(that.title.own)
							}
						})
						// } else {
						// 	//跳转新闻列表
						// 	that.$router.push({
						// 		path: '/newsList',
						// 		query: {
						// 			item: JSON.stringify(item),
						// 			own: JSON.stringify(item)
						// 		}
						// 	})
						// }

					}
				} else {
					// if (that.$props.titleName.menuCode == "ANNOUNCEMENT") {
					//跳转新闻列表
					that.$router.push({
						path: '/announcement',
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(that.title.own)
						}
					})
					// } else {
					// 	//跳转新闻列表
					// 	that.$router.push({
					// 		path: '/newsList',
					// 		query: {
					// 			item: JSON.stringify(item),
					// 			own: JSON.stringify(item)
					// 		}
					// 	})
					// }
				}
			},
			/* 跳转详情 */
			toNewsDeatail(detail) {
				/* 判断是否需要登录 */
				var that = this;
				var item = this.courtNoticeSelect;
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
						// if (that.$props.titleName.menuCode == "ANNOUNCEMENT") {
						//跳转新闻列表
						that.$router.push({
							path: '/announcement',
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(that.title.own),
								detail: JSON.stringify(detail)
							}
						})
						// } else {
						// 	//跳转新闻详
						// 	that.$router.push({
						// 		path: '/newsList',
						// 		query: {
						// 			item: JSON.stringify(item),
						// 			own: JSON.stringify(that.title.own),
						// 			detail: JSON.stringify(detail)
						// 		}
						// 	})
						// }

					}
				} else {
					// if (that.$props.titleName.menuCode == "ANNOUNCEMENT") {
					//跳转新闻列表
					that.$router.push({
						path: '/announcement',
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(that.title.own),
							detail: JSON.stringify(detail)
						}
					})
					// } else {
					// 	//跳转新闻详
					// 	that.$router.push({
					// 		path: '/newsList',
					// 		query: {
					// 			item: JSON.stringify(item),
					// 			own: JSON.stringify(that.title.own),
					// 			detail: JSON.stringify(detail)
					// 		}
					// 	})
					// }
				}
			},
			/* 鼠标悬停二级标题 */
			titleMouseover(item) {
				/* 办公室变动 */
				this.responsibleDepartment = item.responsibleDepartment;
				this.courtNoticeSelect = item;
				/* 标题变动 */
				var level = 'TWO';
				if (item.parentId == '-1') {
					level = 'ONE';
				}
				this.courtNewsTitleSelect = item;
				this.findInformation(item.menuCode, level);
			},
			findInformation(menuCode, level) {
				if (this.$props.titleName.own.menuCode == 'COURT_ANNOUNCEMENT') {
					this.page = 15
				} else {
					this.page = 6
				}
				var that = this;
				// if (that.$props.titleName.menuCode == "ANNOUNCEMENT") {
				this.api.findAnnouncement(that, menuCode, level, this.page, function(res) {
					var data = res.body.data;
					// for (var i = 0; i < data.length; i++) {
					// 	if (data[i].titleName.length > 10) {
					// 		data[i].titleName = data[i].titleName.substring(0, 10) + "....";
					// 	}
					// }
					that.noticeInfo = data;
				})
				// }
				//  else {
				// 	this.api.findInformation(that, menuCode, level, this.page, function(res) {
				// 		var data = res.body.data;
				// 		for (var i = 0; i < data.length; i++) {
				// 			if (data[i].titleName.length > 15) {
				// 				data[i].titleName = data[i].titleName.substring(0, 15) + "....";
				// 			}
				// 		}
				// 		that.noticeInfo = data;
				// 	})
				// }
			},

		},
		computed: {
			twoTitleFirst() {
				var data = this.title.twoTitle;
				if (data.length > 0) {
					if (data[0].menuName.length > 4) {
						data[0].menuName = data[0].menuName.substring(0, 4) + "..";
					}
					return data[0];
				} else {
					return ''
				}
			},
			twoTitle() {
				this.courtNoticeSelect = this.$props.titleName.own;
				this.responsibleDepartment = this.title.own.responsibleDepartment
				var data = this.title.twoTitle;
				if (data.length > 1) {
					return data;
				} else {
					return ''
				}
			},
		},
		mounted() {
			this.findInformation(this.$props.titleName.menuCode, 'ONE')
		},
		components: {
			vueSeamless,
		}

	}
</script>

<style scoped>
	.notice_body {
		width: 100%;
		/* height: 18.75rem; */
		border: #dddddd solid 0.0625rem;
		font-size: 0.875rem;
		min-width: 274px;

	}

	.notice_title {
		display: flex;
		align-items: center;
		padding-left: 1.25rem;
		height: 2.6rem;
		background-image: url(../assets/11.jpg);
		background-size: cover;
		color: #FFFFFF;
		font-size: 1.125rem;

	}

	.notice_body_title_active {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 160px;
	}

	.notice_body_title_active:hover {
		color: #0000FF !important;
		cursor: pointer;
	}

	.notice_title_name_active:hover {
		cursor: pointer;
	}

	.seamless-warp {
		height: 146px;
		overflow: hidden;
		margin-top: 20px;
	}

	.courtNews_title_new_image {
		background-image: url(../assets/new.gif);
		background-size: cover;
		width: 33px;
		height: 13px;
		margin-left: 15px;
	}

	.notice_body_title_two {
		display: flex;
		align-items: center;
		margin-left: auto;
		font-size: 0.875rem;
		margin-right: 0.625rem;
		/* margin-top: 20px; */
	}
</style>
