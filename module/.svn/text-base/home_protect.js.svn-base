/**
 * Created by Administrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var id = $api.localStorageId;
var UserName = null;
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
//组件通信
var bus = new Vue();
if(show_button(2131013)) {

} else {
	window.open("../../login.html", "_self");
}
Vue.component("v-signature", {
	template: '#signature-template',
	data: function() {
		return {
			allData: [],
			totalCount: '0',
			mapShow: true, //显示无数据图片
			code: 0,
			querySignProtect: $api.querySignProtect,
			queryLocationProtect: $api.queryLocationProtect,
			deleteLocationProtect: $api.deleteLocationProtect,
			data1: {
				"userId": "",
				"province": "",
				"signName": '',
				"operator": '',
				"offset": 1,
				"pageSize": 10,
			},
			userData: UserName,
			data3: {
				"userId": "",
				"province": "",
				"operator": '',
				"offset": 1,
				"pageSize": 10,
			},
			showNo: false
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

			if($this.data3.offset !== 1 || $this.data3.pageSize !== 10) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo1)", function(data) {
				var text = $(".unlike1 .dropdown-selected1").val();
				if(text == '') {
					$this.data1.userId = ''
				} else {
					if(verify_user1($this.userData, $(".unlike1 .dropdown-selected1"), text)) {
						$this.data1.userId = $(".unlike1 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data1.operator = data.field.operator;
				$this.data1.province = data.field.province;
				$this.data1.signName = data.field.signName;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
				return false;
			});
			form.on("submit(demo3)", function(data) {
				var text1 = $(".unlike2 .dropdown-selected1").val();
				if(text1 == '') {
					$this.data3.userId = ''
				} else {
					if(verify_user1($this.userData, $(".unlike2 .dropdown-selected1"), text1)) {
						$this.data3.userId = $(".unlike2 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data3.operator = data.field.operatorT;
				$this.data3.province = data.field.provinceT;
				$this.data3.offset = 1;
				$this.data3.pageSize = 10;
				$this.addDataB($this.data3)
				return false;
			});
		});
		$('.table_tou h6').on('click', function() {
			$(this).addClass('addClass2').siblings().removeClass('addClass2')
			if($(this).text() == '签名归属地保护') {
				$this.code = 0;
				$('.table_nav  form .list3').addClass('dn');
				$('.table_nav  form .list').removeClass('dn');
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
			} else {
				$this.code = 2
				$('.table_nav  form .list').addClass('dn')
				$('.table_nav  form .list3').removeClass('dn');
				$this.data3.offset = 1;
				$this.data3.pageSize = 10;
				$this.addDataB($this.data3);
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

						if(first) {
							return
						} else {
							if($this.code == 0) {
								$this.data1.offset = obj.curr;
								$this.data1.pageSize = obj.limit;
								$this.addData($this.data1);
							} else {
								$this.data3.offset = obj.curr;
								$this.data3.pageSize = obj.limit;
								$this.addDataB($this.data3);
							}

						}
					}
				});
			});

		},
		//申请签名
		shade: function() {
			var $this = this;
			if($this.code == 0) {
				$("#shade").fadeIn(300);
				$(".shade_con").fadeIn(300);
				var updata = {
					Info: {
						"province": "",
						"operator": "中国移动",
						"locationId": "",
					},
					node: 0
				};
				//console.log(updata);
				// 将选中的ID放到触发器的盆子里，下面拿着用
				bus.$emit("getAa", updata);
			} else if($this.code == 2) {
				$("#shade2").fadeIn(300);
				$(".shade_con2").fadeIn(300);
				var updata = {
					Info: {
						"operatorVector": "",
						"operator": "中国移动",
						"telHead": ''
					},
					node: 0
				};
				bus.$emit("getCc", updata);
			}

		},
		//导出
		importFile: function() {
			var $this = this;
			$this.data1.offset = 0;
			$this.data1.pageSize = 0;
			$this.data1.expTitle = '网关发送情况列表';
			$this.data1.exp = 'true';
			$.ajax({
				url: $this.networkSendList,
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
		////删除
		del: function(val) {
			var $this = this;
			layer.open({
				content: '确认删除该归属地保护吗？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.deleteLocationProtect,
						type: 'post',
						async: false,
						dataType: 'json',
						 contentType: 'application/json',
						data: JSON.stringify({
							"locationRuleId": val,
							"state": 0,
						}),
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addDataB($this.data3);
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
		////删除全部
		delAll: function(val) {
			var $this = this;
			layer.open({
				content: '确认删除全部归属地保护吗？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.deleteLocationProtect,
						type: 'post',
						async: false,
						dataType: 'json',
					  contentType: 'application/json',
						data: JSON.stringify({
							"locationRuleId": val,
							"state": 1,
						}),
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addDataB($this.data3);
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
		//添加数据
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.querySignProtect,
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
					$this.allData = [];
					$this.totalCount = 0;
					$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.allData = res.data.data;
						if($this.allData.length == 0) {
							$this.showNo = true
						} else {
							$this.showNo = false
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
		},
		addDataB: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryLocationProtect,
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
					$this.allData = [];
					$this.totalCount = 0;
					$("#load").remove();
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						if(res.data == null) {
							$this.showNo = true
						} else {
							$this.allData = res.data.data;
							if($this.allData.length == 0) {
								$this.showNo = true
							} else {
								$this.showNo = false
							}
							$this.totalCount = res.data.totalCount;
							if(data.offset == 1 && data.pageSize == 10) {
								$this.page()
							}
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
		bus.$on("getDd", function(updata) {
			//注意this指向问题
			$this.code = updata.code;
			if($this.code == 0) {
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
			}else if($this.code == 2) {
				$this.data3.offset = 1;
				$this.data3.pageSize = 10;
				$this.addDataB($this.data3)
			}
		});
	},
});
/*申请签名*/
Vue.component("v-rate", {
	template: '#rate-template',
	data: function() {
		return {
			addSignProtect: $api.addSignProtect,
			previewLastSend: $api.previewLastSend,
			mapShow: true, //显示无数据图片
			node: 0,
			userData1: UserName,
			data1: {
				"province": "",
				"userId": "",
				"signName": "",
			},
			data2: {
				"province": "",
				"userId": "",
			},
			allData1: [],
			mapShow1: true,
			info: {}
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
			form.on("submit(demo6)", function(data) {
				var text2 = $(".unlike3 .dropdown-selected1").val();
				if(text2 == '') {
					$this.data1.userId = ''
				} else {
					if(verify_user1($this.userData1, $(".unlike3 .dropdown-selected1"), text2)) {
						$this.data1.userId = $(".unlike3 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data1.province = data.field.province;
				$this.data1.signName = data.field.signName;
				$.ajax({
					url: $this.addSignProtect,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.data1),
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
										$this.shanchu()
										var updata = {
											code: 0,
										};
										bus.$emit("getDd", updata);
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
			form.on("submit(demo7)", function(data) {
				var text3 = $(".unlike3 .dropdown-selected1").val();
				if(text3 == '') {
					$this.data2.userId = ''
				} else {
					if(verify_user1($this.userData1, $(".unlike3 .dropdown-selected1"), text3)) {
						$this.data2.userId = $(".unlike3 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data2.province = data.field.province;
				$.ajax({
					url: $this.previewLastSend,
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
								$this.allData1 = data.data.data;
								if($this.allData1.length == 0) {
									$this.mapShow1 = true
								} else {
									$this.mapShow1 = false
								}
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
		shanchu: function() {
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
//		bus.$on("getAa", function(updata) {
//			//注意this指向问题
//			$this.node = updata.node;
//			$this.info = updata.Info
//			$("#eventLevelOne option[value='" + $this.info.operator + "']").prop("selected", "selected");
//			if($this.info.locationId == "") {
//				$('.layui-inline .locationId').attr("disabled", false).css('background', ' #fff');
//			} else {
//				$('.layui-inline .locationId').attr("disabled", true).css('background', ' #ECECEC');
//			}
//			layui.use("form", function() {
//				var form = layui.form;
//				form.render();
//			});
//		});
	},
});

Vue.component("v-operator", {
	template: '#operator-template',
	data: function() {
		return {
			addLocationProtect: $api.addLocationProtect,
			previewLastSend: $api.previewLastSend,
			createPhoneOperator: $api.createPhoneOperator,
			mapShow: true, //显示无数据图片
			node: 0,
			userData1: UserName,
			allData1: [],
			mapShow1: true,
			data1: {
				"province": "",
				"userId": "",
			},
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
				var text2 = $(".unlike4 .dropdown-selected1").val();
				if(text2 == '') {
					$this.data1.userId = ''
				} else {
					if(verify_user1($this.userData1, $(".unlike4 .dropdown-selected1"), text2)) {
						$this.data1.userId = $(".unlike4 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data1.province = data.field.province;
				$.ajax({
					url: $this.addLocationProtect,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.data1),
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
										$this.shanchu()
										var updata = {
											code: 2,
										};
										bus.$emit("getDd", updata);
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
			form.on("submit(demo11)", function(data) {
				var text3 = $(".unlike4 .dropdown-selected1").val();
				if(text3 == '') {
					$this.data1.userId = ''
				} else {
					if(verify_user1($this.userData1, $(".unlike4 .dropdown-selected1"), text3)) {
						$this.data1.userId = $(".unlike4 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data1.province = data.field.province;
				$.ajax({
					url: $this.previewLastSend,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.data1),
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
								$this.allData1 = data.data.data;
								if($this.allData1.length == 0) {
									$this.mapShow1 = true
								} else {
									$this.mapShow1 = false
								}
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
		shanchu: function() {
			$("#shade2").fadeOut(300);
			$(".shade_con2").fadeOut(300);
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getCc", function(updata) {
			//注意this指向问题
//			$this.node = updata.node;
//			$this.info = updata.Info
//			$("#eventLevelThree option[value='" + $this.info.operator + "']").prop("selected", "selected");
//			if($this.info.telHead == "") {
//				$('.layui-inline .telHeadTwo').attr("disabled", false).css('background', ' #fff');
//			} else {
//				$('.layui-inline .telHeadTwo').attr("disabled", true).css('background', ' #ECECEC');
//			}
//			layui.use("form", function() {
//				var form = layui.form;
//				form.render();
//			});
		});
	},
});
