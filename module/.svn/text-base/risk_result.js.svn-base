/**
 * Created by Administrator on 2019/6/26 0026.
 */
/**
 * Created by Administrator on 2019/2/17 0017.
 */
/*敏感词管理*/
var id = $api.localStorageId;
var RiskRules=null;
$.ajax({
    url : $api.queryRiskRules,
    type : 'post',
    async: false,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
        "riskType": "",
        "statusInt": "",
    }),
    headers: {
        "Authorization": id,
    },
    success : function(data){
      //  console.log(data.data);
        RiskRules = data.data.data;
        //console.log($this.userData);
        // $this.totalCount = data.data.totalCount
    },
    error : function(err){
        console.log(err);
    }
});
//组件通信
var bus = new Vue();
if(show_button(2131611)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-auditing-send", {
    template: '#auditing-template',
    data: function() {
        return {
            queryRiskResults: $api.queryRiskResults,
            BizExpressionInfo: $api.BizExpressionInfo,
            removeBizExpression:$api.removeBizExpression,
            bizExpressionListExcelOut:$api.bizExpressionListExcelOut,
            allData:[],
            content1:RiskRules,
            data1:{
                "endTime": getDay(0) ,
                "startTime": getDay(0),
                "riskId": [],
                "riskType": '',
                "status": '',
                "offset":1,
                "pageSize": 10,
            },
            totalCount:'0',
            mapShow: false //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        //setTimeout(() => {
        $this.addData($this.data1);
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //完整功能
            if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                $this.page()
            }
            //监听提交
            form.on('checkbox(aa)', function(data){
               // console.log(data.value); //复选框value值，也可以通过data.elem.value得到
                var a = data.elem.checked;
                var value = data.value;
                if(a == true && value ==0){
                    $(".actionType").prop("checked", true);
                    form.render('checkbox');
                }else if(a == false && value ==0){
                    $(".actionType").prop("checked", false);
                    form.render('checkbox');
                }else if(a == false && value !=0){
                    $(".cheAll").prop("checked", false);
                    form.render('checkbox');
                }
            });
            form.on("submit(demo2)", function(data) {
               // console.log(data)
                $this.data1.startTime = data.field.startTime;
                $this.data1.riskType = data.field.riskType?data.field.riskType:'';
                $this.data1.endTime = data.field.endTime;
                $this.data1.status = data.field.status?data.field.status:'';
                $this.data1.riskId = []
                $("input:checkbox[name='riskId']:checked").each(function() { // 遍历name=standard的多选框
                    $this.data1.riskId.push($(this).val()*1);
                });
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
        shade:function(){
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
            var updata = {
                code:0,
                info:{
                    'actionType': -1,
                    'bizType': -1,
                    'expression': "",
                    'statusInt': -1,
                    'useType': 1
                }
            };
            //console.log(updata);
            // 将选中的ID放到触发器的盆子里，下面拿着用
            bus.$emit("getAid", updata);
        },
        importFile:function(){
            var $this =this;
            $this.data1.offset = 0;
            $this.data1.pageSize = 0;
            $.ajax({
                url : $this.bizExpressionListExcelOut,
                type : 'post',
                contentType: 'application/json',
                async: true,
                xhr: function () {
                    var xhr = new XMLHttpRequest()
                    xhr.responseType = 'blob'
                    return xhr
                },
                data : JSON.stringify($this.data1),
                headers : {
                    "Authorization":id,
                },
                success : function(res){
                    var blob = new Blob([res], {type: "application/vnd.ms-excel;charset=utf-8"});
                    var objectUrl = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    document.body.appendChild(a);
                    a.setAttribute('style', 'display:none');
                    a.setAttribute('href', objectUrl);
                    var filename="bizExpressionTable.xls";
                    a.setAttribute('download', filename);
                    a.click();
                    window.URL.revokeObjectURL(objectUrl);
                    document.body.removeChild(a)

                },
                error : function(err){

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
                        //console.log(obj);
                        if (first) {
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
        addData:function(data){
            var $this = this;
            $.ajax({
                url : $this.queryRiskResults,
                type : 'post',
                dataType : 'json',
                contentType: 'application/json',
                async: true,
                data : JSON.stringify(data),
                headers : {
                    "Authorization":id,
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
                success : function(res){
                    //  console.log(res);
                    $("#load").remove();
                    if (res.statusCode == '401') {
                        //localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    } else {
                        $this.allData = res.data.data;
                        if($this.allData == ''){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false
                        }
                        $this.totalCount = res.data.totalCount;
                        if(data.offset == 1 && data.pageSize == 10){
                            $this.page()
                        }
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }

                },
                error : function(err){
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
        del:function(num){
            var $this = this;
            //console.log(num)
            //layer.open({
            //    content: '你确定要清除该风控结果'+num+'确认状态？'
            //    ,shadeClose:true
            //    ,btn: ['确定', '取消']
            //    ,yes: function(index){
            //        layer.close(index);
            //        $.ajax({
            //            url : $this.deleteSubscribe,
            //            type : 'post',
            //            async: false,
            //            dataType: 'json',
            //            contentType: 'application/json',
            //            data: JSON.stringify({
            //                "empId": val,
            //                "typeId":num
            //            }),
            //            headers: {
            //                "Authorization": id,
            //            },
            //            success : function(data){
            //                layer.open({
            //                    content: data.message
            //                    ,yes: function(index){
            //                        layer.close(index);
            //                        $this.addData($this.data1)
            //                    }
            //                });
            //            },
            //            error : function(err){
            //                layer.open({
            //                    content: err.message
            //                    ,yes: function(index){
            //                        layer.close(index);
            //                    }
            //                });
            //            }
            //        });
            //
            //    }
            //    ,btn2: function(index, layero){
            //        layer.close(index);
            //        //return false 开启该代码可禁止点击该按钮关闭
            //    }
            //});
        },
        amend:function(num){
            var $this = this;
           // console.log(num)
            //layer.open({
            //    content: '你确定要解除该风控结果'+num+'清除状态？'
            //    ,shadeClose:true
            //    ,btn: ['确定', '取消']
            //    ,yes: function(index){
            //        layer.close(index);
            //        $.ajax({
            //            url : $this.deleteSubscribe,
            //            type : 'post',
            //            async: false,
            //            dataType: 'json',
            //            contentType: 'application/json',
            //            data: JSON.stringify({
            //                "empId": val,
            //                "typeId":num
            //            }),
            //            headers: {
            //                "Authorization": id,
            //            },
            //            success : function(data){
            //                layer.open({
            //                    content: data.message
            //                    ,yes: function(index){
            //                        layer.close(index);
            //                        $this.addData($this.data1)
            //                    }
            //                });
            //            },
            //            error : function(err){
            //                layer.open({
            //                    content: err.message
            //                    ,yes: function(index){
            //                        layer.close(index);
            //                    }
            //                });
            //            }
            //        });
            //
            //    }
            //    ,btn2: function(index, layero){
            //        layer.close(index);
            //        //return false 开启该代码可禁止点击该按钮关闭
            //    }
            //});
        },
        //sw_btnsuss:function(){
        //    $(".tips_chid2").fadeIn(300);
        //    $(".tips2").fadeOut(300);
        //},
        //sw_btnwrong:function(){
        //    $("#shade2").fadeOut(300);
        //    $(".tips2").fadeOut(300);
        //},
        //sw_qued:function(){
        //    $("#shade2").fadeOut(300);
        //    $(".tips_chid2").fadeOut(300);
        //}
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            $this.sellerid = updata.sellerid;
            $this.auctionid = updata.auctionid;
        });
    },
});
/*申请模版*/
