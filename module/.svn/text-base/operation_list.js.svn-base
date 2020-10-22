/*运维列表*/
var id = $api.localStorageId;
var signName = localStorage.getItem('loginName');
//运维用户
var bus = new Vue();
if(show_button(21111)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-operation-list", {
	template: '#operation-template',
	data: function() {
		return {
			url: $api.queryOperationList,
			queryUserInfo: $api.queryUserInfo,
			removeUser: $api.removeUser,
			resetPassword: $api.resetPassword,
			changeMfaState: $api.changeMfaState,
			allData: null,
			loginName: '',
			signName: signName,
			pass: '',
			data1: {
				"loginName": '',
				"accountType": '',
				"offset": 1,
				"pageSize": 10,
			},
			Info: {
				loginName: "",
				userName: '',
				accountType: "",
				accountStatus: '',
				city: "",
				company: "",
				email: "",
				province: "",
				lastLoginIp: "",
				lastLoginTime: "",
				mobilePhone: "",
				department: ""
			},
			mapShow: true, //显示无数据图片
			totalCount: '0',
			showNo: false,
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
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 10) {
				$this.page()
			}

			//监听提交
			form.on('switch(yyy)', function(data) {
				//console.log(data.elem.checked); //开关是否开启，true或者false			 
				if(data.elem.checked == true) {
					layer.open({
						//formType: 2,//这里依然指定类型是多行文本框，但是在下面content中也可绑定多行文本框
						title: '动态验证码',
						value: '',
						area: ['280px', '170px'],
						btnAlign: 'c',
						closeBtn: 0, //右上角的关闭
						content: `<div><input name="txt_remark" id="remark" style="width:240px;height: 40px;border: 1px solid #999;padding: 10px;box-sizing: border-box;"></input></div>`,
						btn: ['确认', '取消'],
						yes: function(index, layero) {
							var value1 = $('#remark').val(); //获取多行文本框的值						
							layer.close(index);
							$.ajax({
							url: $this.changeMfaState,
							type: 'post',
							async: false,
							dataType: 'json',
							contentType: 'application/json',
							data: JSON.stringify({
								"userId": data.value,
								"code": value1,
								"mfaState": 1
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
				} else {
					layer.open({
						//formType: 2,//这里依然指定类型是多行文本框，但是在下面content中也可绑定多行文本框
						title: '动态验证码?',
						value: '',
						area: ['280px', '170px'],
						btnAlign: 'c',
						closeBtn: 0, //右上角的关闭
						content: `<div><input name="txt_remark" id="remark" style="width:240px;height: 40px;border: 1px solid #999;padding: 10px;box-sizing: border-box;"></input></div>`,
						btn: ['确认', '取消'],
						yes: function(index, layero) {
							var value2 = $('#remark').val(); //获取多行文本框的值						
							layer.close(index);
							$.ajax({
							url: $this.changeMfaState,
							type: 'post',
							async: false,
							dataType: 'json',
							contentType: 'application/json',
							data: JSON.stringify({
								"userId": data.value,
								"code": value2,
								"mfaState": 0
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
				}
			});

			form.on("submit(demo5)", function(data) {
				//console.log(JSON.stringify(data.field));
				$this.data1.loginName = data.field.loginName.trim();
				$this.data1.accountType = data.field.accountType;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1);
				//$this.page()
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
						//console.log(obj);
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
		//新增
		shade: function() {
			var $this = this;
			$("#shade3").fadeIn(500);
			$(".shade_con3").fadeIn(500);
			var updata = {
				Info: {
					loginName: "",
					userName: '',
					accountType: "",
					accountStatus: '',
					city: "",
					company: "",
					email: "",
					lastLoginIp: "",
					lastLoginTime: "",
					mobilePhone: "",
					createrName: ""
				},
				code: '0'
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAid", updata);
		},
		//修改
		amend: function(name) {
			var $this = this;
			$("#shade3").fadeIn(500);
			$(".shade_con3").fadeIn(500);
			$.ajax({
				url: $this.queryUserInfo,
				type: 'post',
				async: false,
				data: {
					'loginName': name
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//console.log(data);
					$this.Info.loginName = data.data.loginName;
					$this.Info.userName = data.data.userName;
					$this.Info.accountType = data.data.accountType;
					$this.Info.accountStatus = data.data.accountStatus;
					$this.Info.city = data.data.city;
					$this.Info.company = data.data.company;
					$this.Info.email = data.data.email;
					$this.Info.province = data.data.province;
					$this.Info.lastLoginIp = data.data.lastLoginIp;
					$this.Info.lastLoginTime = data.data.lastLoginTime;
					$this.Info.mobilePhone = data.data.mobilePhone;
					$this.Info.department = data.data.department;
					// $this.allData = data.data.data;
					//console.log($this.allData);
					// $this.totalCount = data.data.totalCount
					var updata = {
						Info: $this.Info,
						code: '1'
					};
					//console.log(updata);
					// 将选中的ID放到触发器的盆子里，下面拿着用
					bus.$emit("getAid", updata);
				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		//重置
		reset: function(name) {
			var $this = this;
			$("#shade2").fadeIn(500);
			$(".tips2").fadeIn(500);
			$this.loginName = name;
			$this.mapShow = false
		},
		//删除
		del: function(name) {
			var $this = this;
			$this.loginName = name;
			$("#shade2").fadeIn(500);
			$(".tips2").fadeIn(500);
			$this.mapShow = true
		},
		//取消
		sw_btnwrong: function() {
			$("#shade2").fadeOut(500);
			$(".tips2").fadeOut(500);
		},
		//刪除接口
		remove: function() {
			var $this = this;
			$.ajax({
				url: $this.removeUser,
				type: 'post',
				async: false,
				data: {
					"loginName": $this.loginName
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					// console.log(data);
					//window.open("/html/workbench/template.html", "_self");
					//$this.allData = data.data.data;
					// console.log($this.allData);
					// $this.totalCount = data.data.totalCount
				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		//重置密碼接口
		Password: function() {
			var $this = this;
			$.ajax({
				url: $this.resetPassword,
				type: 'post',
				async: false,
				data: {
					"loginName": $this.loginName
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//   console.log(data);
					$this.pass = data.data;
					//window.open("../html/workbench/template.html", "_self");
					//$this.allData = data.data.data;
					// console.log($this.allData);
					// $this.totalCount = data.data.totalCount
				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		//确定
		sw_btnsuss: function() {
			var $this = this;
			$(".tips2").fadeOut(500);
			$(".tips_chid2").fadeIn(500);
			if($this.mapShow) {
				$this.remove()
			} else {
				$this.Password()
			}
		},
		//二级弹框确认
		sw_qued: function() {
			var $this = this;
			$(".tips2").fadeOut(500);
			$(".tips_chid2").fadeOut(500);
			$("#shade2").fadeOut(500);
			$this.addData($this.data1)
			//window.open("../html/user_manage/operation_list.html", "_self");
		},
		//查看审核li.loginName,li.userName,li.accountStatus,li.accountType
		manage: function(event, id, loginName, userName, accountStatus) {
			$("#shade1").fadeIn(500);
			$(".shade_con1").fadeIn(500);
			var el = event.currentTarget;
			var account = $(el).parent().parent().siblings('.account').text().trim();
			// console.log(account)
			if(accountStatus == '0') {
				accountStatus = "可用"
			} else {
				accountStatus = "不可用"
			}
			var up = {
				id: id,
				loginName: loginName,
				userName: userName,
				accountStatus: accountStatus,
				accountType: account
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getBb", up);
		},
		addData: function(data1) {
			var $this = this;
			$.ajax({
				url: $this.url,
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
				success: function(data) {
					//console.log(data);
					$("#load").remove();
					$this.allData = [];
					$this.totalCount = 0;
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
						if($this.allData == '') {
							$this.showNo = true
						} else {
							$this.showNo = false
						}

						$this.totalCount = data.data.totalCount
						if(data1.offset == 1 && data1.pageSize == 10) {
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
		//bus.$on("getAid", function(updata) {
		//  //注意this指向问题
		//  $this.sellerid = updata.sellerid;
		//  $this.auctionid = updata.auctionid;
		//});
	},
});
//模板匹配
Vue.component("v-operation-manage", {
	template: '#manage-template',
	data: function() {
		return {
			userId: '',
			url: $api.UserDefultMenu,
			UserMenuRole: $api.UserMenuRole,
			word: [],
			use: [],
			order: [],
			sensitive: [],
			arr: [],
			aa: [],
			web: [],
			loginName: '',
			userName: '',
			accountStatus: '',
			accountType: '',
			mapShow: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		// setTimeout(() => {
		$(".tree").treemenu({
			delay: 300
		}).openActive();
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//监听提交
			form.on("submit(demo9)", function(data) {
				//  console.log(data);
				$(".tips1").fadeIn(500);
				$(".shade_con1").fadeOut(500);
				return false;
			});
		});

		// }, 100);
	},
	methods: {
		shanchu: function() {
			$("#shade1").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			$(".tree .sw-clo").addClass('dns');
			$(".tree .sw-clo span").text('+');
		},
		shut: function(event) {
			var el = event.currentTarget;
			//console.log($(el))
			if($(el).parent().find('.fater').hasClass("dns")) {
				$(el).parent().find('.fater').removeClass("dns")
				$(el).text('-')
			} else {
				$(el).parent().find('.fater').addClass("dns");
				$(el).text('+')
			}
		},
		checkDan: function(event) {
			var el = event.currentTarget;
			let sw_show = false;
			var list = $(el).parent().parent().find('input');

			for(var i = 0; i < list.length; i++) {
				if(list[i].checked) {
					$(el).parent().parent().parent().find('input.sw_bb').prop("checked", true);
					sw_show = true;
					break;
				}

			}
			if(!sw_show) {
				$(el).parent().parent().parent().find('input.sw_bb').prop("checked", false);
			}

		},
		checkDanA: function(event) {
			var el = event.currentTarget;
			let sw_show = false;
			var list = $(el).parent().parent().find('input');
			for(var i = 0; i < list.length; i++) {
				if(list[i].checked) {
					$(el).parent().parent().parent().find('input.sw_cc').prop("checked", true);
					$(el).parent().parent().parent().parent().parent().find('input.sw_bb').prop("checked", true);
					sw_show = true;
					break;
				}

			}
			if(!sw_show) {
				$(el).parent().parent().parent().find('input.sw_cc').prop("checked", false);
			}

		},
		checkAll: function(event) {
			var el = event.currentTarget;
			var list = $(el).parent().find('.fater input');

			if($(el).find('.sw_bb')[0].checked) {
				for(var i = 0; i < list.length; i++) {
					$(list[i]).prop("checked", true);
				}
			} else {
				for(var i = 0; i < list.length; i++) {
					$(list[i]).prop("checked", false);
				}
			}
		},
		checkAllA: function(event) {
			var el = event.currentTarget;
			var list = $(el).parent().find('.chird input');
			var inputs = $(el).parent().parent().find('.sw_cc');
			let show_b = false;
			for(var i = 0; i < inputs.length; i++) {
				if(inputs[i].checked) {
					$(el).parent().parent().parent().find('input.sw_bb').prop("checked", true);
					show_b = true;
					break;
				}

			}
			if(!show_b) {
				$(el).parent().parent().parent().find('input.sw_bb').prop("checked", false);
			}
			if($(el).find('.sw_cc')[0].checked) {
				show_b = true
				for(var i = 0; i < list.length; i++) {
					$(list[i]).prop("checked", true);
				}
			} else {

				for(var i = 0; i < list.length; i++) {
					$(list[i]).prop("checked", false);
				}
			}
		},
		shutTwo: function(event) {
			var el = event.currentTarget;
			//console.log($(el))
			if($(el).parent().find('.chird').hasClass("dns")) {
				$(el).parent().find('.chird').removeClass("dns")
				$(el).text('-')
			} else {
				$(el).parent().find('.chird').addClass("dns");
				$(el).text('+')
			}
		},
		shutThree: function(event) {
			var el = event.currentTarget;
			//console.log($(el))
			if($(el).parent().find('.chird_two').hasClass("dns")) {
				$(el).parent().find('.chird_two').removeClass("dns")
				$(el).text('-')
			} else {
				$(el).parent().find('.chird_two').addClass("dns");
				$(el).text('+')
			}
		},
		sw_btnsuss: function() {
			$(".tips_chid1").fadeIn();
		},
		sw_btnwrong: function() {
			$("#shade1").fadeOut();
			$(".shade_con1").fadeOut();
			$(".tips1").fadeOut();
		},
		sw_qued: function() {
			$(".tips1").fadeOut();
			$(".tips_chid1").fadeOut();
			$("#shade1").fadeOut();
			$(".shade_con1").fadeOut();
		},
		queding: function() {
			var $this = this;
			var jurisdiction = $('.shade_con1 .border input');
			//  console.log(jurisdiction)
			$this.arr = [];
			for(var i = 0; i < jurisdiction.length; i++) {
				if(jurisdiction[i].checked) {
					var val = $(jurisdiction[i]).attr('value') * 1
					$this.arr.push(val)
				}

			}
			// console.log($this.arr)
			$.ajax({
				url: $this.UserMenuRole,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: false,
				data: JSON.stringify({
					"loginName": $this.loginName,
					"menus": $this.arr
				}),
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//  console.log(data);
					if(data.statusCode == '401') {
					//	localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else {
						layer.open({
							content: '权限修改完成',
							yes: function(index) {
								layer.close(index);
								window.open("../../html/user_manage/operation_list.html", "_self");
							}
						});
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getBb", function(up) {
			//注意this指向问题
			//  console.log(up)
			$this.userId = up.id;
			$this.loginName = up.loginName;
			$this.userName = up.userName;
			$this.accountStatus = up.accountStatus;
			$this.accountType = up.accountType;
			$this.sensitive = [];
			$this.order = [];
			$this.word = [];
			$this.use = [];
			$this.aa = [];
			$this.web = [];
			cc()

			function cc() {
				$.ajax({
					url: $this.url,
					type: 'post',
					async: false,
					data: {
						"userId": $this.userId,
						"accountType": 1
					},
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//console.log(data);
						//console.log($this.aa);
						var topNav = [],
							bb = [],
							cc = [],
							dd = [],
							ee = [],
							ff = [],
							gg = [],
							jj = [],
							hh = [],
							sw_dd = [],
							web1 = [],
							web2 = [],
							web3 = [],
							web4 = [],
							web5 = [],
							web6 = [],
							web7 = [],
							web8 = [],
							web9 = [];
						var lis = data.data;
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 3 && lis[i].menuId.toString().substring(0, 1) == '2') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								$this.aa.push(lis[i])
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '210') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								$this.word.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							if($this.aa[i].menuId == '210') {
								$this.aa[i].word = $this.word
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '211') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								$this.use.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							if($this.aa[i].menuId == '211') {
								$this.aa[i].word = $this.use
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '212') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								$this.order.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							if($this.aa[i].menuId == '212') {
								$this.aa[i].word = $this.order
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '213') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								topNav.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							if($this.aa[i].menuId == '213') {
								$this.aa[i].word = topNav
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 3) == '213') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								$this.sensitive.push(lis[i])
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 5) == '21110') {

								hh.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21110') {
									$this.aa[i].word[j].bb = hh
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 5) == '21310') {

								bb.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21310') {
									$this.aa[i].word[j].bb = bb
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 5) == '21311') {

								cc.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21311') {
									$this.aa[i].word[j].bb = cc
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 5) == '21212') {

								gg.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21212') {
									$this.aa[i].word[j].bb = gg
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 5) == '21213') {

								jj.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21213') {
									$this.aa[i].word[j].bb = jj
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 7 && lis[i].menuId.toString().substring(0, 5) == '21313') {

								dd.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21313') {
									$this.aa[i].word[j].bb = dd
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 9 && lis[i].menuId.toString().substring(0, 7) == '2131314') {

								sw_dd.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].bb != undefined){
									for(var q = 0; q < $this.aa[i].word[j].bb.length; q++) {
									if($this.aa[i].word[j].bb[q].menuId == '2131314') {
										$this.aa[i].word[j].bb[q].chird = sw_dd
									}
							  }	
								}															
							}
						}					
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 5) == '21314') {

								ee.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21314') {
									$this.aa[i].word[j].bb = ee
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length >= 7 && lis[i].menuId.toString().substring(0, 5) == '21316') {

								ff.push(lis[i])
							}
						}
						for(var i = 0; i < $this.aa.length; i++) {
							for(var j = 0; j < $this.aa[i].word.length; j++) {
								if($this.aa[i].word[j].menuId == '21316') {
									$this.aa[i].word[j].bb = ff
								}
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 3 && lis[i].menuId.toString().substring(0, 1) == '1') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								$this.web.push(lis[i])
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '111') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web9.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '111') {
								$this.web[i].word = web9
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '112') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web1.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '112') {
								$this.web[i].word = web1
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '113') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web2.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '113') {
								$this.web[i].word = web2
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '114') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web3.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '114') {
								$this.web[i].word = web3
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '115') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web4.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '115') {
								$this.web[i].word = web4
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '116') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web5.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '116') {
								$this.web[i].word = web5
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '117') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web6.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '117') {
								$this.web[i].word = web6
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '118') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web7.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '118') {
								$this.web[i].word = web7
							}
						}
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].menuId.toString().length == 5 && lis[i].menuId.toString().substring(0, 3) == '119') {
								if(lis[i].isEnabled == '1') {
									lis[i].isEnabled = true
								} else {
									lis[i].isEnabled = false
								}
								web8.push(lis[i])
							}
						}
						for(var i = 0; i < $this.web.length; i++) {
							if($this.web[i].menuId == '119') {
								$this.web[i].word = web8
							}
						}
						//console.log($this.web)
						//console.log( $this.aa)
						//console.log( $this.sensitive)
					},
					error: function(err) {
						console.log(err);
					}
				});
			}
		});

	},
});
//用户修改
Vue.component("v-amend", {
	template: '#amend-template',
	data: function() {
		return {
			url: $api.saveUser,
			createUser: $api.createUser,
			mapShow: true, //显示无数据图片
			code: "",
			Info: {
				loginName: "",
				userName: '',
				accountType: "",
				accountStatus: '',
				city: "",
				company: "",
				email: "",
				province: "",
				lastLoginIp: "",
				lastLoginTime: "",
				mobilePhone: "",
				department: ""
			}
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//form.verify({
			//  phone: function(value){ //value：表单的值、item：表单的DOM对象
			//
			//  }
			//
			//  //我们既支持上述函数式的方式，也支持下述数组的形式
			//  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
			//  ,pass: [
			//    /^[\S]{6,12}$/
			//    ,'密码必须6到12位，且不能出现空格'
			//  ]
			//});
			//新增用戶
			form.on("submit(demo7)", function(data) {
				// console.log(data);
				if(data.field.password !== data.field.yesPassword || data.field.password == '') {
					layer.alert('新密码不一致', {
						icon: 2
					});
					return false;
				}
				if(/[\u4E00-\u9FA5]/g.test(data.field.loginName)) {
					layer.alert('登录名不能输入汉字，请重新输入！', {
						icon: 2
					});
					return false;
				}
				//				if(/^[0-9]*$/.test(data.field.loginName)) {
				//					layer.alert('登录名不能全是数字，请重新输入！', {
				//						icon: 2
				//					});
				//					return false;
				//				}
				if(data.field.email !== '') {
					var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
					if(!re.test(data.field.email)) {
						layer.alert('邮箱格式不正确！', {
							icon: 2
						});
						return false;
					}
				}
				if(data.field.mobilePhone !== '') {
					var re = /^1(3|4|5|7|8)\d{9}$/;
					if(!re.test(data.field.mobilePhone)) {
						layer.alert('手机号码不正确！', {
							icon: 2
						});
						return false;
					}
				}
				data.field.accountPlant = 0;
				$.ajax({
					url: $this.createUser,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//console.log(data);
						if(data.statusCode == 200) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									window.open("../../html/user_manage/operation_list.html", "_self");
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
						//$this.allData = data.data.data;
						// console.log($this.allData);
						// $this.totalCount = data.data.totalCount
					},
					error: function(err) {
						console.log(err);
					}
				});
				return false;
			});
			//修改用戶
			form.on("submit(demo6)", function(data) {
				if(data.field.email !== '') {
					var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
					if(!re.test(data.field.email)) {
						layer.alert('邮箱格式不正确！', {
							icon: 2
						});
						return false;
					}
				}
				if(data.field.mobilePhone !== '') {
					var re = /^1(3|4|5|7|8)\d{9}$/;
					if(!re.test(data.field.mobilePhone)) {
						layer.alert('手机号码不正确！', {
							icon: 2
						});
						return false;
					}
				}
				$.ajax({
					url: $this.url,
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
						if(data.statusCode == 200) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									window.open("../../html/user_manage/operation_list.html", "_self");
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
						//$this.allData = data.data.data;
						// console.log($this.allData);
						// $this.totalCount = data.data.totalCount
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
		shanchu: function() {
			$("#shade3").fadeOut();
			$(".shade_con3").fadeOut();
		}
	},
	created: function() {
		var $this = this;

		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.code = updata.code;
			$this.Info = updata.Info;
			// console.log($this.Info);
			// setTimeout(() => {
			$("#eventLevel option[value='" + $this.Info.accountStatus + "']").prop("selected", "selected");
			$("#eventLevelTwo option[value='" + $this.Info.accountType + "']").prop("selected", "selected");
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			})
			if($this.Info.loginName == "") {
				$('.layui-inline .loginName').attr("disabled", false).css('background', ' #fff');
			} else {
				$('.layui-inline .loginName').attr("disabled", true).css('background', ' #ECECEC');
			}
			// }, 100);

		});
	},
});