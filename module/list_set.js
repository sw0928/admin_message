/**
 * Created by addistrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131410)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-signature", {
    template:'#order-template',
    data: function() {
        return {
            queryBlackList: $api.queryBlackList,
            delUrl:$api.removeSignature,
            allData:[],
            totalCount:'0',
            signId:'',
            review:'',
            mapShow: true, //显示无数据图片
            loginName:'',
            review:'',
            signName:'',
            data1:{
                "offset":1,
                "pageSize":10,
                "phone":""
            }
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
           // $this.addData($this.data1);
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                    $this.page()
                }
                //监听提交
                form.on("submit(demo5)", function(data) {
                    //console.log(JSON.stringify(data.field));
                    $this.data1.phone = data.field.phone.trim();
                    if($this.data1.phone == ''){
                        layer.msg('手机号码不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    $this.data1.offset = 1;
                    $this.data1.pageSize = 10;
                    $this.addData($this.data1);
                    //$this.page()
                    return false;
                });
            });
       // }, 100);
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
                url : $this.queryBlackList,
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
                       // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    }else if(res.statusCode == '400'){
                        $this.mapShow = true
                        layer.msg(res.message,{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                    }   else {
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
        //申请签名
        shade:function() {
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
            var updata = {
                code:0,
                phone:''
            };
            bus.$emit("getAid", updata);
        },
        imports:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con2").fadeIn(300);
        },
        //修改
        amend:function(val) {
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
            var updata = {
                code:1,
                phone:val
            };
            bus.$emit("getAid", updata);
        },
        //删除
        del:function(id,code) {
            var $this = this;
            $("#shade2").fadeIn(300);
            $(".tips2").fadeIn(300);
            $this.signId = id;
            $this.review = code;
        },
        //取消
        sw_btnwrong:function() {
            $("#shade2").fadeOut(300);
            $(".tips2").fadeOut(300);

        },
        //确定
        sw_btnsuss:function() {
            var $this = this;
            $(".tips2").fadeOut(300);
            if($this.review != '1'){
                $.ajax({
                    url : $this.delUrl,
                    type : 'post',
                    async: false,
                    data : {
                        'signId':$this.signId
                    },
                    headers : {
                        "Authorization":id,
                    },
                    success : function(data){
                        //console.log(data);
                        $this.mapShow = true
                    },
                    error : function(err){
                        //console.log(err);

                    }
                });
            }else{
                $this.mapShow = false
            }

            $(".tips_chid2").fadeIn(300);
        },
        //二级弹框确认
        sw_qued:function() {
            var $this = this;
            if($this.mapShow == false){
                $(".tips2").fadeOut(300);
                $(".tips_chid2").fadeOut(300);
                $("#shade2").fadeOut(300);
            }else{
                window.open("..html/workbench/signature.html", "_self");
            }
        },
        //查看审核
        examine:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getCc", function(updata) {
            //注意this指向问题
           $this.addData($this.data1)
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
            });

        });
    },
});
//模板匹配
Vue.component("v-del", {
    template:'#del-template',
    data: function() {
        return {
            code: "0",
            queryBlackInfo: $api.queryBlackInfo,
            editBlackList: $api.editBlackList,
            createBlackList: $api.createBlackList,
            info: {
                "msisdn": "",
                "wbnLevel": "",
                "remark":''
            },
            mapShow: true //显示无数据图片
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
                form.on("submit(demo9)", function(data) {
                   // console.log(data);
                    data.field.msisdnType = data.field.msisdnType*1
                    data.field.wbnLevel = '';
                    $.ajax({
                        url : $this.createBlackList,
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
                                        $this.shanchu()
//                                      var updata = {
//                                          cc:'1'
//                                      };
//                                      bus.$emit("getCc", updata);
                                       // window.open("../../html/resource/list_set.html", "_self");
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
                form.on("submit(demo10)", function(data) {
                   // console.log(data);
                    data.field.msisdnType = null;
                    data.field.wbnLevel = data.field.wbnLevel;
                    $.ajax({
                        url : $this.editBlackList,
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
                                        $this.shanchu()
                                        var updata = {
                                            cc:'1'
                                        };
                                        bus.$emit("getCc", updata);
                                        //window.open("../../html/resource/list_set.html", "_self");
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
      //  }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },
        //sw_btnsuss() {
        //    var $this = this;
        //    $(".tips_chid1").fadeIn(300);
        //    var id = $('#shade1 .tips1 .sw_btnsuss').attr('dataId');
        //    $this.field.signId = id;
        //    console.log($this.field);
        //    $.ajax({
        //        url : $this.url,
        //        type : 'post',
        //        dataType : 'json',
        //        contentType: 'application/json',
        //        async: false,
        //        data : JSON.stringify( $this.field),
        //        headers : {
        //            "Authorization":id,
        //        },
        //        success : function(data){
        //            console.log(data);
        //        },
        //        error : function(err){
        //            // console.log(err);
        //        }
        //    });
        //},
        sw_btnwrong:function() {
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);

        },
        //sw_qued() {
        //    $(".tips1").fadeOut(300);
        //    $(".tips_chid1").fadeOut(300);
        //    $("#shade1").fadeOut(300);
        //    $(".shade_con1").fadeOut(300);
        //   // window.open("..html/workbench/signature.html", "_self");
        //}
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            $this.code = updata.code;
            if(updata.phone == ''){
                $('.layui-inline .msisdn').attr("disabled", false ).css('background',' #fff');
                $this.info = {
                    "msisdn": "",
                    "wbnLevel": "",
                }
            }else{
                $('.layui-inline .msisdn').attr("disabled", true ).css('background',' #ECECEC');
                $.ajax({
                    url : $this.queryBlackInfo,
                    type : 'post',
                    async: false,
                    data :{
                        'phone':updata.phone
                    },
                    headers : {
                        "Authorization":id,
                    },
                    success : function(data){
                        console.log(data);
                        $this.info = data.data;

                    },
                    error : function(err){
                        console.log(err);
                    }
                });
            }
            $(document).ready(function(){
                layui.use("form", function() {
                    var form = layui.form;
                    form.render();
                });
            });
        });
    },
});
//导入黑名单
Vue.component("v-import", {
    template: '#import-template',
    data: function() {
        return {
            fileId: "",
            importBlack: $api.importBlack,
            submitBlack: $api.submitBlack,
            mapShow: true, //显示无数据图片
            code:0,
            data2:{
                "msisdnType": '',
                "wbnLevel":'',
                "remark": '',
                "fileId": ""
            },
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
            layui.use(["form", "upload"], function() {
                var form = layui.form;
                var upload = layui.upload;
                form.render();
                //执行实例
                $("#file").on("change",function (e) {
                    var e = e || window.event;
                    //获取 文件 个数 取消的时候使用
                    var files = e.target.files;
                   // console.log(files)
                    if(files.length>0){
                        // 获取文件名 并显示文件名
                        var fileName = files[0];
                        var myform = new FormData();
                        myform.append('multipartFile', fileName);
                        $.ajax({
                            url: $this.importBlack,
                            type: "POST",
                            data: myform,
                            dataType:'json',
                            async: false,
                            cache: false,
                            headers: {
                                "Authorization": id,
                            },
                            contentType: false,
                            processData: false,
                            success: function (res) {
                               // console.log(res)
                                if (res.statusCode == 200) {
                                    layer.open({
                                        content: res.data.message
                                        ,yes: function(index){
                                            layer.close(index);
                                           // $("#file").val("");
                                            $this.fileId =res.data.fileId;
                                        }
                                    });
                                } else {
                                    layer.open({
                                        content: res.message
                                        ,yes: function(index){
                                            layer.close(index);
                                            $("#file").val("");
                                            $this.fileId ='';
                                        }
                                    });
                                }
                            },
                            error: function (data) {
                            }
                        })
                    }else{
                        //清空文件名
                        $("#file").val("");
                    }
                });
                //监听提交
                form.on("submit(demo7)", function(data) {
                    $this.data2 = data.field;
                    if($this.fileId == ''){
                        layer.msg('请导入文件！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    $this.data2.fileId = $this.fileId
                    $.ajax({
                        url: $this.submitBlack,
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        async: false,
                        data: JSON.stringify($this.data2),
                        headers: {
                            "Authorization": id,
                        },
                        success: function (res) {
                            //  console.log(data);
                            if(res.statusCode == '200'){
                                layer.open({
                                    content: res.data
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
//                                      var updata = {
//                                          cc:'1'
//                                      };
//                                      bus.$emit("getCc", updata);
                                        //window.open("../../html/resource/route_list.html", "_self");
                                    }
                                });
                            }else if(res.statusCode == '401'){
                                window.open("../../login.html", "_self");
                            }else{
                                layer.open({
                                    content:  res.message
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
            });
      //  }, 100);
    },
    methods: {
        shanchu:function() {
            var $this = this;
            $("#shade3").fadeOut(300);
            $(".shade_con2").fadeOut(300);
            $("#file").val("");
            $("#msisdnType option[value='0']").prop("selected","selected");
            $("#wbnLevel option[value='1']").prop("selected","selected");
            $this.fileId ='';
            $this.data2 = {
                "msisdnType": '',
                "wbnLevel":'',
                "remark": '',
                "fileId": ""
            };
            setTimeout(function(){
                layui.use(["form", "laypage"], function() {
                    var form = layui.form;
                    var laypage = layui.laypage;
                    form.render();
                });
            }, 50);

        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(300);
            $(".shade_con2").fadeOut(300);
        }
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
//      bus.$on("getAid", function(updata) {
//          //注意this指向问题
//          $this.code = updata.code;
//        //  setTimeout(() => {
//              layui.use(["form", "laypage"], function() {
//                  var form = layui.form;
//                  var laypage = layui.laypage;
//                  form.render();
//              });
//         // }, 50);
//      });
    },
});

