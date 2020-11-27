const md5Key = "78R38FA5A3E96EC64G0I";

// 正式服务
// const api_url = "http://203.155.176.107:8081/";
// 测试服务
const api_url = "http://47.97.198.116:38012/";


export default {

	apiUrl: api_url,
	/* 获取加密公钥 */
	publicKey: function(that, callBack) {
		var url = api_url + 'common/publicKey';
		var data = {}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		})
	},

	/*登录接口  */
	loginByPassword: function(that, loginAccount, loginPassword, nonceStr, callBack) {
		var url = api_url + 'common/loginByPassword';
		var data = {
			loginAccount: loginAccount,
			loginPassword: loginPassword,
			nonceStr: nonceStr,
		}

		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		})
	},

	/*获取二级标题*/
	informationMenuSearch: function(that, parentId, callBack) {
		var url = api_url + 'informationMenu/findAllMenu';
		var data = {
			parentId: parentId,
			number: 0,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 获取信息详情--首页 */
	findInformation: function(that, informationCode, classifyLevel, number, callBack) {
		var url = api_url + 'information/findInformation';
		var data = {
			informationCode: informationCode,
			classifyLevel: classifyLevel,
			number: number
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 获取信息--分页查询 */
	findInformationByPage: function(that, informationCode, classifyLevel, page, limit, title, publishedDate,
		classifyTypeOfThree, callBack) {
		var url = api_url + 'information/findInformationByPage';
		var data = {
			informationCode: informationCode,
			classifyLevel: classifyLevel,
			page: page,
			limit: limit,
			token: that.$store.getters.getToken,
			title: title,
			publishedDate: publishedDate,
			classifyTypeOfThree: classifyTypeOfThree,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 根据唯一标识获取新闻详细信息 */
	findInformationByUnionId: function(that, informationCode, unionId, callBack) {
		var url = api_url + 'information/findInformationByUnionId';
		var data = {
			informationCode: informationCode,
			unionId: unionId,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 最近更新 */
	findInformationOfRecentlyUpdate: function(that, number, callBack) {
		var url = api_url + 'information/findInformationOfRecentlyUpdate';
		var data = {
			number: number,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 获取带封面图片信息 */
	findInformationWithPicture: function(that, informationCode, classifyLevel, number, callBack) {
		var url = api_url + 'information/findInformationWithPicture';
		var data = {
			informationCode: informationCode,
			classifyLevel: classifyLevel,
			number: number,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 获取图片外连接 */
	findImageLink: function(that, callBack) {
		var url = api_url + 'link/findImageLink';
		var data = {}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 获取外连接 */
	findTextLink: function(that, callBack) {
		var url = api_url + 'link/findTextLink';
		var data = {}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 飘窗 */
	findFloatingWindow: function(that, number, callBack) {
		var url = api_url + 'floatingWindow/findFloatingWindow';
		var data = {
			number: number
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 全文搜索 */
	searchInformation: function(that, informationMenu, title, publishedDate, page, limit, callBack) {
		var url = api_url + 'information/searchInformation';
		var data = {
			token: that.$store.getters.getToken,
			informationMenu: informationMenu,
			title: title,
			publishedDate: publishedDate,
			page: page,
			limit: limit,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 获取部门列表 */
	findDepartmentList: function(that, callBack) {
		var url = api_url + 'addressBook/findDepartmentList';
		var data = {
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 获取通讯录 */
	findAddressBookByConditions: function(that, departmentId, name, page, limit, callBack) {
		var url = api_url + 'addressBook/findAddressBookByConditions';
		var data = {
			departmentId: departmentId,
			name: name,
			page: page,
			limit: limit,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});

	},
	/* 软件下载 */
	downloadSoftware: function(that, classifyType, unionId, callBack) {
		var url = api_url + 'downloadSoftware';
		var data = {
			classifyType: classifyType,
			unionId: unionId,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 软件下载列表 */
	softwareFindListByConditions: function(that, classifyType, title, page, limit, callBack) {
		var url = api_url + 'software/findListByConditions';
		var data = {
			classifyType: classifyType,
			title: title,
			page: page,
			limit: limit,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},

	/* 获取美图列表 */
	findListByConditions: function(that, classifyType, title, page, limit, callBack) {
		var url = api_url + 'imageShare/findListByConditions';
		var data = {
			classifyType: classifyType,
			title: title,
			page: page,
			limit: limit,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 法院简报--获取年度 */
	findYear: function(that, callBack) {
		var informationCode = "12001";
		var classifyLevel = "TWO";
		var url = api_url + 'information/findYear';
		var data = {
			informationCode: informationCode,
			classifyLevel: classifyLevel,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 法院简报--根据年度获取信息 */
	findInformationByYear: function(that, informationCode, classifyLevel, title, year, page, limit, callBack) {
		var url = api_url + 'information/findInformationByYear';
		var data = {
			informationCode: informationCode,
			classifyLevel: classifyLevel,
			title: title,
			year: year,
			page: page,
			limit: limit,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 公告列表 */
	findAnnouncement: function(that, informationCode, classifyLevel, number, callBack) {
		var url = api_url + 'announcement/findAnnouncement';
		var data = {
			informationCode: informationCode,
			classifyLevel: classifyLevel,
			number: number,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 公告--分页查询 */
	findAnnouncementByPage: function(that, informationCode, classifyLevel, page, limit, title, publishedDate,
		classifyTypeOfThree, callBack) {
		var url = api_url + 'announcement/findAnnouncementByPage';
		var data = {
			informationCode: informationCode,
			classifyLevel: classifyLevel,
			page: page,
			limit: limit,
			token: that.$store.getters.getToken,
			title: title,
			publishedDate: publishedDate,
			classifyTypeOfThree: classifyTypeOfThree,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 根据唯一标识获取公告详细信息 */
	findAnnouncementByUnionId: function(that, informationCode, unionId, callBack) {
		var url = api_url + 'announcement/findAnnouncementByUnionId';
		var data = {
			informationCode: informationCode,
			unionId: unionId,
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 安全退出 */
	logout: function(that, callBack) {
		var url = api_url + 'common/logout';
		var data = {
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			callBack(res);
		});
	},
	/* 自动登录 */
	autoLogin: function(that, callBack) {
		if (that.$store.getters.getToken == '') {
			return;
		}
		var url = api_url + 'common/autoLogin';
		var data = {
			token: that.$store.getters.getToken,
		}
		this.sendServiceRequest(that, url, data, function(res) {
			that.$store.commit('setToken', res.body.data.token);
			that.$store.commit('setAdminName', res.body.data.adminName);
			callBack(res);
		});
	},
	/* 公共发送请求方法 */
	sendServiceRequest: function(that, url, data, callBack) {
		// 为了解决多页面访问--共享token问题，vue是单页面应用，所以a页面store中token改变不会触发b页面中this中store的更新
		if (Object.keys(data).indexOf('token') != -1) {
			var token = localStorage.getItem("token");
			var adminName = localStorage.getItem("adminName");
			data.token = token;
			that.$store.commit('setToken', token);
			that.$store.commit('setAdminName', adminName);
		}

		data.sign = this.setFormData(data, that);
		that.$http.post(url, data, {
			emulateJSON: true,
			withCredentials: true
		}).then(function(response) {
			if (response.body.resultCode == '00000') {
				callBack(response)
			} else {
				if (response.body.resultCode == "A0220" || response.body.resultCode == "A0301") {
					that.$store.commit('setToken', '');
					that.$store.commit('setAdminName', '');
					if (url.indexOf('autoLogin') != -1) {
						return;
					}
					this.$confirm('登录已过期，请重新登录, 是否前往登录?', '提示', {
						confirmButtonText: '前往',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.$router.push({
							path: '/login'
						})
					}).catch(() => {
						that.$router.push({
							path: '/'
						})
					});

				}

				this.$message.error('错误提示：' + response.body.message);
			}
		}, function() {
			console.info("服务出错")
		});
	},

	/* 请求文件方法 */
	sendServiceRequestFold: function(that, url, data, callBack) {
		data.sign = this.setFormData(data, that);
		that.$http.post(url, data, {
			withCredentials: true,
			responseType: 'blob'
		}).then(function(response) {
			if (response.body.resultCode == '00000') {
				callBack(response)
			} else {
				this.$message.error('错误提示：' + response.body.message + url);
			}
		}, function() {
			console.info("服务出错")
		});
	},

	//组装上送参数
	setFormData: function(obj, that) {
		var newkey = Object.keys(obj).sort();
		var signStr = "";
		for (var i in newkey) {
			var s = newkey[i];
			signStr = signStr + newkey[i] + obj[s];
		}
		var sign = that.md5Util.md5(signStr + "md5Key" + md5Key);
		return sign;
	},
	//获取随机值
	mathRand: function() {
		var num = '';
		var y = 6;
		for (var i = 0; i < 6; i++) {
			num += Math.floor(Math.random() * 10);
		}
		var time = (new Date()).getTime();

		return num + time;
	}

}
