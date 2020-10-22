/*下单失败*/
var id = $api.localStorageId;
var tracId = $api.localStorageTracId;
//组件通信
var bus = new Vue();
var queryVendor = null;
$.ajax({
	url: $api.queryVendor,
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
		queryVendor = data.data;
		//console.log($this.userData);
		// $this.totalCount = data.data.totalCount
	},
	error: function(err) {
		console.log(err);
	}
});
//左侧菜单组件实例化
Vue.component("v-order-fail", {
	template: '#right-template',
	data: function() {
		return {
			queryVisitDetail: $api.queryVisitDetail,
			queryDeviceName: $api.queryDeviceName,
			data1: {
				"receiverMsisdn": "",
				"endTime": '',
				"startTime": '',
				"logId": "",
				"isValid": '',
				"deviceVendor": '',
				"deviceName": '',
				"clientOs": '',
				"offset": 1,
				"pageSize": 10,
				"ip": "",
				"tracId": tracId
			},
			vendor: queryVendor,
			isShow: true,
			totalCount: '0',
			inputValue: '',
			allData: [],
			deviceName: [],
			mapShow: false //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {
		$this.addData($this.data1);
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 10) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo)", function(data) {
				var text = $(".unlike3 .dropdown-selected").val();
				if(text == '') {
					$this.data1.deviceVendor = '';
					//					$this.data1.deviceName = ''
				} else {
					if(verify_evice($this.vendor, $(".unlike3 .dropdown-selected"), text)) {
						$this.data1.deviceVendor = $(".unlike3 .dropdown-selected").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
					// verify_user(UserName,$(".dropdown .dropdown-selected"),text)
					//  $this.data1.userName = $(".dropdown .dropdown-selected").attr('data');
				}
				$this.data1.tracId = tracId;
				$this.data1.startTime = data.field.startTime;
				$this.data1.endTime = data.field.endTime;
				$this.data1.logId = data.field.logId;
				$this.data1.isValid = data.field.isValid;
				$this.data1.deviceName = data.field.deviceName;
				$this.data1.clientOs = data.field.clientOs;
				$this.data1.receiverMsisdn = data.field.receiverMsisdn.trim();
				$this.data1.ip = data.field.ip;
				delete $this.data1.exp;
				delete $this.data1.expTitle;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1);
				return false;
			});
		});
		$('.unlike3 ul').on('click', 'li', function() {
			var temp = $(this).find('a').attr('data')
			$.ajax({
				url: $this.queryDeviceName,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify({
					"deviceVendor": temp,
				}),
				headers: {
					"Authorization":id,
				},
				success: function(res) {
					//console.log(res)
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						$this.deviceName = res.data;
						$this.isShow = false;
						$("#deviceName option[value='']").prop("selected", "selected");
						setTimeout(function() {
							layui.use("form", function() {
								var form = layui.form;
								form.render();
							})
						}, 50)

					}

				},
				error: function(err) {
					console.log(err);
				}
			});
			//	console.log()
		});
		//}, 100);
	},
	methods: {
		importFile: function() {
			var $this = this;
			$this.data1.offset = 0;
			$this.data1.pageSize = 0;
			$this.data1.expTitle = '短链访问详情列表';
			$this.data1.exp = 'true';
			$.ajax({
				url: $this.queryVisitDetail,
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
		inputFun(e) {
			var $this = this;
			$this.inputValue = e.target.value;
			if($this.inputValue == '') {
				$this.deviceName = [];
				$this.isShow = true;
				$("#deviceName option[value='']").prop("selected", "selected");
				setTimeout(function() {
					layui.use("form", function() {
						var form = layui.form;
						form.render();
					})
				}, 50)
			}
		},
		newDevice: function(val) {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
			var updata = {
				info: {
					"userAgent": val,					
				}
			};
			bus.$emit("getBid", updata);
		},
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
				url: $this.queryVisitDetail,
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
					// console.log(res);
					$("#load").remove();
					$this.allData = [];
					$this.totalCount = 0;
					if(res.statusCode == '401') {
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
		}
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
		bus.$on("getBB", function(updata) {
			//注意this指向问题
			$this.addData($this.data1);
		});

	},
});
/*添加锻炼*/
Vue.component("v-rate", {
	template: '#rate-template',
	data: function() {
		return {
			setVendorInfo: $api.setVendorInfo,
			//editTemplateOrder: $api.editTemplateOrder, // content1:['拒绝','先审后发','先发后审','接受'],
			// content2:['不可用','可用','测试'],			
			showData: {
				deviceVendor: "",
				deviceName: "",
				userAgent: "",
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
			//监听提交
			form.on("submit(demo6)", function(data) {
				data.field.markType = '1';				
				$.ajax({
					url: $this.setVendorInfo,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//   console.log(data);
						if(data.statusCode == 200) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu()
									var updata = {
										code: 0,
									};
									bus.$emit("getBB", updata);
									//window.open("../../html/resource/route_manage.html", "_self");
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
						if(data.statusCode == '401') {
							//localStorage.setItem('url', window.location.pathname)
							window.open("../../login.html", "_self");
						}
					},
					error: function(err) {
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
			var $this = this
			$("#shade3").fadeOut(300);
			$(".shade_con3").fadeOut(300);
			$this.showData = {
				deviceVendor: "",
				deviceName: "",
				userAgent: "",
			};
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getBid", function(updata) {
			//注意this指向问题
			$this.showData.userAgent = updata.info.userAgent
		});
	},
});