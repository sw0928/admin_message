/**
 * Created by addistrator on 2019/2/17 0017.
 */
/*下单失败*/
var id = $api.localStorageId;
var IsmgName = null,
	UserName = null;
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
//组件通信
var bus = new Vue();
if(show_button(2131311)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-fail", {
	template: '#order-template',
	data: function() {
		return {
			querySignIsmgList: $api.querySignIsmgList,
			batchQuerySignIsmgList: $api.batchQuerySignIsmgList,
			removeSignIsmg: $api.removeSignIsmg,
			querySignIsmgInfo: $api.querySignIsmgInfo,
			uploadSignIsmg: $api.uploadSignIsmg,
			commitUploadSignIsmg: $api.commitUploadSignIsmg,
			allData: [],
			mapShow: false, //显示无数据图片
			showNo: false,
			content3: IsmgName,
			totalCount: '0',
			signid: '',
			delName: '',
			fileId: '',
			data1: {
				"endDate": '',
				"startDate": '',
				"isEnabled": '',
				"offset": 1,
				"pageSize": 10,
				"signId": "",
				"signName": "",
				"srcId": ""
			},
			data2: {
				"ismgId": '',
				"fileId": '',
				"isEnabled": "",
				"digits": "",
			},
		};
	},
	mounted: function() {
		var $this = this;
		$this.addData($this.data1)
		// setTimeout(() => {
		layui.use(["form", "laypage", "upload"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			var upload = layui.upload;
			form.render();
			//完整功能
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 10) {
				$this.page()
			}
			//执行实例
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
					$.ajax({
						url: $this.uploadSignIsmg,
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
						error: function(data) {}
					})
				} else {
					//清空文件名
					$("#file").val("");
				}
			});
			//监听提交
			form.on("submit(demo)", function(data) {
				//  console.log(data.field);
				$this.data1 = data.field;
				var text = $(".unlike .dropdown-selected1").val();
				if(text == '') {
					$this.data1.signId = ''
				} else {
					if(verify_ism(IsmgName, $(".unlike .dropdown-selected1"), text)) {
						$this.data1.signId = $(".unlike .dropdown-selected1").attr('data');
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
				$this.addData($this.data1);
				var checks = $('td form input.radio');
				$.each(checks, function(i, n) {
					checks[i].checked = false
				});
				$("th form input[name='全选']")[0].checked = false;
				layui.use(["form"], function() {
					var form = layui.form;
					form.render();
				})
				return false;
			});
			form.on("submit(demo1)", function(data) {
				layer.open({
					//formType: 2,//这里依然指定类型是多行文本框，但是在下面content中也可绑定多行文本框
					title: '批量查询',
					value: '',
					area: ['360px', '240px'],
					btnAlign: 'c',
					closeBtn: 0, //右上角的关闭
					content: `<div><textarea name="txt_remark" id="remark" style="width:320px;height: 103px;border: 1px solid #999;padding: 10px;box-sizing: border-box;"></textarea></div>`,
					btn: ['确认', '取消'],
					yes: function(index, layero) {
						var value1 = $('#remark').val(); //获取多行文本框的值						
						layer.close(index);
						$.ajax({
							url: $this.batchQuerySignIsmgList,
							type: 'post',
							dataType: 'json',
							contentType: 'application/json',
							async: true,
							data: JSON.stringify({
								"signNameStr": value1,
								"offset": 1,
								"pageSize": 10,
							}),
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
								// console.log(res)
								$("#load").remove();
								if(res.statusCode == '401') {
									// localStorage.setItem('url', window.location.pathname)
									window.open("../../login.html", "_self");

								} else {
									$this.allData = res.data.data;
									if($this.allData == '') {
										$this.showNo = true
									} else {
										$this.showNo = false
									}
									$this.totalCount = res.data.totalCount;
									if(data1.offset == 1 && data1.pageSize == 10) {
										$this.page()
									}
									$(document).ready(function() {
										$("th form input[name='全选']")[0].checked = false;
										var checks = $('td form input.radio');
										$.each(checks, function(i, n) {
											checks[i].checked = false;
										});
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
							}
						});

					},
					btn2: function(index) {
						layer.close(index);
						$this.addData($this.data1)
						return false; //点击按钮按钮不想让弹层关闭就返回false

					},
					close: function(index) {
						layer.close(index);
						$this.addData($this.data1)
						return false; //点击按钮按钮不想让弹层关闭就返回false
					}
				});
				return false;
			});
			form.on("submit(demo2)", function(data) {
				$("#shade3").fadeIn(300);
				$(".shade_con3").fadeIn(300);
				var updata = {
					code: 3,
					Info: {
						"digits": "",
						'isEnabled': "",
						'ismgId': "",
						'ismgName': "",
						'signId': "",
						'signName': "",
						'srcId': ""
					}
				};
				bus.$emit("getAid", updata);
				return false;
			});
			//监听提交
			form.on("submit(demo5)", function(data) {
				$this.data2.isEnabled = data.field.isEnabled;
				$this.data2.digits = data.field.digits;
				var text = $(".unlike4 .dropdown-selected1").val();
				if(text == '') {
					layer.msg('请选择下拉框内容！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				} else {
					if(verify_ism(IsmgName, $(".unlike4 .dropdown-selected1"), text)) {
						$this.data2.ismgId = $(".unlike4 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				if($this.fileId == '') {
					layer.msg('请导入文件！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				}
				$this.data2.fileId = $this.fileId
				$.ajax({
					url: $this.commitUploadSignIsmg,
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
										cc: '1'
									};
									bus.$emit("getCc", updata);
									//window.open("../../html/resource/route_list.html", "_self");
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
						console.log(err);
					}
				});
				return false;
			});
		});

		// }, 100);
	},
	methods: {
		shade: function() {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
			var updata = {
				code: 0,
				Info: {
					"digits": "",
					'isEnabled': "",
					'ismgId': "",
					'ismgName': "",
					'signId': "",
					'signName': "",
					'srcId': ""
				}
			};
			bus.$emit("getAid", updata);
		},
		//导出
		importFile: function() {
			var $this = this;
			$this.data1.offset = 0;
			$this.data1.pageSize = 0;
			$this.data1.expTitle = '签名管理';
			$this.data1.exp = 'true';
			$.ajax({
				url: $this.querySignIsmgList,
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
		//分页
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
						$this.data1.offset = obj.curr;
						$this.data1.pageSize = obj.limit;
						if(first) {
							return
						} else {
							$this.addData($this.data1);
							$("th form input[name='全选']")[0].checked = false;
							var checks = $('td form input.radio');
							$.each(checks, function(i, n) {
								checks[i].checked = false;
							});
						}
					}
				});
			});

		},
		addData: function(data1) {
			var $this = this;
			$.ajax({
				url: $this.querySignIsmgList,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data1),
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
					// console.log(res)
					$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else {
						$this.allData = res.data.data;
						if($this.allData == '') {
							$this.showNo = true
						} else {
							$this.showNo = false
						}
						$this.totalCount = res.data.totalCount;
						if(data1.offset == 1 && data1.pageSize == 10) {
							$this.page()
						}
						$(document).ready(function() {
							$("th form input[name='全选']")[0].checked = false;
							var checks = $('td form input.radio');
							$.each(checks, function(i, n) {
								checks[i].checked = false;
							});
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
					$("#load").remove();
					console.log(err);
				}
			});
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
		shade_more: function() {
			$("#shade").fadeIn(300);
			$(".shade_con2").fadeIn(300);
		},
		extend: function() {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
			var updata = {
				code: 2,
				Info: {
					"digits": "",
					'isEnabled': "",
					'ismgId': "",
					'ismgName': "",
					'signId': "",
					'signName': "",
					'srcId': ""
				}
			};
			bus.$emit("getAid", updata);
		},
		del: function(val, name) {
			var $this = this;
			$this.delName = name;
			$this.signid = val;
			$("#shade2").fadeIn(300);
			$(".tips2").fadeIn(300);
		},
		shanchu: function() {
			var $this = this;
			$("#shade2").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			$("#file").val("");
			$(".unlike4 .dropdown-selected1").attr('data', '');
			$(".unlike4 .dropdown-selected1").val('');
			$("#isEnabled option[value='']").prop("selected", "selected");
			$this.fileId = '';
			$this.data2 = {
				"IsmgName": '',
				"fileId": '',
				"isEnabled": "",
				"digits": ""
			};
			setTimeout(function() {
				layui.use(["form", "laypage"], function() {
					var form = layui.form;
					var laypage = layui.laypage;
					form.render();
				});
			}, 50);
		},
		imports: function() {
			$("#shade2").fadeIn(300);
			$(".shade_con1").fadeIn(300);
		},
		amend: function(val) {
			var $this = this;
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
			$.ajax({
				url: $this.querySignIsmgInfo,
				type: 'post',
				async: false,
				data: {
					'signId': val
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//console.log(data);
					if(data.data.isUserExtend == 0) {
						var updata = {
							Info: data.data,
							code: 1,
						};
					} else {
						var updata = {
							Info: data.data,
							code: 4,
						};
					}

					//console.log(updata);
					// 将选中的ID放到触发器的盆子里，下面拿着用
					bus.$emit("getAid", updata);
				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		sw_btnsuss: function() {
			var $this = this;
			$.ajax({
				url: $this.removeSignIsmg,
				type: 'post',
				async: false,
				data: {
					'signId': $this.signid
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					// console.log(data);
					if(data.data == true) {
						layer.open({
							content: data.message,
							yes: function(index) {
								layer.close(index);
								$("#shade2").fadeOut(300);
								$(".tips2").fadeOut(300);
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

				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		sw_btnwrong: function() {
			$("#shade2").fadeOut(500);
			$(".tips2").fadeOut(500);
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
		bus.$on("getCc", function(updata) {
			//注意this指向问题
			$this.addData($this.data1)
		});

	},
});
//签名新增，修改
Vue.component("v-rate", {
	template: '#rate-template',
	data: function() {
		return {
			Info: [],
			createSignIsmg: $api.createSignIsmg,
			editSignIsmg: $api.editSignIsmg,
			mapShow: true, //显示无数据图片
			content2: IsmgName,
			userData1: UserName,
			code: 0,
			node: 0,
			signId: '',
			allData: []
		};
	},
	mounted: function() {
		var $this = this;
		// setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//监听提交
			form.on('select(isEnabled)', function(data) {
				//console.log(data.elem); //得到radio原始DOM对象
				//console.log(data.value); //被点击的radio的value值
				if(data.value == 4) {
					$('.digit').removeClass('dn')
				} else {
					$('.digit').addClass('dn')
				}

			});
			form.on("submit(demo6)", function(data) {
				var text = $(".unlike2 .dropdown-selected1").val();
				if(text == '') {
					data.field.ismgId = '';
				} else {
					if(verify_ism(IsmgName, $(".unlike2 .dropdown-selected1"), text)) {
						data.field.ismgId = $(".unlike2 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				if(data.field.isEnabled == 4) {

				} else {
					data.field.digits = ''
				}
				data.field.type = 0;
				$.ajax({
					url: $this.createSignIsmg,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//  console.log(data);
						if(data.statusCode == '200') {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
									var updata = {
										code: 0,
									};
									bus.$emit("getCc", updata);
								}
							});
						} else {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
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
			form.on("submit(demo7)", function(data) {
				var text = $(".unlike2 .dropdown-selected1").val();
				if(text == '') {
					data.field.ismgId = '';
				} else {
					if(verify_ism(IsmgName, $(".unlike2 .dropdown-selected1"), text)) {
						data.field.ismgId = $(".unlike2 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				var text1 = $(".unlike3 .dropdown-selected1").val();
				if(text1 == '') {
					data.field.signName = '';
				} else {
					if(verify_user1(UserName, $(".unlike3 .dropdown-selected1"), text1)) {
						data.field.signName = $(".unlike3 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				data.field.type = 1;
				$.ajax({
					url: $this.createSignIsmg,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//  console.log(data);
						if(data.data == true) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
									var updata = {
										code: 0,
									};
									bus.$emit("getCc", updata);
								}
							});
						} else {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
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
			form.on("submit(demo8)", function(data) {
				var text = $(".unlike2 .dropdown-selected1").val();
				if(text == '') {
					data.field.ismgId = '';
				} else {
					if(verify_ism(IsmgName, $(".unlike2 .dropdown-selected1"), text)) {
						data.field.ismgId = $(".unlike2 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				if(data.field.isEnabled == 4) {

				} else {
					data.field.digits = ''
				}
				data.field.type = 0;
				data.field.signId = $this.Info.signId;
				$.ajax({
					url: $this.editSignIsmg,
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
						if(data.data == true) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
									var updata = {
										code: 0,
									};
									bus.$emit("getCc", updata);
								}
							});
						} else {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
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
			form.on("submit(demo11)", function(data) {
				var text = $(".unlike2 .dropdown-selected1").val();
				if(text == '') {
					data.field.ismgId = '';
				} else {
					if(verify_ism(IsmgName, $(".unlike2 .dropdown-selected1"), text)) {
						data.field.ismgId = $(".unlike2 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				data.field.signName = $this.Info.signName.split('(')[1].split(')')[0];
				//if($('.unlike3 .dropdown-selected1').val() == ''){
				//    data.field.signName  = '';
				//}else{
				//    data.field.signName  = $('.unlike3 .dropdown-selected1').attr('data');
				//}
				data.field.type = 1;
				data.field.signId = $this.Info.signId;
				$.ajax({
					url: $this.editSignIsmg,
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
						if(data.data == true) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
									var updata = {
										code: 0,
									};
									bus.$emit("getCc", updata);
								}
							});
						} else {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu();
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
			form.on("submit(demo9)", function(data) {
				var checks = $('td form input.radio');
				var Array = []
				$.each(checks, function(i, n) {
					if(checks[i].checked == true) {
						Array.push($(checks[i]).attr('data') * 1)
					}
				});
				Array = Array.join(',')
				//				$.ajax({
				//					url: $this.editSignIsmg,
				//					type: 'post',
				//					dataType: 'json',
				//					contentType: 'application/json',
				//					async: false,
				//					data: JSON.stringify(data.field),
				//					headers: {
				//						"Authorization": id,
				//					},
				//					success: function(data) {
				//						// console.log(data);
				//						if(data.data == true) {
				//							layer.open({
				//								content: data.message,
				//								yes: function(index) {
				//									layer.close(index);
				//									window.open("../../html/resource/signature_manage.html", "_self");
				//								}
				//							});
				//						} else {
				//							layer.open({
				//								content: data.message,
				//								yes: function(index) {
				//									layer.close(index);
				//
				//								}
				//							});
				//						}
				//						if(data.statusCode == '401') {
				//							//localStorage.setItem('url', window.location.pathname)
				//							window.open("../../login.html", "_self");
				//						}
				//
				//					},
				//					error: function(err) {
				//						console.log(err);
				//					}
				//				});
				return false;
			});
		});
		//  }, 100);
	},
	methods: {
		shanchu: function() {
			var $this = this;
			$("#shade3").fadeOut(500);
			$(".shade_con3").fadeOut(500);
			// $this.content2 = [];
		},
		sw_btnwrong: function() {
			$("#shade3").fadeOut(500);
			$(".shade_con3").fadeOut(500);
		}
	},
	created: function() {
		var $this = this;

		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			//$this.content2 = IsmgName,
			//$this.userData1 = UserName,
			$this.code = updata.code;
			$this.Info = updata.Info;
			if($this.Info.isUserExtend == 1) {
				$this.signId = $this.Info.signName.split('(')[0];
			} else {
				$this.signId = '';
			}
			setTimeout(function() {
				$("#eventLevelThree option[value='" + $this.Info.isEnabled + "']").prop("selected", "selected");
				$("#eventLevelHour option[value='" + $this.Info.isEnabled + "']").prop("selected", "selected");
				$('.unlike2 .dropdown-selected1').val($this.Info.ismgName)
				$('.unlike3 .dropdown-selected1').val($this.signId)
				if($this.Info.signName == '') {
					$('.layui-inline .signName').attr("disabled", false).css('background', ' #fff');
				} else {
					$('.layui-inline .signName').attr("disabled", true).css('background', ' #ECECEC');
				}
				if($this.code == 2 || $this.code == 4) {
					$('.digit').removeClass('dn')
				} else if($this.code == 1 && $this.Info.isEnabled == 4) {
					$('.digit').removeClass('dn')
				} else {
					$('.digit').addClass('dn')
				}
				total($(".unlike2 ul li"), $(".unlike2 .dropdown-selected1"), $(".unlike2 ul"), $(".unlike2"));
				total($(".unlike3 ul li"), $(".unlike3 .dropdown-selected1"), $(".unlike3 ul"), $(".unlike3"));
				layui.use(["form", "laypage"], function() {
					var form = layui.form;
					var laypage = layui.laypage;
					form.render();
				});
			}, 50);
		});
	},
});
//下单限速新增修改
Vue.component("v-manage", {
	template: '#manage-template',
	data: function() {
		return {
			sellerid: "",
			createMultipleSignIsmg: $api.createMultipleSignIsmg,
			mapShow: true, //显示无数据图片
			code: 0,
			data2: {
				"createSignIsmgStr": '',
				"isEnabled": ''
			},
			content3: IsmgName,
		};
	},
	mounted: function() {
		var $this = this;
		// setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//监听提交
			form.on("submit(demo10)", function(data) {
				var text = $(".unlike5 .dropdown-selected1").val();
				if(text == '') {
					data.field.ismgId = '';
				} else {
					if(verify_ism(IsmgName, $(".unlike5 .dropdown-selected1"), text)) {
						data.field.ismgId = $(".unlike5 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				data.field.type = 0;
				//console.log(data.field)
				$.ajax({
					url: $this.createMultipleSignIsmg,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//  console.log(data);
						if(data.data == true) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu()
									var updata = {
										code: 0,
									};
									bus.$emit("getCc", updata);
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
			var $this = this;
			$("#shade").fadeOut(500);
			$(".shade_con2").fadeOut(500);
			$("#isEnabled option[value='" + $this.data2.isEnabled + "']").prop("selected", "selected");
			$(".unlike5 .dropdown-selected1").attr('data', '');
			$(".unlike5 .dropdown-selected1").val('');
			$this.data2.createSignIsmgStr = '';
			layui.use(["form", "laypage"], function() {
				var form = layui.form;
				var laypage = layui.laypage;
				form.render();
			});
		},
		sw_btnwrong: function() {
			$("#shade3").fadeOut(500);
			$(".shade_con3").fadeOut(500);
		}
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.code = updata.code;
			// setTimeout(() => {
			layui.use(["form", "laypage"], function() {
				var form = layui.form;
				var laypage = layui.laypage;
				form.render();
			});
			//  }, 50);
		});
	},
});