<template>
	<div>
		<top :screenWidth='screenWidth' ref='top' :searchValue='topSearchValue'></top>
		<div class="app_content">
			<div class="app_content_left" :style="appContentLeft">
			</div>
			<div class="app_content_center" :style="appContentCenter">
				<div style="min-height: 730px;">
					<div>
						<div style="text-align: left;margin-left: 40px;padding-top: 30px;font-size: 1rem;margin-bottom: 1.25rem;">
							<i class="el-icon-s-home" style="color: #2862b8;margin-left: 0.625rem;margin-right: 10px;"></i>当前位置：全站搜索</div>
						<div style="border: #2862b8 solid 0.125rem;margin-left: 0.625rem;margin-right: 0.625rem;"></div>
					</div>
					<div v-if="titleInfo"></div>
					<div style="display: flex; padding-top: 1.875rem;font-size: 0.875rem;">
						<!-- <div class="select_search_input">
							<div style="flex: 1;">关键词:</div>
							<div style="flex: 1.5;">
								<el-input v-model="input" size='mini'></el-input>
							</div>
						</div> -->
						<div class="select_search_input">
							<div style="flex: 1;">栏目:</div>
							<div style="flex: 1.5;">
								<el-input v-model="informationMenu" size='mini'></el-input>
							</div>
						</div>
						<div class="select_search_input">
							<div style="flex: 1;">标题:</div>
							<div style="flex: 1.5;">
								<el-input v-model="title" size='mini'></el-input>
							</div>
						</div>

						<div style="display: flex;flex: 2.5;margin-left:20px;align-items: center;">
							<div style="flex: 1;">发布日期:</div>
							<div style="flex: 1;">
								<el-date-picker v-model="publishedDate" value-format="yyyy-MM-dd" type="date" size="mini" placeholder="选择日期"></el-date-picker>
							</div>
						</div>

						<div style="display: flex;flex: 1;margin-left: 20px;">
							<el-button size='mini' @click="searchInformation()">查询</el-button>
						</div>
					</div>
					<div style="min-height: 25rem;">
						<ul style="color: #3d7dc7;margin-left: 100px;margin-right: 100px;padding-top: 30px;">
							<template v-for="item in titleList ">
								<li style="display: flex;align-items: center;;width: 100%;padding-top: 20px;list-style: none;" @click="clickTitle(item)">
									<div style="font-size: 10px;border-radius: 50%;width: 4px;height: 4px;background-color:  #3d7dc7;margin-right: 15px;"></div>
									<div style="display: flex;width: 100%;color: #333333;overflow: hidden;" class="bottom_last_title_active">
										<div>{{item.titleName}}</div>
										<div style="display:flex ;align-items: center;justify-content: center;margin-left: auto;color: #909090;font-size: 15px;">
											【{{item.items.menuName}}】
											{{item.gmtPublished}}
										</div>
									</div>
								</li>
							</template>
						</ul>
					</div>
					<div style="margin-top: 5.625rem">
						<el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :current-page.sync="page"
						 @current-change="currentChange()">
						</el-pagination>
					</div>
				</div>


				<div style="margin-bottom: 2.5rem;margin-left: 20px;margin-right: 20px;">
					<bottom></bottom>
				</div>
			</div>
			<div class="app_content_right" :style="appContentRight">

			</div>
		</div>
		<div>
			<bottomRecord></bottomRecord>
		</div>
	</div>
</template>

<script>
	import top from '../components/top.vue';
	import bottom from '../components/bottom.vue';
	import bottomRecord from '../components/bottom_record.vue'
	export default {

		data: function() {
			// console.info(this.$router.params.topSearchValue)
			return {
				screenWidth: document.body.clientWidth,
				topSearchValue: this.$route.query.searchValueParams,
				searchDate: '',
				lastTitleSelectActive: 100, //最近更新样式active标识
				informationMenu: '',
				title: '',
				publishedDate: '',
				page: 1,
				limit: 9,
				titleList: [],
				index: 0,
				total: 0,
			}
		},

		/* 监听路由变化--当前页面跳转当前页面，组件会复用，需要监听路由变化然后处理数据 */
		watch: {
			$route: {
				handler(newName, oldName) {
					this.title = this.$route.query.searchValueParams;
					this.searchInformation();
				},
				deep: true
			}
		},
		methods: {

			/* 页码发生变化 */
			currentChange() {
				this.findInformationByPage();
			},

			/* 搜索api */
			searchInformation() {

				if (this.informationMenu == "" && this.title == "" && this.publishedDate == "") {
					this.$message({
						message: '查询条件不能为空，请输入查询条件',
						type: 'warning'
					});
					return;
				};


				this.page = 1;
				var that = this;
				this.api.searchInformation(that, that.informationMenu, that.title, that.publishedDate, that.page, that.limit,
					function(
						res) {
						var data = res.body.data.data;

						that.total = res.body.data.count;
						if (that.total == 0) {
							that.$message('没有查到相关信息');
						} else {

							// 获取所有菜单信息
							var allMeun = localStorage.getItem("allMeun");
							var allMeunArray = [];
							if (allMeun != '') {
								allMeunArray = JSON.parse(allMeun);
							}

							for (var i = 0; i < data.length; i++) {
								if (data[i].titleName.length > 40) {
									data[i].titleName = data[i].titleName.substring(0, 40) + "....";
								}

								var menuCode = data[i].classifyTypeOfOne;
								if (data[i].classifyTypeOfTwo != null && data[i].classifyTypeOfTwo != '') {
									menuCode = data[i].classifyTypeOfTwo;
								}

								if (allMeun != '') {
									var flag = false;
									for (var j = 0; j < allMeunArray.length; j++) {
										if (allMeunArray[j].menuCode == menuCode) {
											data[i].items = allMeunArray[j];
											flag = true;
										}
										if (allMeunArray[j].menuCode == data[i].classifyTypeOfOne) {
											data[i].own = allMeunArray[j];
											if (flag) {
												break;
											}
										}
									}
								}
							}
						}
						that.titleList = data;
					});
			},
			/* 跳转详情 */
			clickTitle(itemInfo) {
				var that = this;
				// 获取所有菜单信息
				// var allMeun = localStorage.getItem("allMeun");
				// var menuCode = itemInfo.classifyTypeOfOne;
				// if (itemInfo.classifyTypeOfTwo != null && itemInfo.classifyTypeOfTwo != '') {
				// 	menuCode = itemInfo.classifyTypeOfTwo;
				// }
				var items = itemInfo.items; //保存二级菜单信息
				var own = itemInfo.own; //保存一级菜单信息
				// if (allMeun != '') {
				// 	var allMeunArray = JSON.parse(allMeun);
				// 	for (var i = 0; i < allMeunArray.length; i++) {
				// 		if (allMeunArray[i].menuCode == menuCode) {
				// 			items = allMeunArray[i];
				// 		}
				// 		if (allMeunArray[i].menuCode == itemInfo.classifyTypeOfOne) {
				// 			own = allMeunArray[i];
				// 		}
				// 	}
				// }
				if (Object.keys(items).length > 0) {

					var item = items;
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
									item: JSON.stringify(items),
									own: JSON.stringify(own),
									detail: JSON.stringify(itemInfo),
								}
							})
						}
					} else {
						// 跳转新闻列表
						that.$router.push({
							path: '/newsList',
							query: {
								item: JSON.stringify(items),
								own: JSON.stringify(own),
								detail: JSON.stringify(itemInfo),
							}
						})
					}
				}
			},


		},
		//计算属性
		computed: {
			//左边栏宽度
			appContentLeft: function() {
				return `width: ${(this.screenWidth -(this.screenWidth  * 0.67 -24))/2}px;`
			},
			//中间宽度
			appContentCenter: function() {
				// return `width: ${this.screenWidth  * 0.67 -24}px;minWidth:1149px`
				return 'width:1242px'
			},
			//右边栏宽度
			appContentRight: function() {
				return `width: ${(this.screenWidth -(this.screenWidth  * 0.67 -24))/2}px;`
			},
			titleInfo: function() {
				if (this.index == 0) {
					this.title = this.$route.query.searchValueParams;
					this.searchInformation();
				}
				this.index = 1;
				return false;
			}

		},
		//添加组件
		components: {
			top,
			bottom,
			bottomRecord,
		},
		mounted() {

		}
	}
</script>

<style>
	.app_content_center {

		border: #dddddd solid 0.0625rem;
		border-top: none;
		margin-left: auto;
		margin-right: auto;
	}

	.select_search_input {
		display: flex;
		flex: 2;
		margin-left: 20px;
		align-items: center;
	}

	.bottom_last_title_active:hover {
		color: #3061b6 !important;
		cursor: pointer;

	}
</style>
