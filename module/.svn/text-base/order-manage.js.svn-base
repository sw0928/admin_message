/*订单列表*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
var currentIsmgName = null,
	IsmgName = null;
$.ajax({
	url: $api.queryCurrentIsmg,
	type: 'post',
	async: false,
	data: {
		'orderSn': ""
	},
	headers: {
		"Authorization": id,
	},
	success: function(data) {
		//console.log(data);
		currentIsmgName = data.data;
		//console.log($this.userData);
		// $this.totalCount = data.data.totalCount
	},
	error: function(err) {
		console.log(err);
	}
});
$.ajax({
	url: $api.queryIsmgName,
	type: 'post',
	async: false,
	data: {
		'ismgName': ""
	},
	headers: {
		"Authorization": id,
	},
	success: function(data) {
		//console.log(data);
		IsmgName = data.data;
		//console.log($this.userData);
		// $this.totalCount = data.data.totalCount
	},
	error: function(err) {
		console.log(err);
	}
});
Vue.component("v-order-manage", {
	template: '#order-template',
	data: function() {
		return {
			sellerid: "",
			url: $api.OrderManagerList,
			queryOrderList: $api.queryOrderList,
			cannelLimit: $api.cannelLimit,
			retryTimeOut: $api.retryTimeOut,
			retryFailed: $api.retryFailed,
			code: 0,
			data1: [],
			allData: [],
			msgContent: '',
			content: ['短信移动成功计费', '短信联通成功计费', '短信电信成功计费', '短信移动提交计费', '短信联通提交计费', '短信电信提交计费',
				'彩信移动成功计费', '彩信联通成功计费', '彩信电信成功计费', '彩信联通提交计费', '彩信电信提交计费', 'USSD弹屏成功计费',
				'语音成功计费', '国际短信成功计费'
			],
			smsText: "",
			data2: {
				"offset": 1,
				"pageSize": 5,
				"countMax": "",
				"countMin": "",
				"commiter": "",
				"orderStatus": "",
				"orderType": "",
				"receivingType": "",
				"sendType": "",
				"orderContent": ""
			},
			data3: {
				"endDate": getDay(0) + ' 23:59:59',
				"startDate": getDay(0) + ' 00:00:00',
				"offset": 1,
				"pageSize": 5,
				"msgContent": "",
				"mobileNumber": "",
				"loginName": "",
				"sendType": "",
				"orderNo": "",
			},
			totalCount: 0,
			showNo: true,
			mapShow: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		// setTimeout(() => {
		$this.addData($this.data2);
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			if($this.data2.offset != 1 || $this.data2.pageSize != 5) {
				$this.page()
			}
			if($this.data3.offset != 1 || $this.data3.pageSize != 5) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo11)", function(data) {
				//   console.log(data)
				$this.data2.commiter = data.field.commiter;
				$this.data2.orderStatus = data.field.orderStatus;
				$this.data2.receivingType = data.field.receivingType;
				$this.data2.sendType = data.field.sendType;
				$this.data2.orderContent = data.field.orderContent.trim();
				$this.data2.orderType = data.field.orderType;
				$this.data2.countMax = data.field.countMax * 1;
				$this.data2.countMin = data.field.countMin * 1;
				$this.data2.offset = 1;
				$this.data2.pageSize = 5;
				$this.addData($this.data2);
				//$this.page()
				return false;
			});
			form.on("submit(demo12)", function(data) {
				//console.log(data)
				$this.data3.endDate = data.field.endDate;
				$this.data3.loginName = data.field.loginName;
				$this.data3.mobileNumber = data.field.mobileNumber;
				$this.data3.orderNo = data.field.orderNo;
				$this.data3.sendType = data.field.sendTypeOne;
				$this.data3.msgContent = data.field.smsText.trim();
				$this.data3.startDate = data.field.startDate;
				$this.data3.offset = 1;
				$this.data3.pageSize = 5;
				$this.addDataTwo($this.data3);
				//$this.page()
				return false;
			});
		});
		$('.table_tou h6').on('click', function() {
			$(this).addClass('addClass2').siblings().removeClass('addClass2')
			if($(this).text() == '订单列表') {
				$this.code = 0;
				$('.table_nav  form .list2').addClass('dn')
				$('.table_nav  form .list').removeClass('dn')
				$this.data2.offset = 1;
				$this.data2.pageSize = 5;
				$this.addData($this.data2)
				//$this.page()
			} else if($(this).text() == '订单浏览') {
				$this.code = 1
				$('.table_nav  form .list').addClass('dn')
				$('.table_nav  form .list2').removeClass('dn');
				$this.data3.offset = 1;
				$this.data3.pageSize = 5;
				$this.addDataTwo($this.data3);
				// $this.page1()
			}
			//$(document).ready(function () {
			//    var height = $('#rightTable').get(0).scrollHeight;
			//    // console.log(height)
			//    $('#leftMenu_Box').css('height', height)
			//});
		})
		// }, 100);
	},
	methods: {
		successively: function(val) {
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			var updata = {
				num: val,
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAA", updata);
		},
		contentUp: function(val) {
			$("#shade2").fadeIn(300);
			$(".shade_con2").fadeIn(300);
			var updata = {
				num: val,
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getBB", updata);
		},
		failIsmg: function(val) {
			$("#shade1").fadeIn(300);
			$(".shade_con1").fadeIn(300);
			var updata = {
				num: val,
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getCC", updata);
		},
		force:function(val) {
			$("#shade4").fadeIn(300);
			$(".shade_con4").fadeIn(300);
			var updata = {
				num: val,
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getDD", updata);
		},
		z_cut:function(val) {
			$("#shade3").fadeIn(300);
			$(".shade_con5").fadeIn(300);
			var updata = {
				num: val,
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getFF", updata);
		},
		amend: function(val) {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
			var updata = {
				num: val,
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getGG", updata);
		},
		renewal: function() {
			$("#shade1").fadeIn(300);
			$(".shade_con6").fadeIn(300);
		},
		overtime: function() {
			var $this = this;
			layer.open({
				content: '确定要执行超时重发吗？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.retryTimeOut,
						type: 'post',
						async: false,
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify({
						
						}),
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addData($this.data2)
								}
							});
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

				},
				btn2: function(index, layero) {
					layer.close(index);
					//return false 开启该代码可禁止点击该按钮关闭
				}
			});
		},
		off_place: function(val) {
			var $this = this;
			layer.open({
				content: '确定要取消启发限制吗？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.cannelLimit,
						type: 'post',
						async: false,
						dataType: 'json',
						//contentType: 'application/json',
						data: {
							"orderSn": val,
						},
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addData($this.data2)
								}
							});
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

				},
				btn2: function(index, layero) {
					layer.close(index);
					//return false 开启该代码可禁止点击该按钮关闭
				}
			});
		},
		lose: function() {
			var $this = this;
			layer.open({
				content: '确定要执行失败重发吗？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.retryFailed,
						type: 'post',
						async: false,
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify({
						}),
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addData($this.data2)
								}
							});
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

				},
				btn2: function(index, layero) {
					layer.close(index);
					//return false 开启该代码可禁止点击该按钮关闭
				}
			});
		},
		//导出
		importFile: function() {
			var $this = this;
			$this.data3.offset = 0;
			$this.data3.pageSize = 0;
			$this.data3.expTitle = '订单浏览';
			$this.data3.exp = 'true';
			$.ajax({
				url: $this.queryOrderList,
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify($this.data3),
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
		page: function() {
			var $this = this;
			layui.use("laypage", function() {
				var laypage = layui.laypage;
				laypage.render({
					elem: "page",
					count: $this.totalCount,
					layout: ["prev", "page", "next", "limit", "skip"],
					limit: 5,
					limits: [5, 10, 30, 50, 100, 1000],
					groups: 5,
					prev: "<",
					next: ">",
					jump: function(obj, first) {
						//console.log(obj);
						if(first) {
							return
						} else {
							if($this.code == 0) {
								$this.data2.offset = obj.curr;
								$this.data2.pageSize = obj.limit;
								$this.addData($this.data2);
							} else {
								$this.data3.offset = obj.curr;
								$this.data3.pageSize = obj.limit;
								$this.addDataTwo($this.data3);
							}
						}
					}
				});
			});

		},
		addData: function(data2) {
			var $this = this;
			$.ajax({
				url: $this.url,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data2),
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
				success: function(data) {
					//  console.log(data);
					$this.allData = [];
					$this.totalCount = 0;
					$("#load").remove();
					if(data.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else if(data.statusCode == '400') {
						$this.showNo = true
						layer.msg(data.message, {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
					} else {
						$this.allData = data.data.data;
						$this.totalCount = data.data.totalCount;
						if($this.allData.length == 0) {
							$this.showNo = true
						} else {
							$this.showNo = false
						}

						if(data2.offset == 1 && data2.pageSize == 5) {
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
		addDataTwo: function(data3) {
			var $this = this;
			$.ajax({
				url: $this.queryOrderList,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data3),
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
				success: function(data) {
					//console.log(data);
					$this.allData = [];
					$this.totalCount = 0;
					$("#load").remove();
					if(data.statusCode == '401') {
						//localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else if(data.statusCode == '400') {
						$this.showNo = true
						layer.msg(data.message, {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
					} else {
						$this.allData = data.data.data;
						$this.totalCount = data.data.totalCount;
						if($this.allData.length == 0) {
							$this.showNo = true
						} else {
							$this.showNo = false
						}

						if(data3.offset == 1 && data3.pageSize == 5) {
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
	},
	filters: {
		limitTo: function(value) {
			if(value == '' || value == null) {
				return '-'
			} else {
				return value.substring(0, 19)
			}

		}
	},
	created: function() {
		var $this = this;

		//接收器，接收上面的两个ID
		bus.$on("getZZ", function(updata) {
			//注意this指向问题
			$this.addData($this.data2);
		});
	},
});
/*发送详情*/
Vue.component("v-successively", {
	template: '#successively-template',
	data: function() {
		return {
			sellerid: "",
			orderSendDetail: $api.orderSendDetail,
			loadLevelingPageResult: [],
			orderIsmgSendPageResult: [],
			data1: {
				"orderSn": "",
			},
			mapShow: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//  setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//监听提交
			form.on("submit(demo4)", function(data) {
				//  console.log(JSON.stringify(data.field));
				return false;
			});
		});
		// }, 100);
	},
	methods: {
		shanchu: function() {
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},
		renovate: function() {
			var $this = this;
			$this.addData($this.data1)
		},
		//添加数据
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.orderSendDetail,
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
					$("#load").remove();
					// console.log(res.data);
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.loadLevelingPageResult = res.data.loadLevelingPageResult.data;
						$this.orderIsmgSendPageResult = res.data.orderIsmgSendPageResult.data;
					}

				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		}
	},
	created: function() {
		var $this = this;
	
		//接收器，接收上面的两个ID
		      bus.$on("getAA", function (updata) {
		          //注意this指向问题
		          $this.data1.orderSn = updata.num;
		          $this.addData($this.data1)
		      });
	},
});

Vue.component("v-operator", {
	template: '#operator-template',
	data: function() {
		return {
			orderDetail: $api.orderDetail,
			addWord: $api.addWord,
			deleteWord: $api.deleteWord,
			mapShow: true, //显示无数据图片
			code: 0,
			data1: {
				"orderSn": "",
				"content": "",
				"offset": 1,
				"pageSize": 5,
			},			
			allData1:[],
			mapShow1:true,			
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
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 5) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo10)", function(data) {
				$this.data1.content = data.field.content;
				$this.data1.offset = 1;
				$this.data1.pageSize = 5;
				$this.addDataA($this.data1)
				return false;
			});

		});
		//}, 100);
	},
	methods: {
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
							$this.addDataA($this.data1);
						}
					}
				});
			});

		},
		shanchu: function() {
			var $this = this;
			$("#shade2").fadeOut(300);
			$(".shade_con2").fadeOut(300);
			$this.data1.content = '';
		},
		//加载数据
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.orderDetail,
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
				//	 console.log(res.data.data);
				$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.allData1 = res.data.data;
						if($this.allData1 == '') {
							$this.mapShow1 = true
						} else {
							$this.mapShow1 = false
						}
						$this.totalCount = res.data.totalCount;
						
					}
					if(data.offset == 1 && data.pageSize == 5) {
						$this.page()
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getBB", function(updata) {
			//注意this指向问题
			$this.data1.orderSn = updata.num;
			$this.data1.offset = 1;
			$this.data1.pageSize = 5;
			 $this.addDataA($this.data1)
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});

Vue.component("v-force", {
	template: '#force-template',
	data: function() {
		return {
			querySelFailedReceipt: $api.querySelFailedReceipt,
			trunToFailed: $api.trunToFailed,
			mapShow: true, //显示无数据图片
			code: 0,
			data1: {
				"orderSn": "",
				"receiptText": "",
				"offset": 1,
				"pageSize": 5,
			},			
			allData1:[],
			mapShow1:true,			
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
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 5) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo15)", function(data) {
				$this.data1.receiptText = data.field.receiptText;
				$this.data1.offset = 1;
				$this.data1.pageSize = 5;
				$this.addDataA($this.data1)
				return false;
			});
			form.on("submit(demo19)", function(data) {
				data.field.orderSn = $this.data1.orderSn;
				$.ajax({
					url: $this.trunToFailed,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						// console.log(data);
						if(data.statusCode == '401') {
							//localStorage.setItem('url', window.location.pathname)
							window.open("../../login.html", "_self");
						} else {
							if(data.statusCode == 200) {
								layer.open({
									content: data.message,
									yes: function(index) {
										layer.close(index);
									  $this.addDataA($this.data1)
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
				return false;
			});

		});
		//}, 100);
	},
	methods: {
		//分页
		page: function() {
			var $this = this;
			layui.use("laypage", function() {
				var laypage = layui.laypage;
				laypage.render({
					elem: "cc",
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
							$this.addDataA($this.data1);
						}
					}
				});
			});

		},
		shanchu: function() {
			var $this = this;
			$("#shade4").fadeOut(300);
			$(".shade_con4").fadeOut(300);
			$this.data1.receiptText = '';
		},
		//加载数据
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.querySelFailedReceipt,
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
				//	 console.log(res.data.data);
				$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.allData1 = res.data.data;
						if($this.allData1 == '') {
							$this.mapShow1 = true
						} else {
							$this.mapShow1 = false
						}
						$this.totalCount = res.data.totalCount;
						
					}
					if(data.offset == 1 && data.pageSize == 5) {
						$this.page()
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getDD", function(updata) {
			//注意this指向问题
			$this.data1.orderSn = updata.num;
			$this.data1.offset = 1;
			$this.data1.pageSize = 5;
			 $this.addDataA($this.data1)
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});

Vue.component("v-fail", {
	template: '#fail-template',
	data: function() {
		return {
			queryChangeTaskISMG: $api.queryChangeTaskISMG,
			addWord: $api.addWord,
			changeTaskResendISMG: $api.changeTaskResendISMG,
			mapShow: true, //显示无数据图片
			code: 0,
			currentIsmgIdData:currentIsmgName,
			ismgIData:IsmgName,
			data1: {
				"orderSn": "",
				"currentIsmgId": "",
				"ismgId":"",
				"offset": 1,
				"pageSize": 5,
			},		
			data2:{
				"oldIsmgId": "",
				"ismgId":"",
				"taskSn":''
			},
			allData1:[],
			mapShow1:true,			
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
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 5) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo13)", function(data) {
				$this.data1.currentIsmgId = data.field.currentIsmgId;
				$this.data1.ismgId = data.field.ismgId;
				$this.data1.offset = 1;
				$this.data1.pageSize = 5;
				$this.addDataA($this.data1)
				return false;
			});
			form.on("submit(demo14)", function(data) {
				if (data.field.currentIsmgId == '' || data.field.ismgId == '') {
            layer.msg('请选择网关！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
          	data.field.taskSn = null;
          	data.field.oldIsmgId = data.field.currentIsmgId;
				$.ajax({
					url: $this.changeTaskResendISMG,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						// console.log(data);
						if(data.statusCode == '401') {
							//localStorage.setItem('url', window.location.pathname)
							window.open("../../login.html", "_self");
						} else {
							if(data.statusCode == 200) {
								layer.open({
									content: data.message,
									yes: function(index) {
										layer.close(index);
										$this.addDataA($this.data1)
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
		//}, 100);
	},
	methods: {
		//分页
		page: function() {
			var $this = this;
			layui.use("laypage", function() {
				var laypage = layui.laypage;
				laypage.render({
					elem: "bb",
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
							$this.addDataA($this.data1);
						}
					}
				});
			});

		},
		shanchu: function() {
			var $this = this;
			$("#shade1").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			$("#currentIsmgId option[value='']").prop("selected", "selected");
			$("#ismgId option[value='']").prop("selected", "selected");
			$this.allData1 = [];
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		},
		single_in: function(val) {			
			var $this = this;
			if ($this.data1.currentIsmgId == '' || $this.data1.ismgId == '') {
            layer.msg('请选择网关！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
          	$this.data2.oldIsmgId = $this.data1.currentIsmgId;
          	$this.data2.ismgId = $this.data1.ismgId;
          	$this.data2.taskSn = val;
          	$.ajax({
							url: $this.changeTaskResendISMG,
							type: 'post',
							dataType: 'json',
							contentType: 'application/json',
							async: false,
							data: JSON.stringify($this.data2),
							headers: {
								"Authorization": id,
							},
							success: function(data) {
								// console.log(data);
								if(data.statusCode == '401') {
									//localStorage.setItem('url', window.location.pathname)
									window.open("../../login.html", "_self");
								} else {
									if(data.statusCode == 200) {
										layer.open({
											content: data.message,
											yes: function(index) {
												layer.close(index);
												$this.addDataA($this.data1)
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
			
		},
		//加载数据
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryChangeTaskISMG,
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
				//	 console.log(res.data.data);
				$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.allData1 = res.data.data;
						if($this.allData1 == '') {
							$this.mapShow1 = true
						} else {
							$this.mapShow1 = false
						}
						$this.totalCount = res.data.totalCount;
						
					}
					if(data.offset == 1 && data.pageSize == 5) {
						$this.page()
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getCC", function(updata) {
			//注意this指向问题
			$this.data1.orderSn = updata.num;
			$this.data1.offset = 1;
			$this.data1.pageSize = 5;
			 $this.addDataA($this.data1)
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});

Vue.component("v-renewal", {
	template: '#renewal-template',
	data: function() {
		return {
			previewLastSend: $api.previewLastSend,
			mapShow: true, //显示无数据图片
			code: 0,
			data1: {
				"offset": 1,
				"pageSize": 5,
			},			
			ismgIData:IsmgName,
			allData1:[],
			mapShow1:true,			
		};
	},
	mounted: function() {
		var $this = this;
		 $this.addDataA($this.data1)
		// setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 5) {
				$this.page()
			}
			//监听提交
//			form.on("submit(demo13)", function(data) {
//				//$this.data1.currentIsmgId = data.field.currentIsmgId;
//			//	$this.data1.ismgId = data.field.ismgId;
//				$this.data1.offset = 1;
//				$this.data1.pageSize = 5;
//				$this.addDataA($this.data1)
//				return false;
//			});

		});
		//}, 100);
	},
	methods: {
		//分页
		page: function() {
			var $this = this;
			layui.use("laypage", function() {
				var laypage = layui.laypage;
				laypage.render({
					elem: "ff",
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
							$this.addDataA($this.data1);
						}
					}
				});
			});

		},
		shanchu: function() {
			var $this = this;
			$("#shade1").fadeOut(300);
			$(".shade_con6").fadeOut(300);
			//$this.allData1 = [];
		},
		refuse:function(){		
        var $this = this;        
        $(".tips1").fadeIn(300);
      },
       quxiao:function(){
        $(".tips1").fadeOut(300);
      },
		//加载数据
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.previewLastSend,
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
				//	 console.log(res.data.data);
				$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.allData1 = res.data.data;
						if($this.allData1 == '') {
							$this.mapShow1 = true
						} else {
							$this.mapShow1 = false
						}
						$this.totalCount = res.data.totalCount;
						
					}
					if(data.offset == 1 && data.pageSize == 5) {
						$this.page()
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
//		bus.$on("getCC", function(updata) {
//			//注意this指向问题
//			//$this.data1.orderSn = updata.num;
//			 $this.addDataA($this.data1)
//			layui.use("form", function() {
//				var form = layui.form;
//				form.render();
//			});
//		});
	},
});

Vue.component("v-cut", {
	template: '#cut-template',
	data: function() {
		return {
			queryInterceptReissue: $api.queryInterceptReissue,
			mapShow: true, //显示无数据图片
			code: 0,
			currentIsmgIdData:currentIsmgName,
			ismgIData:IsmgName,
			data1: {
				"orderSn": "",
				"msgContent": "",
				"receiverMsisdn":"",
				"offset": 1,
				"pageSize": 5,
			},			
			allData1:[],
			mapShow1:true,			
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
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 5) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo16)", function(data) {
				$this.data1.receiverMsisdn = data.field.receiverMsisdn;
				$this.data1.msgContent = data.field.msgContent;
				$this.data1.offset = 1;
				$this.data1.pageSize = 5;
				$this.addDataA($this.data1)
				return false;
			});

		});
		//}, 100);
	},
	methods: {
		//分页
		page: function() {
			var $this = this;
			layui.use("laypage", function() {
				var laypage = layui.laypage;
				laypage.render({
					elem: "dd",
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
							$this.addDataA($this.data1);
						}
					}
				});
			});

		},
		shanchu: function() {
			var $this = this;
			$("#shade3").fadeOut(300);
			$(".shade_con5").fadeOut(300);
			$this.allData1 = [];
		},
		//加载数据
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryInterceptReissue,
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
				//	 console.log(res.data.data);
				$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.allData1 = res.data.data;
						if($this.allData1 == '') {
							$this.mapShow1 = true
						} else {
							$this.mapShow1 = false
						}
						$this.totalCount = res.data.totalCount;
						
					}
					if(data.offset == 1 && data.pageSize == 5) {
						$this.page()
					}
				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getFF", function(updata) {
			//注意this指向问题
			$this.data1.orderSn = updata.num;
			$this.data1.offset = 1;
			$this.data1.pageSize = 5;
			 $this.addDataA($this.data1)
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});

//待发换网关
Vue.component("v-amend", {
	template: '#amend-template',

	data: function() {
		return {
			changeISMG: $api.changeISMG,
			mapShow: true, //显示无数据图片
			currentIsmgIdData:currentIsmgName,
			ismgIData:IsmgName,
			data1: {
				"orderSn": "",
				"oldIsmgId": "",
				"ismgId":"",
				"ismgProportion": '',
				"orderSn": '',
			},		
		};
	},
	mounted: function() {
		var $this = this;
		//  setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			form.on("submit(demo6)", function(data) {
				data.field.orderSn = $this.data1.orderSn;
          $.ajax({
              url : $this.changeISMG,
              type : 'post',
              dataType : 'json',
              contentType: 'application/json',
              async: false,
              data : JSON.stringify(data.field),
              headers :{
                "Authorization":id,
              },
              success: function(data) {
								// console.log(data);
								if(data.statusCode == '401') {
									//localStorage.setItem('url', window.location.pathname)
									window.open("../../login.html", "_self");
								} else {
									if(data.statusCode == 200) {
										layer.open({
											content: data.data,
											yes: function(index) {
												layer.close(index);
												$this.shanchu()
												var updata = {
													code: 0,
												};
												bus.$emit("getZZ", updata);
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
              error : function(err){
                console.log(err);
              }
            });
          return false;
        });
		});
		//  }, 100);
	},
	methods: {
		shanchu: function() {
			var $this = this;
			$("#shade3").fadeOut(300);
			$(".shade_con3").fadeOut(300);
			$("#oldIsmgId option[value='']").prop("selected", "selected");
			$("#ismgIdTwo option[value='']").prop("selected", "selected");
			$this.data1.ismgProportion = '';
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		},
		sw_btnwrong: function() {
			$("#shade3").fadeOut(300);
			$(".shade_con3").fadeOut(300);
		}
	},
	created: function() {
		var $this = this;

		//接收器，接收上面的两个ID
		bus.$on("getGG", function(updata) {
			//注意this指向问题
			$this.data1.orderSn = updata.num;
		//	console.log(updata)
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});