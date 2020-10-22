/**
 * Created by addistrator on 2019/3/12 0012.
 */
/*接单模板*/
var id = $api.localStorageId;
var UserName=null,BizType=null,LocationList=null,RouteList=null,IsmgName=null;
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
    success: function (data) {
        //console.log(data);
        UserName = data.data;
    },
    error: function (err) {
        console.log(err);
    }
});
$.ajax({
    url : $api.queryBizType,
    type : 'post',
    async: false,
    data :{
    },
    headers : {
        "Authorization":id,
    },
    success : function(data){
       // console.log(data);
        BizType = data.data;
    },
    error : function(err){
        console.log(err);
    }
});
$.ajax({
    url : $api.queryLocationList,
    type : 'post',
    async: false,
    data :{
    },
    headers : {
        "Authorization":id,
    },
    success : function(data){
        //console.log(data);
        LocationList = data.data;
    },
    error : function(err){
        console.log(err);
    }
});
$.ajax({
    url: $api.queryRouteList,
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
        RouteList = data.data;
    },
    error: function (err) {
        console.log(err);
    }
});
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
        IsmgName = data.data;
        //console.log($this.userData);
        // $this.totalCount = data.data.totalCount
    },
    error : function(err){
        console.log(err);
    }
});
//组件通信
var bus = new Vue();
if(show_button(2131112)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-fail", {
    template:'#order-template',
    data: function () {
        return {
            queryRouteRuleList: $api.queryRouteRuleList,
            queryRouteRuleInfo: $api.queryRouteRuleInfo,
            removeRouteRule: $api.removeRouteRule,
            data1: {
                "asUserId":'',
                "bizType": '',
                "keyword": "",
                "locationId": '',
                "msisdnType": '',
                "offset": 1,
                "operator": '',
                "pageSize": 10,
                "routeId": '',
                "userId": ''
            },
            totalCount: '0',
            userData: UserName,
            delName: '',
            templateId: '',
            Info: [],
            url: $api.orderFailList,
            allData: [],
            content: BizType,
            content2: LocationList,
            content3:RouteList,
            showNo: false,
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            $this.addData($this.data1)
            layui.use(["form", "laypage"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                    $this.page()
                }
                //监听提交
                form.on("submit(demo)", function (data) {
                    //console.log(data.typeof($this.data1.statusInt));
                    $this.data1 = data.field;
                    var text = $(".dropdown .dropdown-selected").val();
                    if (text == '') {
                        $this.data1.userId = ''
                    } else {
                        if(verify_user1(UserName,$(".dropdown .dropdown-selected"),text)){
                            $this.data1.userId = $(".dropdown .dropdown-selected").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text1 = $(".dropdown1 .dropdown-selected1").val();
                    if (text1 == '') {
                        $this.data1.asUserId = ''
                    } else {
                        if(verify_user1(UserName, $(".dropdown1 .dropdown-selected1"),text1)){
                            $this.data1.asUserId = $(".dropdown1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    var text2 = $(".dropdown2 .dropdown-selected2").val();
                    if (text2 == '') {
                        $this.data1.locationId = ''
                    } else {
                        if(verify_loca(LocationList,$(".dropdown2 .dropdown-selected2"),text2)){
                            $this.data1.locationId =$(".dropdown2 .dropdown-selected2").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text3 = $(".unlike8 .dropdown-selected2").val();
                    if (text3 == '') {
                        $this.data1.routeId = ''
                    } else {
                        if(verify_route(RouteList,$(".unlike8 .dropdown-selected2"),text3)){
                            $this.data1.routeId =$(".unlike8 .dropdown-selected2").attr('data');
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
                    $this.addData($this.data1)
                    //$this.page()
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
                Info: {
                    'asuser': "",
                    'asuserId':'',
                    'bizType': '',
                    'bizTypeName': null,
                    'expression': null,
                    'ismgId': '',
                    'ismgName': null,
                    'locationid': '',
                    'loginName': "",
                    'msgContent': null,
                    'msisdnType': '',
                    'operator': '0',
                    'priority': '',
                    'proPper': null,
                    'routeId': '',
                    'routeName': null,
                    'routeRuleId': null,
                    'signName': null,
                    'userId': ''
                },
                code: 0
            };
            bus.$emit("getAid", updata);
        },
        //修改
        amend:function(val) {
            var $this = this;
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            $.ajax({
                url: $this.queryRouteRuleInfo,
                type: 'post',
                async: false,
                data: {
                    'routeRuleId': val
                },
                headers: {
                    "Authorization": id,
                },
                success: function (data) {
                   // console.log(data);
                    $this.Info = data.data;
                    var updata = {
                        Info: $this.Info,
                        code: '1'
                    };
                    //console.log(updata);
                    // 将选中的ID放到触发器的盆子里，下面拿着用
                    bus.$emit("getAid", updata);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
        del:function(val) {
            var $this = this;
            $this.delName = val
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
                url: $this.removeRouteRule,
                type: 'post',
                async: false,
                data: {
                    'routeRuleId': $this.delName
                },
                headers: {
                    "Authorization": id,
                },
                success: function (data) {
                   // console.log(data);
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
                error: function (err) {
                    console.log(err);
                }
            });
        },
        sw_btnwrong:function() {
            $("#shade2").fadeOut(500);
            $(".tips2").fadeOut(500);
        },
        //sw_qued() {
        //    var $this = this;
        //    $("#shade2").fadeOut(300);
        //    $(".tips_chid2").fadeOut(300);
        //    $this.addData($this.data1)
        //    //window.open("../html/resource/take_orders.html", "_self");
        //},
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
        //添加数据
        addData:function(data1){
            var $this = this;
            $.ajax({
                url: $this.queryRouteRuleList,
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
                   // console.log(data);
                    $("#load").remove();
                    if (data.statusCode == '401') {
                       // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    } else {
                        $this.allData = data.data.data;
                        // console.log($this.allData);
                        if ($this.allData == '') {
                            $this.showNo = true
                        } else {
                            $this.showNo = false
                        }
                        $this.totalCount = data.data.totalCount
                        if(data1.offset == 1 && data1.pageSize == 10){
                            $this.page()
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
    filters: {
        numTo: function (value) {
            if(value == ''|| value == null){
                return ''
            }else{
                return value
            }

        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getCc", function (updata) {
            //注意this指向问题
            $this.addData($this.data1)
        });

    },
});
//下单限速新增修改
Vue.component("v-rate", {
    template:'#rate-template',
    data: function () {
        return {
            userData1: UserName,
            createRouteRule: $api.createRouteRule,
            editRouteRule: $api.editRouteRule,
            content:BizType,
            content1:LocationList,
            content2:RouteList,
            content3:IsmgName,
            Info: [],
            mapShow: true, //显示无数据图片
            code: 0,
            allData:[]
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
                    var text = $(".unlike .dropdown-selected1").val();
                    if (text == '') {
                        layer.msg('用户名不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_user1(UserName,$(".unlike .dropdown-selected1"),text)){
                            data.field.userId = $(".unlike .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text1 = $(".unlike1 .dropdown-selected1").val();
                    if (text1 == '') {
                        data.field.asUserId = ''
                    } else {
                        if(verify_user1(UserName,$(".unlike1 .dropdown-selected1"),text1)){
                            data.field.asUserId = $(".unlike1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    var text2 = $(".unlike4 .dropdown-selected1").val();
                    if (text2 == '') {
                        data.field.locationId = ''
                    } else {
                        if(verify_loca(LocationList,$(".unlike4 .dropdown-selected1"),text2)){
                            data.field.locationId = $(".unlike4 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text3 = $(".unlike2 .dropdown-selected1").val();
                    if (text3 == '') {
                        data.field.routeId = ''
                    } else {
                        if(verify_route(RouteList,$(".unlike2 .dropdown-selected1"),text3)){
                            data.field.routeId = $(".unlike2 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text4 = $(".unlike3 .dropdown-selected1").val();
                    if (text4 == '') {
                        data.field.ismgId = ''
                    } else {
                        if(verify_ism(IsmgName,$(".unlike3 .dropdown-selected1"),text4)){
                            data.field.ismgId = $(".unlike3 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    data.field.bizType = data.field.bizType * 1
                    data.field.msisdnType = data.field.msisdnType * 1
                    data.field.operator = data.field.operator * 1
                    if (data.field.routeId == '' && data.field.ismgId == ''&& data.field.asUserId =='' ) {
                        layer.alert('跟随用户、路由或网关不能同时为空！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId !== '' && data.field.ismgId !== ''&& data.field.asUserId !==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId !== '' && data.field.ismgId == ''&& data.field.asUserId !==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId !== '' && data.field.ismgId !== ''&& data.field.asUserId ==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId == '' && data.field.ismgId !== ''&& data.field.asUserId !==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }
                    if (data.field.routeId == '') {
                        delete data.field.routeId
                    }
                    if (data.field.ismgId == '') {
                        delete data.field.ismgId
                    }
                    $.ajax({
                        url: $this.createRouteRule,
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
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                                cc:'1'
                                            };
                                            bus.$emit("getCc", updata);
                                       //window.open("../../html/resource/route_list.html", "_self");
                                    }
                                });
                            }else if(data.statusCode == '401'){
                                window.open("../../login.html", "_self");
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
                    return false;
                });
                form.on("submit(demo8)", function (data) {
                    var text = $(".unlike .dropdown-selected1").val();
                    if (text == '') {
                        layer.msg('用户名不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    } else {
                        if(verify_user1(UserName,$(".unlike .dropdown-selected1"),text)){
                            data.field.userId = $(".unlike .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text1 = $(".unlike1 .dropdown-selected1").val();
                    if (text1 == '') {
                        data.field.asUserId = ''
                    } else {
                        if(verify_user1(UserName,$(".unlike1 .dropdown-selected1"),text1)){
                            data.field.asUserId = $(".unlike1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    var text2 = $(".unlike4 .dropdown-selected1").val();
                    if (text2 == '') {
                        data.field.locationId = ''
                    } else {
                        if(verify_loca(LocationList,$(".unlike4 .dropdown-selected1"),text2)){
                            data.field.locationId = $(".unlike4 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text3 = $(".unlike2 .dropdown-selected1").val();
                    if (text3 == '') {
                        data.field.routeId = ''
                    } else {
                        if(verify_route(RouteList,$(".unlike2 .dropdown-selected1"),text3)){
                            data.field.routeId = $(".unlike2 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    var text4 = $(".unlike3 .dropdown-selected1").val();
                    if (text4 == '') {
                        data.field.ismgId = ''
                    } else {
                        if(verify_ism(IsmgName,$(".unlike3 .dropdown-selected1"),text4)){
                            data.field.ismgId = $(".unlike3 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    };
                    data.field.bizType = data.field.bizType * 1
                    data.field.msisdnType = data.field.msisdnType * 1
                    data.field.operator = data.field.operator * 1
                    data.field.routeRuleId = $this.Info.routeRuleId
                    if (data.field.routeId == '' && data.field.ismgId == ''&& data.field.asUserId =='' ) {
                        layer.alert('跟随用户、路由或网关不能同时为空！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId !== '' && data.field.ismgId !== ''&& data.field.asUserId !==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId !== '' && data.field.ismgId == ''&& data.field.asUserId !==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId !== '' && data.field.ismgId !== ''&& data.field.asUserId ==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }else if(data.field.routeId == '' && data.field.ismgId !== ''&& data.field.asUserId !==''){
                        layer.alert('跟随用户、路由或网关只能选择一项！', { icon: 2 });
                        return false;
                    }
                    if (data.field.routeId == '') {
                        delete data.field.routeId
                    }
                    if (data.field.ismgId == '') {
                        delete data.field.ismgId
                    }
                    $.ajax({
                        url: $this.editRouteRule,
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
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            cc:''
                                        };
                                        bus.$emit("getCc", updata);
                                       // window.open("../../html/resource/route_list.html", "_self");
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
                            if (data.statusCode == '401') {
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
                            }

                        },
                        error: function (err) {
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
            $("#shade3").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        },
        edit:function(){

        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getAid", function (updata) {
            //注意this指向问题
            $this.code = updata.code;
            $this.Info = updata.Info;
            // console.log($this.Info)
            //setTimeout(() => {
            if($this.Info.province == '' || $this.Info.province == null){
                var text = '';
            }else{
                text = $this.Info.province + $this.Info.proPper;
            }
            $("#eventLevel option[value='" + $this.Info.bizType + "']").prop("selected", "selected");
            $("#eventLevelTwo option[value='" + $this.Info.msisdnType + "']").prop("selected", "selected");
            $("#eventLevelThree option[value='" + $this.Info.operator + "']").prop("selected", "selected");
            $('.unlike .dropdown-selected1').val($this.Info.loginName)
            $('.unlike1 .dropdown-selected1').val($this.Info.asuser)
            $('.unlike2 .dropdown-selected1').val($this.Info.routeName)
            $('.unlike3 .dropdown-selected1').val($this.Info.ismgName)
            $('.unlike4 .dropdown-selected1').val(text)
                layui.use("form", function () {
                    var form = layui.form;
                    form.render();
                })
           // }, 50);
        });
    },
});
