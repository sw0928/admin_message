/*用户列表*/
var id = $api.localStorageId;
var UserName = null,
	UserInfo = null;
$.ajax({
	url: $api.queryUserName,
	type: 'post',
	async: false,
	data: {
		'loginName': ""
	},
	headers: {
		"Authorization": id,
	},
	success: function(data) {
		//console.log(data);
		UserName = data.data;
	},
	error: function(err) {
		console.log(err);
	}
});
$.ajax({
	url: $api.querySubmitLimitList,
	type: 'post',
	dataType: 'json',
	contentType: 'application/json',
	async: false,
	data: JSON.stringify({
		"amount": '',
		"intervalMinute": '',
		"limitType": '',
		"offset": 1,
		"pageSize": 10
	}),
	headers: {
		"Authorization": id,
	},
	success: function(res) {
		UserInfo = res.data.data;
	},
	error: function(err) {
		console.log(err);
	}
});
//组件通信
var bus = new Vue();
Vue.component("v-user-manage", {
	template: '#manage-template',
	data: function() {
		return {
			totalCount: '0',
			url: $api.UserManageList,
			userManageListExcelOut: $api.userManageListExcelOut,
			allData: [],
			data1: {
				"offset": 1,
				"pageSize": 10,
				"accountType": "",
				"loginName": "",
				"sendType": ""
			},
			mapShow: true, //显示无数据图片
			showNo: false,
			showUserBut:show_button(2111010)
		};
	},
	mounted: function() {
		var $this = this;
		// setTimeout(() => {
		$this.addData($this.data1)
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 10) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo5)", function(data) {
				$this.data1 = data.field;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
				// $this.page()
				return false;
			});
		});
		// }, 100);
		
	},
	methods: {
		page: function() {
			var $this = this;
			layui.use("laypage", function() {
				var laypage = layui.laypage;
				laypage.render({
					elem: "page",
					count: $this.totalCount,
					layout: ["prev", "page", "next", "limit", "skip"],
					limits: [10, 30, 50, 100, 1000],
					groups: 5,
					prev: "<",
					next: ">",
					jump: function(obj, first) {
						//console.log(obj);
						if(first) {
							return
						} else {
							$this.data1.offset = obj.curr;
							$this.data1.pageSize = obj.limit;
							$this.addData($this.data1);
						}
					}
				});
			});

		},
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.url,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				beforeSend: function() {
					$("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
				},
				complete: function(xhr) {
					$("#load").remove();
					// 获取相关Http Response header
					if(xhr.getResponseHeader('Authorization') != null) {
						localStorage.setItem('id', xhr.getResponseHeader('Authorization'));
					}
				},
				success: function(res) {
					//  console.log(res);
					$("#load").remove();
					$this.allData = [];
					$this.totalCount = 0;
					if(res.statusCode == '401') {
						//localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else if(res.statusCode == '400') {
						$this.showNo = true
						layer.msg(res.message, {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
					} else {
						$this.allData = res.data.data;
						if($this.allData == '') {
							$this.showNo = true
						} else {
							$this.showNo = false
						}
						$this.totalCount = res.data.totalCount
						if(data.offset == 1 && data.pageSize == 10) {
							$this.page()
						}
						$(document).ready(function() {
							var height = $('#rightTable').get(0).scrollHeight;
							$('#leftMenu_Box').css('height', height)
						});

					}

				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},
		//申请签名
		shade: function() {
			$("#shade1").fadeIn(300);
			$(".shade_con2").fadeIn(300);
		},
		paste: function(name,id) {
			$("#shade3").fadeIn(300);
			$(".shade_con1").fadeIn(300);
			var updata = {
				loginName: name,
				accountPlant:id
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAa", updata);
		},
		//导出
		importFile: function() {
			var $this = this;
			$this.data1.offset = 0;
			$this.data1.pageSize = 0;
			$this.data1.expTitle = '用户列表';
			$this.data1.exp = 'true';
			$.ajax({
				url: $this.url,
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify($this.data1),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					setTimeout(function() {
						derive(res.data.expTaskId)
					}, 1000);
				},
				error: function(err) {
					layer.msg(err.message, {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
				}
			});
		},
		//修改
		amend: function(num, parentLoginName) {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
			var updata = {
				userId: num,
				sendType: parentLoginName
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAid", updata);
		},
		////删除
		//del() {
		//  $("#shade2").fadeIn(300);
		//  $(".tips2").fadeIn(300);
		//},
		////取消
		//sw_btnwrong() {
		//  $("#shade2").fadeOut(300);
		//  $(".tips2").fadeOut(300);
		//},
		////确定
		//sw_btnsuss() {
		//  $(".tips2").fadeOut(300);
		//  $(".tips_chid2").fadeIn(300);
		//},
		////二级弹框确认
		//sw_qued() {
		//  $(".tips2").fadeOut(300);
		//  $(".tips_chid2").fadeOut(300);
		//  $("#shade2").fadeOut(300);
		//},
		////查看审核
		//examine() {
		//  $("#shade3").fadeIn(300);
		//  $(".shade_con3").fadeIn(300);
		//}
	},
	filters: {
		parseInt: function(value) {
			if(value == '' || value == null) {
				return
			} else {
				return parseInt(value / 10)
			}

		}
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getCc", function(updata) {
			//注意this指向问题
			$this.addData($this.data1)
		});
	},
});
//模板匹配
Vue.component("v-billing-manage", {
	template: '#billing-template',
	data: function() {
		return {
			queryBillingAccountList: $api.queryBillingAccountList,
			saveBillingAccount: $api.saveBillingAccount,
			removeBillingAccount: $api.removeBillingAccount,
			allData: [],
			userData: UserName,
			data1: {
				"offset": 1,
				"pageSize": 5
			},
			totalCount: '0',
			mapShow: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {
		$this.addData($this.data1)
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 5) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo9)", function(data) {
				// console.log(data);
				var text = $(".unlike .dropdown-selected").val();
				if(text == '') {
					data.field.billingAccountId = ''
					layer.msg('计费账户不能为空！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				} else {
					verify_user(UserName, $(".unlike .dropdown-selected"), text, dataA)

				}

				function dataA() {
					data.field.billingAccountId = $(".unlike .dropdown-selected").attr('data');
					$.ajax({
						url: $this.saveBillingAccount,
						type: 'post',
						async: false,
						data: {
							'billingAccountId': data.field.billingAccountId,
							'autoPrice': data.field.autoPrice
						},
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							//   console.log(data);
							if(data.statusCode == '401') {
								// localStorage.setItem('url', window.location.pathname)
								window.open("../../login.html", "_self");

							} else {
								if(data.data == true) {
									layer.open({
										content: data.message,
										yes: function(index) {
											layer.close(index);
											$this.addData($this.data1)
										}
									});
								} else {
									layer.open({
										content: data.message,
										yes: function(index) {
											layer.close(index);

										}
									});
								}
							}

						},
						error: function(err) {
							console.log(err);
						}
					});
				}

				return false;
			});
		});
		// }, 100);
	},
	methods: {
		shanchu: function() {
			$("#shade1").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			$('input.dropdown-selected').val('')
		},
		del: function(val) {
			var $this = this;
			$.ajax({
				url: $this.removeBillingAccount,
				type: 'post',
				async: false,
				data: {
					'billingAccountId': val
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//  console.log(data);
					if(data.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else {
						if(data.data == true) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addData($this.data1)
								}
							});
						} else {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);

								}
							});
						}
					}

				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		//分页
		page: function() {
			var $this = this;
			layui.use("laypage", function() {
				var laypage = layui.laypage;
				laypage.render({
					elem: "aa",
					count: $this.totalCount,
					layout: ["prev", "page", "next", "skip"],
					limit: 5,
					groups: 5,
					prev: "<",
					next: ">",
					jump: function(obj, first) {
						$this.data1.offset = obj.curr;
						$this.data1.pageSize = 5;
						if(first) {
							return
						} else {
							$this.addData($this.data1);
						}
					}
				});
			});

		},
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryBillingAccountList,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				beforeSend: function() {
					$("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
				},
				complete: function() {
					$("#load").remove();
				},
				success: function(res) {
					//console.log(res)
					$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else if(res.statusCode == '400') {
						$this.mapShow = true
						layer.msg(res.message, {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
					} else {
						$this.allData = res.data.data;
						if($this.allData == '') {
							$this.mapShow = true
						} else {
							$this.mapShow = false
						}
						$this.totalCount = res.data.totalCount;
					}
					if(data.offset == 1 && data.pageSize == 5) {
						$this.page()
					}
					$(document).ready(function() {
						var height = $('#rightTable').get(0).scrollHeight;
						$('#leftMenu_Box').css('height', height)
					});

				},
				error: function(err) {
					$("#load").remove();
					console.log(err);
				}
			});
		},
		//sw_btnwrong() {
		//  $("#shade1").fadeOut(300);
		//  $(".shade_con1").fadeOut(300);
		//  $(".tips1").fadeOut(300);
		//},
		//sw_qued() {
		//  $(".tips1").fadeOut(300);
		//  $(".tips_chid1").fadeOut(300);
		//  $("#shade1").fadeOut(300);
		//  $(".shade_con1").fadeOut(300);
		//}
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.sellerid = updata.sellerid;
			$this.auctionid = updata.auctionid;
		});
	},
});
//用户修改
Vue.component("v-amend", {
	template: '#amend-template',
	data: function() {
		return {
			queryUserInfo: $api.queryUserInfo1,
			editUser: $api.editUser,
			mapShow: true, //显示无数据图片
			allData: [],
			hour1: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
			hour2: ['0:59', '1:59', '2:59', '3:59', '4:59', '5:59', '6:59', '7:59', '8:59', '9:59', '10:59', '11:59', '12:59', '13:59', '14:59', '15:59', '16:59', '17:59', '18:59', '19:59', '20:59', '21:59', '22:59', '23:59'],
			data1: {
				"badWordLevel": '',
				"badWordLevel2": '',
				"billingAccount": 0,
				"billingType": 0,
				"blackLevelMax": 0,
				"blackLevelMaxCode": 0,
				"blackLevelMax2": 0,
				"cmppLtDx": '1',
				"disablePublicSmstemplate": 0,
				"forceIp": "",
				"httpDeliver": "",
				"httpDeliverDataType": 0,
				"keepOriginalSrcId": '0',
				"templateTypeBitwise": 0,
				"maxOrderCnt": "",
				"orderHour": "",
				"orderRuleUserId": 0,
				"parentSubmitRule": "",
				"sgipDeliver": "",
				"signAutoTemplate": 0,
				"signFixed": "",
				"signtest": 0,
				"speed": 0,
				"speed2": 0,
				"speedExceedToReady": 0,
				"srcidExIsmgId": 0,
				"srcidExLtrim": 0,
				"chineseSignTag":0,
				"headFixed":'',
				"submitInterval": 0,
				"submitLimit": 0,
				"submitLimit2": 0,
				"submitSameDay": 0,
				"orderBegin":'',
				"userId": 0,
				"userType": 1,
				"versionSn": 2,
				"srcidSignextCutlen": '',
				"td": '',
				"z2a": 0
			},
			senior:{
				'chineseSignTag': "0",
				'headFixed': "",
				'orderBegin': "",
				'srcidSignextCutlen': "",
				'td': "0"
			},
			"rateLimiting": UserInfo
		};
	},
	mounted: function() {
		var $this = this;
		// setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			form.on("submit(demo6)", function(data) {
				//console.log(data)
				$this.data1.accountType = data.field.accountType * 1
				$this.data1.billingType = data.field.billingType * 1
				$this.data1.blackLevelMax = data.field.blackLevelMax * 10 + data.field.blackLevelMaxCode * 1
				$this.data1.blackLevelMax2 = data.field.blackLevelMax2 * 1
				$this.data1.speed = data.field.speed * 1
				$this.data1.speed2 = data.field.speed2 * 1
				$this.data1.submitInterval = data.field.submitInterval * 1
				$this.data1.submitLimit = data.field.submitLimit * 1
				$this.data1.submitLimit2 = data.field.submitLimit2 * 1
				$this.data1.submitSameDay = data.field.submitSameDay * 1
				$this.data1.templateTypeBitwise = data.field.templateTypeBitwise * 1
				$this.data1.userId = $this.allData.userId * 1
				$this.data1.badWordLevel = data.field.badWordLevel * 1
				$this.data1.badWordLevel2 = data.field.badWordLevel2 * 1
				$this.data1.forceIp = data.field.forceIp
				$this.data1.orderHour = data.field.orderHour + '-' + data.field.orderHour1
				$this.data1.cmppLtDx = data.field.cmppLtDx
				$this.data1.keepOriginalSrcId = data.field.keepOriginalSrcId
				$this.data1.httpDeliver = data.field.httpDeliver
				$this.data1.signFixed = data.field.signFixed
				$this.data1.srcidSignextCutlen = data.field.srcidSignextCutlen
				$this.data1.maxOrderCnt = data.field.maxOrderCnt
				$this.data1.sgipDeliver = data.field.sgipDeliver
				$this.data1.versionSn = data.field.versionSn
				$this.data1.signAutoTemplate = data.field.signAutoTemplate
				$this.data1.srcidExIsmgId = data.field.srcidExIsmgId
				$this.data1.speedExceedToReady = data.field.speedExceedToReady
				$this.data1.srcidExLtrim = data.field.srcidExLtrim
				$this.data1.z2a = data.field.z2a
				$this.data1.disablePublicSmstemplat = data.field.disablePublicSmstemplat
				$this.data1.signtest = data.field.signtest
				$this.data1.disablePublicSmstemplat = data.field.disablePublicSmstemplat
				$this.data1 = Object.assign($this.data1, $this.senior);
				//console.log($this.data1)
				$.ajax({
					url: $this.editUser,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.data1),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//console.log(data);
						layer.open({
							content: data.message,
							yes: function(index) {
								layer.close(index);
								$this.shanchu()
								var updata = {
									cc: '1'
								};
								bus.$emit("getCc", updata);
								// window.open("../../html/user_manage/user_manage.html", "_self");
							}
						});
					},
					error: function(err) {
						console.log(err);
					}
				});
				return false;
			});			
		});
		//}, 100);
	},
	methods: {
		shanchu: function() {
			$("#shade3").fadeOut(300);
			$(".shade_con3").fadeOut(300);
		},
		seniorA: function() {
			var $this = this;
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			var updata = {
									info: $this.allData
								};
			bus.$emit("getDD", updata);
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			var userId = updata.userId;
			var parentLoginName = updata.sendType;
			$.ajax({
				url: $this.queryUserInfo,
				type: 'post',
				async: false,
				data: {
					'userId': userId
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					if(data.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else if(data.statusCode == '400') {
						layer.msg(data.message, {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
					} else {
						$this.allData = data.data;
						$this.senior.chineseSignTag = $this.allData.chineseSignTag;
						$this.senior.headFixed = $this.allData.headFixed;
						$this.senior.orderBegin = $this.allData.orderBegin;
						$this.senior.srcidSignextCutlen = $this.allData.srcidSignextCutlen;
						$this.senior.td = $this.allData.td;
						var num = $this.allData.blackLevelMax == null ? 0 : $this.allData.blackLevelMax;
						$this.allData.parentLoginName = parentLoginName
						$this.allData.orderHour = $this.allData.orderHour == null ? '0-0' : $this.allData.orderHour;
						$this.allData.blackLevelMax = parseInt(num / 10);
						$this.allData.blackLevelMaxCode = num % 10;
						// console.log($this.allData.blackLevelMaxCode)
						//$this.allData.orderHour = $this.allData.orderHour?$this.allData.orderHour:'0-0';
						$this.allData.versionSn = $this.allData.versionSn =='2'?'2':'1';
						//console.log($this.allData.versionSn)
						setTimeout(function() {
							$("#eventLevel option[value='" + $this.allData.accountType + "']").prop("selected", "selected");
							$("#eventLevelTwo option[value='" + $this.allData.templateTypeBitwise + "']").prop("selected", "selected");
							$("#eventLevelThree option[value='" + $this.allData.billingType + "']").prop("selected", "selected");
							$("#signtest option[value='" + $this.allData.signtest + "']").prop("selected", "selected");
							$("#disablePublicSmstemplat option[value='" + $this.allData.disablePublicSmstemplat + "']").prop("selected", "selected");
							$("#eventLevelHour option[value='" + $this.allData.blackLevelMax + "']").prop("selected", "selected");
							$("#eventLevelFive option[value='" + $this.allData.blackLevelMax2 + "']").prop("selected", "selected");
							$("#eventLevelSix option[value='" + $this.allData.blackLevelMaxCode + "']").prop("selected", "selected");
							$("#hourStart option[value='" + $this.allData.orderHour.split('-')[0] + "']").prop("selected", "selected");
							$("#hourEnd option[value='" + $this.allData.orderHour.split('-')[1] + "']").prop("selected", "selected");
							$("#submitLimit option[value='" + $this.allData.submitLimit + "']").prop("selected", "selected");
							$("#submitLimit2 option[value='" + $this.allData.submitLimit2 + "']").prop("selected", "selected");
							$("#keepOriginalSrcId option[value='" + $this.allData.keepOriginalSrcId + "']").prop("selected", "selected");
							$("#cmppLtDx option[value='" + $this.allData.cmppLtDx + "']").prop("selected", "selected");							
							$("#versionSn option[value='" + $this.allData.versionSn + "']").prop("selected", "selected");
							$("#signAutoTemplate option[value='" + $this.allData.signAutoTemplate + "']").prop("selected", "selected");
							$("#srcidExIsmgId option[value='" + $this.allData.srcidExIsmgId + "']").prop("selected", "selected");
							$("#speedExceedToReady option[value='" + $this.allData.speedExceedToReady + "']").prop("selected", "selected");
							$("#srcidExLtrim option[value='" + $this.allData.srcidExLtrim + "']").prop("selected", "selected");
							$("#z2a option[value='" + $this.allData.z2a + "']").prop("selected", "selected");
							layui.use("form", function() {
								var form = layui.form;
								form.render();
							})
						}, 100);
					}

				},
				error: function(err) {
					console.log(err);
				}
			});
		});
		bus.$on("getFF", function(updata) {
            //注意this指向问题
            $this.senior = updata.info;  
            //console.log($this.senior)
        });
	},
});

Vue.component("v-paste", {
	template: '#paste-template',
	data: function() {
		return {
			queryInferUserInfo: $api.queryInferUserInfo,
			mapShow: true, //显示无数据图片
			loginName:'',
			accountPlant:'',
			data2:[],
		};
	},
	mounted: function() {
		var $this = this;
		//  setTimeout(() => {
		layui.use(["form", "upload"], function() {
			var form = layui.form;
			var upload = layui.upload;
			form.render();
			//监听提交
//			form.on("submit(demo7)", function(data) {
//				var clipboard = new ClipboardJS('.btn');
//
//		    clipboard.on('success', function(e) {
//		        console.log(e);
//		    });
//		
//		    clipboard.on('error', function(e) {
//		        console.log(e);
//		    });
//				return false;
//			});
		});
		//  }, 100);
	},
	methods: {
		shanchu: function() {
			var $this = this;
			$("#shade3").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			//$this.data2 = [];
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAa", function(updata) {
			//注意this指向问题
			$this.loginName = updata.loginName;
			$this.accountPlant = updata.accountPlant;
			$.ajax({
				url: $this.queryInferUserInfo,
				type: 'post',
				dataType: 'json',
//				contentType: 'application/json',
				async: false,
				data: {
					loginName:$this.loginName
				},
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					  //console.log(data);
					if(res.statusCode == '200') {
							$this.data2 = res.data
					} else if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						layer.open({
							content: res.message,
							yes: function(index) {
								layer.close(index);
							}
						});
					}
				},
				error: function(err) {
					layer.open({
						content: err.message,
						yes: function(index) {
							layer.close(index);
						}
					});
				}
			});
		});
	},
});
Vue.component("v-edit", {
    template: '#edit-template',
    data: function() {
        return {
            mapShow: true, //显示无数据图片
            //content1:['拒绝','先审后发','先发后审','接受'],
            // content2:['不可用','可用','测试'],
            info:[],
            idStr:'',
        };
    },
    mounted:function() {
        var $this = this;
        //  setTimeout(() => {
        layui.use(["form", "upload"], function() {
            var form = layui.form;
            var upload = layui.upload;
            form.render();
            //监听提交
            form.on("submit(demo1)", function(data) {
               // console.log(data.field)
                $this.shanchu();
                var updata = {
									info: data.field
								};
			          bus.$emit("getFF", updata);
                return false;
            });
        });
        //  }, 100);
    },
    methods: {
        shanchu:function() {
            var $this = this;
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);

        },
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getDD", function(updata) {
            //注意this指向问题
            $this.info = updata.info;
           // console.log( $this.info)
            $("#eventLevelBB option[value='" + $this.info.td + "']").prop("selected", "selected");
            $("#chineseSignTag option[value='" + $this.info.chineseSignTag + "']").prop("selected", "selected");
            setTimeout(function(){
                layui.use(["form", "laypage"], function() {
                    var form = layui.form;
                    var laypage = layui.laypage;
                    form.render();
                });
            }, 50);
        });
    },
});