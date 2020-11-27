<template>
	<div class="index_app">
		<top :screenWidth='screenWidth' ref='top' searchValue=''></top>
		<div class="app_content" id="appContent">
			<div class="app_content_left" :style="appContentLeft" ref='leftWindow'>
				<left :leftTop="leftTop"></left>
				<!-- <testLeft></testLeft> -->
			</div>
			<div class="app_content_center" :style="appContentCenter">
				<div class="app_content_center_top">
					<div class="app_content_last flex">
						<div class="app_content_top_left">
							<template>
								<el-carousel :interval="5000" arrow="always" :height='elCarouselHeight'>
									<el-carousel-item v-for="(item,index) in pictureNews" :key="index">
										<div :style="pictureNewsUrl(item)" @click="toInformationDetail(item)"></div>
									</el-carousel-item>
								</el-carousel>
							</template>
						</div>
						<div class="app_content_top_right">
							<div class="app_content_top_right_top">最近更新</div>
							<div class="app_content_top_right_bottom">
								<div style="width: 100%"> 
									<ul style="color: #3d7dc7;padding-inline-start: 25px;padding-left: 25px;" >
										<template v-for="item in lastInformation">
											<li style="width: 100%;padding-top: 12px;list-style: none;" @click="toInformationDetail(item)">
												<div style="display: flex;width: 100%;color: #333333;overflow: hidden;" class="last_title_active">

													<div style="flex: 4; display: flex;align-items: center;">
														<div style="font-size: 10px;border-radius: 50%;width: 5px;height: 5px;background-color:  #507dc1;margin-right: 15px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"></div>
														<div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 300px;">{{item.titleName}}</div>
													</div>
													<div style="margin-left: auto;margin-right: 0.625rem;">{{item.gmtPublished}}</div>
												</div>
											</li>
										</template>
									</ul>
								</div>

							</div>
						</div>
					</div>
					<div style="display: flex;margin-top: 30px;">
						<div style="flex: 2.8;">
							<template v-for="item in 4">
								<div style="display:flex;" :class="{app_margin_top_20 : item > 1 }">
									<!-- 法院新闻 -->
									<div style="flex: 1;margin-right: 20px;">
										<courtNews :title='courtNews' :index='(item-1) * 2'></courtNews>
									</div>
									<!-- 规章制度 -->
									<div style="flex: 1;">
										<courtNews :title='courtNews' :index='(item-1) * 2 + 1'></courtNews>
									</div>
								</div>
							</template>
						</div>
						<!-- 右边公告通知栏目 -->
						<div class="app_content_top_court_right" style="flex:1;">
							<div>
								<notice :titleName='notice[0]'></notice>
							</div>
							<div style="margin-top: 20px;">
								<notice :titleName='notice[1]'></notice>
							</div>
							<div style="margin-top: 20px;">
								<notice :titleName='notice[2]'></notice>
							</div>
							<!-- 相关通讯录 -->
							<div class="app_address_book app_address_book_common app_address_book_active" @click="toNewsList(addressBook.own,'addressBook')"></div>
							<div class="app_software_download app_address_book_common app_address_book_active" @click="toNewsList(softwareDownload.own,'softwareDownload')"></div>
							<div class="app_cute_photos app_address_book_common app_address_book_active" @click="toNewsList(imageShare.own,'imageShare')"></div>
							<div class="app_video_on_demand app_address_book_common app_address_book_active" @click="vodVideo()"></div>
						</div>
					</div>
					<!-- 海苑采风 -->
					<div>
						<seaGarden :title="seaGarden"></seaGarden>
					</div>
				</div>
				<!-- 新时代图片 -->
				<div class="app_new_age"></div>

				<div style="margin-left: 2.8125rem;margin-right: 2.8125rem;">
					<div style="display: flex;">
						<!-- 部门风采 -->
						<div style="flex: 1;border: #dddddd solid 0.0625rem;margin-right: 30px;margin-top: 3.75rem;min-width: 1.8rem;">
							<unit :title="unit"></unit>
						</div>
						<div style="flex: 2.8;margin-top: 2.9rem;">
							<div style="display:flex;">
								<!-- 政工园地 -->
								<div style="flex: 1;margin-right: 20px;">
									<politicalWork :title='courtUnit' index='0'></politicalWork>
								</div>
								<!-- 廉政园地 -->
								<div style="flex: 1;">
									<politicalWork :title='courtUnit' index='1'></politicalWork>
								</div>
							</div>
							<div style="display:flex;" class="app_margin_top_20">
								<!-- 信息简报 -->
								<div style="flex: 1;margin-right: 20px;">
									<politicalWork :title='courtUnit' index='2'></politicalWork>
								</div>
								<!-- 新闻宣传 -->
								<div style="flex: 1;">
									<politicalWork :title='courtUnit' index='3'></politicalWork>
								</div>
							</div>
						</div>
					</div>
					<div style="display:flex;" class="app_margin_top_20">
						<!-- 群团建设 -->
						<div style="flex: 1;margin-right: 20px;">
							<politicalWork :title='courtUnit' index='4'></politicalWork>
						</div>
						<!-- 文件速递 -->
						<div style="flex: 1;margin-right: 20px;">
							<politicalWork :title='courtUnit' index='5'></politicalWork>
						</div>
						<!-- 新法速递 -->
						<div style="flex: 1;">
							<politicalWork :title='courtUnit' index='6'></politicalWork>
						</div>
					</div>
					<div style="margin-top: 2.5rem;">
						<!-- 图片外连接 -->
						<imageLinks></imageLinks>
					</div>

					<div style="margin-top: 2.5rem;">
						<!-- 先进风采 -->
						<advancedSwipe :imageSwipe="imageSwipe" index='0'></advancedSwipe>
					</div>
					<div style="margin-top: 2.5rem;">
						<!-- 海事审判白皮书 -->
						<advancedSwipe :imageSwipe="imageSwipe" index='1'></advancedSwipe>
					</div>
					<div style="margin-top: 2.5rem;">
						<!-- 海事司法论坛 -->
						<advancedSwipe :imageSwipe="imageSwipe" index='2'></advancedSwipe>
					</div>
					<div style="margin-top: 2.5rem;">
						<!-- 海韵党建 -->
						<advancedSwipe :imageSwipe="imageSwipe" index='3'></advancedSwipe>
					</div>

					<div style="margin-top: 2.5rem;margin-bottom: 2.5rem;">
						<bottom></bottom>
					</div>

				</div>

			</div>
			<div class="app_content_right" :style="appContentRight">
				<right></right>
			</div>
		</div>
		<div>
			<bottomRecord></bottomRecord>
		</div>
	</div>
</template>

<script>
	import top from '../components/top.vue';
	import courtNews from '../components/courtNews.vue';
	import notice from '../components/notice.vue';
	import seaGarden from '../components/seaGarden.vue';
	import unit from '../components/unit.vue';
	import politicalWork from '../components/politicalWork.vue';
	import imageLinks from '../components/imageLinks.vue';
	import advancedSwipe from '../components/advancedSwipe.vue';
	import bottom from '../components/bottom.vue';
	import left from '../components/left.vue';
	import right from '../components/right.vue';
	import testLeft from '../components/test_left.vue'
	import bottomRecord from '../components/bottom_record.vue'

	var lastScrollY6 = 0;
	export default {

		data: function() {

			//法院新闻标题
			var courtNews = [{
				unionId: '1744dc38b292712',
				name: '法院新闻',
				url: '1.jpg',
				own: {},
				twoTitle: [],
				menuCode: 'COURT_NEWS',
			}, {
				unionId: '1744dca390c2711',
				name: '规章制度',
				url: '2.jpg',
				own: {},
				twoTitle: [],
				menuCode: 'RULES_AND_REGULATIONS',
			}, {
				unionId: '1744df39cb82713',
				name: '领导讲话',
				url: '3.jpg',
				own: {},
				twoTitle: [],
				menuCode: 'LEADER_SPEAKING',
			}, {
				unionId: '17451f4b0042716',
				name: '领导批示',
				url: '4.jpg',
				own: {},
				twoTitle: [],
				menuCode: 'LEADER_INSTRUCTIONS',
			}, {
				unionId: '17451f534112717',
				name: '会议纪要',
				url: '5.jpg',
				own: {},
				twoTitle: [],
				menuCode: 'MEETING_SUMMARY',
			}, {
				unionId: '17451f7252c2718',
				name: '海韵党建',
				url: '6.jpg',
				own: {},
				twoTitle: [],
				menuCode: 'PARTY_BUILDING',
			}, {
				unionId: '17451f9ab652719',
				name: '审判管理',
				url: '7.jpg',
				own: {},
				twoTitle: [],
				menuCode: 'TRIAL_MANAGEMENT',
			}, {
				unionId: '17451fa0b39271a',
				name: '审判调研',
				url: '8.jpg',
				own: {},
				twoTitle: []
			}, ];
			/* 政工园地标题 */
			var courtUnit = [{
				unionId: '17451fad641271c',
				name: '政工园地',
				url: '61.png',
				own: {},
				twoTitle: [],
				menuCode: 'POLITICAL_WORK_AREA',
			}, {
				unionId: '17451fb0dea271d',
				name: '廉政园地',
				url: '62.png',
				own: {},
				twoTitle: [],
				menuCode: 'INTEGRITY_GARDEN',
			}, {
				unionId: '17451fc2561271e',
				name: '信息简报',
				url: '63.png',
				own: {},
				twoTitle: [],
				menuCode: 'INFORMATION_BRIEFING',
			}, {
				unionId: '17451fc6dea271f',
				name: '新闻宣传',
				url: '64.png',
				own: {},
				twoTitle: [],
				menuCode: 'NEWS_PROPAGANDA',
			}, {
				unionId: '17451fd00a82721',
				name: '群团建设',
				url: '65.png',
				own: {},
				twoTitle: [],
				menuCode: 'GROUP_BUILDING',
			}, {
				unionId: '174520117d92711',
				name: '文件速递',
				url: '66.png',
				own: {},
				twoTitle: [],
				menuCode: 'DOCUMENT_EXPRESS',
			}, {
				unionId: '174520156b02712',
				name: '新法速递',
				url: '67.png',
				own: {},
				twoTitle: [],
				menuCode: 'NEW_LAW_EXPRESS',
			}];

			/* 轮播图 */
			var imageSwipe = [{
				unionId: '17452019c652713',
				own: {},
				image: '30.jpg',
				name: '先进风采',
				menuCode: 'ADVANCED_RHYME',
			}, {
				unionId: '1745201eaab2714',
				own: {},
				image: '31.jpg',
				name: '海事审判白皮书',
				menuCode: 'TRIAL_WHITE_PAPER',
			}, {
				unionId: '174520240322715',
				own: {},
				image: '32.jpg',
				name: '海事司法论坛',
				menuCode: 'JUDICIAL_FORUM',
			}, {
				unionId: '174520472542716',
				own: {},
				image: '33.jpg',
				name: '海韵 • 党建',
				menuCode: 'PARTY_POINT_BUILDING',
				// hl:'<i class="el-icon-loading"></i>'
			}];
			/* 通知公告 */
			var notice = [{
					unionId: '1745204c0ce2717',
					name: '通知公告',
					menuCode: 'ANNOUNCEMENT',
					own: {},
					twoTitle: [],
				},
				{
					unionId: '1745204f2e52718',
					name: '会议管理',
					menuCode: 'MEETING_MANAGEMENT',
					own: {},
					twoTitle: [],
				},
				{
					unionId: '17452052cd02719',
					name: '开庭公告',
					menuCode: 'COURT_ANNOUNCEMENT',
					own: {},
					twoTitle: [],
				},
			];
			/* 海苑采风 */
			var seaGarden = {
				unionId: '17451fa9ae7271b',
				menuCode: 'SEA_RHYME',
				name: '海苑采风',
				own: {},
				twoTitle: [],
			};
			/* 部门风采 */
			var unit = {
				unionId: '17451fcc6232720',
				name: '部门风采',
				own: {},
				menuCode: 'DEPARTMENT_RHYME',
				twoTitle: '',
			};
			/* 相关通讯录 */
			var addressBook = {
				unionId: '17499fdf14e272c',
				name: '相关通讯录',
				own: {},
				menuCode: 'ADDRESS_BOOK',
			};
			/* 美图共享 */
			var imageShare = {
				unionId: '174772ee51c2712',
				name: '美图共享',
				own: {},
				menuCode: 'IMAGE_SHARE',
			};
			/* 软件下载 */
			var softwareDownload = {
				unionId: '174772e901f2711',
				name: '软件下载',
				own: {},
				menuCode: 'SOFTWARE_DOWNLOAD',
			};


			return {
				screenWidth: document.body.clientWidth,
				courtNews: courtNews,
				courtUnit: courtUnit,
				imageSwipe: imageSwipe,
				notice: notice,
				seaGarden: seaGarden,
				unit: unit,
				addressBook: addressBook,
				imageShare: imageShare,
				softwareDownload: softwareDownload,
				pictureNews: [],
				lastInformation: [],
				allMenu: [],
				leftTop: 0,

			}
		},
		methods: {
			// 跳转新闻列表
			toNewsList(item, type) {
				var that = this;
				var url = '/unitList';
				if (type == 'softwareDownload') {
					url = '/softwareDownload';
				} else if (type == 'imageShare') {
					url = '/imageShare';
				}
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
							path: url,
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(item)
							}
						})
					}
				} else {
					// 跳转新闻列表
					that.$router.push({
						path: url,
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(item)
						}
					})
				}
			},
			/* 视频点播 */
			vodVideo() {
				this.$message('功能暂未开放，敬请期待');
			},
			/* 上面图片轮播 */
			pictureNewsUrl: function(item) {
				return `width: 100%;height: 100%;background-size: cover;background-image: url(${item.pageUrl});`
			},
			/* 跳转新闻详情 */
			toInformationDetail: function(items) {
				var own = {};
				var item = {};
				/* 获取标题信息 */
				var menuCode = items.classifyTypeOfOne;
				var twoMenuCode = items.classifyTypeOfOne;

				if (items.classifyTypeOfTwo != undefined && items.classifyTypeOfTwo != null && items.classifyTypeOfTwo != '') {
					twoMenuCode = items.classifyTypeOfTwo
				}

				for (var i = 0; i < this.allMenu.length; i++) {
					if (this.allMenu[i].menuCode == menuCode) {
						own = this.allMenu[i];
					}
					if (this.allMenu[i].menuCode == twoMenuCode) {
						item = this.allMenu[i];
					}
				}
				var that = this;
				var path = '/newsList'
				// 如果一级分类是部门风采则要跳转department
				if(own.menuCode == 'DEPARTMENT_RHYME'){
					path = '/department'
				}

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
						// that.$router.push({
						// 	path: '/newsList',
						// 	query: {
						// 		item: JSON.stringify(item),
						// 		own: JSON.stringify(own),
						// 		detail: JSON.stringify(items),
						// 	}
						// })
						let routerJump = this.$router.resolve({
							path: path,
							query: {
								item: JSON.stringify(item),
								own: JSON.stringify(own),
								detail: JSON.stringify(items),
							}
						})
						window.open(routerJump.href, '_blank');
					}
				} else {
					// 跳转新闻列表
					// that.$router.push({
					// 	path: '/newsList',
					// 	query: {
					// 		item: JSON.stringify(item),
					// 		own: JSON.stringify(own),
					// 		detail: JSON.stringify(items),
					// 	}
					// })
					
					let routerJump = this.$router.resolve({
						path: path,
						query: {
							item: JSON.stringify(item),
							own: JSON.stringify(own),
							detail: JSON.stringify(items),
						}
					})
					window.open(routerJump.href, '_blank');
				}

			},
			/* 获取滚动条滚动距离 */
			handleScroll: function() {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				console.info("top: " + top)
				var percent6 = .1 * (top - lastScrollY6);
				if (percent6 > 0) {
					percent6 = Math.ceil(percent6);
				} else {
					percent6 = Math.floor(percent6);
				}
				this.leftTop = percent6;
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
				let maxWidth = 'max-width:1250px';
				if (this.screenWidth <= 1600) {
					maxWidth = 'max-width:1170px'
				}
				return maxWidth
			},
			//右边栏宽度
			appContentRight: function() {
				return `width: ${(this.screenWidth -(this.screenWidth  * 0.67 -24))/2}px;`
			},
			//首页上方轮播图的高度
			elCarouselHeight: function() {
				let height = '400px'
				if (this.screenWidth <= 1600) {
					height = '400px'
				}
				return height;
			}

		},
		//添加组件
		components: {
			top,
			courtNews,
			notice,
			seaGarden,
			unit,
			politicalWork,
			imageLinks,
			advancedSwipe,
			bottom,
			left,
			right,
			testLeft,
			bottomRecord,
		},
		mounted() {
			const that = this;
			// window.onresize = () => {
			// 	return (() => {
			// 		window.screenWidth = document.body.clientWidth
			// 		that.screenWidth = window.screenWidth;
			// 		var width = window.screenWidth;
			// 		// that.$refs.top.bodyStyle = 'width:'+ width + 'px'
			// 		// that.$refs.top.bodyWidth = width;
			// 	})()
			// };
			window.screenWidth = document.body.clientWidth
			that.screenWidth = window.screenWidth;

			/*获取图片新闻  */
			this.api.findInformationWithPicture(that, "PICTURE_NEWS", "TWO", 4, function(res) {
				that.pictureNews = res.body.data;
			})
			/* 获取最近更新 */
			this.api.findInformationOfRecentlyUpdate(that, 9, function(res) {
				var data = res.body.data;
				// for (var i = 0; i < data.length; i++) {
				// 	if (data[i].titleName.length > 15) {
				// 		data[i].titleName = data[i].titleName.substring(0, 15) + "....";
				// 	}
				// }
				that.lastInformation = data;
			})

			// 监听滚动条
			// window.addEventListener('scroll', this.handleScroll);

		},
		beforeCreate() {
			var that = this;
			var unitTwotitle = [];
			/* 获取法院新闻等标题 */
			that.api.informationMenuSearch(that, '', function(res) {
				var data = res.body.data;
				that.allMenu = data;
				/* 将菜单信息存储本地 */
				localStorage.setItem("allMeun", JSON.stringify(data));

				/* 获取一级标题的unionId */
				for (var j = 0; j < data.length; j++) {
					if (data[j].parentId != '-1') {
						continue;
					}
					/* 法院新闻等 */
					for (var i = 0; i < that.courtNews.length; i++) {
						if (that.courtNews[i].menuCode == data[j].menuCode) {
							that.courtNews[i].unionId = data[j].unionId;
							break;
						}
					}
					/* 政工园地 */
					for (var i = 0; i < that.courtUnit.length; i++) {
						if (that.courtUnit[i].menuCode == data[j].menuCode) {
							that.courtUnit[i].unionId = data[j].unionId;
							break;
						}
					}
					//轮播图
					for (var i = 0; i < that.imageSwipe.length; i++) {
						if (that.imageSwipe[i].menuCode == data[j].menuCode) {
							that.imageSwipe[i].unionId = data[j].unionId;
							break;
						}
					}
					/* 通知公告 */
					for (var i = 0; i < that.notice.length; i++) {
						if (that.notice[i].menuCode == data[j].menuCode) {
							that.notice[i].unionId = data[j].unionId;
							break;
						}
					}
					/* 海蓝采风 */
					if (that.seaGarden.menuCode == data[j].menuCode) {
						that.seaGarden.unionId = data[j].unionId;
					}
					/* 部门风采 */
					if (that.unit.menuCode == data[j].menuCode) {
						that.unit.unionId = data[j].unionId;
					}
					/* 相关通讯录 */
					if (that.addressBook.menuCode == data[j].menuCode) {
						that.addressBook.unionId = data[j].unionId;
					}
					/* 美图共享 */
					if (that.imageShare.menuCode == data[j].menuCode) {
						that.imageShare.unionId = data[j].unionId;
					}
					/* 软件下载 */
					if (that.softwareDownload.menuCode == data[j].menuCode) {
						that.softwareDownload.unionId = data[j].unionId;
					}
				}

				/* 法院新闻等 */
				for (var i = 0; i < that.courtNews.length; i++) {

					for (var j = 0; j < data.length; j++) {
						if (that.courtNews[i].unionId == data[j].unionId) {
							that.courtNews[i].own = data[j]
						} else if (that.courtNews[i].unionId == data[j].parentId) {
							that.courtNews[i].twoTitle.push(data[j])
						}
					}

				};
				// 政工园地等
				for (var i = 0; i < that.courtUnit.length; i++) {
					for (var j = 0; j < data.length; j++) {
						if (that.courtUnit[i].unionId == data[j].unionId) {
							that.courtUnit[i].own = data[j]
						} else if (that.courtUnit[i].unionId == data[j].parentId) {
							that.courtUnit[i].twoTitle.push(data[j])
						}
					}

				};
				//公告
				var index = 0;

				for (var i = 0; i < that.notice.length; i++) {
					for (var j = 0; j < data.length; j++) {
						if (that.notice[i].unionId == data[j].unionId) {
							that.notice[i].own = data[j];
						} else if (that.notice[i].unionId == data[j].parentId) {
							that.notice[i].twoTitle.push(data[j])
						};

						if (index == 0) {
							/* 获取海苑采风 */
							if (that.seaGarden.unionId == data[j].unionId) {
								that.seaGarden.own = data[j]
							};
							/* 部门风采 */
							if (that.unit.unionId == data[j].unionId) {
								that.unit.own = data[j]
							} else if (that.unit.unionId == data[j].parentId) {
								unitTwotitle.push(data[j]);
							};
							/* 通讯录 */
							if (that.addressBook.unionId == data[j].unionId) {
								that.addressBook.own = data[j]
							};
							/* 美图共享 */
							if (that.imageShare.unionId == data[j].unionId) {
								that.imageShare.own = data[j]
							};
							/* 软件下载 */
							if (that.softwareDownload.unionId == data[j].unionId) {
								that.softwareDownload.own = data[j]
							};
						}
					}
					if (unitTwotitle != null && unitTwotitle.length > 0) {
						that.unit.twoTitle = JSON.stringify(unitTwotitle);
					}
					index = 1;
				}
				//风采轮播图imageSwipe
				for (var i = 0; i < that.imageSwipe.length; i++) {
					for (var j = 0; j < data.length; j++) {
						if (that.imageSwipe[i].unionId == data[j].unionId) {
							that.imageSwipe[i].own = data[j]
						}
					}

				};
			});
		}
	}
</script>

<style>
	.index_app {
		/* 	font-family: Helvetica, sans-serif;
		text-align: center;
		overflow: hidden; */
	}

	.app_content {
		display: flex;
		/* justify-content: center; */
		align-items: center;
	}

	.app_content_left {
		/* background-color: #0000FF; */
	}

	.app_content_center {
		min-width: 1240px;
		border: #dddddd solid 0.0625rem;
		border-top: none;
	}

	.app_content_right {
		/* background-color: #dddddd; */

	}

	.app_content_center_top {
		margin-top: 40px;
		margin-left: 45px;
		margin-right: 45px;
	}

	.app_content_last {
		height: 400px;
	}

	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.app_content_top_left {
		flex: 1.2;
		/* background-color: red; */
		height: 100%;
		margin-right: 20px;

	}

	.app_content_top_right {
		flex: 1;
		height: 100%;
		margin-left: 20px;
		border: #dddddd solid 0.0625rem;

	}

	.app_content_top_right_top {
		background-image: url(../assets/0.jpg);
		background-size: cover;
		height: 50px;
		display: flex;
		align-items: center;
		color: #FFFFFF;
		padding-left: 10%;
		font-size: 110%;
	}

	.app_content_top_right_bottom {
		display: flex;
		width: 100%;
	}

	.app_content_top_right_bottom div {
	/* 	width: 100%;
		display: flex; */
	}

	.app_content_top_right_left {}

	.app_content_top_right_center {}

	.app_content_top_right_bottom_b {}

	/* 动态新闻走马灯样式 --开始*/
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.app_content_top_court_right {
		margin-left: 20px;
	}

	.app_margin_top_20 {
		margin-top: 1.25rem;
	}

	/* 动态新闻走马灯样式 --结束*/

	.app_address_book_common {
		background-size: cover;
		width: 100%;
		height: 4.8rem;
		border: #dddddd solid 0.0625rem;
		margin-top: 6px;
	}

	.app_address_book {
		background-image: url(../assets/21.jpg);

	}

	.app_address_book_active:hover {
		border: #0000FF solid 0.0625rem !important;
		cursor: pointer;
	}

	.app_software_download {
		background-image: url(../assets/22.jpg);
	}

	.app_cute_photos {
		background-image: url(../assets/23.jpg);

	}

	.app_video_on_demand {
		background-image: url(../assets/24.jpg);
	}

	.app_new_age {
		margin-top: 60px;
		width: 100%;
		height: 7.5rem;
		background-image: url(../assets/41.jpg);
		background-size: cover;
	}

	.app_unit_title {
		background-image: url(../assets/51.jpg);
		background-size: cover;
		display: flex;
		align-items: center;
		padding-left: 1.25rem;
		height: 3rem;
		color: #1b6cbf;
		font-size: 1.125rem;

	}

	.app_unit_title div {
		margin-left: 60px;
	}

	.last_title_active:hover {
		color: #3061b6 !important;
		cursor: pointer;

	}

	@media screen and (max-width: 11605px) {
		.app_content_center {
			min-width: 1160px;
			border: #dddddd solid 0.0625rem;
			border-top: none;
		}
	}
</style>
