/**
 * Created by Administrator on 2019/7/4 0004.
 */
/**
 * Created by Administrator on 2019/6/21 0021.
 */
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
var ismgName = null;
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
if(show_button(21214)){
	
}else{
	window.open("../../login.html", "_self");
}
/*详单列表*/
Vue.component("v-order-list", {
    template: '#list-template',
    data: function() {
        return {
            orderSubmitDetail: $api.orderSubmitDetail,
            queryDetail: $api.orderQueryDetail,
            allData: [],
            data2:{
                "start_date":getDay(0)+' 00:00:00',
                "end_date": getDay(0)+' 23:59:59',
                "offset": 1,
                "pageSize": 10,
                "submiter": "",
                "templateType": null,
                "msgContent":'',
                "msisdnType":'',
                "msisdn":'',
                "routeResult":null,
                "templateAction":null,
                "finalImsgId":'',
                "signature":'',
                "acceptResult":null,
                "acceptResultDesc":'',
                "max_cost_timemillis":'',
                "min_cost_timemillis":'',
            },
            totalCount:'0',
            userData1: ismgName,
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        //$this.addData($this.data2)
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //完整功能
          //  if($this.data2.offset !== 1 || $this.data2.pageSize !== 10){
                $this.page()
          //  }
            //监听提交
            form.on("submit(demo12)", function (data) {
                //console.log(data)
                $this.data2 = data.field
                let aa = [],bb = [],cc = [],dd = [],ee=[];
                $("input:checkbox[name='templateType']:checked").each(function() { // 遍历name=standard的多选框
                    aa.push($(this).val()*1);
                });
                if(aa.length == 0 ){
                    $this.data2.templateType = null;
                }else{
                    $this.data2.templateType = aa;
                }
                $("input:checkbox[name='routeResult']:checked").each(function() { // 遍历name=standard的多选框
                    bb.push($(this).val()*1);
                });
                if(bb.length == 0 ){
                    $this.data2.routeResult = null;
                }else{
                    $this.data2.routeResult = bb;
                }
                $("input:checkbox[name='templateAction']:checked").each(function() { // 遍历name=standard的多选框
                   cc.push($(this).val()*1);
                });
                if(cc.length == 0 ){
                    $this.data2.templateAction = null;
                }else{
                    $this.data2.templateAction = cc;
                }
                $("input:checkbox[name='acceptResult']:checked").each(function() { // 遍历name=standard的多选框
                    dd.push($(this).val()*1);
                });
                if(dd.length == 0 ){
                    $this.data2.acceptResult = null;
                }else{
                    $this.data2.acceptResult = dd;
                }
                $("input:checkbox[name='msisdnType']:checked").each(function() { // 遍历name=standard的多选框
                    ee.push($(this).val());
                });
                $this.data2.msisdnType = ee.join('|');
				        var text1 = $(".unlike3 .dropdown-selected1").val();
								if(text1 == '' || text1 == undefined) {
									$this.data2.finalImsgId = ''
								} else {
									if(verify_ism($this.userData1, $(".unlike3 .dropdown-selected1"), text1)) {
										$this.data2.finalImsgId = $(".unlike3 .dropdown-selected1").attr('data');
									} else {
										layer.msg('请选择下拉框内容！', {
											icon: 2,
											time: 1300 //2秒关闭（如果不配置，默认是3秒）
										});
										return false;
									}
								}
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addData($this.data2);
                //$this.page()
                return false;
            });
        });
        // }, 50);
    },
    methods: {
        shade:function(num){
            var $this = this;
            $this.data2.pm_order_submit_id = num;
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
            $.ajax({
                url: $this.queryDetail,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify($this.data2),
                headers: {
                    "Authorization": id,
                },
                success: function (data) {
                   // console.log(data.data);
                    if (data.statusCode == '401') {
                        window.open("../../login.html", "_self");
                    }else if(data.statusCode == '400'){
                        layer.msg(data.message,{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                    } else {
                        var updata = {
                            info:data.data
                        };
                        bus.$emit("getBb", updata);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });

        },
        page:function(){
            var $this = this;
            layui.use("laypage", function () {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page",
                    count: $this.totalCount,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    limits:[10,30,50,100,1000],
                    groups: 5,
                    prev: "<",
                    next: ">",
                    jump: function (obj, first) {
                        // console.log(obj);
                        if (first) {
                            return
                        } else {
                            $this.data2.offset = obj.curr;
                            $this.data2.pageSize = obj.limit;
                            $this.addData($this.data2);

                        }
                    }
                });
            });

        },
        addData:function(data1){
            var $this = this;
            $.ajax({
                url: $this.orderSubmitDetail,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(data1),
                headers: {
                    "Authorization": id,
                },
                beforeSend: function () {
                    $("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
                },
                complete: function (xhr) {
                    $("#load").remove();
                    // 获取相关Http Response header
                    if(xhr.getResponseHeader('Authorization') != null){
                        localStorage.setItem('id', xhr.getResponseHeader('Authorization'));
                    }
                },
                success: function (data) {
                    // console.log(data.data);
                    $("#load").remove();
                    $this.allData = [];
                    $this.totalCount = 0;
                    if (data.statusCode == '401') {
                        //localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    }else if(data.statusCode == '400'){
                        $this.mapShow = true
                        layer.msg(data.message,{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                    } else {

                        if(data.data.data.length == 0){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false

                        }
                        $this.allData = data.data.data
                        $this.totalCount = data.data.totalCount;
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                        if(data1.offset == 1 && data1.pageSize == 10){
                            $this.page()
                        }
                    }


                },
                error: function (err) {
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
    },
    filters: {
        limitTo: function (value) {
            if(value == ''|| value == null){
                return '-'
            }else{
                return value.substring(0,19)
            }

        }
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
        bus.$on("getCC", function(updata) {
            //注意this指向问题
            $this.addData($this.data2)
        });
    },
});
/*申请模版*/
Vue.component("v-template", {
    template: '#shade-template',
    data: function() {
        return {
            html:'',
            text:'',
            info:[],
            replenish:'',
            data1:[],
            showPrice:false,
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        //   setTimeout(() => {
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
        });

        //}, 100);
    },
    methods: {
        shanchu:function(){
            var $this = this;
            $this.info = [];
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getBb", function(updata) {
            //注意this指向问题
            $this.info = updata.info;
            $('.layui-tab-title li').removeClass('layui-this');
            $('.sw_cc').addClass('layui-this');
            $('.layui-tab-item').removeClass('layui-show');
            $('.sw_ww').addClass('layui-show');
            $("input:radio[name='template_type'][value='" +  $this.info.template_type + "']").prop("checked", "checked");
            $("input:radio[name='user_parent_rule'][value='" +  $this.info.user_parent_rule + "']").prop("checked", "checked");
            $("input:radio[name='template_action'][value='" +  $this.info.template_action + "']").prop("checked", "checked");
            if($this.info.template_biz_type == null){
                $this.info.template_biz_type = '1114'
            }
            $("input:radio[name='template_biz_type'][value='" +  $this.info.template_biz_type + "']").prop("checked", "checked");
            if($this.info.biz_expression_biz_type == null){
                $this.info.biz_expression_biz_type = '1112'
            }
            $("input:radio[name='biz_expression_biz_type'][value='" +  $this.info.biz_expression_biz_type + "']").prop("checked", "checked");
            $("input:radio[name='biz_expression_action'][value='" +  $this.info.biz_expression_action + "']").prop("checked", "checked");

            $("input:radio[name='accept_result'][value='" +  $this.info.accept_result + "']").prop("checked", "checked");
            $("input:radio[name='route_result'][value='" +  $this.info.route_result + "']").prop("checked", "checked");
            $("input:checkbox[name='msisdn_type']").prop('checked', false);
            if($this.info.msisdn_type == null){
                return
            }else{
               // console.log($this.info.msisdn_type.substring(1,$this.info.msisdn_type.length-1).split(","))
                $( $this.info.msisdn_type.substring(1,$this.info.msisdn_type.length-1).split(",")).each(function (i,dom){
                    var str = dom.trim()
                    $("input:checkbox[name='msisdn_type'][value='"+str+"']").prop("checked",true);
                });
            }
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })

        });
    },
});
