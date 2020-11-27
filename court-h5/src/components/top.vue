<template>
	<div :style="bodyStyle" class="body">
		<div class="content" :style="contentStyle">
			<div class="top" :style="topStyle">
				<div class="top_title">
					<div class="top_title_active" @click="toIndexApp()">首&nbsp;&nbsp;&nbsp;&nbsp;页</div>
					<template v-for="item in courtNews">
						<div class="top_title_active" @click="toNewsList(item.own)">{{item.name}}</div>
					</template>

				</div>
			</div>
		</div>
		<div class="bottom" :style="bottomStyle">
			<div class="botom-left">欢迎访问宁波海事法院网站！</div>
			<div class="botom-right">
				<el-button v-show="loginButIsShow == ''" size='small' @click='loginBut()'>登录</el-button>
				<div v-show="loginButIsShow != ''" style="background-color: #ffffff;color: #b2b3b6;padding-bottom: 0.2025rem;padding-top: 0.2025rem;padding-left:0.3125rem;padding-right: 0.3125rem;border: #d9dadf solid 0.0625rem;border-radius: 0.1875rem;">{{loginButIsShow}}</div>
				<div v-show="loginButIsShow != ''" class="top_login_out" @click='loginOut()'>退出</div>
				<div class="botom-right-search">
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" size='small' v-model="topSearchValue" @change="topSearch()">
					</el-input>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		//数据
		data: function() {
			//法院新闻标题
			var courtNews = [{
				unionId: '1744dc38b292712',
				name: '法院新闻',
				url: '1.jpg',
				own: {},
				twoTitle: []
			}, {
				unionId: '1744dca390c2711',
				name: '规章制度',
				url: '2.jpg',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451f534112717',
				name: '会议纪要',
				url: '5.jpg',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451f7252c2718',
				name: '海韵党建',
				url: '6.jpg',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451f9ab652719',
				name: '审判管理',
				url: '7.jpg',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451fa0b39271a',
				name: '审判调研',
				url: '8.jpg',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451fad641271c',
				name: '政工园地',
				url: '61.png',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451fb0dea271d',
				name: '廉政园地',
				url: '62.png',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451fc2561271e',
				name: '信息简报',
				url: '63.png',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451fc6dea271f',
				name: '新闻宣传',
				url: '64.png',
				own: {},
				twoTitle: []
			}, {
				unionId: '17451fd00a82721',
				name: '群团建设',
				url: '65.png',
				own: {},
				twoTitle: []
			}, {
				unionId: '174520117d92711',
				name: '文件速递',
				url: '66.png',
				own: {},
				twoTitle: []
			}];
			return {
				// bodyStyle: `height: ${this.$props.screenWidth/(2442/424)}px;width: ${this.$props.screenWidth}px;`,
				bodyWidth: this.$props.screenWidth,
				topSearchValue: this.$props.searchValue,
				// loginButIsShow: this.$store.getters.getAdminName,
				courtNews: courtNews,
			}
		},

		//接收传入的值
		props: ['screenWidth', 'searchValue'],

		//定义方法
		methods: {
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
			/* 点击退出按钮 */
			loginOut() {
				this.$confirm('此操作将退出登录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					var that = this;
					this.api.logout(this, function(res) {
						that.$store.commit('setToken', '');
						that.$store.commit('setAdminName', '');
						that.$message({
							type: 'success',
							message: '已退出登录!'
						});
					});
				}).catch(() => {
				});
			},
			toIndexApp() {
				this.$router.push({
					path: '/'
				})
			},
			/* 搜索框 */
			topSearch: function() {
				var that = this;

				if (this.topSearchValue != '') {
					console.info(this.topSearchValue);
					this.$router.push({
						path: '/select', //跳转路径
						query: {
							searchValueParams: this.topSearchValue
						}
					})
					this.topSearchValue = ''
				}
			},
			/* 登录按钮 */
			loginBut() {
				this.$router.push({
					path: '/login',
				})
			}

		},
		computed: {
			contentStyle: function() {
				return `height: ${this.bodyWidth/(2442/424)}px;width: ${this.bodyWidth}px;minWidth:1249px;min-height:244px;`
			},
			bodyStyle: function() {
				return `width: ${this.bodyWidth}px;minWidth:1249px;minHight:84px`
			},
			bottomStyle: function() {
				return `height: ${this.bodyWidth * 0.75/(1826/54)}px;width: ${this.bodyWidth * 0.75}px;minWidth:1415px;minHight:84px`
			},
			topStyle: function() {
				// return `height: ${this.bodyWidth * 0.67/(1668/156)}px;width: ${this.bodyWidth * 0.67 +10}px;`
				return `minWidth:1249px;minHight:84px`
			},
			loginButIsShow: function(){
				return this.$store.getters.getAdminName;
			}

		},
		mounted() {
			var that = this;
			/* 获取法院新闻等标题 */
			that.api.informationMenuSearch(that, '', function(res) {
				var data = res.body.data;
				/* 法院新闻等 */
				for (var i = 0; i < that.courtNews.length; i++) {

					for (var j = 0; j < data.length; j++) {
						if (that.courtNews[i].unionId == data[j].unionId) {
							that.courtNews[i].own = data[j]
						}
					}

				}
			});
		
		}
		
		

	}
</script>

<style text>
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.content {
		background-image: url(../assets/top_bg.jpg);
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.top {
		background-image: url(../assets/top1.png);
		background-size: cover;
		/* width: 70%; */
		/* width: 1250px; */
		/* height: 40%; */
		height: 78px;
	}

	.top_title {
		/* padding-top: 5%; */
		width: 1250px;
		height: 82px;
		font-size: 100%;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 20px;
		padding-right: 20px;
		font-weight: 600;
	}

	.top_title div {
		flex: 1;
	}

	.bottom {
		background-image: url(../assets/sidai.png);
		background-size: cover;
		display: flex;
		align-items: center;
	}

	.botom-left {
		padding-left: 10%;
		letter-spacing: 1px;
		font-size: 120%;
		color: #909090;
	}

	.botom-right {
		display: flex;
		align-items: center;
		margin-left: auto;
		padding-right: 7%;
	}

	.botom-right-search {
		margin-left: 10px;
	}

	.top_title_active:hover {
		color: #00ccff !important;
		cursor: pointer;
	}

	.top_login_out {
		background-color: #ffffff;
		color: #b2b3b6;
		padding-bottom: 0.2025rem;
		padding-top: 0.2025rem;
		padding-left: 0.3125rem;
		padding-right: 0.3125rem;
		border: #d9dadf solid 0.0625rem;
		border-radius: 0.1875rem;
		font-size: 0.875rem;
		margin-left: 0.3125rem;
	}

	.top_login_out:hover {
		background-color: #1567A5;
		color: #FFFFFF;
		cursor: pointer;
	}
</style>
