/**
 * Created by Administrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var accountType = localStorage.getItem('accountType');
var id = $api.localStorageId;
//var UserName=null;
//$.ajax({
//url : $api.queryUserName,
//type : 'post',
//async: false,
//data :{
//  'loginName':""
//},
//headers : {
//  "Authorization":id,
//},
//success : function(data){
//  //console.log(data);
//  UserName = data.data;
//  //console.log($this.userData);
//  // $this.totalCount = data.data.totalCount
//},
//error : function(err){
//  console.log(err);
//}
//});
//组件通信
var bus = new Vue();
if(show_button(21112)){
	
}else{
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
//			userData1: UserName,
			AccesslogList: $api.AccesslogList,
			AccesslogTotalList: $api.AccesslogTotalList,
			AccesslogDetail: $api.AccesslogDetail,
			loginType: accountType,
			data1: {
				"content": "",
				"userId": "",
				"type": "",
				"end": getDay(0)+' 23:59:59',
				"start": getDay(0)+' 00:00:00',
				"offset": 1,
				"pageSize": 10,
			},
			data2: {
				"userId": "",
				"end": getDay(0),
				"start": getDay(0),
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
			//监听提交
			form.on("submit(demo5)", function(data) {
				// console.log(JSON.stringify(data.field));
				//$this.data1= data.field;
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.data1.start = data.field.start;
				$this.data1.end = data.field.end;
				$this.data1.type = data.field.type;
				$this.data1.userId = data.field.userId;
				$this.addData($this.data1)
				return false;
			});
			form.on("submit(demo12)", function(data) {
				// console.log(JSON.stringify(data.field));
				$this.data2.offset = 1;
				$this.data2.pageSize = 10;
				$this.data2.start = data.field.start1;
				$this.data2.end = data.field.end1;
				$this.data2.userId = data.field.userIdOne;
				$this.addDataA($this.data2)
				return false;

			});

		});
		$('.table_tou h6').on('click', function() {
			$(this).addClass('addClass2').siblings().removeClass('addClass2');
			if($(this).text() == '访问记录明细') {
				$this.code = 0;
				$('.table_nav  form .list').removeClass('dn')
				$('.table_nav  form .list1').addClass('dn')
				$this.data1.offset = 1;
				$this.data1.pageSize = 10;
				$this.addData($this.data1)
			} else if($(this).text() == '访问记录统计') {
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
		discharged:function(num,val){
			var $this = this;
			if(num == 1) {
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
							url: $this.AccesslogDetail,
							type: 'post',
							async: false,
							dataType: 'json',
							//contentType: 'application/json',
							data: {
								"logId": val,
								"code": value1,
								"type": num
							},
							headers: {
								"Authorization": id,
							},
							success: function(res) {
								//console.log(res);								
								let peopleArray=[]								
								for(let i in res.data){								
								let obj={
								nickname:i,
								realName:res.data[i]
								}
								peopleArray.push(obj)
								}
								$("#shade3").fadeIn(300);
                $(".shade_con1").fadeIn(300);
                var updata = {
                    Info:peopleArray
                };
                //console.log(updata);
                // 将选中的ID放到触发器的盆子里，下面拿着用
                bus.$emit("getAa", updata);
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
							//$this.addData($this.data1)
							return false; //点击按钮按钮不想让弹层关闭就返回false

						},			
						close:function(index)
						{
						layer.close(index);
						//$this.addData($this.data1)
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
							url: $this.AccesslogDetail,
							type: 'post',
							async: false,
							dataType: 'json',
							//contentType: 'application/json',
							data: {
								"logId": val,
								"code": value2,
								"type": num
							},
							headers: {
								"Authorization": id,
							},
							success: function(res) {
								//console.log(res)
								let peopleArray=[]								
								for(let i in res.data){								
								let obj={
								nickname:i,
								realName:res.data[i]
								}
								peopleArray.push(obj)
								}
								$("#shade3").fadeIn(300);
                $(".shade_con1").fadeIn(300);
                var updata = {
                    Info:peopleArray
                };
                //console.log(updata);
                // 将选中的ID放到触发器的盆子里，下面拿着用
                bus.$emit("getAa", updata);
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
							//$this.addData($this.data1)
							return false; //点击按钮按钮不想让弹层关闭就返回false

						},		
						close:function(index)
						{
						layer.close(index);
						//$this.addData($this.data1)
						return false;//点击按钮按钮不想让弹层关闭就返回false
						}
					});			
				}
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
//		importFile: function() {
//			var $this = this;
//			$this.data1.offset = 0;
//			$this.data1.pageSize = 0;
//			$this.data1.expTitle = '网关发送情况列表';
//			$this.data1.exp = 'true';
//			$.ajax({
//				url: $this.networkSendList,
//				type: 'post',
//				contentType: 'application/json',
//				data: JSON.stringify($this.data1),
//				headers: {
//					"Authorization": id,
//				},
//				success: function(res) {
//					setTimeout(function() {
//						derive(res.data.expTaskId)
//					}, 1000);
//				},
//				error: function(err) {
//					layer.msg(err.message, {
//						icon: 2,
//						time: 1300 //2秒关闭（如果不配置，默认是3秒）
//					});
//				}
//			});
//		},
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
				url: $this.AccesslogList,
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
						if(res.data.data == null) {
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
		},
		addDataA: function(data) {
			var $this = this;
			$.ajax({
				url: $this.AccesslogTotalList,
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
						if(res.data.data == null) {
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
Vue.component("v-paste", {
	template: '#paste-template',
	data: function() {
		return {
			queryInferUserInfo: $api.queryInferUserInfo,
			mapShow: true, //显示无数据图片
			loginName:'',
			accountPlant:'',
			data2:[],
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
			$("#shade3").fadeOut(300);
			$(".shade_con1").fadeOut(300);
			//$this.data2 = [];
		},
	},
	created: function() {
		var $this = this;
		//接收器，接收上面的两个ID
		bus.$on("getAa", function(updata) {
			//注意this指向问题
			$this.data2 = updata.Info;
			console.log($this.data2)
			
		});
	},
});