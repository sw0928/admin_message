/**
 * Created by Administrator on 2019/2/17 0017.
 */
/*下单失败*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131011)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-fail", {
    template:'#right-template',
    data: function() {
        return {
            querySubmitLimitInfo: $api.querySubmitLimitInfo,
            querySubmitLimitList: $api.querySubmitLimitList,
            removeSubmitLimit: $api.removeSubmitLimit,
            allData:[],
            totalCount:'0',
            data1:{
                "amount": '',
                "intervalMinute": '',
                "limitType": '',
                "offset": 1,
                "pageSize": 10
            },
            sn:'',
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
                form.on("submit(demo)", function(data) {
                    //console.log(JSON.stringify(data.field));
                    $this.data1 = data.field;
                    $this.data1.offset = 1;
                    $this.data1.pageSize = 10;
                    $this.addData($this.data1)
                    return false;
                });
            });
       // }, 100);
    },
    methods: {
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
                url : $this.querySubmitLimitList,
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
                   // console.log(res);
                    $("#load").remove();
                    if (res.statusCode == '401') {
                       // localStorage.setItem('url', window.location.pathname)
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
        shade:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            var updata = {
                code:0,
                elect:1,
                info:{
                    'amount': '',
                    'intervalMinute': '1',
                    'intervalHour': '1',
                    'intervalDay': '1',
                    'limitType': '',
                    'sn': ''
                }
            };
            bus.$emit("getAid", updata);
        },
        del:function(val) {
            var $this= this;
            $("#shade2").fadeIn(300);
            $(".tips2").fadeIn(300);
            $this.sn = val;
        },
        amend:function(val){
            var $this= this;
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            $.ajax({
                url : $this.querySubmitLimitInfo,
                type : 'post',
                async: false,
                data :{
                    'sn':val
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                  //  console.log(data);
                    var updata = {
                        code:1,
                        elect:null,
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
        sw_btnsuss:function() {
            var $this= this;
            $.ajax({
                url : $this.removeSubmitLimit,
                type : 'post',
                async: false,
                data :{
                    'sn':$this.sn
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                  //  console.log(data);
                        if(data.data == true){
                            layer.open({
                                content: data.message
                                ,yes: function(index){
                                    layer.close(index);
                                    $("#shade2").fadeOut(300);
                                    $(".tips2").fadeOut(300);
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


                },
                error : function(err){
                    console.log(err);
                }
            });
        },
        sw_btnwrong:function() {
            $("#shade2").fadeOut(300);
            $(".tips2").fadeOut(300);
        },
        sw_qued:function() {
            $("#shade2").fadeOut(300);
            $(".tips_chid2").fadeOut(300);
        },
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
//下单限速新增修改
Vue.component("v-rate", {
    template:'#rate-template',
    data: function() {
        return {
            createSubmitLimit: $api.createSubmitLimit,
            editSubmitLimit: $api.editSubmitLimit,
            mapShow: true, //显示无数据图片
            code :'0',
            info: [],
            elect:1,
            days:['1','2','3','4','5','6','7'],
            hour:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            mark:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23',
            '24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45',
            '46','47','48','49','50','51','52','53','54','55','56','57','58','59']
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //监听提交
                form.on('select(elect)', function(data){
                   // console.log(data)
                    if(data.value == 1){
                        $this.elect = 1;
                    }
                    if(data.value == 2){
                        $this.elect = 2;
                    }
                    if(data.value == 3){
                        $this.elect = 3;
                    }
                })
                form.on("submit(demo6)", function(data) {
                    delete data.field.elect
                    if($this.elect == 1){
                        delete data.field.intervalHour;
                        delete data.field.intervalDay
                    }
                    if($this.elect == 2){
                        delete data.field.intervalMinute;
                        delete data.field.intervalDay
                    }
                    if($this.elect == 3){
                        delete data.field.intervalMinute;
                        delete data.field.intervalHour
                    }
                    if(data.field.amount == ''){
                        layer.msg('请输入数量！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    if(data.field.limitType == ''){
                        layer.msg('请选择限速类别！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    $.ajax({
                        url : $this.createSubmitLimit,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify(data.field),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                         //   console.log(data);
                            if (data.statusCode == '401') {
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");

                            } else {
                                if(data.data == true){
                                    layer.open({
                                        content: data.message
                                        ,yes: function(index){
                                            layer.close(index);
                                            window.open("../../html/resource/rate_limiting.html", "_self");
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
                    data.field.sn = $this.info.sn;
                    delete data.field.elect
                    if($this.elect == 1){
                        delete data.field.intervalHour;
                        delete data.field.intervalDay
                    }
                    if($this.elect == 2){
                        delete data.field.intervalMinute;
                        delete data.field.intervalDay
                    }
                    if($this.elect == 3){
                        delete data.field.intervalMinute;
                        delete data.field.intervalHour
                    }
                    $.ajax({
                        url : $this.editSubmitLimit,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify(data.field),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                           // console.log(data);
                            if (data.statusCode == '401') {
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");

                            } else {
                                if(data.data == true){
                                    layer.open({
                                        content: data.message
                                        ,yes: function(index){
                                            layer.close(index);
                                            window.open("../../html/resource/rate_limiting.html", "_self");
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
        shanchu:function() {
            $("#shade3").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        }
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            $this.code = updata.code;
            $this.info = updata.info;
            if(updata.elect == 1){
                $this.elect = 1
            }else{
                if(updata.info.intervalDay != 0){
                    $this.elect = 3;
                    $("#eventLevelFive option[value='"+updata.info.intervalDay+"']").prop("selected","selected");
                };
                if(updata.info.intervalHour != 0){
                    $this.elect = 2;
                    $("#eventLevelHour option[value='"+updata.info.intervalHour+"']").prop("selected","selected");
                };
                if(updata.info.intervalMinute != 0){
                    $this.elect = 1;
                    $("#eventLevelThree option[value='"+updata.info.intervalMinute+"']").prop("selected","selected");
                }
            }
            $("#eventLevel option[value='"+$this.info.limitType+"']").prop("selected","selected");
            $("#eventLevelTwo option[value='"+$this.elect+"']").prop("selected","selected");
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
        });
    },
});