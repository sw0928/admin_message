/*用户发送明细*/
var id = $api.localStorageId;
var accountType = localStorage.getItem('accountType');
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
if(show_button(21012)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-send-detail", {
	template: '#detail-template',
	data: function() {
		return {
			url: $api.UserSendDetailList,
			queryUserName: $api.queryUserName,
			queryIsmgName: $api.queryIsmgName,
			userSendDetailListExcelOut: $api.userSendDetailListExcelOut,
			content: ['短信移动成功计费', '短信联通成功计费', '短信电信成功计费', '短信移动提交计费', '短信联通提交计费', '短信电信提交计费',
				'彩信移动成功计费', '彩信联通成功计费', '彩信电信成功计费', '彩信联通提交计费', '彩信电信提交计费', 'USSD弹屏成功计费',
				'语音成功计费', '国际短信成功计费'
			],
			allData: [],
			userData: UserName,
			userData1: ismgName,
			data1: {
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
			sw_show_A:false,
			totalCount: "0",
			loginType: accountType,
			mapShow: true //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//zz(() => {
		//$this.addData($this.data1)
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//完整功能
			//if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
			$this.page()
			// }
			if($this.loginType == '通道管理员') {
				laydate.render({
					elem: "#test", //指定元素
					type: 'datetime',
					value: getDay(0) + ' 23:59:59',
					min: -6, //7天前
					max: getDay(0) + ' 23:59:59' //7天后
				});
				laydate.render({
					elem: "#test1", //指定元素
					type: 'datetime',
					value: getDay(0) + ' 23:59:59',
					min: -6, //7天前
					max: getDay(0) + ' 23:59:59' //7天后
				});
				$this.data1.howSend = '1'
			}
			form.on('checkbox(sw_show_A)', function(data) {
				$this.sw_show_A = data.elem.checked;
				if(data.elem.checked) {
					
				} else {
					$this.data1.taskSn = '';
					if($this.loginType == '通道管理员') {
						$this.data1.howSend = '1';
					}else{
						$this.data1.howSend = '';
					}					
					$(".dropdown1 .dropdown-selected1").val('');
					$(".dropdown1 .dropdown-selected1").attr('data','');
					$("#howSend option[value='"+$this.data1.howSend+"']").prop("selected","selected");
					layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
				}
				$this.allData = '';
						if($this.allData == '') {
							$this.mapShow = true
						} else {
							$this.mapShow = false
						}
						$this.totalCount = '0';
			});
			//监听提交
			form.on("submit(demo3)", function(data) {
				$this.data1 = data.field;
				var text = $(".dropdown .dropdown-selected").val();
				//console.log(text)
				if(text == '' || text == undefined) {
					$this.data1.userName = ''
				} else {
					if(verify_user1(UserName, $(".dropdown .dropdown-selected"), text)) {
						$this.data1.userName = $(".dropdown .dropdown-selected").attr('data');
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
				var text1 = $(".dropdown1 .dropdown-selected1").val();
				if(text1 == '' || text1 == undefined) {
					$this.data1.ismgId = ''
				} else {
					if(verify_ism($this.userData1, $(".dropdown1 .dropdown-selected1"), text1)) {
						$this.data1.ismgId = $(".dropdown1 .dropdown-selected1").attr('data');
					} else {
						layer.msg('请选择下拉框内容！', {
							icon: 2,
							time: 1300 //2秒关闭（如果不配置，默认是3秒）
						});
						return false;
					}
				}
				$this.data1.smsConten = data.field.smsConten.trim();
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
				//$this.page()
				return false;
			});
		});
		// }, 100);
	},
	methods: {
		shade: function() {
			var $this = this;
			$this.data1.startDate = $('#test').val();
			$this.data1.endDate = $('#test1').val();
			$this.data1.howSend = $('#howSend').val();
			$this.data1.receiptStatus = $('#receiptStatus').val();
			$this.data1.sendType = $('#sendType').val();
			var text = $(".dropdown .dropdown-selected").val();
			if(text == '' || text == undefined) {
				$this.data1.userName = ''
			} else {
				if(verify_user1(UserName, $(".dropdown .dropdown-selected"), text)) {
					$this.data1.userName = $(".dropdown .dropdown-selected").attr('data');
				} else {
					layer.msg('请选择下拉框内容！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				}
			}
			var text1 = $(".dropdown1 .dropdown-selected1").val();
			if(text1 == '' || text1 == undefined) {
				$this.data1.ismgId = ''
			} else {
				if(verify_ism($this.userData1, $(".dropdown1 .dropdown-selected1"), text1)) {
					$this.data1.ismgId = $(".dropdown1 .dropdown-selected1").attr('data');
				} else {
					layer.msg('请选择下拉框内容！', {
						icon: 2,
						time: 1300 //2秒关闭（如果不配置，默认是3秒）
					});
					return false;
				}
			}
			$("#shade").fadeIn(300);
			$(".shade_con").fadeIn(300);
			var updata = {
				obj: $this.data1
			};
			//console.log(updata);
			// 将选中的ID放到触发器的盆子里，下面拿着用
			bus.$emit("getBb", updata);
		},
		//导出
		importFile: function() {
			var $this = this;
			$this.data1.offset = 0;
			$this.data1.pageSize = 0;
			$this.data1.expTitle = '发送明细';
			$this.data1.exp = 'true';
			$.ajax({
				url: $this.url,
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
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.url,
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
					//  console.log(res);
					$("#load").remove();
					$this.allData = [];
					$this.totalCount = 0;
					if(res.statusCode == '401') {
						//  localStorage.setItem('url', window.location.pathname)
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

					}
					if(data.offset == 1 && data.pageSize == 10) {
						$this.page()
					}
					$(document).ready(function() {
						var height = $('#rightTable').get(0).scrollHeight;
						$('#leftMenu_Box').css('height', height)
					});
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

		},
		numTo: function(value) {
			if(value == '' || value == null) {
				return '-'
			} else {
				return value
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
/*回执统计*/
Vue.component("v-tong-ji", {
	template: '#tong-template',
	data: function() {
		return {
			userData: UserName,
			url: $api.queryUserSendDetailTotal,
			allData: [],
			data2: [],
			gross: 0,
			mapShow2: false //显示无数据图片
		};
	},
	mounted: function() {
		var $this = this;
		//setTimeout(() => {
		layui.use(["form", "laypage"], function() {
			var form = layui.form;
			var laypage = layui.laypage;
			form.render();
			//监听提交
		});
		// }, 100);
	},
	methods: {
		shanchu: function() {
			$("#shade").fadeOut(300);
			$(".shade_con").fadeOut(300);
		},
		percent: function(val) {
			var $this = this;
			return val / $this.gross
		},
		addData: function(data) {
			var $this = this;
			$.ajax({
				url: $this.url,
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

					$("#load").remove();
					if(res.statusCode == '401') {
						//  localStorage.setItem('url', window.location.pathname)
						window.open("../../login.html", "_self");

					} else {
						$this.allData = [];
						if(res.data.length == '0') {
							$this.mapShow2 = true
						} else {
							$this.mapShow2 = false;
							$this.gross = 0;
							for(var i = 0; i < res.data.length; i++) {
								$this.gross = $this.gross + res.data[i].STATISTICAL
							}
							for(var i = 0; i < res.data.length; i++) {
								res.data[i].STATISTICAL = res.data[i].STATISTICAL + '(' + ((res.data[i].STATISTICAL / $this.gross) * 100).toFixed(2) + '%' + ')'
							}
							$this.allData = res.data;
						}
					}

				},
				error: function(err) {
					console.log(err);
					$("#load").remove();
				}
			});
		},

	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getBb", function(updata) {
			//注意this指向问题
			$this.data2 = updata.obj;
			//console.log( $this.data2 )
			delete $this.data2.offset;
			delete $this.data2.pageSize;
			$this.addData($this.data2)
		});
	},
});