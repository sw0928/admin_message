/**
 * Created by Administrator on 2019/2/17 0017.
 */
/*敏感词管理*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131010)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-auditing-send", {
    template: '#auditing-template',
    data: function() {
        return {
            BizExpressionList: $api.BizExpressionList,
            BizExpressionInfo: $api.BizExpressionInfo,
            removeBizExpression:$api.removeBizExpression,
            bizExpressionListExcelOut:$api.bizExpressionListExcelOut,
            allData:[],
            content1:['拒绝','先审后发','先发后审','接受'],
            data1:{
                "actionType": [],
                "bizType": 0,
                "offset":1,
                "pageSize": 10,
                "param": "",
                "statusInt": 1
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
                form.on('radio(bizType)', function(data){
                    //console.log(data.elem); //得到radio原始DOM对象
                    //console.log(data.value); //被点击的radio的value值
                    if(data.value == "55"){
                        $('.conceal').removeClass('dn')
                    }else{
                        $('.conceal').addClass('dn');
                        $('.conceal input').val('');
                    }
                });
                form.on("submit(demo2)", function(data) {
                  //  console.log(data)
                    $this.data1 = data.field;
                    $this.data1.actionType = []
                    $("input:checkbox[name='actionType']:checked").each(function() { // 遍历name=standard的多选框
                        $this.data1.actionType.push($(this).val()*1);
                    });
                    $this.data1.offset = 1;
                    $this.data1.pageSize = 10;
                    $this.data1.bizType =  $this.data1.bizType == undefined? 0:$this.data1.bizType*1;
                    $this.data1.statusInt =  $this.data1.statusInt * 1
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
            $this.data1.expTitle = '敏感词';
            $this.data1.exp = 'true';
            $.ajax({
                url : $this.BizExpressionList,
                type : 'post',
                contentType: 'application/json',
                data : JSON.stringify($this.data1),
                headers : {
                    "Authorization":id,
                },
                success : function(res){
                    setTimeout(function(){
                        derive(res.data.expTaskId)
                    },1000);
                },
                error : function(err){
                    layer.msg(err.message,{
                        icon:2,
                        time: 1300 //2秒关闭（如果不配置，默认是3秒）
                    });
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
                url : $this.BizExpressionList,
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
            $.ajax({
                url : $this.removeBizExpression,
                type : 'post',
                async: false,
                data :{
                    'expressionId':num
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                   // console.log(data);
                    if (data.statusCode == '401') {
                      //  localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    } else {
                        if(data.data == true){
                            layer.open({
                                content: data.message
                                ,yes: function(index){
                                    layer.close(index);
                                    $this.addData($this.data1)
                                }
                            });
                        }else{
                            layer.open({
                                content:  data.message
                                ,yes: function(index){
                                    layer.close(index);

                                }
                            });
                        }
                    }

                },
                error : function(err){
                    console.log(err);
                }
            });
        },
        amend:function(num){
            var $this = this;
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
            $.ajax({
                url : $this.BizExpressionInfo,
                type : 'post',
                async: false,
                data :{
                    'expressionId':num
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                  //  console.log(data);
                    var updata = {
                        code:1,
                        info:data.data
                    };
                    //console.log(updata);
                    // 将选中的ID放到触发器的盆子里，下面拿着用
                    bus.$emit("getAid", updata);
                    //console.log($this.userData);
                    // $this.totalCount = data.data.totalCount
                },
                error : function(err){
                    console.log(err);
                }
            });

        },
        sw_btnsuss:function(){
            $(".tips_chid2").fadeIn(300);
            $(".tips2").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade2").fadeOut(300);
            $(".tips2").fadeOut(300);
        },
        sw_qued:function(){
            $("#shade2").fadeOut(300);
            $(".tips_chid2").fadeOut(300);
        }
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
Vue.component("v-template", {
    template: '#shade-template',
    data: function() {
        return {
            createBizExpression:$api.createBizExpression,
            editBizExpression:$api.editBizExpression,
            queryBizType:$api.queryBizType,
            content:[],
            content1:['拒绝','先审后发','先发后审','接受'],
            content2:['不可用','可用','测试'],
            html:'',
            text:'',
            info:[],
            code:0,
            replenish:'',
            data1:[],
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
                form.on("submit(demo6)", function(data) {
                    $this.data1 = data.field;
                    $this.data1.actionType = $this.data1.actionType*1
                    $this.data1.statusInt = $this.data1.statusInt*1
                    $this.data1.useType = $this.data1.useType*1
                    if ($this.data1.bizType == '') {
                        layer.msg('内容分类不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }else{
                        $this.data1.bizType = $this.data1.bizType*1
                    }
                    $.ajax({
                        url : $this.createBizExpression,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify($this.data1),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                           // console.log(data);
                            if (data.statusCode == '401') {
                              //  localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");

                            } else {
                                if(data.data == true){
                                    layer.open({
                                        content: data.message
                                        ,yes: function(index){
                                            layer.close(index);
                                            window.open("../../html/resource/sensitive_word.html", "_self");
                                        }
                                    });
                                }else{
                                    layer.open({
                                        content:  data.message
                                        ,yes: function(index){
                                            layer.close(index);

                                        }
                                    });
                                }
                            }

                        },
                        error : function(err){
                            console.log(err);
                        }
                    });
                     return false;
                });
                form.on("submit(demo7)", function(data) {
                    $this.data1 = data.field;
                    $this.data1.actionType = $this.data1.actionType*1
                    $this.data1.statusInt = $this.data1.statusInt*1
                    $this.data1.expressionId = $this.info.expressionId
                    $this.data1.useType = $this.data1.useType*1
                    if ($this.data1.bizType == '') {
                        layer.msg('内容分类不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }else{
                        $this.data1.bizType = $this.data1.bizType*1
                    }
                    $.ajax({
                        url : $this.editBizExpression,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify($this.data1),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                          //  console.log(data);
                            if (data.statusCode == '401') {
                              //  localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");

                            } else {
                                if(data.data == true){
                                    layer.open({
                                        content: data.message
                                        ,yes: function(index){
                                            layer.close(index);
                                            window.open("../../html/resource/sensitive_word.html", "_self");
                                        }
                                    });
                                }else{
                                    layer.open({
                                        content:  data.message
                                        ,yes: function(index){
                                            layer.close(index);

                                        }
                                    });
                                }
                            }

                        },
                        error : function(err){
                            console.log(err);
                        }
                    });
                    return false;
                });
            });

        //}, 100);
    },
    methods: {
        shanchu:function(){
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
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
               // console.log(data);
                $this.content = data.data;
                //console.log($this.userData);
                // $this.totalCount = data.data.totalCount
            },
            error : function(err){
                console.log(err);
            }
        });
        bus.$on("getAid", function(updata) {
            //注意this指向问题
          //  console.log(updata)
            $this.code = updata.code;
            $this.info = updata.info;
            $("#eventLevel option[value='"+$this.info.bizType+"']").prop("selected","selected");
            $("#eventLevelTwo option[value='"+$this.info.actionType+"']").prop("selected","selected");
            $("#eventLevelThree option[value='"+$this.info.statusInt+"']").prop("selected","selected");
            $("#eventLevelHour option[value='"+$this.info.useType+"']").prop("selected","selected");
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })

        });
    },
});