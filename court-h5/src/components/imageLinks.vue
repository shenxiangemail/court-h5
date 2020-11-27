<template>
	<div>
		<div style="display: flex;margin-bottom: 0.625rem;flex-flow:row wrap;max-width: 1242px;justify-content:space-between;" >
			<template v-for="(item,index) in imageLinks">
				<div :style='imageStype(item)' @click="openUrl(item)" style="height: 50px;display: flex;justify-content:center;align-items: center;min-width: 178px;flex: 1;background-size: cover;"
				  class="imageLinks_image_active"></div>
			</template>
		</div>
	</div>
</template>

<script>
	export default {

		//数据
		data: function() {
			return {
				imageLinks: [],
			}
		},

		//接收传入的值
		props: ['titleName'],

		//定义方法
		methods: {

			imageStype(item) {
				return 'background-image: url(' + item.pageUrl + ')';
			},
			openUrl(item) {
				var url = item.linkUrl;
				window.open(url);
			},

		},
		computed: {

		},
		mounted() {
			var that = this;
			that.api.findImageLink(that, function(res) {
				that.imageLinks = res.body.data;
			})
		}

	}
</script>

<style>
	.margin_right_10 {
		margin-right: 0.625rem;
	}

	.imageLinks_image_active:hover {
		/* border: #0000FF solid 0.0825rem; */
		cursor: pointer;
	}
</style>
