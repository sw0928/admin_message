/**
 * Created by addistrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131313)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-signature", {
    template: '#signature-template',
    data: function() {
        return {
            sellerid: "",
            url: $api.signatureList,
            delUrl:$api.removeSignature,
            allData:[],
            totalCount:'0',
            signId:'',
            review:'',
            mapShow: true, //显示无数据图片
            loginName:'',
            review:'',
            signName:''
        };
    },
    mounted:function() {
        var $this = this;
     //   setTimeout(() => {
            //$this.addData(1,10,'','','');
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                $this.page()
                //监听提交
                form.on("submit(demo5)", function(data) {
                    //console.log(JSON.stringify(data.field));
                    //$this.loginName = data.field.loginName;
                    //$this.review= data.field.review;
                    //$this.signName = data.field.signName;
                    //$this.addData(1,10,$this.loginName,$this.review,$this.signName);
                    //$this.page()
                    return false;
                });
            });
       // }, 100);
    },
    methods: {
        //分页
        page:function(){
            var $this =this;
            layui.use("laypage", function() {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page",
                    count: $this.totalCount,
                    layout: ["prev", "page", "next","limit","skip"],
                    limits:[10,30,50,100,1000],
                    groups: 5,
                    prev: "<",
                    next: ">",
                    jump: function(obj,first) {
                        //console.log(obj);
                        if(first){
                            return
                        }else{
                            //$this.addData(obj.curr,obj.limit,$this.loginName,$this.review,$this.signName)
                        }
                    }
                });
            });

        },
        //申请签名
        shade:function() {
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
        },
        //修改
        amend:function(val) {
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
            $('#shade1 .tips1 .sw_btnsuss').attr('dataId',val);
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
                window.open("../../html/workbench/signature.html", "_self");
            }
        },
        //查看审核
        examine:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
        },
        //添加数据
        //addData:function(num,limit,loginName,review,signName){
        //    var $this = this;
        //    $.ajax({
        //        url : $this.url,
        //        type : 'post',
        //        dataType : 'json',
        //        contentType: 'application/json',
        //        async: false,
        //        data : JSON.stringify({
        //            "offset": num,
        //            "pageSize":limit,
        //            "loginName": loginName,
        //            "review": review,
        //            "signName": signName
        //        }),
        //        headers : {
        //            "Authorization":id,
        //        },
        //        success : function(data){
        //            // console.log(data);
        //            if(data.statusCode == '401'){
        //               // localStorage.setItem('url', window.location.pathname)
        //                window.open("/admin/login.html", "_self");
        //            }else{
        //                $this.allData = data.data.data;
        //                // console.log($this.allData);
        //                $this.totalCount = data.data.totalCount
        //            }
        //
        //        },
        //        error : function(err){
        //            console.log(err);
        //        }
        //    });
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
/*申请签名*/
Vue.component("v-template-signature", {
    template: '#shade-template',
    data: function() {
        return {
            sellerid: "",
            url: $api.signatureApply,
            getTrade:$api.getTrade,
            field:null,
            blocTrade:null,
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //监听提交
                form.on("submit(demo6)", function(data) {
                   // console.log(data);
                    var reg = /^[0-9]*$/;
                    if (!reg.test(data.field.extensionNumber)) {
                        layer.msg('只能填写数字！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    if (data.field.signName == "") {
                        $this.mapShow = false;

                        $(".tips").fadeIn(300);
                        $(".shade_con").fadeOut(300);
                    } else {
                        $this.mapShow = true;
                        $(".tips").fadeIn(300);
                        $this.field = data.field;
                        $(".shade_con").fadeOut(300);
                    }

                    return false;
                });
            });
      //  }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
        },
        sw_btnsuss:function() {
            var $this = this;
            $(".tips_chid").fadeIn(300);
            //if( $this.mapShow == true){
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
            //
            //        },
            //        error : function(err){
            //            console.log(err);
            //        }
            //    });
            //}else{
            //    return
            //}
        },
        sw_qued:function() {
            var $this = this;
            $(".tips").fadeOut(300);
            $(".tips_chid").fadeOut(300);
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
            //if($this.mapShow == true){
            //    window.open("/admin/html/workbench/signature.html", "_self");
            //}
        },
        sw_btnwrong:function() {
            //$("#shade").fadeOut(300);
            //$(".shade_con").fadeOut(300);
            $(".tips").fadeOut(300);
            $(".shade_con").fadeIn(300);
        }
    },
    created:function() {
        var $this = this;
        $.ajax({
            url : $this.getTrade,
            type : 'get',
            dataType : 'json',
            contentType: 'application/json',
            async: false,
            headers : {
                "Authorization":id,
            },
            success : function(data){
                //console.log(data);
                $this.blocTrade = data.data;
                //console.log($this.blocTrade)
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
//模板匹配
Vue.component("v-del", {
    template: '#del-template',
    data: function() {
        return {
            sellerid: "",
            url: $api.editSignature,
            field:{
                status: "0",
                user: "1231",
                signId:''
            },
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
                form.on("submit(demo9)", function(data) {
                 //   console.log(data);
                    $(".tips1").fadeIn(300);
                    //$(".shade_con1").fadeOut(100);
                    $this.field.status = data.field.status;
                    $this.field.user = data.field.user;
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
        sw_btnsuss:function() {
            var $this = this;
            $(".tips_chid1").fadeIn(300);
            var id = $('#shade1 .tips1 .sw_btnsuss').attr('dataId');
            $this.field.signId = id;
           // console.log($this.field);
            //$.ajax({
            //    url : $this.url,
            //    type : 'post',
            //    dataType : 'json',
            //    contentType: 'application/json',
            //    async: false,
            //    data : JSON.stringify( $this.field),
            //    headers : {
            //        "Authorization":id,
            //    },
            //    success : function(data){
            //        console.log(data);
            //    },
            //    error : function(err){
            //        // console.log(err);
            //    }
            //});
        },
        sw_btnwrong:function() {
            //$("#shade1").fadeOut(300);
            //$(".shade_con1").fadeOut(300);
            $(".tips1").fadeOut(300);
        },
        sw_qued:function() {
            $(".tips1").fadeOut(300);
            $(".tips_chid1").fadeOut(300);
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);
            //window.open("/admin/html/workbench/signature.html", "_self");
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
//签名详情
Vue.component("v-details", {
    template: '#details-template',
    data: function() {
        return {
            sellerid: "",
            url: $api.SPTarget,
            mapShow: true, //显示无数据图片
            allData: [
                {
                    id: "10004",
                    username: "杜甫",
                    email: "xianxin@layui.com",
                    sex: "男",
                    city: "浙江杭州",
                    sign: "人生恰似一场修行",
                    experience: "116",
                    ip: "192.168.0.8",
                    logins: "108",
                    joinTime: "2016-10-14"
                }
            ]
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                laypage.render({
                    elem: "page1",
                    count: 100,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    groups: 9,
                    prev: "<",
                    next: ">",
                    jump: function(obj) {
                        //console.log(obj);
                    }
                });
                laypage.render({
                    elem: "page2",
                    count: 100,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    groups: 9,
                    prev: "<",
                    next: ">",
                    jump: function(obj) {
                        //console.log(obj);
                    }
                });
            });
       // }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade3").hide();
            $(".shade_con3").hide();
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
