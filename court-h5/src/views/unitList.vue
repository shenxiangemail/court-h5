<template>
	<div>
		<top :screenWidth='screenWidth' ref='top' :searchValue='topSearchValue'></top>
		<div class="app_content">
			<div class="unitList_app_content_left" :style="appContentLeft">
			</div>
			<div class="unitList_app_content_center" :style="appContentCenter">
				<div style="min-height: 730px;display: flex;">
					<div style=";width: 18.75rem;display: flex;">
						<div style="width: 100%;height: 100%;display: flex;">
							<div style="padding-top: 0.625rem;background-color: #f3f8fe;width: 100%;height: 100%;display: flex;flex-direction: column;">
								<div @click="clickOneTitleBut(own)" style="background-color: #2b64b6;height: 3.125rem;display: flex;align-items: center;color: #FFFFFF;font-size: 1.125rem;justify-content: center;margin-left: 2.5rem;margin-top: 1.875rem;"
								 class="unitList_titleName_active">部门列表</div>
								<div style="background-color: #d9e9fc;width: 80%;margin-left: 2.5rem;padding-top: 20px;padding-bottom: 20px;">
									<template v-for="item in twoTitle"></template>
									<el-menu :default-active="selectItem.unionId" class="el-menu-vertical-demo" background-color='#d9e9fc'>
										<template v-for="(item,index) in twoTitle2">
											<!-- <el-menu-item :index="item.unionId" @click="clickTwoTitleBut(item)">
												<i class="el-icon-d-arrow-left"></i>
												<span slot="title">{{item.departmentName}}</span>
											</el-menu-item> -->
											<div @click="clickTwoTitleBut(item)" style="display: flex;justify-content: left;align-items: center;margin-left: 1.25rem;padding: 10px;text-align: left;font-size: 14px;"
											 class="newsList_two_title_active" :class="{newsList_two_title_select_active : item.unionId == selectItem.unionId}">
												<div><i class="el-icon-d-arrow-left" style="margin-right: 0.625rem;"></i></div>
												<span slot="title">{{item.departmentName}}</span>
											</div>
										</template>
									</el-menu>
								</div>
							</div>
							<div class="unitList_right_image"></div>
						</div>

					</div>
					<div style="margin-left: auto;margin-right: auto;width: 70%;min-width: 54.75rem;margin-right: 30px;">
						<div style="padding-top: 1.25rem;">
							<div>
								<div style="text-align: left;padding-top: 30px;font-size: 1rem;margin-bottom: 1.25rem;"><i class="el-icon-s-home"
									 style="color: #2862b8;margin-left: 0.625rem;margin-right: 10px;"></i>当前位置：{{own.menuName}}</div>
								<div style="border: #2862b8 solid 0.125rem;margin-left: 0.625rem;margin-right: 0.625rem;"></div>
							</div>
							<div style="display: flex; padding-top: 1.875rem;font-size: 0.875rem;">
								<div class="unitList_select_search_input">
									<div>
										<el-input v-model="name" size='mini' placeholder="请输入姓名"></el-input>
									</div>
								</div>

								<div style="display: flex;margin-left: 20px;margin-right: 1.25rem;">
									<el-button size='mini' @click="clickSearchBut()">查询</el-button>
								</div>
							</div>

							<div style="min-height: 500px;margin-top: 1.25rem;">
								<div style="display: flex;flex-flow: wrap;justify-content: space-between;align-items: center;">
									<template v-for="item in titleList">
										<div style="border: #d9d9d9 solid 0.0625rem;min-width: 250px;text-align: left;padding: 0.625rem;margin-top: 30px;font-size: 14px;">
											<div class="unitList_book">姓名：{{item.name}}</div>
											<div class="unitList_book">职务：{{item.duty}}</div>
											<div class="unitList_book">办公室号码：{{item.officePhone}}</div>
											<div class="unitList_book">手机长号：{{item.phoneNumber}}</div>
											<div class="unitList_book">手机短号：{{item.phoneNumberShort}}</div>
										</div>
									</template>
									<template v-for="index in (3-titleList.length%3)">
										<div style="min-width: 170px;text-align: left;padding: 0.625rem;margin-top: 30px;font-size: 14px;"></div>
									</template>
								</div>
							</div>
							<div style="margin-top: 5.625rem">
								<el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :current-page.sync="page"
								 @current-change="currentChange()">
								</el-pagination>
							</div>
						</div>
					</div>
				</div>


				<div style="margin-bottom: 2.5rem;margin-left: 20px;margin-right: 20px;margin-top: 3.75rem">
					<bottom></bottom>
				</div>
			</div>
			<div class="unitList_app_content_right" :style="appContentRight">

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
				selectItem: {},
				own: JSON.parse(this.$route.query.own),
				name: '',
				twoTitle2: [],
				page: 1,
				limit: 12,
				titleList: [], //标题信息
				total: 0, //标题总数
				index: 0, //标识第一次进入页面
				titleInfo: {},

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
				// 根据菜单获取标题		
				var departmentId = '';
				if (this.selectItem.unionId != undefined) {
					departmentId = this.selectItem.unionId;
				}
				this.api.findAddressBookByConditions(that, departmentId, this.name, this.page, this.limit, function(res) {
					that.titleList = res.body.data.data;
					that.total = res.body.data.count;
					that.total = res.body.data.count;
					if (that.total == 0) {
						that.$message('暂无内容');
					}
				})
			},
			/* 点击二级标题 */
			clickTwoTitleBut(item) {
				var preSelectItem = this.selectItem;
				this.selectItem = item;
				this.twoTitle();
			},
			/* 点击一级标题 */
			clickOneTitleBut(item) {
				var preSelectItem = this.selectItem;
				this.selectItem = '';
				this.twoTitle();
			},
			/* 点击搜索按钮 */
			clickSearchBut() {
				this.page = 1;
				this.findInformationByPage();
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
				this.findInformationByPage();
				// 获取二级标题
				return this.api.findDepartmentList(that, function(res) {
					var data = res.body.data;
					that.twoTitle2 = data;
					return data;
				});
			},

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
	.unitList_app_content_center {

		border: #dddddd solid 0.0625rem;
		border-top: none;
		margin-left: auto;
		margin-right: auto;
	}

	.unitList_select_search_input {
		display: flex;
		margin-left: auto;
		align-items: center;
		margin-left: auto;
	}

	.unitList_last_title_active:hover {
		color: #3061b6 !important;
		cursor: pointer;

	}

	.unitList_right_image {
		margin-top: 2.5rem;
		width: 8px;
		height: 3.4375rem;
		background-image: url(../assets/70.png);
		background-size: cover;

	}

	.unitList_titleInfo_content img {
		display: block;
		max-width: 100%;
	}

	.unitList_titleName_active {
		cursor: pointer;
	}

	.unitList_book {
		margin-top: 10px;
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
