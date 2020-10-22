/**
 * Created by Administrator on 2019/2/17 0017.
 */
/*下单失败*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131012)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-fail", {
    template:'#right-template',
    data: function() {
        return {
            sellerid: "",
            queryBadWordList: $api.queryBadWordList,
            removeBadWord: $api.removeBadWord,
            badWordListExcelOut: $api.badWordListExcelOut,
            allData:[],
            name:'',
            data1:{
                "badWord": "",
                "isEnabled": -1,
                "offset": 1,
                "pageSize":10
            },
            totalCount:'0',
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            $this.addData($this.data1)
            layui.use(["form", "laypage","upload"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                var upload = layui.upload;
                form.render();
                //完整功能
                if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                    $this.page()
                }
                //执行实例
                 upload.render({
                    elem: '#test1' //绑定元素
                    ,url: '/upload/' //上传接口
                    ,done: function(res){
                        //上传完毕回调
                         console.log(res)
                    }
                    ,error: function(){
                        //请求异常回调
                    }
                });
                //监听提交
                form.on("submit(demo)", function(data) {
                    $this.data1.badWord = data.field.badWord.trim();
                    $this.data1.isEnabled = data.field.isEnabled*1;
                    $this.data1.offset = 1;
                    $this.data1.pageSize = 10;
                    $this.addData($this.data1)
                    return false;
                });
            });
       // }, 100);
    },
    methods: {
        shade:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            var updata = {
                code:0,
                name:''
            };
            bus.$emit("getAid", updata);
        },
        //导出
        importFile:function(){
            var $this =this;
            $this.data1.offset = 0;
            $this.data1.pageSize = 0;
            $this.data1.expTitle = '危险词';
            $this.data1.exp = 'true';
            $.ajax({
                url : $this.queryBadWordList,
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
        del:function(name) {
            var $this =this;
            $("#shade2").fadeIn(300);
            $(".tips2").fadeIn(300);
            $this.name = name
        },
        shanchu:function(){
            $("#shade2").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },
        imports:function(){
            $("#shade2").fadeIn(300);
            $(".shade_con1").fadeIn(300);
        },
        amend:function(name){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            var updata = {
                code:1,
                name:name
            };
            bus.$emit("getAid", updata);
        },
        sw_btnsuss:function() {
            var $this =this;
            $("#shade2").fadeOut(300);
            $(".tips2").fadeOut(300);
            $.ajax({
                url : $this.removeBadWord,
                type : 'post',
                async: false,
                data :{
                    'badWord':$this.name
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                   // console.log(data);
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
                            content: data.message
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
            var $this = this;
            $("#shade2").fadeOut(300);
            $(".tips2").fadeOut(300);
            $(".tips_chid2").fadeOut(300);
            $this.addData($this.data1)
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
                url : $this.queryBadWordList,
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
                    //console.log(res);
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
        //导入
        toLead:function(){

        }
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
            editBadWord: $api.editBadWord,
            queryBadWordInfo: $api.queryBadWordInfo,
            createBadWord: $api.createBadWord,
            mapShow: true, //显示无数据图片
            code:0,
            info: {
                "badWord": "",
                "badWordGroup": "",
                "badWordLevel": '',
                "badWordPinyin": "",
                "badWordRemap": "",
                "isEnabled": ''
            }
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
                form.on("submit(demo6)", function(data) {
                   // console.log(data)
                    data.field.isEnabled = data.field.isEnabled*1
                    data.field.badWordLevel = data.field.badWordLevel*1
                    data.field.badWordGroup = '';
                    $.ajax({
                        url : $this.createBadWord,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify( data.field),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                           // console.log(data);
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        window.open("../../html/resource/risk_list.html", "_self");
                                    }
                                });
                            }else{
                                layer.open({
                                    content: data.message
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
                    return false;
                });
                form.on("submit(demo7)", function(data) {
                   // console.log(data)
                    data.field.isEnabled = data.field.isEnabled*1
                    data.field.badWordLevel = data.field.badWordLevel*1
                    data.field.badWordGroup = '';
                    $.ajax({
                        url : $this.editBadWord,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify( data.field),
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
                                        window.open("../../html/resource/risk_list.html", "_self");
                                    }
                                });
                            }else{
                                layer.open({
                                    content: data.message
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

            if(updata.name == ''){
                $('.layui-inline .msisdn').attr("disabled", false ).css('background',' #fff');
                $this.info =  {
                    "badWord": "",
                    "badWordGroup": "",
                    "badWordLevel": '',
                    "badWordPinyin": "",
                    "badWordRemap": "",
                    "isEnabled": ''
                }
            }else{
                $('.layui-inline .msisdn').attr("disabled", true ).css('background',' #ECECEC');
                $.ajax({
                    url : $this.queryBadWordInfo,
                    type : 'post',
                    async: false,
                    data :{
                        'badWord':updata.name
                    },
                    headers : {
                        "Authorization":id,
                    },
                    success : function(data){
                        //console.log(data);
                        $this.info = data.data;
                    },
                    error : function(err){
                        console.log(err);
                    }
                });
            }
          //  setTimeout(() => {
                $("#eventLevel option[value='"+$this.info.isEnabled+"']").prop("selected","selected");

                layui.use("form", function() {
                    var form = layui.form;
                    form.render();
                });

           // }, 50);

        });
    },
});