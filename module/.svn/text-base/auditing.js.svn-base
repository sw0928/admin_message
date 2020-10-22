/*审核发送*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(21011)){
	
}else{
	window.open("../../login.html", "_self");
}
//审核发送
Vue.component("v-auditing-send", {
	template: '#right-template',
	data: function() {
		return {
			AuditToSendList: $api.AuditToSendList,
			queryUserName: $api.queryUserName,
			queryAuditMsgContent: $api.queryAuditMsgContent,
			userData: [],
			totalCount: '0',
			allData: [],
			data1: {
				// "imsgId": 0,
				"type": 0,
				"msgContent": "",
				"startDate": getDay(0),
				"endDate": getDay(0),
				"offset": 1,
				"pageSize": 10,
				"userId": ''
			},
			showNo: false,
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
			if($this.data1.offset !== 1 || $this.data1.pageSize !== 10) {
				$this.page()
			}
			//监听提交
			form.on("submit(demo2)", function(data) {
				//console.log(data)
				$this.data1 = data.field;
				var text = $(".dropdown .dropdown-selected").val();
				if(text == '') {
					$this.data1.userId = ''
				} else {
					verify_user($this.userData, $(".dropdown .dropdown-selected"), text)
					$this.data1.userId = $(".dropdown .dropdown-selected").attr('data');
				}
				$this.data1.offset = 1;
				$this.data1.type = $this.data1.type * 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1);
				//$this.page()
				return false;
			});
		});
		// }, 100);
	},
	methods: {
		discharged: function(val, type, con, name, tempid) {
			var $this = this;
			if(type == "先审后发") {
				type = 1
			} else {
				type = 0
			}
			$('#shade3').fadeIn(300);
			$('.shade_con3').fadeIn(300);
			$.ajax({
				url: $this.queryAuditMsgContent,
				type: 'post',
				async: false,
				data: {
					'taskSn': val,
					'way': type
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//console.log(data.data);
					var updata = {
						code: '0',
						name: name,
						msgContent: con,
						expression: data.data,
						way: type,
						taskSn: val,
						templateId: tempid
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
		refuse: function(val, type, con, name) {
			var $this = this;
			if(type == "先审后发") {
				type = 1
			} else {
				type = 0
			}
			$('#shade3').fadeIn(300);
			$('.shade_con3').fadeIn(300);
			$.ajax({
				url: $this.queryAuditMsgContent,
				type: 'post',
				async: false,
				data: {
					'taskSn': val,
					'way': type
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//  console.log(data);
					var updata = {
						code: '1',
						name: name,
						msgContent: con,
						expression: data.data,
						way: type,
						taskSn: val
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
		artle: function(event) {
			var el = event.currentTarget;
			$(el).css('color', '#3784D2')
			$(el).find('.none').show();
		},
		out: function(event) {
			var el = event.currentTarget;
			$(el).css('color', 'rgba(73,73,73,1)')
			$(el).find('.none').hide();
		},
		refresh: function() {
			$('#shade2').fadeIn(300);
			$('.tips2').fadeIn(300);
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
					limits: [10, 50, 100, 1000],
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
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.AuditToSendList,
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
					//console.log(res)
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
					$("#load").remove();
					console.log(err);
				}
			});
		},
		sw_btnsuss: function() {
			window.open("../../html/workbench/auditing.html", "_self");
		},
		//跳转模板id
		templateId: function(num) {
			window.open('../../html/resource/take_orders.html?id=' + num + '', "_self");
		}
	},
	created: function() {
		var $this = this;
		$.ajax({
			url: $this.queryUserName,
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
				$this.userData = data.data;
				//console.log($this.userData);
				// $this.totalCount = data.data.totalCount
			},
			error: function(err) {
				console.log(err);
			}
		});
		//接收器，接收上面的两个ID
		bus.$on("getCc", function(updata) {
			//注意this指向问题
			$this.addData($this.data1)
		});
	},

});
//放行拒绝
Vue.component("v-rate", {
	template: '#rate-template',
	data: function() {
		return {
			userData1: [],
			auditTaskNoPass: $api.auditTaskNoPass,
			auditTaskPass: $api.auditTaskPass,
			queryBizType: $api.queryBizType,
			content: [],
			msgContent: '',
			expression: '',
			length: '0',
			mapShow: true, //显示无数据图片
			code: 0,
			name: '',
			taskSn: '',
			showData: null,
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
			form.on('select(num)', function(data) {
				if($this.code == 0) {
					if(data.value == 0) {
						$('input:radio[name=expireTime]')[0].disabled = false;
						$('input:radio[name=expireTime]')[2].disabled = false;		
						$('input:radio[name=expireTime]')[0].checked = true;
					} else {
						$('input:radio[name=expireTime]')[0].disabled = true;
						$('input:radio[name=expireTime]')[2].disabled = true;
						$('input:radio[name=expireTime]')[1].checked = true;
					}
				}
				layui.use("form", function() {
					var form = layui.form;
					form.render();
				})
			});
			form.on('radio(exchange)', function(data){
          if(data.value == "1"){
            $this.expression = $this.msgContent
          }else{
             $this.expression = $this.oldExpre
          }
        });
			form.on("submit(demo11)", function(data) {
				data.field.taskSn = $this.taskSn;
				data.field.way = $this.way;
				data.field.templateId = $this.templateId;
				//console.log(data.field)
				$.ajax({
					url: $this.auditTaskPass,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(res) {
						console.log(res)
						if(res.data == true) {
							//            layer.open({
							//              content: res.message
							//              ,yes: function(index){
							//                layer.close(index);
							//                window.open("../../html/workbench/auditing.html", "_self");
							//              }
							//            });
							layer.open({
								content: res.message,
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
			form.on("submit(demo12)", function(data) {
				data.field.taskSn = $this.taskSn;
				data.field.way = $this.way;
				// console.log(data.field)
				$.ajax({
					url: $this.auditTaskNoPass,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify(data.field),
					headers: {
						"Authorization": id,
					},
					success: function(res) {
						// console.log(res)
						if(res.data == true) {
							//            layer.open({
							//              content: res.message
							//              ,yes: function(index){
							//                layer.close(index);
							//                window.open("../../html/workbench/auditing.html", "_self");
							//              }
							//            });
							layer.open({
								content: res.message,
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
		shanchu: function() {
			$("#shade3").fadeOut(300);
			$(".shade_con3").fadeOut(300);
		},
		close: function() {
			$("#shade3").fadeOut(300);
			$(".shade_con3").fadeOut(300);
		},
	},
	created: function() {
		var $this = this;
		$.ajax({
			url: $this.queryBizType,
			type: 'post',
			async: false,
			data: {},
			headers: {
				"Authorization": id,
			},
			success: function(data) {
				// console.log(data);
				$this.content = data.data;
				//console.log($this.userData);
				// $this.totalCount = data.data.totalCount
			},
			error: function(err) {
				console.log(err);
			}
		});

		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//  console.log(updata)
			$this.code = updata.code;
			$this.name = updata.name;
			$this.expression = updata.expression;
			$this.oldExpre = updata.expression;
			$this.msgContent = updata.msgContent == "" ? '' : updata.msgContent;
			$this.length = $this.msgContent.length;
			$this.way = updata.way;
			$this.templateId = updata.templateId;
			$this.taskSn = updata.taskSn;
			setTimeout(function() {
//				if($this.code == 0) {
//					$('input:radio[name=exchange]')[1].checked = true;
//				}
				$('input:radio[name=expireTime]')[0].disabled = false;
				$('input:radio[name=expireTime]')[1].disabled = false;
				$('input:radio[name=expireTime]')[2].disabled = false;
				$('input:radio[name=expireTime]')[0].checked = true;
				$("#priority option[value='0']").prop("selected", "selected");
				$("#bizType option[value='']").prop("selected", "selected");
				$("#num option[value='0']").prop("selected", "selected");
				layui.use("form", function() {
					var form = layui.form;
					form.render();
				})
			}, 50);

		});
	},

});