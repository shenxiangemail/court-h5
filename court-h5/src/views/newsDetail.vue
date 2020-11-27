<template>
	<div>
		<top :screenWidth='screenWidth' ref='top' :searchValue='topSearchValue'></top>
		<div class="app_content">
			<div class="app_content_left" :style="appContentLeft">
			</div>
			<div class="app_content_center" :style="appContentCenter">
				<div style="min-height: 730px;display: flex;">
					<div style=";width: 18.75rem;">
						<div style="width: 100%;height: 100%;">
							<div style="padding-top: 0.625rem;background-color: #f3f8fe;width: 100%;height: 100%;display: flex;flex-direction: column;">
								<div style="background-color: #2b64b6;height: 3.125rem;display: flex;align-items: center;color: #FFFFFF;font-size: 1.125rem;justify-content: center;margin-left: 2.5rem;margin-top: 1.875rem;">{{own.menuName}}</div>
								<div style="background-color: #d9e9fc;width: 80%;margin-left: 2.5rem;">
									<template v-for="item in twoTitle"></template>
									<el-menu :default-active="selectItem.unionId" class="el-menu-vertical-demo" background-color='#d9e9fc'>
										<template v-for="(item,index) in twoTitle2">
											<el-menu-item :index="item.unionId">
												<i class="el-icon-d-arrow-left"></i>
												<span slot="title">{{item.menuName}}</span>
											</el-menu-item>
										</template>
									</el-menu>
								</div>
							</div>
						</div>

					</div>
					<div style="margin-left: auto;margin-right: auto;background-color: #fafcff;width: 70%;min-width: 54.75rem;margin-right: 30px;">
						<div>
							<div style="margin-top: 2.5rem;">
								<h3>长三角住房公积金一体化正式落地 首批3个事实项目率先实现</h3>
							</div>
							<div style="display: flex;justify-content: center;font-size: 0.8125rem;margin-bottom: 0.625rem;color: #818181;">
								<div>发布日期：2020-06-21 08：47</div>
								<div style="margin-left: 1.25rem;">浏览次数：07030</div>
								<div style="margin-left: 1.25rem;">来源：浙江日报</div>
							</div>
							<div style="border: #eaeaea solid 0.0625rem;"></div>
							<div>
								长三角住房公积金一体化正式落地 首批2个事实项目率先实现长三角住房公积金一体化正式落地 首批2个事实项目率先实现长三角住房公积金一体化正式落地 首批2个事实项目率先实现
								长三角住房公积金一体化正式落地 首批2个事实项目率先实现
								长三角住房公积金一体化正式落地 首批2个事实项目率先实现
								长三角住房公积金一体化正式落地 首批2个事实项目率先实现长三角住房公积金一体化正式落地 首批2个事实项目率先实现长三角住房公积金一体化正式落地 首批2个事实项目率先实现
								长三角住房公积金一体化正式落地 首批2个事实项目率先实现
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
		</div>

	</div>
</template>

<script>
	import top from '../components/top.vue';
	import bottom from '../components/bottom.vue';
	export default {

		data: function() {
			// console.info(this.$router.params.topSearchValue)
			return {
				screenWidth: document.body.clientWidth,
				topSearchValue: this.$route.query.searchValueParams,
				searchDate: '',
				selectItem: JSON.parse(this.$route.query.item),
				own: JSON.parse(this.$route.query.own),
				detail: JSON.parse(this.$route.query.detail),
				input: '',
				twoTitle2: [],
			}
		},
		methods: {


		},
		//计算属性
		computed: {
			//左边栏宽度
			appContentLeft: function() {
				return `width: ${(this.screenWidth -(this.screenWidth  * 0.67 -24))/2}px;`
			},
			//中间宽度
			appContentCenter: function() {
				return `width: ${this.screenWidth  * 0.67 -24}px;minWidth:1149px`
			},
			//右边栏宽度
			appContentRight: function() {
				return `width: ${(this.screenWidth -(this.screenWidth  * 0.67 -24))/2}px;`
			},
			twoTitle: function() {
				var that = this;

				/* 获取详细信息 */
				this.api.findInformationByUnionId(that, 'ONE',that.detail.unionId, function(res) {
					console.info("----------------------------------------")
				});
				// 获取二级标题
				console.info(that.own)
				return this.api.informationMenuSearch(that, that.own.unionId, function(res) {

					console.info("----------------------------------------")
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

	.newsDetail_last_title_active:hover {
		color: #3061b6 !important;
		cursor: pointer;

	}
</style>
