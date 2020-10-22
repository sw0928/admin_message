/**
 * Created by Administrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var id = $api.localStorageId;
//组件通信
var UserName = null,province = null;
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
	url: $api.queryLocation,
	type: 'post',
	dataType: 'json',
	contentType: 'application/json',
	async: false,
	data: JSON.stringify({}),
	headers: {
		"Authorization": id,
	},
	success: function(data) {
		//console.log(data);
		province = data.data;
	},
	error: function(err) {
		console.log(err);
	}
});
var bus = new Vue();
if(show_button(2131110)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-signature", {
	template: '#signature-template',
	data: function() {
		return {
			queryIsmgName: $api.queryIsmgName,
			allData: [],
			totalCount: '0',
			signId: '',
			review: '',
			mapShow: true, //显示无数据图片
			loginName: '',
			review: '',
			signName: '',
			userData: UserName,
			orderRuleList: $api.orderRuleList,
			deleteRule: $api.deleteRule,
			managementStatus: $api.managementStatus,
			data1: {
				"orderRuleName": "",
				"userId": "",
				"offset": 1,
				"pageSize": 10,
			},
			info: {
				'amountAnd': "",
				'amountBetween': "",
				'enableBadWordPause': "1",
				'enableMtZ': "1",
				'enableNeedValidate': "1",
				'isEnabled': "1",
				'matchProirity': "",
				'mtZPctMax': "",
				'mtZPctMin': "",
				'orderRuleName': "",
				'orderType': "1000",
				'typeId': "",
				'userId': "",
				'zByPrice': "",
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
			//监听提交
			form.on("submit(demo5)", function(data) {
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
				$this.data1.orderRuleName = data.field.orderRuleName.trim();
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

						}
					}
				});
			});

		},
		copy: function() {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);			
		},
		dispose: function() {
			$("#shade4").fadeIn(300);
			$(".shade_con4").fadeIn(300);			
		},
		//添加
		shade: function() {
			var $this = this;
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			var updata = {
				Info: $this.info,
				code: 0,
				node:0
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAid", updata);
		},
		//修改
		amend: function(val) {
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			var updata = {
				Info: val,
				code: 1,
				node:0
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAid", updata);
		},
		//复制添加
		duplicate: function(val) {
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			var updata = {
				Info: val,
				code: 1,
				node:1
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAid", updata);
		},
		include_home: function(val,num) {
			$("#shade1").fadeIn(300);
			$(".shade_con1").fadeIn(300);
			var updata = {
				Info: val,
				userId:num,
				code: 0
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getBB", updata);
		},
		un_include_home: function(val,num) {
			$("#shade1").fadeIn(300);
			$(".shade_con1").fadeIn(300);
			var updata = {
				Info: val,
				userId:num,
				code: 1
			};
			bus.$emit("getBB", updata);
		},
		include_keywords: function(val) {
			$("#shade2").fadeIn(300);
			$(".shade_con2").fadeIn(300);
			var updata = {
				Info: val,
				code: 0
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getCC", updata);
		},
		un_include_keywords: function(val) {
			$("#shade2").fadeIn(300);
			$(".shade_con2").fadeIn(300);
			var updata = {
				Info: val,
				code: 1
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getCC", updata);
		},
		//删除
		del: function(val,name) {
			var $this = this;
			layer.open({
				content: '您确认执行('+ name +')删除操作么？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.deleteRule,
						type: 'post',
						async: false,
						dataType: 'json',
						 //contentType: 'application/json',
						data: {
							"orderRuleId": val,
						},
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addData($this.data1);
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
		//查看审核
		examine: function() {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
		},
		//添加数据
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.orderRuleList,
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
						if(data.offset == 1 && data.pageSize == 10) {
							$this.page()
						}
						$(document).ready(function() {
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
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAA", function(updata) {
			//注意this指向问题
			$this.addData($this.data1)

		});
	},
});
/*申请签名*/
Vue.component("v-template-signature", {
	template: '#shade-template',
	data: function() {
		return {
			num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			createRule: $api.createRule,
			updateRule: $api.updateRule,
			IsmgInfo: $api.IsmgInfo,
			field: null,
			content: ['短信移动成功计费', '短信联通成功计费', '短信电信成功计费', '短信移动提交计费', '短信联通提交计费', '短信电信提交计费',
				'彩信移动成功计费', '彩信联通成功计费', '彩信电信成功计费', '彩信联通提交计费', '彩信电信提交计费', 'USSD弹屏成功计费',
				'语音成功计费', '国际短信成功计费'
			],
			blocTrade: null,
			code: 0,
			node:0,
			orderRuleId: '',
			message: '',
			info:{},
			userData1: UserName,
			mapShow: true //显示无数据图片
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
			form.on("submit(demo8)", function(data) {
				$.ajax({
					url: $this.createRule,
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
										$this.shanchu()
										var updata = {
											code: 0,
										};
										bus.$emit("getAA", updata);
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
			form.on("submit(demo9)", function(data) {
				data.field.orderRuleId = $this.orderRuleId;
				$.ajax({
					url: $this.updateRule,
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
										$this.shanchu()
										var updata = {
											code: 0,
										};
										bus.$emit("getAA", updata);
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
			form.on("submit(demo12)", function(data) {
				$.ajax({
					url: $this.createRule,
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
										$this.shanchu()
										var updata = {
											code: 0,
										};
										bus.$emit("getAA", updata);
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

		//  }, 100);
	},
	methods: {
		shanchu: function() {
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},
		close: function() {
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.code = updata.code;
			$this.info = updata.Info;
			$this.node = updata.node;
			$this.orderRuleId = $this.info.orderRuleId
			//console.log($this.info)
			setTimeout(function() {
				$("#userId option[value='" + $this.info.userId + "']").prop("selected", "selected");
				$("#orderType option[value='" + $this.info.orderType + "']").prop("selected", "selected");
				$("#typeId option[value='" + $this.info.typeId + "']").prop("selected", "selected");
				$("#isEnabled option[value='" + $this.info.isEnabled + "']").prop("selected", "selected");
				$("#enableMtZ option[value='" + $this.info.enableMtZ + "']").prop("selected", "selected");
				$("#enableBadWordPause option[value='" + $this.info.enableBadWordPause + "']").prop("selected", "selected");
				$("#enableNeedValidate option[value='" + $this.info.enableNeedValidate + "']").prop("selected", "selected");
				
				layui.use("form", function() {
					var form = layui.form;
					form.render();
				})
			}, 50);
		});
	},
});
Vue.component("v-rate", {
	template: '#rate-template',
	data: function() {
		return {
			queryProvince: $api.queryProvince,
			queryOperator: $api.queryOperator,
			addProvince: $api.addProvince,
			deleteProvince: $api.deleteProvince,
			mapShow: true, //显示无数据图片
			code: 0,
			totalCount:0,
			userData1: province,
			data1: {
				"province": "",
			},
			data2: {
				"orderRuleId": "",
				"state": "",
				"offset": 1,
				"pageSize": 5,
			},
			data3:{
				"orderRuleId": "",
				"province": "",
				"operator": "",
				"userId": "",
				"state": ""
			},
			allData1:[],
			operatorData:[],
			mapShow1:true,
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
			form.on('select(province)', function(data){
			 // console.log(data.value); //得到被选中的值
			  $this.data1.province = data.value
			  $this.addData($this.data1);
			});      
			form.on("submit(demo6)", function(data) {
				$this.data3.province = data.field.province;
				$this.data3.operator = data.field.operator;
				$this.data3.state = $this.code == 0? '0':'1';
				$.ajax({
					url: $this.addProvince,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.data3),
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
										$this.data2.offset = 1;
				            $this.data2.pageSize = 5;
										$this.addDataA($this.data2)
//										$this.shanchu()
//										var updata = {
//											code: 0,
//										};
//										bus.$emit("getAA", updata);
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
		shanchu: function() {
			var $this = this;
			$("#shade1").fadeOut(300);
			$(".shade_con1").fadeOut(300);
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
						$this.data2.offset = obj.curr;
						$this.data2.pageSize = 5;
						if(first) {
							return
						} else {
							$this.addDataA($this.data2)
						}
					}
				});
			});

		},
		//联动
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryOperator,
				type: 'post',
				dataType: 'json',
				//contentType: 'application/json',
				async: true,
				data: data,
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					 //console.log(res.data);
					if(res.statusCode == '401') {
						// localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");
					} else {
						$this.operatorData = res.data;
						setTimeout(function() {							
							layui.use("form", function() {
								var form = layui.form;
								form.render();
							})
						}, 50);
//						if($this.allData1 == '') {
//							$this.mapShow1 = true
//						} else {
//							$this.mapShow1 = false
//						}
					}

				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},
	//加载数据
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryProvince,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					 //console.log(res.data.data);
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
    //删除
		delProvince: function(val) {
			var $this = this;
			layer.open({
				content: '您确认执行删除操作么？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.deleteProvince,
						type: 'post',
						async: false,
						dataType: 'json',
						 //contentType: 'application/json',
						data: {
							"locationRuleId": val,
						},
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addDataA($this.data2)
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

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getBB", function(updata) {
			//注意this指向问题
			$this.code = updata.code;			
			$this.data2.orderRuleId = updata.Info;
			$this.data3.orderRuleId = updata.Info;
			$this.data3.userId = updata.userId;
			$this.data2.offset = 1;
			$this.data2.pageSize = 5;
			if($this.code == 0){
				$this.data2.state = 0
			}else{
				$this.data2.state = 1
			}
			$this.addDataA($this.data2)
			$("#province option[value='']").prop("selected", "selected");
			$("#operator option[value='']").prop("selected", "selected");
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});

Vue.component("v-operator", {
	template: '#operator-template',
	data: function() {
		return {
			queryWord: $api.queryWord,
			addWord: $api.addWord,
			deleteWord: $api.deleteWord,
			mapShow: true, //显示无数据图片
			code: 0,
			data2: {
				"orderRuleId": "",
				"state": "",
				"offset": 1,
				"pageSize": 5,
			},
			data3:{
				"orderRuleId": "",
				"word": "",
				"state": ""
			},
			allData1:[],
			mapShow1:true,
			info: {

			}
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
				$this.data3.word = data.field.word;
				$this.data3.state = $this.code == 0? '0':'1';
				$.ajax({
					url: $this.addWord,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.data3),
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
										$this.data2.offset = 1;
				            $this.data2.pageSize = 5;
										$this.addDataA($this.data2)
//										$this.shanchu()
//										var updata = {
//											code: 0,
//										};
//										bus.$emit("getAA", updata);
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
		shanchu: function() {
			$("#shade2").fadeOut(300);
			$(".shade_con2").fadeOut(300);
		},
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
						$this.data2.offset = obj.curr;
						$this.data2.pageSize = 5;
						if(first) {
							return
						} else {
							$this.addDataA($this.data2)
						}
					}
				});
			});

		},
		//加载数据
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryWord,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
				//	 console.log(res.data.data);
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
    //删除
		delWord: function(val) {
			var $this = this;
			layer.open({
				content: '您确认执行删除操作么？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.deleteWord,
						type: 'post',
						async: false,
						dataType: 'json',
						 //contentType: 'application/json',
						data: {
							"wordRuleId": val,
						},
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.addDataA($this.data2)
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
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getCC", function(updata) {
			//注意this指向问题
			$this.code = updata.code;
			$this.data2.orderRuleId = updata.Info;
			$this.data3.orderRuleId = updata.Info;
			$this.data3.word = '';
			$this.data2.offset = 1;
			$this.data2.pageSize = 5;
			if($this.code == 0){
				$this.data2.state = 0
			}else{
				$this.data2.state = 1
			}
			$this.addDataA($this.data2)
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});
Vue.component("v-copy", {
	template: '#copy-template',
	data: function() {
		return {
			copyRulesByUser: $api.copyRulesByUser,
			queryBadWordInfo: $api.queryBadWordInfo,
			orderRuleList: $api.orderRuleList,
			mapShow: true, //显示无数据图片
			code: 0,
			userData1: UserName,
			allData1:[],
			totalCount:0,
			data1: {
				"orderRuleName": "",
				"userId": "",
				"offset": 1,
				"pageSize": 5,
			},
			mapShow1:true,
			info: {

			}
		};
	},
	mounted: function() {
		var $this = this;
		// setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			 $this.page()
			//监听提交
			form.on('select(copy_user)', function(data){
			 // console.log(data.value); //得到被选中的值
			  $this.data1.userId = data.value;
			  $this.data1.offset = 1;
			  $this.data1.pageSize = 5;
			  $this.addData($this.data1);
			});
			form.on("submit(demo11)", function(data) {
				$.ajax({
					url: $this.copyRulesByUser,
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
										$this.shanchu()
										var updata = {
											code: 0,
										};
										bus.$emit("getAA", updata);
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
		shanchu: function() {
			var $this= this;
			$("#shade3").fadeOut(300);
			$(".shade_con3").fadeOut(300);
			$("#sourceUserId option[value='']").prop("selected", "selected");
			$("#targetUserId option[value='']").prop("selected", "selected");
			$this.allData1 = [];
			$this.mapShow1 = true;
			$this.totalCount = 0;
			$this.page()
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		},
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
							$this.addData($this.data1);
						}
					}
				});
			});

		},
		//添加数据
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.orderRuleList,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					 //console.log(res);
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
		}
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
//		bus.$on("getCC", function(updata) {
//			//注意this指向问题
//			$this.code = updata.code;
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
//		});
	},
});
Vue.component("v-dispose", {
	template: '#dispose-template',
	data: function() {
		return {
			queryOverallSituation: $api.queryOverallSituation,
			updateOverallSituationState: $api.updateOverallSituationState,
			createPhoneOperator: $api.createPhoneOperator,
			mapShow: true, //显示无数据图片
			code: 0,
			userData1: UserName,
			allData1:[],
			mapShow1:true,
			data1: {

			}
		};
	},
	mounted: function() {
		var $this = this;
		$this.addData($this.data1);
		// setTimeout(() => {
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
			$("#shade4").fadeOut(300);
			$(".shade_con4").fadeOut(300);
		},
		amend_dispose: function(name) {
			var $this = this;
			layer.open({
						//formType: 2,//这里依然指定类型是多行文本框，但是在下面content中也可绑定多行文本框
						title: '修改配置',
						value: '',
						area: ['280px', '170px'],
						btnAlign: 'c',
						closeBtn: 0, //右上角的关闭
					//	content: `<div><input name="txt_remark" id="remark" style="width:240px;height: 40px;border: 1px solid #999;padding: 10px;box-sizing: border-box;"></input></div>`,
						content: `<div><select name="state" id="state" style="width:240px;height: 35px;padding:5px;box-sizing: border-box;"><option value="0">开启</option><option value="1">关闭</option></select></div>`,
						btn: ['确认', '取消'],
						yes: function(index, layero) {
							var value1 = $('#state').val(); //获取多行文本框的值		
							$.ajax({
									url: $this.updateOverallSituationState,
									type: 'post',
									async: false,
									dataType: 'json',
									contentType: 'application/json',
									data: JSON.stringify({
										"parName":name,
										"state": value1
									}),
									headers: {
										"Authorization": id,
									},
									success: function(res) {
										layer.open({
											content: res.message,
											yes: function(index) {
												layer.close(index);
												$this.addData($this.data1)
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
						btn2: function(index) {
							layer.close(index);
							$this.addData($this.data1)
							return false; //点击按钮按钮不想让弹层关闭就返回false

						},			
						close:function(index)
						{
						layer.close(index);
						$this.addData($this.data1)
						return false;//点击按钮按钮不想让弹层关闭就返回false
						}
					});		
		},
		//添加数据
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryOverallSituation,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					 //console.log(res);
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
		bus.$on("getCC", function(updata) {
			//注意this指向问题
			$this.code = updata.code;
			$this.info = updata.Info
			$("#eventLevelThree option[value='" + $this.info.operator + "']").prop("selected", "selected");
			if($this.info.telHead == "") {
				$('.layui-inline .telHeadTwo').attr("disabled", false).css('background', ' #fff');
			} else {
				$('.layui-inline .telHeadTwo').attr("disabled", true).css('background', ' #ECECEC');
			}
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			});
		});
	},
});