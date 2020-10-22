/*下单失败*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
var UserName = null,
	ismgName = null;
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
		ismgName = data.data;
		//console.log($this.userData);
		// $this.totalCount = data.data.totalCount
	},
	error: function(err) {
		console.log(err);
	}
});
if(show_button(2121313)){
	
}else{
	window.open("../../login.html", "_self");
}
//左侧菜单组件实例化
Vue.component("v-order-fail", {
	template: '#right-template',
	data: function() {
		return {
			url: $api.UserSendDetailList,
			reportUpload: $api.reportUpload,
			queryListForCus: $api.queryListForCus,
			resendReceipt: $api.resendReceipt,
			data1: {
				"userId": "",
				"endDate": getDay(0) + ' 23:59:59',
				"startDate": getDay(0) + ' 00:00:00',
				"ismgId": "",
				"offset": 1,
				"pageSize": 10,
				"srcTerminalId": "",
				"deliverState": '',
				"taskSn": '',
				"fileId": ""
			},
			data2: {
				"endDate": getDay(0) + ' 23:59:59',
				"startDate": getDay(0) + ' 00:00:00',
				"howSend": "",
				"ismgId": "",
				"moblieNumber": "",
				"offset": 1,
				"orderSn": "",
				"pageSize": 10,
				"receiptStatus": "",
				"receiptStatusText": "",
				"sendType": "",
				"signName": "",
				"smsConten": "",
				"taskSn": "",
				"userName": ""
			},
			totalCount: '0',
			allData: [],
			userData: UserName,
			userData1: ismgName,
			fileId: '',
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
			$("#file").on("change", function(e) {
				var e = e || window.event;
				//获取 文件 个数 取消的时候使用
				var files = e.target.files;
				// console.log(files)
				if(files.length > 0) {
					// 获取文件名 并显示文件名
					var fileName = files[0];
					var myform = new FormData();
					myform.append('multipartFile', fileName);
					myform.append('uploadType', 0);
					$.ajax({
						url: $this.reportUpload,
						type: "POST",
						data: myform,
						dataType: 'json',
						async: false,
						cache: false,
						headers: {
							"Authorization": id,
						},
						contentType: false,
						processData: false,
						success: function(res) {
							// console.log(res)
							if(res.statusCode == 200) {
								layer.open({
									content: res.message,
									yes: function(index) {
										layer.close(index);
										//console.log($this.fileId)
										// $("#file").val("");
										$this.fileId = res.data;
									}
								});
							} else {
								layer.open({
									content: res.message,
									yes: function(index) {
										layer.close(index);
										$("#file").val("");
										$this.fileId = '';
									}
								});
							}
						},
						error: function(data) {
							$("#file").val("");
							$this.fileId = '';
						}
					})
				} else {
					//清空文件名
					$("#file").val("");
					$this.fileId = '';
				}
			});
			//监听提交
			form.on("submit(demo)", function(data) {
				$this.data1 = data.field;
				var text = $(".unlike2 .dropdown-selected").val();
				if(text == '') {
					$this.data1.userId = ''
				} else {
					if(verify_user1(UserName, $(".unlike2 .dropdown-selected"), text)) {
						$this.data1.userId = $(".unlike2 .dropdown-selected").attr('data');
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
				var text1 = $(".unlike3 .dropdown-selected1").val();
				if(text1 == '') {
					$this.data1.ismgId = ''
				} else {
					if(verify_ism(ismgName, $(".unlike3 .dropdown-selected1"), text1)) {
						$this.data1.ismgId = $(".unlike3 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.data1.fileId = $this.fileId;
				$this.addData($this.data1);
				return false;
			});
			form.on("submit(demo1)", function(data) {
				$this.data1 = data.field;
				var text = $(".unlike2 .dropdown-selected").val();
				if(text == '') {
					$this.data1.userId = ''
				} else {
					if(verify_user1(UserName, $(".unlike2 .dropdown-selected"), text)) {
						$this.data1.userId = $(".unlike2 .dropdown-selected").attr('data');
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
				var text1 = $(".unlike3 .dropdown-selected1").val();
				if(text1 == '') {
					$this.data1.ismgId = ''
				} else {
					if(verify_ism(ismgName, $(".unlike3 .dropdown-selected1"), text1)) {
						$this.data1.ismgId = $(".unlike3 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data1.fileId = $this.fileId;
				layer.open({
					content: '你确定要报告重推？',
					shadeClose: true,
					btn: ['确定', '取消'],
					yes: function(index) {
						layer.close(index);
						$.ajax({
							url: $this.resendReceipt,
							type: 'post',
							dataType: 'json',
							contentType: 'application/json',
							async: false,
							data: JSON.stringify($this.data1),
							headers: {
								"Authorization": id,
							},
							success: function(res) {
								if(res.statusCode == 200) {
									layer.open({
										content: res.message,
										yes: function(index) {
											layer.close(index);
										}
									});
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
								console.log(err);
							}
						});
					},
					btn2: function(index, layero) {
						layer.close(index);
						//return false 开启该代码可禁止点击该按钮关闭
					}
				});
				return false;
			});
		});
		//}, 100);
	},
	methods: {
		empty: function() {
			var $this = this;
			$("#file").val("");
			$this.fileId = '';
			layer.msg('清空完成！', {
				icon: 2,
				time: 1000 //2秒关闭（如果不配置，默认是3秒）
			});
			setTimeout(function() {
				$this.data1.fileId = '';
				$this.addData($this.data1);
				return false;
			}, 1100);

		},
		importFile: function() {
			var $this = this;
			$this.data1.offset = 0;
			$this.data1.pageSize = 0;
			$this.data1.expTitle = '报告状态重推';
			$this.data1.exp = 'true';
			$.ajax({
				url: $this.queryListForCus,
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
		shade: function(num) {
			var $this = this;
			$this.data2.taskSn = num;
			$this.data2.startDate = $this.data1.startDate;
			$this.data2.endDate = $this.data1.endDate;
			$.ajax({
				url: $this.url,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify($this.data2),
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					 //console.log(data.data.data);
					if(data.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else if(data.statusCode == '400') {
						layer.msg(data.message, {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
					} else {
						if(data.data.data == ''){
							layer.msg('暂无数据', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						}else{
							$("#shade").fadeIn(300);
			        $(".shade_con").fadeIn(300);
								var updata = {
								info: data.data.data
							};
							bus.$emit("getBb", updata);
						}
						
					}
				},
				error: function(err) {
					console.log(err);
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
		mapping: function(login, word) {
			$("#shade1").fadeIn(300);
			$(".shade_con1").fadeIn(300);
			var updata = {
				Info: {
					loginName: login,
					modWord: word,
				}
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAid", updata);
		},
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryListForCus,
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
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.sellerid = updata.sellerid;
			$this.auctionid = updata.auctionid;
		});

	},
});

/*申请模版*/
Vue.component("v-template", {
	template: '#shade-template',
	data: function() {
		return {
			html: '',
			text: '',
			info: [],
			replenish: '',
			data1: [],
			showPrice: false,
			mapShow: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//   setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//监听提交
		});

		//}, 100);
	},
	methods: {
		shanchu: function() {
			var $this = this;
			$this.info = [];
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getBb", function(updata) {
			//注意this指向问题
			$this.info = updata.info[0];
			if($this.info.receiptStatusCode =='0'){
				$this.info.receiptStatusCode = '失败'
			}else if($this.info.receiptStatusCode =='1'){
				$this.info.receiptStatusCode = '成功'
			}else{
				$this.info.receiptStatusCode = '未知'
			}
			if($this.info.howSend =='0'){
				$this.info.howSend = '待发'
			}else if($this.info.howSend =='1'){
				$this.info.howSend = 'A'
			}else if($this.info.howSend =='2'){
				$this.info.howSend = 'Z报成功'
			}else if($this.info.howSend =='3'){
				$this.info.howSend = 'Z报失败'
			}else if($this.info.howSend =='4'){
				$this.info.howSend = 'Z报空号'
			}else{
				$this.info.howSend = 'Z报内容限制'
			}
		});
	},
});