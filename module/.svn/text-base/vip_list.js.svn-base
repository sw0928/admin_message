/**
 * Created by addistrator on 2019/2/17 0017.
 */
/*接单模板*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131411)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-fail", {
    template: '#order-template',
    data: function() {
        return {
            queryVipMsisdnList: $api.queryVipMsisdnList,
            removeVipMsisdn: $api.removeVipMsisdn,
            queryUserName:$api.queryUserName,
            allData:[],
            userData:[],
            totalCount:'0',
            sn:'',
            data1:{
                "msisdn": "",
                "offset": 1,
                "pageSize": 10,
                "signtxt": "",
                "userId": ""
            },
            mapShow: false //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
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
                    var text1 = $(".dropdown .dropdown-selected").val();
                    if (text1 == '') {
                        $this.data1.userId = '';
                    } else {
                        if(verify_user1($this.userData,$(".dropdown .dropdown-selected"),text1)){
                            $this.data1.userId = $(".dropdown .dropdown-selected").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    $this.data1.msisdn = data.field.msisdn.trim();
                    $this.data1.signtxt = data.field.signtxt.trim();
                    $this.data1.offset = 1;
                    $this.data1.pageSize = 10;
                    $this.addData($this.data1);
                    return false;
                });
            });
    },
    methods: {
        //分页
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
        //添加数据
        addData:function(data){
            var $this = this;
            $.ajax({
                url : $this.queryVipMsisdnList,
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
                //    console.log(res);
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
        shade:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            var updata = {
                code:0,
                sn:''
            };
            bus.$emit("getAid", updata);
        },
        del:function(val) {
            var $this =this;
            $("#shade2").fadeIn(300);
            $(".tips2").fadeIn(300);
            $this.sn = val
        },
        shanchu:function(){
            $("#shade2").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },
        amend:function(val){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            var updata = {
                code:1,
                sn:val
            };
            bus.$emit("getAid", updata);
        },
        sw_btnsuss:function() {
            var $this = this;
            $("#shade2").fadeOut(300);
            $(".tips2").fadeOut(300);
            $.ajax({
                url : $this.removeVipMsisdn,
                type : 'post',
                async: false,
                data :{
                    'sn':$this.sn
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
            $("#shade2").fadeOut(500)
            $(".tips2").fadeOut(500);
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
        $.ajax({
            url : $this.queryUserName,
            type : 'post',
            async: true,
            data :{
                'loginName':""
            },
            headers : {
                "Authorization":id,
            },
            success : function(data){
                //console.log(data);
                $this.userData = data.data;
                //console.log($this.userData);
                // $this.totalCount = data.data.totalCount
            },
            error : function(err){
                console.log(err);
            }
        });
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
    template: '#rate-template',
    data: function() {
        return {
            queryVipMsisdnInfo: $api.queryVipMsisdnInfo,
            editVipMsisdn: $api.editVipMsisdn,
            createVipMsisdn: $api.createVipMsisdn,
            queryUserName: $api.queryUserName,
            queryBizType:$api.queryBizType,
            info:{
                'contentTypeId': "",
                'enabled': "",
                'msisdn': "",
                'remark': "",
                'signtxt': '',
                'submitLimit': "",
                'templateId': '',
                'templateTypeId': "",
                'userId': ""
            },
            data1:null,
            userData1:[],
            mapShow: true, //显示无数据图片
            code:0,
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
                  //  console.log(data)
                    $this.data1 = data.field;
                    var reg = /^[0-9]*$/;
                    if (!reg.test($this.data1.templateId)) {
                        layer.msg('模版ID只能填写数字！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    $this.data1.contentTypeId = $this.data1.contentTypeId;
                    $this.data1.enabled = $this.data1.enabled;
                    $this.data1.submitLimit = $this.data1.submitLimit;
                    $this.data1.templateId = $this.data1.templateId;
                    $this.data1.templateTypeId = $this.data1.templateTypeId;
                    var text1 = $(".dropdown1 .dropdown-selected1").val();
                    if (text1 == '') {
                        $this.data1.userId = '';
                        layer.msg('用户名不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_user1($this.userData1,$(".dropdown1 .dropdown-selected1"),text1)){
                            $this.data1.userId = $(".dropdown1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    $.ajax({
                        url : $this.createVipMsisdn,
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
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        window.open("../../html/resource/vip_list.html", "_self");
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
                            if(data.statusCode == '401'){
                              //  localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
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
                    var reg = /^[0-9]*$/;
                    if (!reg.test($this.data1.templateId)) {
                        layer.msg('模版ID只能填写数字！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    $this.data1.sn = $this.info.sn;
                    $this.data1.contentTypeId = $this.data1.contentTypeId;
                    $this.data1.enabled = $this.data1.enabled;
                    $this.data1.submitLimit = $this.data1.submitLimit;
                    $this.data1.templateId = $this.data1.templateId;
                    $this.data1.templateTypeId = $this.data1.templateTypeId;
                    var text1 = $(".dropdown1 .dropdown-selected1").val();
                    if (text1 == '') {
                        $this.data1.userId = '';
                        layer.msg('用户名不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_user1($this.userData1,$(".dropdown1 .dropdown-selected1"),text1)){
                            $this.data1.userId = $(".dropdown1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    $.ajax({
                        url : $this.editVipMsisdn,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify($this.data1),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                         //   console.log(data);
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        window.open("../../html/resource/vip_list.html", "_self");
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
                            if(data.statusCode == '401'){
                             //   localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
                            }
                        },
                        error : function(err){
                            console.log(err);
                        }
                    });
                    return false;
                });
            });
     //   }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade3").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        }
    },
    created:function() {
        var $this = this;
        $.ajax({
            url : $this.queryUserName,
            type : 'post',
            async: false,
            data :{
                'loginName':""
            },
            headers : {
                "Authorization":id,
            },
            success : function(data){
                //console.log(data);
                $this.userData1 = data.data;
                //console.log($this.userData);
                // $this.totalCount = data.data.totalCount
            },
            error : function(err){
                console.log(err);
            }
        });
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
            },
            error : function(err){
                console.log(err);
            }
        });
        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            $this.code = updata.code;
            if(updata.sn == ''){
                $this.info={
                    'contentTypeId': "",
                    'enabled': "0",
                    'msisdn': "",
                    'remark': "",
                    'signtxt': '',
                    'submitLimit': "限制",
                    'templateId': '',
                    'templateTypeId': "1",
                    'userId': ""
                }
            }else{
                $.ajax({
                    url : $this.queryVipMsisdnInfo,
                    type : 'post',
                    async: false,
                    data :{
                        'sn':updata.sn
                    },
                    headers : {
                        "Authorization":id,
                    },
                    success : function(data){
                      //  console.log(data);
                        $this.info = data.data;
                    },
                    error : function(err){
                        console.log(err);
                    }
                });
            }
            if($this.info.submitLimit == '限制'){
                $("#eventLevelHour option[value='0']").prop("selected","selected");
            }else{
                $("#eventLevelHour option[value='1']").prop("selected","selected");
            }
            $("#eventLevel option[value='"+$this.info.templateTypeId+"']").prop("selected","selected");
            $("#eventLevelTwo option[value='"+$this.info.contentTypeId+"']").prop("selected","selected");
            $("#eventLevelThree option[value='"+$this.info.enabled+"']").prop("selected","selected");
            $('.dropdown-selected1').val($this.info.loginName)
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            });
        });
    },
});

