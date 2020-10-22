/**
 * Created by Administrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var id = $api.localStorageId;
//组件通信
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
			userData1: [],
			queryIsmgList: $api.queryIsmgList,
			removeIsmg: $api.removeIsmg,
			managementStatus: $api.managementStatus,
			data1: {
				"ismgId": "",
				"ismgName": "",
				"offset": 1,
				"pageSize": 10,
				"logonId": '',
				"protocol": ""
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
			form.on('switch(yyy)', function(data) {
				//console.log(data.elem.checked); //开关是否开启，true或者false			 
				if(data.elem.checked == true) {
					$.ajax({
						url: $this.managementStatus,
						type: 'post',
						async: false,
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify({
							"ismgId": data.value,
							"enabled": 1
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
				} else {
					$.ajax({
						url: $this.managementStatus,
						type: 'post',
						async: false,
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify({
							"ismgId": data.value,
							"enabled": 0
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
				}
			});
			//监听提交
			form.on("submit(demo5)", function(data) {
				// console.log(JSON.stringify(data.field));
				$this.data1.ismgId = data.field.ismgId;
				$this.data1.protocol = data.field.protocol.trim();
				$this.data1.logonId = data.field.logonId.trim();
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.data1.ismgName = data.field.ismgName.trim();
				if($this.data1.ismgName == '') {
					$this.data1.ismgName = ''
				} else {
					if(verify_ism($this.userData1, $('.dropdown1 .dropdown-selected1'), $this.data1.ismgName)) {

					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
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
		//申请签名
		shade: function() {
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			var updata = {
				Info: '',
				code: 0
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
				code: 1
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getAid", updata);
		},
		//删除
		del: function(id) {
			var $this = this;
			$("#shade2").fadeIn(300);
			$(".tips2").fadeIn(300);
			$this.ismgId = id;
		},
		//取消
		sw_btnwrong: function() {
			$("#shade2").fadeOut(300);
			$(".tips2").fadeOut(300);

		},
		//确定
		sw_btnsuss: function() {
			var $this = this;
			$(".tips2").fadeOut(300);
			$.ajax({
				url: $this.removeIsmg,
				type: 'post',
				async: false,
				data: {
					'ismgId': $this.ismgId
				},
				headers: {
					"Authorization": id,
				},
				success: function(data) {
					//  console.log(data);
					$(".tips_chid2").fadeIn(300);
				},
				error: function(err) {
					//console.log(err);

				}
			});
		},
		//二级弹框确认
		sw_qued: function() {
			var $this = this;
			$this.addData($this.data1)
			$(".tips2").fadeOut(300);
			$(".tips_chid2").fadeOut(300);
			$("#shade2").fadeOut(300);
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
				url: $this.queryIsmgList,
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
		$.ajax({
			url: $this.queryIsmgName,
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
				$this.userData1 = data.data;
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
/*申请签名*/
Vue.component("v-template-signature", {
	template: '#shade-template',
	data: function() {
		return {
			num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			createIsmg: $api.createIsmg,
			editIsmg: $api.editIsmg,
			IsmgInfo: $api.IsmgInfo,
			field: null,
			blocTrade: null,
			code: '0',
			ismgId: '',
			message: '',
			data2: [],
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
			form.on("submit(demo6)", function(data) {
				// console.log(data);
				data.field.blackLevel = data.field.blackLevel + '-' + data.field.blackLevel_two;
				data.field.blackLevel2 = data.field.blackLevel2 + '-' + data.field.blackLevel2_two;
				if(data.field.protocol1 == '') {
					data.field.protocol = data.field.protocol;
				} else {
					data.field.protocol = data.field.protocol + '.' + data.field.protocol1;
				}
				data.field.complaintRate = data.field.complaintRate * 1;
				data.field.lunchReceiptLimit = data.field.lunchReceiptLimit * 1;
				data.field.lunchSentLimit = data.field.lunchSentLimit * 1;
				data.field.mmsCapacity = data.field.mmsCapacity * 1
				data.field.mmsDayCapacity = data.field.mmsDayCapacity * 1
				data.field.mmsMonthCapacity = data.field.mmsMonthCapacity * 1
				data.field.port = data.field.port * 1
				data.field.smsCapacity = data.field.smsCapacity * 1
				data.field.smsDayCapacity = data.field.smsDayCapacity * 1
				data.field.smsMonthCapacity = data.field.smsMonthCapacity * 1
				data.field.speed = data.field.speed * 1
				delete data.field.blackLevel_two;
				delete data.field.blackLevel2_two;
				delete data.field.protocol1;
				delete data.field.ismgId;

				$this.field = data.field;
				$(".tips").fadeIn(300);
				return false;
			});
			form.on("submit(demo7)", function(data) {
				//  console.log(data);
				data.field.blackLevel = data.field.blackLevel + '-' + data.field.blackLevel_two;
				data.field.blackLevel2 = data.field.blackLevel2 + '-' + data.field.blackLevel2_two;
				if(data.field.protocol1 == '') {
					data.field.protocol = data.field.protocol;
				} else {
					data.field.protocol = data.field.protocol + '.' + data.field.protocol1;
				}
				delete data.field.blackLevel_two;
				delete data.field.blackLevel2_two;
				delete data.field.protocol1;
				$this.field = data.field;
				$(".tips").fadeIn(300);
				return false;
			});
		});

		//  }, 100);
	},
	methods: {
		shanchu: function() {
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
			$(".tips_chid").fadeOut(300);
			$(".tips").fadeOut(300);
		},
		close: function() {
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},
		sw_btnsuss: function() {
			var $this = this;
			$this.field.enable = $this.field.enable * 1;
			if($this.code == 0) {
				$.ajax({
					url: $this.createIsmg,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						// console.log(data);
						if(data.data == true) {
							$this.mapShow = true
						} else {
							$this.mapShow = false
						}
						$this.message = data.message;
						$(".tips_chid").fadeIn(300);
					},
					error: function(err) {
						console.log(err);
					}
				});
			} else {
				$this.field.ismgId = $this.field.ismgId * 1;
				$.ajax({
					url: $this.editIsmg,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json',
					async: false,
					data: JSON.stringify($this.field),
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//  console.log(data);
						if(data.data == true) {
							$this.mapShow = true
						} else {
							$this.mapShow = false
						}
						$this.message = data.message;
						$(".tips_chid").fadeIn(300);
					},
					error: function(err) {
						console.log(err);
					}
				});
			}

		},
		sw_qued: function() {
			var $this = this;

			if($this.mapShow == true) {
				// window.open("../../html/resource/definition_gate.html", "_self");
				$this.shanchu()
				var updata = {
					cc: '1'
				};
				bus.$emit("getCc", updata);
				//window.open("../../html/resource/route_list.html", "_self");
			} else {
				$(".tips").fadeOut(300);
				$(".tips_chid").fadeOut(300);

			}
		},
		sw_btnwrong: function() {
			$(".tips").fadeOut(300);
			$(".shade_con").fadeIn(300);
		}
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.code = updata.code;
			$this.ismgId = updata.Info;

			if($this.ismgId == '') {
				$this.data2 = {
					'blackLevel': '0-0',
					'blackLevel2': '0-0',
					'protocol': "",
					'enable': "",
					lunchBeginTime: null,
					lunchEndTime: null,
				}
			} else {
				$.ajax({
					url: $this.IsmgInfo,
					type: 'post',
					async: false,
					data: {
						'ismgId': $this.ismgId
					},
					headers: {
						"Authorization": id,
					},
					success: function(data) {
						//console.log(data);
						$this.data2 = data.data
					},
					error: function(err) {
						//console.log(err);

					}
				});
			}
			setTimeout(function() {
				var blackLevel = '',
					blackLevel2 = '',
					protocol = '';
				if($this.data2.blackLevel !== null) {
					var blackLevel = $this.data2.blackLevel.split('-')[1];
					$this.data2.blackLevel = $this.data2.blackLevel.split('-')[0];
				}
				if($this.data2.blackLevel2 !== null) {
					var blackLevel2 = $this.data2.blackLevel2.split('-')[1];
					$this.data2.blackLevel2 = $this.data2.blackLevel2.split('-')[0];
				}
				var protocol = $this.data2.protocol.split('.')[1];
				$this.data2.protocol = $this.data2.protocol.split('.')[0].toString();
				$("#eventLevel option[value='" + $this.data2.protocol + "']").prop("selected", "selected");
				$("#eventLevelTwo option[value='" + $this.data2.enable + "']").prop("selected", "selected");
				$("#eventLevelThree option[value='" + blackLevel + "']").prop("selected", "selected");
				$("#eventLevelHour option[value='" + $this.data2.blackLevel + "']").prop("selected", "selected");
				$("#eventLevelFive option[value='" + blackLevel2 + "']").prop("selected", "selected");
				$("#eventLevelSix option[value='" + $this.data2.blackLevel2 + "']").prop("selected", "selected");
				$("input[name=protocol1]").val(protocol);
				layui.use("form", function() {
					var form = layui.form;
					form.render();
				})
				var cc = '',
					ff = '';
				if($this.data2.lunchBeginTime !== null) {
					let aa = '',
						bb = '';
					aa = $this.data2.lunchBeginTime.split('T')[0];
					bb = $this.data2.lunchBeginTime.split('T')[1].split('.')[0];
					cc = aa + ' ' + bb
					laydate.render({
						elem: "#test", //指定元素
						type: 'datetime',
						value: cc,
					});
				} else {
					laydate.render({
						elem: "#test", //指定元素
						type: 'datetime',
						value: '',
					});
				}
				if($this.data2.lunchEndTime !== null) {
					let dd = '',
						ee = '';
					dd = $this.data2.lunchEndTime.split('T')[0];
					ee = $this.data2.lunchEndTime.split('T')[1].split('.')[0];
					ff = dd + ' ' + ee
					laydate.render({
						elem: "#test1", //指定元素
						type: 'datetime',
						value: ff,
					});
				} else {

					laydate.render({
						elem: "#test1", //指定元素
						type: 'datetime',
						value: '',
					});
				}

			}, 50);
		});
	},
});