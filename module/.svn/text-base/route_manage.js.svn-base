/**
 * Created by Administrator on 2019/3/12 0012.
 */
/*接单模板*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131111)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-fail", {
    template: '#order-template',
    data: function () {
        return {
            queryRouteList: $api.queryRouteList,
            removeRouteConfig: $api.removeRouteConfig,
            queryRouteConfigInfo: $api.queryRouteConfigInfo,
            queryRouteConfigList: $api.queryRouteConfigList,
            data1: {
                "isPage": 0,
                "offset": 1,
                "pageSize": 10,
                "routeName": ""
            },
            data2: {
                "offset": 1,
                "pageSize": 10,
                "routeId": 0
            },
            totalCount: '0',
            totalCountTwo:'0',
            userData: [],
            delName: '',
            ismgId: '',
            routeId: '',
            Info: [],
            url: $api.orderFailList,
            allData: [],
            allDataTwo: [],
            showNo: false,
            showMap:false,
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            $this.addData($this.data1)
            $this.addData1($this.data2)
            layui.use(["form", "laypage"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                    $this.page1()
                }
                $this.page()
                //监听提交
                form.on("submit(demo)", function (data) {
                    //console.log(data);
                    $this.data1 = data.field;
                    if($this.data1.routeName == ''){

                    }else{
                        if(verify_route($this.userData,$(".dropdown .dropdown-selected"),$this.data1.routeName)){

                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    $this.data1.offset = 1;
                    $this.data1.pageSize = 10;
                    $this.data1.isPage = 0;
                    $this.addData($this.data1)
                    $this.page()
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
                code: 0,
                id:'',
                name:''
            };
            bus.$emit("getRouter", updata);
        },
        shade1:function(){
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
            var updata = {
                code: 0,
                info:{
                    'autoChange': "是",
                    'ismgId': '',
                    'ismgName': "",
                    'operator': "0",
                    'priority': "",
                    'ratio': '',
                    'receiptResend': "是",
                    'routeId': '',
                    'routeName': ""
                }
            };
            bus.$emit("getAid", updata);
        },
        router:function(val){
            var $this = this;
            $this.data2.routeId = val*1;
            $this.data2.offset = 1;
            $this.data2.pageSize = 10;
            $this.addData1($this.data2)
        },
        //修改
        amend:function(id,name) {
            var $this = this;
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            var updata = {
                code: 1,
                id:id,
                name:name
            };
            bus.$emit("getRouter", updata);
        },
        //修改
        amend1:function(routeId,ismgId) {
            var $this = this;
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
            $.ajax({
                url : $this.queryRouteConfigInfo,
                type : 'post',
                async: false,
                data :{
                    'routeId':routeId,
                    'ismgId':ismgId
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                    console.log(data);
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
        del:function(routeId, ismgId,name) {
            var $this = this;
            $this.delName = name
            $this.routeId = routeId
            $this.ismgId = ismgId
            $("#shade2").fadeIn(300);
            $(".tips2").fadeIn(300);
        },
        shanchu:function(){
            $("#shade2").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },
        imports:function(){
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
        },
        sw_btnsuss:function() {
            var $this = this;
            $.ajax({
                url: $this.removeRouteConfig,
                type: 'post',
                async: false,
                data: {
                    'routeId': $this.routeId,
                    'ismgId': $this.ismgId
                },
                headers: {
                    "Authorization": id,
                },
                success: function (data) {
                    console.log(data);
                    if(data.data == true){
                        layer.open({
                            content: data.message
                            ,yes: function(index){
                                layer.close(index);
                                $("#shade2").fadeOut(300);
                                $(".tips2").fadeOut(300);
                                $this.addData1($this.data2)
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
                error: function (err) {
                    console.log(err);
                }
            });
        },
        sw_btnwrong:function() {
            $("#shade2").fadeOut(300);
            $(".tips2").fadeOut(300);
        },
        //分页
        page:function(){
            var $this = this;
            layui.use("laypage", function () {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page",
                    count: $this.totalCount,
                    layout: ["prev", "next"],
                    groups: 1,
                    prev: "<",
                    next: ">",
                    jump: function (obj, first) {
                        //console.log(obj);
                        $this.data1.offset = obj.curr;
                        $this.data1.pageSize = obj.limit;
                        if (first) {
                            return
                        } else {
                            $this.addData($this.data1);
                        }
                    }
                });
            });

        },
        //分页
        page1:function(){
            var $this = this;
            layui.use("laypage", function () {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page1",
                    count: $this.totalCountTwo,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    limits:[10,30,50,100,1000],
                    groups: 5,
                    prev: "<",
                    next: ">",
                    jump: function (obj, first) {
                        //console.log(obj);
                        $this.data2.offset = obj.curr;
                        $this.data2.pageSize = obj.limit;
                        if (first) {
                            return
                        } else {
                            $this.addData1($this.data2);
                        }
                    }
                });
            });

        },
        //添加数据
        addData:function(data1){
            var $this = this;
            $.ajax({
                url: $this.queryRouteList,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                async: false,
                data: JSON.stringify(data1),
                headers: {
                    "Authorization": id,
                },
                success: function (data) {
                    if (data.statusCode == '401') {
                        //localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    } else {
                        $this.allData = data.data.data;
                        if ($this.allData == '') {
                            $this.showMap = true
                        } else {
                            $this.showMap = false
                        }
                        $this.totalCount = data.data.totalCount

                    }

                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
        addData1:function(data1){
            var $this = this;
            $.ajax({
                url: $this.queryRouteConfigList,
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
                    $("#load").remove();
                    if (data.statusCode == '401') {
                        //localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    } else {
                        $this.allDataTwo = data.data.data;
                        if ($this.allDataTwo == '') {
                            $this.showNo = true
                        } else {
                            $this.showNo = false
                        }
                        $this.totalCountTwo = data.data.totalCount
                        if(data1.offset == 1 && data1.pageSize == 10){
                            $this.page1()
                        }
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }

                },
                error: function (err) {
                    console.log(err);
                    $("#load").remove();
                }
            });
        }
    },
    created:function() {
        var $this = this;
        $.ajax({
            url: $this.queryRouteList,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify({
                "isPage": 1,
                "routeName": ""
            }),
            headers: {
                "Authorization": id,
            },
            success: function (data) {
               // console.log(data)
                $this.userData = data.data;
            },
            error: function (err) {
                console.log(err);
            }
        });
        //接收器，接收上面的两个ID
        bus.$on("getCC", function (updata) {
            //注意this指向问题
            $this.addData($this.data1)
            $this.addData1($this.data2)
        });

    },
});
//下单限速新增修改
Vue.component("v-rate", {
    template: '#rate-template',
    data: function () {
        return {
            userData1: [],
            createRoute: $api.createRoute,
            editRoute: $api.editRoute,
            Info: [],
            mapShow: true, //显示无数据图片
            code: 0,
            routeId:'',
            name: '',
            allData: []
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            layui.use(["form", "laypage"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //监听提交
                form.on("submit(demo9)", function (data) {
                   if( data.field.routeName.length !== 0){
                       $.ajax({
                           url: $this.createRoute,
                           type: 'post',
                           async: false,
                           data: data.field,
                           headers: {
                               "Authorization": id,
                           },
                           success: function (data) {
                             //  console.log(data);
                               if (data.statusCode == '401') {
                                   //localStorage.setItem('url', window.location.pathname)
                                   window.open("../../login.html", "_self");
                               } else {
                                   layer.open({
                                       content: '新增完成！'
                                       , yes: function (index) {
                                           layer.close(index);
                                           $this.shanchu()
                                           var updata = {
                                               code:0,
                                           };
                                           bus.$emit("getCC", updata);
                                           //window.open("../../html/resource/route_manage.html", "_self");
                                       }
                                   });
                               }

                           },
                           error: function (err) {
                               console.log(err);
                           }
                       });
                   }else{
                       layer.open({
                           content: '路由名称不能为空！'
                           , yes: function (index) {
                               layer.close(index);
                           }
                       });
                   }

                    return false;
                });
                form.on("submit(demo10)", function (data) {
                    if( data.field.routeName.length !== 0){
                        data.field.routeId = $this.routeId;
                        $.ajax({
                            url: $this.editRoute,
                            type: 'post',
                            async: false,
                            data: data.field,
                            headers: {
                                "Authorization": id,
                            },
                            success: function (data) {
                              //  console.log(data);
                                if (data.statusCode == '401') {
                                   // localStorage.setItem('url', window.location.pathname)
                                    window.open("../../login.html", "_self");
                                } else {
                                    layer.open({
                                        content: '修改完成！'
                                        , yes: function (index) {
                                            layer.close(index);
                                            $this.shanchu()
                                            var updata = {
                                                code:0,
                                            };
                                            bus.$emit("getCC", updata);
                                           // window.open("../../html/resource/route_manage.html", "_self");
                                        }
                                    });
                                }

                            },
                            error: function (err) {
                                console.log(err);
                            }
                        });
                    }else{
                        layer.open({
                            content: '路由名称不能为空！'
                            , yes: function (index) {
                                layer.close(index);
                            }
                        });
                    }

                    return false;
                });
            });
       // }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade3").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        },
        edit:function(){

        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getRouter", function (updata) {
            //注意this指向问题
            $this.code = updata.code;
            $this.name = updata.name;
            $this.routeId = updata.id;
            // console.log($this.Info)
        });
    },
});

Vue.component("v-import", {
    template: '#import-template',
    data: function () {
        return {
            userData1: [],
            userData2: [],
            queryRouteList: $api.queryRouteList,
            queryIsmgName:$api.queryIsmgName,
            editRouteConfig:$api.editRouteConfig,
            createRouteConfig: $api.createRouteConfig,
            info: [],
            mapShow: true, //显示无数据图片
            code: 0,
            templateId: '',
            allData: []
        };
    },
    mounted:function() {
        var $this = this;
       //setTimeout(() => {
            layui.use(["form", "laypage"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //监听提交
                form.on("submit(demo6)", function (data) {
                    var text = $(".dropdown1 .dropdown-selected1").val();
                    if (text == '') {
                        layer.msg('请选择路由！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_route($this.userData1, $(".dropdown1 .dropdown-selected1"),text)){
                            data.field.routeId = $(".dropdown1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    var text1 = $(".dropdown2 .dropdown-selected2").val();
                    if (text1 == '') {
                        layer.msg('请选择网关！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_ism($this.userData2,$(".dropdown2 .dropdown-selected2"),text1)){
                             data.field.ismgId = $(".dropdown2 .dropdown-selected2").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    data.field.autoChange = data.field.autoChange * 1
                    data.field.operator = data.field.operator * 1
                    data.field.receiptResend = data.field.receiptResend * 1
                    $.ajax({
                        url: $this.createRouteConfig,
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        async: false,
                        data: JSON.stringify(data.field),
                        headers: {
                            "Authorization": id,
                        },
                        success: function (data) {
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
                                            $this.shanchu()
                                            var updata = {
                                                code:0,
                                            };
                                            bus.$emit("getCC", updata);
                                           // window.open("../../html/resource/route_manage.html", "_self");
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
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    return false;
                });
                form.on("submit(demo8)", function (data) {
                    var text = $(".dropdown1 .dropdown-selected1").val();
                    if (text == '') {
                        layer.msg('请选择路由！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_route($this.userData1,$(".dropdown1 .dropdown-selected1"),text)){
                            data.field.routeId = $(".dropdown1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    var text1 = $(".dropdown2 .dropdown-selected2").val();
                    if (text1 == '') {
                        layer.msg('请选择网关！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_ism($this.userData2,$(".dropdown2 .dropdown-selected2"),text1)){
                            data.field.ismgId = $(".dropdown2 .dropdown-selected2").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    data.field.oldIsmgId = $this.info.ismgId;
                    data.field.autoChange = data.field.autoChange * 1
                    data.field.operator = data.field.operator * 1
                    data.field.receiptResend = data.field.receiptResend * 1
                    $.ajax({
                        url: $this.editRouteConfig,
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        async: false,
                        data: JSON.stringify(data.field),
                        headers: {
                            "Authorization": id,
                        },
                        success: function (data) {
                          //  console.log(data);
                            if (data.statusCode == '401') {
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
                            } else {
                                if(data.statusCode == 200){
                                    layer.open({
                                        content: data.message
                                        ,yes: function(index){
                                            layer.close(index);
                                            $this.shanchu()
                                            var updata = {
                                                code:0,
                                            };
                                            bus.$emit("getCC", updata);
                                           // window.open("../../html/resource/route_manage.html", "_self");
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
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    return false;
                });
            });
       // }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        $.ajax({
            url: $this.queryRouteList,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify({
                "isPage": 1,
                "routeName": ""
            }),
            headers: {
                "Authorization": id,
            },
            success: function (data) {
                //console.log(data)
                $this.userData1 = data.data;
            },
            error: function (err) {
                console.log(err);
            }
        });
        $.ajax({
            url : $this.queryIsmgName,
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
                $this.userData2 = data.data;
                //console.log($this.userData);
                // $this.totalCount = data.data.totalCount
            },
            error : function(err){
                console.log(err);
            }
        });
        //接收器，接收上面的两个ID
        bus.$on("getAid", function (updata) {
            //注意this指向问题
            $this.code = updata.code;
            // console.log($this.Info)
            $this.info = updata.info;
           // console.log($('input:radio[name=autoChange]'))
            $("#eventLevel option[value='"+$this.info.operator+"']").prop("selected","selected");
            if($this.info.autoChange == '是'){
                $('input:radio[name=autoChange]')[0].checked = true;
            }else{
                $('input:radio[name=autoChange]')[1].checked = true;
            }
            if($this.info.receiptResend == '是'){
                $('input:radio[name=receiptResend]')[0].checked = true;
            }else{
                $('input:radio[name=receiptResend]')[1].checked = true;
            }
            $('.dropdown-selected1').val($this.info.routeName)
            $('.dropdown-selected2').val($this.info.ismgName)
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
        });
    },
});
