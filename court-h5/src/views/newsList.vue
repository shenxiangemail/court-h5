<template>
	<div>
		<top :screenWidth='screenWidth' ref='top' :searchValue='topSearchValue'></top>
		<div class="app_content">
			<div class="app_content_left" :style="appContentLeft">
			</div>
			<div class="app_content_center" :style="appContentCenter">
				<div style="min-height: 730px;display: flex;">
					<div style=";width: 18.75rem;display: flex;">
						<div style="width: 100%;height: 100%;display: flex;">
							<div style="padding-top: 0.625rem;background-color: #f3f8fe;width: 100%;height: 100%;display: flex;flex-direction: column;">
								<div @click="clickTwoTitleBut(own)" style="background-color: #2b64b6;height: 3.125rem;display: flex;align-items: center;color: #FFFFFF;font-size: 1.125rem;justify-content: center;margin-left: 2.5rem;margin-top: 1.875rem;"
								 class="newList_titleName_active">{{own.menuName}}</div>
								<div style="background-color: #d9e9fc;width: 80%;margin-left: 2.5rem;padding-top: 20px;padding-bottom: 20px;padding-bottom: 20px;">
									<div>{{twoTitle}}</div>
									<el-menu :default-active="selectItem.unionId" class="el-menu-vertical-demo" background-color='#d9e9fc'>
										<template v-for="(item,index) in twoTitle2">
											<!-- <el-menu-item :index="item.unionId" @click="clickTwoTitleBut(item)">
												<i class="el-icon-d-arrow-left"></i>
												<span slot="title">{{item.menuName}}</span>
											</el-menu-item> -->
											<div @click="clickTwoTitleBut(item)" style="display: flex;justify-content: left;align-items: center;margin-left: 1.25rem;padding: 10px;text-align: left;font-size: 14px;"
											 class="newsList_two_title_active" :class="{newsList_two_title_select_active : item.unionId == selectItem.unionId}">
												<div><i class="el-icon-d-arrow-left" style="margin-right: 0.625rem;"></i></div>
												<span slot="title">{{item.menuName}}</span>
											</div>
										</template>
									</el-menu>
								</div>
							</div>
							<div class="newsList_right_image"></div>
						</div>

					</div>
					<div style="margin-left: auto;margin-right: auto;width: 70%;min-width: 54.75rem;margin-right: 30px;" :class="{newsList_content_background : href ==''}">
						<div style="padding-top: 1.25rem;">
							<div>
								<div style="text-align: left;padding-top: 30px;font-size: 1rem;margin-bottom: 1.25rem;"><i class="el-icon-s-home"
									 style="color: #2862b8;margin-left: 0.625rem;margin-right: 10px;"></i>当前位置：{{own.menuName}}
									<i :class="{'el-icon-arrow-right' : selectItem.menuName != '' && selectItem.menuName != own.menuName}" style="color: #0074D9;"></i>{{selectItem.menuName != own.menuName ? selectItem.menuName : ""}}
									<i :class="{'el-icon-arrow-right' : selectThreeTitle != ''}" style="color: #0074D9;"></i>{{selectThreeTitle}}</div>
								<div style="border: #2862b8 solid 0.125rem;margin-left: 0.625rem;margin-right: 0.625rem;"></div>
							</div>
							<div v-show="isShowTwoTitle && findInformationByYear.length == 0">
								<div style="display: flex; padding-top: 1.875rem;font-size: 0.875rem;">
									<!-- <div class="select_search_input">
										<div style="flex: 1;">关键词:</div>
										<div style="flex: 1.5;">
											<el-input v-model="input" size='mini'></el-input>
										</div>
									</div> -->
									<div class="select_search_input">
										<div style="flex: 1;">标题:</div>
										<div style="flex: 1.5;">
											<el-input v-model="title" size='mini'></el-input>
										</div>
									</div>

									<div style="display: flex;flex: 2.5;margin-left:20px;align-items: center;" v-show="isShowTwoTitle && selectItem.menuCode != '12001'">
										<!-- <div style="flex: 1;">发布日期:</div> -->
										<div style="flex: 1;">
											<el-date-picker v-model="publishedDate" value-format="yyyy-MM-dd" type="date" size="mini" placeholder="发布日期"></el-date-picker>
										</div>
									</div>

									<div style="display: flex;flex: 1;margin-left: 20px;">
										<el-button size='mini' @click="clickSearchBut()">查询</el-button>
									</div>
								</div>
								<div v-show="titleList.length == 0" style="font-size: 1.25rem;margin-top: 3.75rem;color: #c5c5c5; ">
									暂无内容
								</div>
								<div>
									<ul style="color: #3d7dc7;margin-left: 20px;margin-right: 40px;padding-top: 30px;min-height: 300px;padding-inline-start: 20px;padding-left: 20px;">
										<template v-for="item in titleList ">
											<li style="width: 100%;padding-top: 20px;list-style: none;" @click="clickTitleName(item)">
												<div style="display: flex;align-items: center;width: 100%;color: #333333;overflow: hidden;" class="newsList_last_title_active">
													<div style="font-size: 10px;border-radius: 50%;width: 4px;height: 4px;background-color:  #3d7dc7;margin-right: 15px;"></div>
													<div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 600px;">{{item.titleName}}</div>
													<div style="display:flex ;align-items: center;justify-content: center;margin-left: auto;">{{item.gmtPublished}}</div>
												</div>
											</li>
										</template>
									</ul>
								</div>


								<div style="margin-top: 5.625rem" v-show="titleList.length > 0">
									<el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :current-page.sync="page"
									 @current-change="currentChange()">
									</el-pagination>
								</div>
							</div>
							<!-- 显示年度 -->
							<div v-show="isShowTwoTitle && findInformationByYear.length > 0">
								<div v-show="findInformationByYear.length == 0" style="font-size: 1.25rem;margin-top: 3.75rem;color: #c5c5c5; ">
									暂无内容
								</div>
								<div>
									<ul style="color: #3d7dc7;margin-left: 20px;margin-right: 40px;padding-top: 30px;min-height: 300px;padding-inline-start: 20px;padding-left: 20px;">
										<template v-for="item in findInformationByYear ">
											<li style="width: 100%;padding-top: 20px;list-style: none;" @click="clickYearName(item)">
												<div style="display: flex;align-items: center;width: 100%;color: #333333;overflow: hidden;" class="newsList_last_title_active">
													<div style="font-size: 10px;border-radius: 50%;width: 4px;height: 4px;background-color:  #3d7dc7;margin-right: 15px;"></div>
													<div>{{item}}年法院简报</div>
												</div>
											</li>
										</template>
									</ul>
								</div>
							</div>
							<!-- 显示详细信息 -->
							<div v-show="!isShowTwoTitle">
								<div style="min-height: 500px;">
									<div style="margin-top: 2.5rem;">
										<h3>{{titleInfo.titleName}}</h3>
									</div>
									<div style="display: flex;justify-content: center;font-size: 0.8125rem;margin-bottom: 0.625rem;color: #818181;">
										<div>发布日期：{{titleInfo.gmtPublished}}</div>
										<div style="margin-left: 1.25rem;">浏览次数：{{titleInfo.clickCount}}</div>
										<div style="margin-left: 1.25rem;">来源：{{titleInfo.source}}</div>
									</div>
									<div style="border: #eaeaea solid 0.0625rem;"></div>
									<div v-html="titleInfo.content" class="newlist_titleInfo_content">

									</div>
									<div v-if="href !=''" style="height: 1000px;">
										<!-- <pdfs v-if="href !=''" doctype="pdf" :dochref="href"></pdfs> -->
										<iframe :src="href" frameborder="0" style="width: 100%; height: 100%"></iframe>
									</div>
								</div>
								<div style="margin-left: auto;margin-top: 30px;margin-right: 1.875rem;display: flex;justify-content: flex-end;font-size: 0.875rem;">访问人员：{{titleInfo.seeUsers != null ?titleInfo.seeUsers :"暂无"}}</div>
							</div>

						</div>
					</div>
				</div>


				<div style="margin-bottom: 2.5rem;margin-left: 20px;margin-right: 20px;margin-top: 2.5rem;">
					<bottom></bottom>
				</div>
			</div>
			<div class="app_content_right" :style="appContentRight">

			</div>
			<!-- <div>
				<a target="_blank" :href="href">相关论文</a>
			</div> -->
		</div>
		<div>
			<bottomRecord></bottomRecord>
		</div>
	</div>
</template>

<script>
	import top from '../components/top.vue';
	import bottom from '../components/bottom.vue';
	import pdfs from '../components/pdfs.vue';
	import bottomRecord from '../components/bottom_record.vue'
	export default {

		data: function() {
			// console.info(this.$router.params.topSearchValue)
			return {
				screenWidth: document.body.clientWidth,
				topSearchValue: this.$route.query.searchValueParams,
				searchDate: '',
				selectItem: JSON.parse(this.$route.query.item),
				own: JSON.parse(this.$route.query.own),
				input: '',
				twoTitle2: [],
				isShowTwoTitle: true, //显示详情(false)还是标题(true)
				page: 1,
				limit: 7,
				titleList: [], //标题信息
				total: 0, //标题总数
				index: 0, //标识第一次进入页面
				titleInfo: {},
				detail: this.$route.query.detail,
				href: "",
				title: '',
				publishedDate: '',
				findInformationByYear: [], //保存年度列表
				titleYear: '', //年搜索框
				classifyTypeOfThree: '',
				selectThreeTitle: '',
			}
		},
		/* 监听路由变化--当前页面跳转当前页面，组件会复用，需要监听路由变化然后处理数据 */
		watch: {
			$route: {
				handler(newName, oldName) {
					this.selectItem = JSON.parse(newName.query.item);
					this.own = JSON.parse(newName.query.own);
					this.findInformationByPage();
				},
				deep: true
			}
		},
		methods: {
			/* 页码发生变化 */
			currentChange() {
				this.findInformationByPage();
			},
			/* 获取标题分页 */
			findInformationByPage() {
				var that = this;
				that.findInformationByYear = [];
				if (this.isShowTwoTitle) {
					// 根据菜单获取标题					
					var classifyLevel = "TWO";
					if (this.selectItem.unionId == this.own.unionId) {
						classifyLevel = "ONE";
					}
					this.api.findInformationByPage(that, that.selectItem.menuCode, classifyLevel, that.page, that.limit, this.title,
						this.publishedDate, this.classifyTypeOfThree,
						function(res) {
							that.isShowTwoTitle = true;
							var data = res.body.data.data;
							that.total = res.body.data.count;
							if (that.total == 0) {
								that.$message('暂无内容');
							} else {
								// for (var i = 0; i < data.length; i++) {
								// 	if (data[i].titleName.length > 30) {
								// 		data[i].titleName = data[i].titleName.substring(0, 30) + "....";
								// 	}
								// }
							}
							that.titleList = data;
						})
				}
			},
			/* 点击二级标题 */
			clickTwoTitleBut(item) {
				this.selectThreeTitle = '';
				this.page = 1;
				this.index = 1;
				var preSelectItem = this.selectItem;
				this.selectItem = item;
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
							this.selectItem = preSelectItem;
						});
					} else {
						this.isShowTwoTitle = true;
						if (item.menuCode == "12001") {
							this.findYear();
						} else {
							this.findInformationByPage();
						}
					}
				} else {
					this.isShowTwoTitle = true;
					if (item.menuCode == "12001") {
						this.findYear();
					} else {
						this.findInformationByPage();
					}
				}
			},
			// 点击年度
			clickYearName(item) {
				this.selectThreeTitle = item;
				this.page = 1;
				this.findInformationByYears(item);
			},
			/* 点击标题 */
			clickTitleName(item) {
				this.href = '';
				var that = this;
				var informationCode = item.classifyTypeOfOne;
				if (item.classifyTypeOfTwo != "" && item.classifyTypeOfTwo != null) {
					informationCode = item.classifyTypeOfTwo;
				}
				this.api.findInformationByUnionId(that, informationCode, item.unionId, function(res) {
					that.titleInfo = res.body.data;
					that.isShowTwoTitle = false;
					/* 判断文件类型 */
					if (res.body.data.showType == 1) {
						// that.href = res.body.data.appendixUrl;
						that.href = `/static/pdf/web/viewer.html?file=` + encodeURIComponent(res.body.data.appendixUrl);

					}
				})



			},
			/* 点击搜索按钮 */
			clickSearchBut() {
				this.page = 1;
				this.isShowTwoTitle = true;
				this.findInformationByPage();
			},
			/* 获取年度列表 */
			findYear() {
				this.href = '';
				var that = this;
				this.api.findYear(that, function(res) {
					that.isShowTwoTitle = true;
					that.findInformationByYear = res.body.data;
					if (that.findInformationByYear.length == 0) {
						that.$message('暂无内容');
					}
				})
			},
			/* 获取某年度信息列表 */
			findInformationByYears(item) {
				this.href = '';
				var that = this;
				this.api.findInformationByYear(that, "12001", "TWO", this.titleYear, item, this.page, this.limit, function(res) {
					that.isShowTwoTitle = true;
					var data = res.body.data.data;

					that.total = res.body.data.count;
					that.findInformationByYear = [];
					if (that.total == 0) {
						that.$message('暂无内容');
					} else {
						// for (var i = 0; i < data.length; i++) {
						// 	if (data[i].titleName.length > 30) {
						// 		data[i].titleName = data[i].titleName.substring(0, 30) + "....";
						// 	}
						// }
					}
					that.titleList = data;
				})
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
			twoTitle: function() {
				var that = this;
				if (this.index == 0 && (this.detail == "" || this.detail == undefined)) {
					/* 判断是否法院简报- */
					if (that.selectItem.menuCode == '12001') {
						this.findYear();
					} else {
						this.findInformationByPage();
					}
				} else if (this.index == 0 && (this.detail != "" && this.detail != undefined)) {
					this.isShowTwoTitle = false;
					var detail = JSON.parse(this.detail);
					this.clickTitleName(detail);
				}
				// 获取二级标题
				this.api.informationMenuSearch(that, that.own.unionId, function(res) {

					var data = res.body.data;
					that.twoTitle2 = data;
					return data;
				});
				return '';

			},

		},
		//添加组件
		components: {
			top,
			bottom,
			pdfs,
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

	.newsList_last_title_active:hover {
		color: #3061b6 !important;
		cursor: pointer;

	}

	.newsList_right_image {
		margin-top: 2.5rem;
		width: 8px;
		height: 3.4375rem;
		background-image: url(../assets/70.png);
		background-size: cover;

	}

	.newlist_titleInfo_content {
		text-align: left;
	}

	.newlist_titleInfo_content img {
		/* display: block;
		max-width: 100%; */
	}

	.newList_titleName_active {
		cursor: pointer;
	}

	.newsList_content_background {
		background-color: #fafcff;
	}

	.newsList_two_title_active:hover {
		cursor: pointer;
		background-color: #6484f8;
		color: #FFFFFF;
	}

	.newsList_two_title_select_active {
		cursor: pointer;
		background-color: #6484f8;
		color: #FFFFFF;
	}
</style>
