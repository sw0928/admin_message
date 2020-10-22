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
if(show_button(2121311)){
	
}else{
	window.open("../../login.html", "_self");
}
//左侧菜单组件实例化
Vue.component("v-order-fail", {
	template: '#right-template',
	data: function() {
		return {
			queryListForRecipt: $api.queryListForRecipt,
			data1: {
				"userId": "",
				"endDate": getDay(0)+' 23:59:59',
				"startDate": getDay(-100)+' 00:00:00',
				"offset": 1,
				"pageSize": 10,
				"srcTerminalId": "",
				"sendState":'1',
				"ismgId": ""
			},
			totalCount: '0',
			allData: [],
			userData: UserName,
			userData1: ismgName,
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
			//	$this.data1 = data.field;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1);
				return false;
			});
		});
		//}, 100);
	},
	methods: {
		del: function() {

		},
		radio: function(event) {
			var checks = $('td form input.radio');
			for(var i = 0; i < checks.length; i++) {
				//console.log(checks[i].checked)
				if(checks[i].checked == false) {
					$("th form input[name='全选']")[0].checked = false;
				}

			}
			layui.use(["form"], function() {
				var form = layui.form;
				form.render();
			})
		},
		check_all: function(event) {
			var el = event.currentTarget;
			// console.log($(el).find("input[name='全选']")[0].checked == true);
			var checks = $('td form input.radio');
			if($(el).find("input[name='全选']")[0].checked == true) {
				$.each(checks, function(i, n) {
					checks[i].checked = true
				});
			} else {
				$.each(checks, function(i, n) {
					checks[i].checked = false
				});
			}
			layui.use(["form"], function() {
				var form = layui.form;
				form.render();
			})
		},
		edit: function() {
			$("#shade1").fadeIn(300);
			$(".shade_con1").fadeIn(300);
			var checkss = $('td form input.radio');
			var sw_arr = []
			$.each(checkss, function(i, n) {
				if(checkss[i].checked == true) {
					sw_arr.push($(checkss[i]).attr('data'))
				}
			});
			sw_arr = sw_arr.join(',')
			var updata = {
				Info: sw_arr,
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getBid", updata);
		},
		amend: function() {
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
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
//							$("th form input[name='全选']")[0].checked = false;
//							var checks = $('td form input.radio');
//							$.each(checks, function(i, n) {
//								checks[i].checked = false;
//							});
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
				url: $this.queryListForRecipt,
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
//							$("th form input[name='全选']")[0].checked = false;
//							var checks = $('td form input.radio');
//							$.each(checks, function(i, n) {
//								checks[i].checked = false;
//							});
							layui.use(["form"], function() {
								var form = layui.form;
								form.render();
							})
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
		bus.$on("getCC", function(updata) {
			//注意this指向问题
			$this.data1.offset = 1;
			$this.data1.pageSize = 10;
			$this.addData($this.data1);
		});

	},
});
/*查询统计*/
Vue.component("v-tong-ji", {
	template: '#tong-template',
	data: function() {
		return {
			userData: UserName,
			userData1: ismgName,
			uploadReceipt: $api.uploadReceipt,
			commitImport: $api.commitImport,
			allData1: [],
			data1: {
				"userId": "",
				"endDate": getDay(0)+' 23:59:59',
				"startDate": getDay(0)+' 00:00:00',
				"ismgId": "",
				"srcTerminalId": '',
				"multipartFile": ''
			},
			fileId: '',
			mapShow1: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			$("#file").on("change", function(e) {
				var e = e || window.event;
				//获取 文件 个数 取消的时候使用
				var files = e.target.files;
				// console.log(files)
				if(files.length > 0) {
					// 获取文件名 并显示文件名
					var fileName = files[0];
					$this.fileId = fileName
				} else {
					//清空文件名
					$("#file").val("");
					$this.fileId = '';
				}
			});
			//监听提交
			form.on("submit(demo2)", function(data) {
				$this.data1 = data.field;
				if($this.fileId == '') {
					layer.msg('请选择文件！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				}
				var myform = new FormData();
				myform.append('multipartFile', $this.fileId);
				myform.append('startDate', data.field.startDate);
				myform.append('endDate', data.field.endDate);
				myform.append('srcTerminalId', data.field.srcTerminalId);
				var text = $(".unlike1 .dropdown-selected1").val();
				if(text == '') {
					myform.append('userId', '');
				} else {
					if(verify_user1(UserName, $(".unlike1 .dropdown-selected1"), text)) {
						myform.append('userId', $(".unlike1 .dropdown-selected1").attr('data'));
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
				var text1 = $(".unlike4 .dropdown-selected1").val();
				if(text1 == '') {
					myform.append('ismgId', '');
				} else {
					if(verify_ism(ismgName, $(".unlike4 .dropdown-selected1"), text1)) {
						myform.append('ismgId', $(".unlike4 .dropdown-selected1").attr('data'));
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$.ajax({
					url: $this.uploadReceipt,
					type: "POST",
					data: myform,
					dataType: 'json',
					async: true,
					//cache: false,
					contentType: false,
					processData: false,
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
						//console.log(res);
						$("#load").remove();
						if(res.statusCode == '401') {
							window.open("../../login.html", "_self");
						} else {
							layer.msg('查询成功！', {
								icon: 2,
								time: 1000 //2秒关闭（如果不配置，默认是3秒）
							});
							$this.allData1 = res.data;
							if($this.allData1 == '') {
								$this.mapShow1 = true
							} else {
								$this.mapShow1 = false
							}
						}
					},
					error: function(data) {
						$("#load").remove();
					}
				})
				return false;
			});
		});
		// }, 100);
	},
	methods: {
		shanchu: function() {
			var $this = this;
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},
		importFileT: function() {
			var $this = this;
			let text = $(".unlike1 .dropdown-selected1").val();
			if(text == '') {
				$this.data1.userId = ''
			} else {
				if(verify_user1(UserName, $(".unlike1 .dropdown-selected1"), text)) {
					$this.data1.userId = $(".unlike1 .dropdown-selected1").attr('data');
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
			let text1 = $(".unlike4 .dropdown-selected1").val();
			if(text1 == '') {
				$this.data1.ismgId = ''
			} else {
				if(verify_ism(ismgName, $(".unlike4 .dropdown-selected1"), text1)) {
					$this.data1.ismgId = $(".unlike4 .dropdown-selected1").attr('data');
				} else {
					layer.msg('请选择下拉框内容！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				}
			}
			$.ajax({
				url: $this.commitImport,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify($this.data1),
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//console.log(res);
					if(data.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						if(data.statusCode == 200) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu()
									var updata = {
										code: 0,
									};
									bus.$emit("getCC", updata);
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
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.uploadReceipt,
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
					//console.log(res);
					$("#load").remove();
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						$this.allData1 = res.data;
						if($this.allData1 == '') {
							$this.mapShow1 = true
						} else {
							$this.mapShow1 = false
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
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getBb", function(updata) {
			//注意this指向问题
			$(".unlike1 .dropdown-selected1").val('');
			$(".unlike4 .dropdown-selected1").val('');
			$this.fileId = '';
			$this.allData1 = [];
			$this.mapShow1 = true;
			$("#file").val("");
			$this.data1 = updata.obj;
		});
	},
});
Vue.component("v-edit", {
	template: '#edit-template',
	data: function() {
		return {
			batchUpdate: $api.batchUpdate,
			mapShow: true, //显示无数据图片
			//content1:['拒绝','先审后发','先发后审','接受'],
			// content2:['不可用','可用','测试'],
			data2: {
				"receiptText": '',
				"msgId2Str": "",
			},
			idStr: '',
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
			form.on("submit(demo1)", function(data) {
				$this.data2 = data.field;
				$this.data2.msgId2Str = $this.idStr;
				if($this.idStr == ''){
					layer.open({
							content: '请选项一个及以上，才能继续操作！',
							yes: function(index) {
								layer.close(index);
							}
						});
						return false;
				}
				$.ajax({
					url: $this.batchUpdate,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.data2),
					headers: {
						"Authorization": id,
					},
					success: function(res) {
						//  console.log(data);
						if(res.statusCode == '200') {
							layer.open({
								content: res.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu()
									var updata = {
										code: 1,
									};
									bus.$emit("getCC", updata);
								}
							});
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
				return false;
			});
		});
		//  }, 100);
	},
	methods: {
		shanchu: function() {
			var $this = this;
			$("#shade1").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			$this.data2 = {
				"receiptText": '',
				"msgId2Str": "",
			};
			$('input:radio[name=receiptText]')[0].checked = true;
			layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		      bus.$on("getBid", function(updata) {
		          //注意this指向问题
		          $this.idStr = updata.Info;
		      });
	},
});