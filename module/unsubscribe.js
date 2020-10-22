/**
 * Created by Administrator on 2019/5/20 0020.
 */
/**
 * Created by addistrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131412)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-signature", {
    template:'#order-template',
    data: function() {
        return {
            queryUnsubscribeList: $api.queryUnsubscribeList,
            deleteUnsubscribeList:$api.deleteUnsubscribeList,
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
                "unsubscribeStartDate":getDay(0)+' 00:00:00',
                "unsubscribeEndDate":getDay(0)+' 23:59:59',
                "signature":"",
                "phone":""
            },
            phone:null,
            signature:null
        };
    },
    mounted:function() {
        var $this = this;
        //  setTimeout(() => {
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
            form.on("submit(demo5)", function(data) {
                //console.log(JSON.stringify(data.field));
                $this.data1 = data.field;
                $this.data1.phone = data.field.phone.trim();
                $this.data1.signature = data.field.signature.trim();
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
                url : $this.queryUnsubscribeList,
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
                        window.open("/admin/login.html", "_self");

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
        //申请签名
        //shade:function() {
        //    $("#shade1").fadeIn(300);
        //    $(".shade_con1").fadeIn(300);
        //    var updata = {
        //        code:0,
        //        phone:''
        //    };
        //    bus.$emit("getAid", updata);
        //},
        //修改
        amend:function(signature,phone) {
            var $this = this;
            $("#shade2").fadeIn(300);
            $(".tips2").fadeIn(300);
            $this.signature = signature;
            $this.phone = phone
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
                $.ajax({
                    url : $this.deleteUnsubscribeList,
                    type : 'post',
                    async: false,
                    dataType: 'json',
                    contentType: 'application/json',
                    data : JSON.stringify({
                        'phone':$this.phone,
                        'signature': $this.signature
                    }),
                    headers : {
                        "Authorization":id,
                    },
                    success : function(data){
                        //console.log(data);
                       // $(".tips_chid2").fadeIn(300);
                        layer.open({
                            content: data.message
                            ,yes: function(index){
                                layer.close(index);
                                $this.sw_qued()
                            }
                        });
                    },
                    error : function(err){
                        //console.log(err);
                        layer.open({
                            content: err.message
                            ,yes: function(index){
                                layer.close(index);
                            }
                        });
                    }
                });
        },
        //二级弹框确认
        sw_qued:function() {
            var $this = this;
             $(".tips2").fadeOut(300);
            // $(".tips_chid2").fadeOut(300);
             $("#shade2").fadeOut(300);
             $this.addData($this.data1);
        },
        //查看审核
        //examine:function(){
        //    $("#shade3").fadeIn(300);
        //    $(".shade_con3").fadeIn(300);
        //},

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
//模板匹配


