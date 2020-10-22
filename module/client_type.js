/**
 * Created by Administrator on 2019/6/21 0021.
 */
var UserName=null,IsmgName=null;
var id = $api.localStorageId;
$.ajax({
    url : $api.queryUserName,
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
        UserName = data.data;
        //console.log($this.userData);
        // $this.totalCount = data.data.totalCount
    },
    error : function(err){
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
if(show_button(2121212)){
	
}else{
	window.open("../../login.html", "_self");
}
/*详单列表*/
Vue.component("v-order-list", {
    template: '#list-template',
    data: function() {
        return {
            orderTypeList: $api.orderTypeList,
            allData: [],
            data2:{
                "end_date": getDay(0),
                "start_date": getDay(0),
                "offset": 1,
                "ismg_id": "",
                "pageSize": 10,
                "user_id": "",
                "templateType": "",
                "signature":''
            },
            userData:UserName,
            ismgList:IsmgName,
            totalCount:'0',
            mapShow: false //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        $this.addData($this.data2)
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //完整功能
            if($this.data2.offset !== 1 || $this.data2.pageSize !== 10){
                $this.page()
            }
            //监听提交
            form.on("submit(demo12)", function (data) {
                //console.log(data)
                $this.data2 = data.field
                var text = $(".unlike2 .dropdown-selected").val();
                if(text == ''){
                    $this.data2.user_id = ''
                }else{
                    if(verify_user1($this.userData,$(".unlike2 .dropdown-selected"),text)){
                        $this.data2.user_id = $(".unlike2 .dropdown-selected").attr('data');
                    }else{
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                var text1 = $(".unlike3 .dropdown-selected1").val();
                if(text1 == ''){
                    $this.data2.ismg_id = ''
                }else{
                    if(verify_ism($this.ismgList,$(".unlike3 .dropdown-selected1"),text1)){
                        $this.data2.ismg_id = $(".unlike3 .dropdown-selected1").attr('data');
                    }else{
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                $this.data2.signature = data.field.signature.trim()
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addData($this.data2);
                //$this.page()
                return false;
            });
        });
        // }, 50);
    },
    methods: {
        //shade:function(){
        //    var $this = this;
        //    $("#shade").fadeIn(500);
        //    $(".shade_con").fadeIn(500);
        //    var updata = {
        //        phone: $this.data1.phone
        //    };
        //    //console.log(updata);
        //    // 将选中的ID放到触发器的盆子里，下面拿着用
        //    bus.$emit("getBb", updata);
        //},
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
                       // console.log(obj);
                        if (first) {
                            return
                        } else {
                                $this.data2.offset = obj.curr;
                                $this.data2.pageSize = obj.limit;
                                $this.addData($this.data2);

                        }
                    }
                });
            });

        },
        addData:function(data1){
            var $this = this;
            $.ajax({
                url: $this.orderTypeList,
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
                    // console.log(data.data);
                    $("#load").remove();
                    $this.allData = [];
                    $this.totalCount = 0;
                    if (data.statusCode == '401') {
                        //localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    }else if(data.statusCode == '400'){
                        $this.mapShow = true
                        layer.msg(data.message,{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                    } else {
                        if(data.data.data.length == 0){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false
                            $this.allData = data.data.data
                            $this.totalCount = data.data.totalCount;
                        }
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                        if(data1.offset == 1 && data1.pageSize == 10){
                            $this.page()
                        }
                    }


                },
                error: function (err) {
                    console.log(err);
                    $("#load").remove();
                }
            });
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

        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            $this.sellerid = updata.sellerid;
            $this.auctionid = updata.auctionid;
        });
    },
});

