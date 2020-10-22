/**
 * Created by Administrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var accountType = localStorage.getItem('accountType');
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
var ismgName=null;
$.ajax({
  url : $api.queryIsmgName,
  type : 'post',
  async: false,
  data :{
    'ismgName':""
  },
  headers : {
    "Authorization":id,
  },
  success : function(data){
    //console.log(data);
    ismgName = data.data;
    //console.log($this.userData);
    // $this.totalCount = data.data.totalCount
  },
  error : function(err){
    console.log(err);
  }
});
if(show_button(2131113)){
	
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
			mapShow: true, //显示无数据图片
			code: 0,
			userData1: ismgName,
			networkSendList: $api.networkSendList,
			networkSendCountList: $api.networkSendCountList,
			networkSendListExcelOut: $api.networkSendListExcelOut,
			loginType: accountType,
			data1: {
				"ismg_id": "",
				"end_date": getDay(0),
				"start_date": getDay(0),
				"offset": 1,
				"pageSize": 10,
			},
			data2: {
				"ismg_id": "",
				"end_date": getDay(0),
				"start_date": getDay(0),
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
			if($this.data2.offset !== 1 || $this.data2.pageSize !== 10) {
				$this.page()
			}
			if($this.loginType == '通道管理员') {
				laydate.render({
					elem: "#test", //指定元素
					// type: 'datetime',
					value: getDay(0),
					min: -6, //7天前
					max: getDay(0) //7天后
				});
				laydate.render({
					elem: "#test1", //指定元素
					// type: 'datetime',
					value: getDay(0),
					min: -6, //7天前
					max: getDay(0) //7天后
				});
				laydate.render({
					elem: "#test2", //指定元素
					//type: 'datetime',
					value: getDay(0),
					min: -6, //7天前
					max: getDay(0) //7天后
				});
				laydate.render({
					elem: "#test3", //指定元素
					//type: 'datetime',
					value: getDay(0),
					min: -6, //7天前
					max: getDay(0) //7天后
				});
			}
			//监听提交
			form.on("submit(demo5)", function(data) {
				// console.log(JSON.stringify(data.field));
				//$this.data1= data.field;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.data1.start_date = data.field.start_date;
				$this.data1.end_date = data.field.end_date;
				var text = $('.unlike2 .dropdown-selected1').val();
				if(text == '' || text == undefined) {
					$this.data1.ismg_id = ''
				} else {
					if(verify_ism($this.userData1, $('.unlike2 .dropdown-selected1'), text)) {
						$this.data1.ismg_id = $(".unlike2 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.addData($this.data1)
				return false;
			});
			form.on("submit(demo12)", function(data) {
				// console.log(JSON.stringify(data.field));
				$this.data2.offset = 1;
				$this.data2.pageSize = 10;
				$this.data2.start_date = data.field.start_date1;
				$this.data2.end_date = data.field.end_date1;
				var text1 = $('.unlike1 .dropdown-selected1').val();
				if(text1 == '' || text1 == undefined) {
					$this.data2.ismg_id = ''
				} else {
					if(verify_ism($this.userData1, $('.unlike1 .dropdown-selected1'), text1)) {
						$this.data2.ismg_id = $(".unlike1 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.addDataA($this.data2)
				return false;

			});

		});
		$('.table_tou h6').on('click', function() {
			$(this).addClass('addClass2').siblings().removeClass('addClass2');
			if($(this).text() == '网关发送情况列表') {
				$this.code = 0;
				$('.table_nav  form .list').removeClass('dn')
				$('.table_nav  form .list1').addClass('dn')
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
			} else if($(this).text() == '网关发送情况统计') {
				$this.code = 1;
				$('.table_nav  form .list1').removeClass('dn')
				$('.table_nav  form .list').addClass('dn')
				$this.data2.offset = 1;
				$this.data2.pageSize = 10;
				$this.addDataA($this.data2)
			}

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
								$this.data2.offset = obj.curr;
								$this.data2.pageSize = obj.limit;
								$this.addDataA($this.data2);
							}

						}
					}
				});
			});

		},
		//申请签名
		//shade:function() {
		//    $("#shade").fadeIn(300);
		//    $(".shade_con").fadeIn(300);
		//    var updata = {
		//        Info:'',
		//        code:0
		//    };
		//    //console.log(updata);
		//    // 将选中的ID放到触发器的盆子里，下面拿着用
		//    bus.$emit("getAid", updata);
		//},
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
		//修改
		//amend:function(val) {
		//    $("#shade").fadeIn(300);
		//    $(".shade_con").fadeIn(300);
		//    var updata = {
		//        Info:val,
		//        code:1
		//    };
		//    //console.log(updata);
		//    // 将选中的ID放到触发器的盆子里，下面拿着用
		//    bus.$emit("getAid", updata);
		//},
		////删除
		//del:function(id) {
		//    var $this = this;
		//    $("#shade2").fadeIn(300);
		//    $(".tips2").fadeIn(300);
		//    $this.ismgId = id;
		//},
		//添加数据
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.networkSendList,
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
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.networkSendCountList,
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
		bus.$on("getAid", function(updata) {
			//注意this指向问题
			$this.sellerid = updata.sellerid;
			$this.auctionid = updata.auctionid;

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
				window.open("../../html/resource/definition_gate.html", "_self");
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