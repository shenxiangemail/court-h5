<template>
	<div >
		<div style="display: flex;">
			<div style="display: flex;flex: 1;justify-content: center;">
				<div style="position: relative;">
					<div :class="textLink.length < 1 ? 'bottom_float_active' : 'bottom-float'" v-show="active=active1" @mouseleave="mouseoutMethod()" >
						<template v-for="items in textLink">
							<div @click="openLinkUrl(items)" style="width: 250px;font-size: 12px;padding: 2px;padding-top: 5px;padding-bottom: 5px;align-items: center;justify-content:left;text-align: left;"
							 class="bottom_title_active">
								<i class="el-icon-right"></i>
								{{items.title}}
							</div>
						</template>
					</div>
					<div class="bottom_top" :class="{bottom_active : active1}" @click="mouseoverMethod(1)">
						<div class="bottom_top_left">最高人民法院</div>
						<div class="bottom_top_right"><i class="el-icon-d-caret"></i></div>
					</div>
				</div>
			</div>
			<div style="display: flex;flex: 1;justify-content: center;">
				<div style="position: relative;">
					<div :class="textLink.length < 1 ? 'bottom_float_active' : 'bottom-float'" v-show="active=active2"  @mouseleave="mouseoutMethod()">
						<template v-for="items in textLink">
							<div @click="openLinkUrl(items)" style="width: 250px;font-size: 12px;padding: 2px;padding-top: 5px;padding-bottom: 5px;align-items: center;justify-content:left;text-align: left;"
							 class="bottom_title_active">
								<i class="el-icon-right"></i>
								{{items.title}}
							</div>
						</template>
					</div>
					<div class="bottom_top" :class="{bottom_active : active2}" @click="mouseoverMethod(2)">
						<div class="bottom_top_left">全国高级人民法院</div>
						<div class="bottom_top_right"><i class="el-icon-d-caret"></i></div>
					</div>
				</div>
			</div>
			<div style="display: flex;flex: 1;justify-content: center;">
				<div style="position: relative;">
					<div :class="textLink.length < 1 ? 'bottom_float_active' : 'bottom-float'" v-show="active=active3"  @mouseleave="mouseoutMethod()">
						<template v-for="items in textLink">
							<div @click="openLinkUrl(items)" style="width: 250px;font-size: 12px;padding: 2px;padding-top: 5px;padding-bottom: 5px;align-items: center;justify-content:left;text-align: left;"
							 class="bottom_title_active">
								<i class="el-icon-right"></i>
								{{items.title}}
							</div>
						</template>
					</div>
					<div class="bottom_top" :class="{bottom_active : active3}" @click="mouseoverMethod(3)">
						<div class="bottom_top_left">全省中级人民法院</div>
						<div class="bottom_top_right"><i class="el-icon-d-caret"></i></div>
					</div>
				</div>
			</div>
			<div style="display: flex;flex: 1;justify-content: center;">
				<div style="position: relative;">
					<div :class="textLink.length < 1 ? 'bottom_float_active' : 'bottom-float'" v-show="active=active4"  @mouseleave="mouseoutMethod()">
						<template v-for="items in textLink">
							<div @click="openLinkUrl(items)" style="width: 250px;font-size: 12px;padding: 2px;padding-top: 5px;padding-bottom: 5px;align-items: center;justify-content:left;text-align: left;"
							 class="bottom_title_active">
								<i class="el-icon-right"></i>
								{{items.title}}
							</div>
						</template>
					</div>
				<div class="bottom_top" :class="{bottom_active : active4}" @click="mouseoverMethod(4)">
					<div class="bottom_top_left">全省基层人民法院</div>
					<div class="bottom_top_right"><i class="el-icon-d-caret"></i></div>
				</div>
				</div>
			</div>

		</div>
		<!-- <div style="border: #dddddd solid 0.0625rem;display: flex;flex-flow: row wrap;padding: 0.625rem;padding-top: 0.625rem;padding-bottom: 10px;max-height: 100px;overflow-y: auto;z-index: 1;position: absolute;background-color: #FFFFFF;width: 100%;width: 1130px;"
		>
			<template v-for="items in textLink">
				<div @click="openLinkUrl(items)" style="width: 250px;font-size: 13px;padding: 2px;padding-top: 5px;padding-bottom: 5px;align-items: center;justify-content:left;text-align: left;"
				 class="bottom_title_active">
					<i class="el-icon-right"></i>
					{{items.title}}
				</div>
			</template>
		</div> -->
	</div>
</template>

<script>
	export default {

		//数据
		data: function() {

			return {
				active: false,
				active1: false,
				active2: false,
				active3: false,
				active4: false,
				textLink: [],

			}
		},

		//接收传入的值
		props: [],

		//定义方法
		methods: {
			mouseoverMethod(number) {
				this.textLink =[];
				this.active = false;
				if (number == 1) {
					this.$data.active1 = !this.$data.active1;
					this.$data.active2 = false;
					this.$data.active3 = false;
					this.$data.active4 = false;
				} else if (number == 2) {
					this.$data.active2 = !this.$data.active2;
					this.$data.active1 = false;
					this.$data.active3 = false;
					this.$data.active4 = false;
				} else if (number == 3) {
					this.$data.active3 = !this.$data.active3;
					this.$data.active2 = false;
					this.$data.active1 = false;
					this.$data.active4 = false;
				} else if (number == 4) {
					this.$data.active4 = !this.$data.active4; 
					this.$data.active2 = false;
					this.$data.active3 = false;
					this.$data.active1 = false;
				};
				var that = this;
				that.api.findTextLink(that, function(res) {
					var data = res.body.data;
					that.textLink = [];
					for (var i = 0; i < data.length; i++) {
						if (number == 1 && data[i].classify == 'TYPE_ONE') {
							that.textLink.push(data[i]);
						} else if (number == 2 && data[i].classify == 'TYPE_TWO') {
							that.textLink.push(data[i]);
						} else if (number == 3 && data[i].classify == 'TYPE_THREE') {
							that.textLink.push(data[i]);
						} else if (number == 4 && data[i].classify == 'TYPE_FOUR') {
							that.textLink.push(data[i]);
						}
					}
					that.active = true;
				})
			},
			mouseoutMethod() {
				this.$data.active = false;
				this.$data.active1 = '';
				this.$data.active2 = '';
				this.$data.active3 = '';
				this.$data.active4 = '';

			},
			openLinkUrl(items) {
				window.open(items.linkUrl);
			}
		},
		computed: {

		},
		mounted() {

		}

	}
</script>

<style scoped>
	.bottom_top {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200px;
		background-color: #f3f3f3;
		padding-top: 0.625rem;
		padding-bottom: 0.625rem;
	}

	.bottom_top_left {
		margin-left: 20px;
		font-size: 0.875rem;
	}

	.bottom_top_right {
		display: flex;
		justify-content: center;
		align-items: center;
		/* margin-left: auto; */
		margin-right: 10px;
	}

	.bottom_active {
		color: #FFFFFF;
		background-color: #0074D9;
	}

	.bottom_title_active:hover {
		background-color: #0074D9;
		color: #FFFFFF;
		cursor: pointer;
	}

	.bottom-float {
		border: #dddddd solid 0.0625rem;
		padding: 0.625rem;
		padding-top: 0.625rem;
		padding-bottom: 10px;
		max-height: 400px;
		overflow-y: auto;
		z-index: 1;
		position: absolute;
		background-color: #FFFFFF;
		width: 178px;
		bottom: 39px;
	}

	.bottom_float_active {
		border: #dddddd solid 0.0625rem;
		padding: 0.625rem;
		padding-top: 0.625rem;
		padding-bottom: 10px;
		max-height: 400px;
		overflow-y: auto;
		z-index: 1;
		position: absolute;
		background-color: #FFFFFF;
		width: 178px;
		top: 39px;
	}


	/* @media screen and(-ms-high-contrast:active),
	(-ms-high-contrast:none) {

		.bottom_top_right {
			display: flex;
			justify-content: center;
			align-items: center;

		}

	} */
</style>
