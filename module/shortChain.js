/*下单失败*/
var id = $api.localStorageId;
//var time = JSON.parse(localStorage.getItem('time'));
//var startTime , endTime;
//			if(time == null){
//				startTime = getDay(0);
//				endTime = getDay(0);
//			}else{
//				startTime = time[0].startTime;
//				endTime = time[0].endTime;
//			}
//组件通信
var bus = new Vue();
var UserName = null,
	IsmgName = null;
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
		IsmgName = data.data;
		//console.log($this.userData);
		// $this.totalCount = data.data.totalCount
	},
	error: function(err) {
		console.log(err);
	}
});
if(show_button(2131314)){
	
}else{
	window.open("../../login.html", "_self");
}
//左侧菜单组件实例化
Vue.component("v-order-fail", {
	template: '#right-template',
	data: function() {
		return {
			queryShortLinks: $api.queryShortLinks,
			queryCheckInfo: $api.queryCheckInfo,
			queryCheckLinks: $api.queryCheckLinks,
			data1: {
				"template": "",
				"endTime": '',
				"startTime": '',
				"templateId": "",
				"offset": 1,
				"pageSize": 10,
				"userId": "",
				"url": ""
			},
			data2: {
				"content": "",
				"templateId": "",
				"offset": 1,
				"pageSize": 10,
				"review": "",
				"userId": "",
			},
			code: show_button(213131410)? 0 : show_button(213131411)? 1 : 2,
			totalCount: '0',
			allData: [],
			userData: UserName,
			showChainA:show_button(213131410),
			showChainB:show_button(213131411),
			mapShow: false //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {		
		if($this.code == 0){
			$this.addData($this.data1);
		}else if($this.code == 1){
			$this.addDataTwo($this.data2);
		}
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 10) {
				$this.page()
			}
			if($this.data2.offset !== 1 || $this.data2.pageSize !== 10) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo)", function(data) {
				var text = $(".unlike2 .dropdown-selected").val();
				if(text == '') {
					$this.data1.userId = ''
				} else {
					verify_user(UserName, $(".unlike2 .dropdown-selected"), text)
					$this.data1.userId = $(".unlike2 .dropdown-selected").attr('data')
				}
				$this.data1.startTime = data.field.startTime;
				$this.data1.endTime = data.field.endTime;
				$this.data1.templateId = data.field.templateId;
				$this.data1.template = data.field.template.trim();
				$this.data1.url = data.field.url;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1);
				return false;
			});
			form.on("submit(demo8)", function(data) {
				console.log(data)
				var text = $(".unlike5 .dropdown-selected1").val();
				if(text == '') {
					$this.data2.userId = ''
				} else {
					verify_user(UserName, $(".unlike5 .dropdown-selected1"), text)
					$this.data2.userId = $(".unlike5 .dropdown-selected1").attr('data')
				}
				$this.data2.templateId = data.field.templateId;
				$this.data2.content = data.field.content.trim();
				$this.data2.review = data.field.review;
				$this.data2.offset = 1;
				$this.data2.pageSize = 10;
				$this.addDataTwo($this.data2);
				return false;
			});
		});
		$('.table_tou h6').on('click', function() {
			$(this).addClass('addClass2').siblings().removeClass('addClass2')
			if($(this).text() == '智能短链列表') {
				$this.code = 0;
				$('.table_nav  form .list2').addClass('dn')
				$('.table_nav  form .list').removeClass('dn')
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
			} else if($(this).text() == '智能短链模板列表') {
				$this.code = 1
				$('.table_nav  form .list').addClass('dn')
				$('.table_nav  form .list2').removeClass('dn')
				$this.data2.offset = 1;
				$this.data2.pageSize = 10;
				$this.addDataTwo($this.data2);
			}
			$(document).ready(function() {
				var height = $('#rightTable').get(0).scrollHeight;
				//console.log(height);
				$('#leftMenu_Box').css('height', height)
			});
		})
		//}, 100);
	},
	methods: {
		sendDetails: function(tracId) {
			var $this = this;
			localStorage.setItem('tracId', tracId);
			//localStorage.setItem('time', JSON.stringify([{'startTime':$this.data1.startTime,'endTime':$this.data1.endTime}]));
			window.open("./noteSend.html", "_self");
		},
		visitDetails: function(tracId) {
			var $this = this;
			localStorage.setItem('tracId', tracId);
			//localStorage.setItem('time', JSON.stringify([{'startTime':$this.data1.startTime,'endTime':$this.data1.endTime}]));
			window.open("./shortVisit.html", "_self");
		},
		checkReport: function(tracId, template, num, templateId) {
			var $this = this;
			//			 var aa =  new Date(times.split(' ')[0]).getTime()-604800000;
			//			 console.log(new Date(aa).getMonth())
			//			 console.log(new Date(aa).getMonth() + 1)
			//			 console.log(new Date(aa).getFullYear())
			if(num == 0) {
				layer.msg('当前模板无报告！', {
					icon: 2,
					time: 1300 //2秒关闭（如果不配置，默认是3秒）
				});
				return false;
			} else {
				localStorage.setItem('tracId', tracId);
				localStorage.setItem('template', template);
				localStorage.setItem('templateId', templateId);
				// localStorage.setItem('time', JSON.stringify([{'startTime':$this.data1.startTime,'endTime':$this.data1.endTime}]));
				window.open("./analyze.html", "black");
			}

		},
		mapping: function(a) {
			var $this = this;
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			$this.info(a, 1);
		},
		examine: function(a) {
			var $this = this;
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			$this.info(a, 2)
		},
		info: function(val, num) {
			var $this = this;
			$.ajax({
				url: $this.queryCheckInfo,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: false,
				data: JSON.stringify({
					'traceId': val
				}),
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					var updata = {
						Info: data.data,
						code: num,
					};
					//console.log(updata);
					// 将选中的ID放到触发器的盆子里，下面拿着用
					bus.$emit("getBB", updata);
				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		shade: function() {
			$("#shade3").fadeIn(300);
			$(".shade_con3").fadeIn(300);
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
							if($this.code == 0) {
								$this.data1.offset = obj.curr;
								$this.data1.pageSize = obj.limit;
								$this.addData($this.data1);
							} else {
								$this.data2.offset = obj.curr;
								$this.data2.pageSize = obj.limit;
								$this.addDataTwo($this.data2);
							}
						}
					}
				});
			});

		},
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryShortLinks,
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
		},
		addDataTwo: function(data) {
			var $this = this;
			$.ajax({
				url: $this.queryCheckLinks,
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
		bus.$on("getCC", function(updata) {
			//注意this指向问题
			console.log(updata)
			if(updata.code == 0){
				$this.addData($this.data1);
			}else{
				$this.addDataTwo($this.data2);
			}
			
		});

	},
});

/*申请模版*/
Vue.component("v-template", {
	template: '#shade-template',
	data: function() {
		return {
			url: $api.templateApply,
			repulse: $api.repulseTemplateApply,
			checkTemplate: $api.checkTemplate,
			againTemplate: $api.againTemplate,
			html: '',
			text: '',
			satus: '',
			code: 0,
			replenish: '',
			//userData:UserName,
			content3: IsmgName,
			showData: {},
			showNo: false,
			mapShow: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {
		window.editor = KindEditor.create('#editor_id', {
			allowImageRemote: false,
			items: [
				'forecolor', 'removeformat'
			]
		});
		editor.html('');
		editor.sync();
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//监听提交
			form.on("submit(demo7)", function(data) {
				var text6 = $(".unlike6 .dropdown-selected1").val();
				if(text6 == '') {
					layer.msg('请选择下拉框内容！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				} else {
					if(verify_ism(IsmgName, $(".unlike6 .dropdown-selected1"), text6)) {
						data.field.ismgId = $(".unlike6 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择网关！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
//				if(data.field.auditMark== null || data.field.auditMark.trim() == '') {
//				layer.msg('请填写批注！', {
//					icon: 2,
//					time: 1300 //2秒关闭（如果不配置，默认是3秒）
//				});
//				return false;
//			}
				if(data.field.name== null || data.field.name.trim() == '') {
				layer.msg('请填写网址名称！', {
					icon: 2,
					time: 1300 //2秒关闭（如果不配置，默认是3秒）
				});
				return false;
			}
				data.field.traceId = $this.showData.traceId
				data.field.templateSms = $this.showData.templateSms
				data.field.modWord = $this.showData.modWord
				data.field.loginName = $this.showData.loginName
				data.field.templateId = $this.showData.templateId
				data.field.userId = $this.showData.userId
				$this.shanchu();
        $("#shade2").fadeIn(300);
        $(".shade_con2").fadeIn(300);
        var updata = {
						Info: data.field,
					};
					//console.log(updata);
					// 将选中的ID放到触发器的盆子里，下面拿着用
					bus.$emit("getDD", updata);
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
		refuse: function(templateId, num, html) {
			var $this = this;
			if(html== null || html.trim() == '') {
				layer.msg('请填写拒绝原因！', {
					icon: 2,
					time: 1300 //2秒关闭（如果不配置，默认是3秒）
				});
				return false;
			}
			layer.open({
				content: '你确定要拒绝该短链模板？',
				shadeClose: true,
				btn: ['确定', '取消'],
				yes: function(index) {
					layer.close(index);
					$.ajax({
						url: $this.checkTemplate,
						type: 'post',
						async: false,
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify({
							"templateId": templateId,
							"auditMark": html,
							"review": num
						}),
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu()
									var updata = {
										code: 1,
									};
									bus.$emit("getCC", updata);
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
			//console.log(updata)
			$this.code = updata.code;
			$this.showData = updata.Info;
			window.editor.html($this.showData.modWord);
			$('.unlike6 .dropdown-selected1').val($this.showData.ismgName)
			$('.unlike6 .dropdown-selected1').attr('data', $this.showData.ismgId);
			layui.use("form", function() {
				var form = layui.form;
				form.render();
			})

		});
	},
});
/*添加锻炼*/
Vue.component("v-rate", {
	template: '#rate-template',
	data: function() {
		return {
			userData1: UserName,
			content3: IsmgName,
			createShortLink: $api.createShortLink,
			editTemplateOrder: $api.editTemplateOrder, // content1:['拒绝','先审后发','先发后审','接受'],
			// content2:['不可用','可用','测试'],
			mapShow: true, //显示无数据图片
			code: 0,
			templateId: '',
			showData: {
				templateSms: "",
				domain: "https://dwzo.cn/",
				url: "",
				name: "",
			},
			allData: []
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
				var text = $(".unlike3 .dropdown-selected1").val();
				if(text == '') {
					layer.msg('请选择下拉框内容！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				} else {
					if(verify_user1($this.userData1, $(".unlike3 .dropdown-selected1"), text)) {
						data.field.userId = $(".unlike3 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				var text4 = $(".unlike4 .dropdown-selected1").val();
				if(text4 == '') {
					data.field.ismgId = '-1';
				} else {
					if(verify_ism(IsmgName, $(".unlike4 .dropdown-selected1"), text4)) {
						data.field.ismgId = $(".unlike4 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}

				}
				data.field.templateId = $('.tep').attr('dataId');
				//console.log(data.field)
				$.ajax({
					url: $this.createShortLink,
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
						if(data.data == true) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu()
									var updata = {
										code: 0,
									};
									bus.$emit("getCC", updata);
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
			$("#shade3").fadeOut(500);
			$(".shade_con3").fadeOut(500);
			$this.showData = {
				domain: "https://dwzo.cn/",
				url: "",
				name: "",
			};
			$('.tep').val('');
			$('.tep').attr('dataId', '');
			$('.unlike3 .dropdown-selected1').val('');
			$('.unlike4 .dropdown-selected1').val('')
		},
		examine: function() {
			var $this = this;
			var text3 = $(".unlike3 .dropdown-selected1").val();
			var tepmVal = $('.tep').val();
			if(tepmVal == '') {
				layer.msg('当前用户没有模板！', {
					icon: 2,
					time: 1300 //2秒关闭（如果不配置，默认是3秒）
				});
				return false;
			}
			if(text3 == '') {
				layer.msg('用户名不能为空！', {
					icon: 2,
					time: 1300 //2秒关闭（如果不配置，默认是3秒）
				});
				return false;
			} else {
				if(verify_user1($this.userData1, $(".unlike3 .dropdown-selected1"), text3)) {
					$("#shade1").fadeIn(300);
					$(".shade_con1").fadeIn(300);
					var userID = $(".unlike3 .dropdown-selected1").attr('data');
					var updata = {
						Info: {
							"Id": userID,
						},
					};
					bus.$emit("getAid", updata);
				} else {
					$('.tep').val('');
					$('.tep').attr('dataId', '');
					layer.msg('请选择下拉框内容！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				}

			}
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getTep", function(updata) {
			//注意this指向问题
			$('.tep').val(updata.Info.content);
		});
	},
});
/*查看模板*/
Vue.component("v-paste", {
	template: '#paste-template',
	data: function() {
		return {
			TemplateOrderList: $api.TemplateOrderList,
			mapShow: true, //显示无数据图片
			loginName: '',
			accountPlant: '',
			content1: [],
			data1: {
				"actionType": [],
				"bizType": [],
				"expression": "",
				"expressionSize": "",
				"mergeType": "",
				"msgContent": "",
				//"offset": 1,
				//"pageSize": 10,
				"priority": "",
				"statusInt": [],
				"templateId": "",
				"templateName": "",
				"userId": "",
				"z2a": ""
			},
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
			$("#shade1").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			$this.content1 = [];
			//$this.data2 = [];
		},
		//添加数据
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.TemplateOrderList,
				type: 'post',
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify(data),
				headers: {
					"Authorization": id,
				},
				success: function(res) {
					if(res.statusCode == '401') {
						window.open("../../login.html", "_self");
					} else {
						$this.content1 = res.data.data;
					}

				},
				error: function(err) {
					console.log(err);
				}
			});
		},
		//选择模板
		chooseTep: function(text, dataId) {
			var $this = this;
			//console.log(text)
			var updata = {
				Info: {
					"content": text,
				},
			};
			$('.tep').attr('dataId', dataId);
			bus.$emit("getTep", updata);
			$this.shanchu()
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.data1.userId = updata.Info.Id;
			$this.addData($this.data1)
		});
	},
});

Vue.component("v-sw", {
    template: '#sw-template',
    data: function() {
      return {
        userData1:UserName,
        auditTemplateLinkApply:$api.auditTemplateLinkApply,
        editTemplateOrder:$api.editTemplateOrder,
        queryBizType:$api.queryBizType,
        getTemplateNameAndContent:$api.getTemplateNameAndContent,
        content:[],
        // content1:['拒绝','先审后发','先发后审','接受'],
        // content2:['不可用','可用','测试'],
        Info:[],
        mapShow: true, //显示无数据图片
        code:0,
        templateId:'',
        showData:null,
      };
    },
    mounted:function() {
      var $this = this;
      //setTimeout(() => {
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        //监听提交
        form.on("submit(demo11)", function(data) {
          //console.log(data)
          var data2 = data
          data2.field.actionType = data2.field.actionType*1
          data2.field.statusInt = data2.field.statusInt*1
          data2.field.mergeType = data2.field.mergeType*1
          data2.field.traceId =  $this.Info.traceId
          data2.field.loginName =  $this.Info.loginName
          data2.field.auditMark =  $this.Info.auditMark
          data2.field.name =  $this.Info.name
          data2.field.ismgId =  $this.Info.ismgId
          data2.field.templateId =  $this.Info.templateId
          data2.field.userId =  $this.Info.userId
          data2.field.review =  1
          data2.field.z2a  =  1
          //console.log(data2.field.bizType)
          if (data2.field.bizType == '') {
            layer.msg('内容分类不能为空！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
            data2.field.bizType = data2.field.bizType*1
          }
          var reg = /^[0-9]*$/;
          if (!reg.test(data2.field.priority) || data2.field.priority == '') {
            layer.msg('优先级必填数字，不能为空！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }
          $.ajax({
						url: $this.auditTemplateLinkApply,
						type: 'post',
						async: false,
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify(data2.field),
						headers: {
							"Authorization": id,
						},
						success: function(data) {
							layer.open({
								content: data.message,
								yes: function(index) {
									layer.close(index);
									$this.shanchu()
									var updata = {
										code: 1,
									};
									bus.$emit("getCC", updata);
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
          return false;
        });
      });
      // }, 100);
    },
    methods: {
      shanchu:function() {
        $("#shade2").fadeOut(300);
        $(".shade_con2").fadeOut(300);
      },      
    },
    created:function() {
      var $this = this;
      $.ajax({
        url : $this.queryBizType,
        type : 'post',
        async: false,
        data :{
        },
        headers : {
          "Authorization":id,
        },
        success : function(data){
          //console.log(data);
          $this.content = data.data;
          //console.log($this.userData);
          // $this.totalCount = data.data.totalCount
        },
        error : function(err){
          console.log(err);
        }
      });
      //接收器，接收上面的两个ID
      bus.$on("getDD", function(updata) {
        //注意this指向问题
        //console.log(updata)
        $this.Info = updata.Info;
        //console.log($this.Info)
        if($this.Info.modWord !== ''){
          $.ajax({
            url : $this.getTemplateNameAndContent,
            type : 'post',
            async: false,
            data :{
              'smsContent':$this.Info.modWord
            },
            headers : {
              "Authorization":id,
            },
            success : function(data){
              //console.log(data);
              $this.Info.templateName = data.data.templateName
              $this.Info.templateCotent = data.data.templateCotent
              // $this.userData1 = data.data;
              //console.log($this.userData);
              // $this.totalCount = data.data.totalCount
            },
            error : function(err){
              console.log(err);
            }
          });
        }

        //setTimeout(() => {
        $('unlike7 .dropdown-selected1').val($this.Info.loginName)
        layui.use("form", function() {
          var form = layui.form;
          form.render();
        })
        // }, 50);
      });
    },
});