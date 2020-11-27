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
								<div style="background-color: #d9e9fc;width: 80%;margin-left: 2.5rem;padding-top: 20px;padding-bottom: 20px;">
									<template v-for="item in twoTitle"></template>
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
					<div style="margin-left: auto;margin-right: auto;background-color: #fafcff;width: 70%;min-width: 54.75rem;margin-right: 30px;">
						<div style="padding-top: 1.25rem;">
							<div>
								<div style="text-align: left;padding-top: 30px;font-size: 1rem;margin-bottom: 1.25rem;"><i class="el-icon-s-home"
									 style="color: #2862b8;margin-left: 0.625rem;margin-right: 10px;"></i>当前位置：{{own.menuName}}</div>
								<div style="border: #2862b8 solid 0.125rem;margin-left: 0.625rem;margin-right: 0.625rem;"></div>
							</div>
							<div>
								<div style="display: flex; padding-top: 1.875rem;font-size: 0.875rem;justify-content: flex-end;margin-right: 2.5rem;">
									<div class="softwareDownload_select_search_input">
										<div>
											<el-input v-model="title" size='mini' placeholder="请输入文件名称"></el-input>
										</div>
									</div>
									<div>
										<el-button size='mini' @click="clickSearchBut()">查询</el-button>
									</div>
								</div>
								<div>
									<ul style="color: #3d7dc7;margin-left: 20px;margin-right: 40px;padding-top: 30px;min-height: 300px;padding-inline-start: 20px;padding-left: 20px;">
										<template v-for="item in titleList ">
											<li style="width: 100%;padding-top: 20px;list-style: none;" @click="clickTitleName(item)">
												<div style="display: flex;align-items: center;width: 100%;color: #333333;overflow: hidden;" class="newsList_last_title_active">
													<div style="font-size: 10px;border-radius: 50%;width: 4px;height: 4px;background-color:  #3d7dc7;margin-right: 15px;"></div>
													<div style="flex: 1;text-align: left;">名称：{{item.title}}</div>
													<div style="flex: 1;text-align: center;font-size: 0.875rem;">大小：{{item.fileSize}}</div>
													<div style="flex: 1;text-align: right;font-size: 0.875rem;">下载次数：{{item.downloadCount}}</div>
													<!-- <div style="display:flex ;align-items: center;justify-content: center;margin-left: auto;">{{item.gmtPublished}}</div> -->
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
				page: 1,
				limit: 7,
				titleList: [], //标题信息
				total: 0, //标题总数
				index: 0, //标识第一次进入页面
				titleInfo: {},
				detail: this.$route.query.detail,
				href: "",
				title: '',

			}
		},
		/* 监听路由变化--当前页面跳转当前页面，组件会复用，需要监听路由变化然后处理数据 */
		watch: {
			$route: {
				handler(newName, oldName) {
					this.selectItem = JSON.parse(newName.query.item);
					this.own = JSON.parse(newName.query.own);
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
				// 根据菜单获取标题					
				var classifyLevel = "TWO";
				if (this.selectItem.unionId == this.own.unionId) {
					classifyLevel = "ONE";
				}
				this.api.softwareFindListByConditions(that, this.selectItem.menuCode, this.title, this.page, this.limit, function(
					res) {
					var data = res.body.data.data;
					that.total = res.body.data.count;
					if (that.total == 0) {
						that.$message('暂无内容');
					} else {
						for (var i = 0; i < data.length; i++) {
							if (data[i].title.length > 30) {
								data[i].title = data[i].title.substring(0, 30) + "....";
							}
						}
					}
					that.titleList = data;
				})

			},
			/* 点击二级标题 */
			clickTwoTitleBut(item) {
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
						this.findInformationByPage();
					}
				} else {
					this.findInformationByPage();
				}
			},
			/* 点击标题 */
			clickTitleName(item) {
				var that = this;
				var url = this.api.getApiUrl;
				var data = {
					token: that.$store.getters.getToken,
					classifyType: item.classifyType,
					unionId: item.unionId,
				}
				var sign = this.api.setFormData(data, that);
				data.sign = sign;
				url = this.api.apiUrl + "download/software" + "?token=" + data.token + "&classifyType=" + data.classifyType +
					"&unionId=" + data.unionId +
					"&sign=" + data.sign;

				window.location.href = url;

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
				if (this.index == 0 && (this.detail == "" || this.detail == undefined)) {
					this.findInformationByPage();
				} else if (this.index == 0 && (this.detail != "" && this.detail != undefined)) {
					var detail = JSON.parse(this.detail);
					this.clickTitleName(detail);
				}

				// 获取二级标题
				return this.api.informationMenuSearch(that, that.own.unionId, function(res) {
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
	.app_content_center {

		border: #dddddd solid 0.0625rem;
		border-top: none;
		margin-left: auto;
		margin-right: auto;
	}

	.softwareDownload_select_search_input {
		display: flex;
		margin-left: 20px;
		margin-right: 10px;
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

	.newlist_titleInfo_content img {
		display: block;
		max-width: 100%;
	}

	.newList_titleName_active {
		cursor: pointer;
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
