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
if(show_button(2121210)){
	
}else{
	window.open("../../login.html", "_self");
}
/*详单列表*/
Vue.component("v-order-list", {
    template: '#list-template',
    data: function() {
        return {
            querySignDistributionList: $api.querySignDistributionList,
            queryCountList: $api.queryCountList,
            signDistributionListExcelOut: $api.signDistributionListExcelOut,
            signCountListExcelOut: $api.signCountListExcelOut,
            allData: [],
            allDataT: [],
            data1:{
                "end_date": getDay(0),
                "start_date": getDay(0),
                "offset": 1,
                "ismg_id": "",
                "pageSize": 10,
                "user_id": "",
                "signature":'',
                "src_id":'',
                "sameSignNum":'',
                "sameSrcIdNum":'',
            },
            data2:{
                "end_date": getDay(0),
                "start_date": getDay(0),
                "offset": 1,
                "pageSize": 10,
                "company": "",
                "signature":'',
                "total":''
            },
            userData:UserName,
            ismgList:IsmgName,
            totalCount:'0',
            code:0,
            showNo:false,
            mapShow: false //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        $this.addData($this.data1)
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //完整功能
            if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                $this.page()
            }
            if($this.data2.offset !== 1 || $this.data2.pageSize !== 10){
                $this.page()
            }
            //监听提交
            form.on("submit(demo12)", function (data) {
                //console.log(data)
                var text = $(".unlike2 .dropdown-selected").val();
                if(text == ''){
                    $this.data1.user_id = ''
                }else{
                    if(verify_user1($this.userData,$(".unlike2 .dropdown-selected"),text)){
                        $this.data1.user_id = $(".unlike2 .dropdown-selected").attr('data');
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
                    $this.data1.ismg_id = ''
                }else{
                    if(verify_ism($this.ismgList,$(".unlike3 .dropdown-selected1"),text1)){
                        $this.data1.ismg_id = $(".unlike3 .dropdown-selected1").attr('data');
                    }else{
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                $this.data1.start_date = data.field.start_date
                $this.data1.end_date = data.field.end_date
                $this.data1.signature = data.field.signature.trim()
                $this.data1.src_id = data.field.src_id.trim()
                $this.data1.sameSignNum = data.field.sameSignNum.trim()
                $this.data1.sameSrcIdNum = data.field.sameSrcIdNum.trim()
                $this.data1.offset = 1;
                $this.data1.pageSize = 10;
                $this.addData($this.data1);
                //$this.page()
                return false;
            });
            form.on("submit(demo13)", function (data) {
                //console.log(data)
                $this.data2.start_date = data.field.start_date1
                $this.data2.end_date = data.field.end_date1
                $this.data2.signature = data.field.signatureTwo.trim()
                $this.data2.company = data.field.companyTwo.trim()
                $this.data2.total = data.field.total.trim()
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addDataTwo($this.data2);
                //$this.page()
                return false;
            });
        });
        $('.table_tou h6').on('click', function () {
            $(this).addClass('addClass2').siblings().removeClass('addClass2')
            if ($(this).text() == '签名分布列表') {
                $this.code = 0;
                $('.table_nav  form .list2').addClass('dn')
                $('.table_nav  form .list').removeClass('dn')
                $this.data1.offset = 1;
                $this.data1.pageSize = 10;
                $this.addData($this.data1)
                //$this.page1()
            } else if ($(this).text() == '签名分布统计') {
                $this.code = 1
                $('.table_nav  form .list').addClass('dn')
                $('.table_nav  form .list2').removeClass('dn');
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addDataTwo($this.data2);
                // $this.page()
            }

        })
        // }, 50);
    },
    methods: {
        //shade:function(){
        //    var $this = this;
        //    $("#shade").fadeIn(300);
        //    $(".shade_con").fadeIn(300);
        //    var updata = {
        //        phone: $this.data1.phone
        //    };
        //    //console.log(updata);
        //    // 将选中的ID放到触发器的盆子里，下面拿着用
        //    bus.$emit("getBb", updata);
        //},
        //导出
        importFile:function(){
            var $this =this;
            if($this.code == 0){
                $this.data1.offset = 0;
                $this.data1.pageSize = 0;
                $this.data1.expTitle = '签名分布列表';
                $this.data1.exp = 'true';
                $.ajax({
                    url : $this.querySignDistributionList,
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
            }else{
                $this.data2.offset = 0;
                $this.data2.pageSize = 0;
                $this.data2.expTitle = '签名分布统计';
                $this.data2.exp = 'true';
                $.ajax({
                    url : $this.queryCountList,
                    type : 'post',
                    contentType: 'application/json',
                    data : JSON.stringify($this.data2),
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
            }

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
                        // console.log(obj);
                        if (first) {
                            return
                        } else {
                            if($this.code == 0){
                                $this.data1.offset = obj.curr;
                                $this.data1.pageSize = obj.limit;
                                $this.addData($this.data1);
                            }else{
                                $this.data2.offset = obj.curr;
                                $this.data2.pageSize = obj.limit;
                                $this.addDataTwo($this.data2);
                            }

                        }
                    }
                });
            });

        },
        addData:function(data1){
            var $this = this;
            $.ajax({
                url: $this.querySignDistributionList,
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

                    } else if(data.statusCode == '400'){
                        $this.mapShow = true
                        layer.msg(data.message,{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                    }else {

                        if(data.data.data.length == 0){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false
                        }
                        $this.allData = data.data.data
                        $this.totalCount = data.data.totalCount;
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
        addDataTwo:function(data1){
            var $this = this;
            $.ajax({
                url: $this.queryCountList,
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
                complete: function () {
                    $("#load").remove();
                },
                success: function (data) {
                    // console.log(data.data);
                    $("#load").remove();
                    $this.allDataT = [];
                    $this.totalCount = 0;
                    if (data.statusCode == '401') {
                        //localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    }else if(data.statusCode == '400'){
                        $this.showNo = true
                        layer.msg(data.message,{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                    } else {
                        if(data.data.data.length == 0){
                            $this.showNo = true
                        }else{
                            $this.showNo = false
                        }
                        $this.allDataT = data.data.data
                        $this.totalCount = data.data.totalCount;
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
/*回执统计*/
//Vue.component("v-look-reply", {
//  template: '#reply-template',
//  data: function() {
//    return {
//      queryAnswerList: $api.queryAnswerList,
//      answerListExcelOut: $api.answerListExcelOut,
//      allData:[],
//      data1:{
//        "offset": 1,
//        "orderSn": "",
//        "pageSize": 3,
//        "phone": "",
//        "loginName":null
//      },
//      userData:UserName,
//      totalCount:'0',
//      mapShow: true //显示无数据图片
//    };
//  },
//  mounted:function() {
//    var $this = this;
//   // setTimeout(() => {
//       $this.addData($this.data1);
//      layui.use(["form", "laypage"], function() {
//        var form = layui.form;
//        var laypage = layui.laypage;
//        form.render();
//        //完整功能
//        if($this.data1.offset !== 1 || $this.data1.pageSize !== 3){
//          $this.page()
//        }
//        //监听提交
//        form.on("submit(demo14)", function(data) {
//         // console.log(JSON.stringify(data.field));
//          $this.data1 = data.field;
//          var text = $(".dropdown .dropdown-selected").val();
//          if(text == ''){
//            $this.data1.loginName = ''
//          }else{
//            //verify_user(UserName,$(".dropdown .dropdown-selected"),text)
//            //$this.data1.loginName = $(".dropdown .dropdown-selected").attr('data')
//            if(verify_user1(UserName,$(".dropdown .dropdown-selected"),text)){
//
//            }else{
//              $this.data1.loginName = '';
//              layer.msg('请选择下拉框内容！',{
//                icon:2,
//                time: 1300 //2秒关闭（如果不配置，默认是3秒）
//              });
//             // return false;
//            }
//          }
//          $this.data1.offset = 1;
//          $this.data1.pageSize = 3;
//          $this.addData($this.data1)
//          return false;
//        });
//      });
//   // }, 100);
//  },
//  methods: {
//    shanchu:function(){
//      $("#shade").fadeOut(300);
//      $(".shade_con").fadeOut(300);
//    },
//    //导出
//    importFileT:function(){
//      var $this =this;
//      $this.data1.offset = 0;
//      $this.data1.pageSize = 0;
//      $.ajax({
//        url : $this.answerListExcelOut,
//        type : 'post',
//        contentType: 'application/json',
//        async: true,
//        xhr: function () {
//          var xhr = new XMLHttpRequest()
//          xhr.responseType = 'blob'
//          return xhr
//        },
//        data : JSON.stringify($this.data1),
//        headers : {
//          "Authorization":localStorage.getItem('id'),
//        },
//        success : function(res){
//          var blob = new Blob([res], {type: "application/vnd.ms-excel;charset=utf-8"});
//          var objectUrl = window.URL.createObjectURL(blob);
//          var a = document.createElement('a');
//          document.body.appendChild(a);
//          a.setAttribute('style', 'display:none');
//          a.setAttribute('href', objectUrl);
//          var filename="answerTable.xls";
//          a.setAttribute('download', filename);
//          a.click();
//          window.URL.revokeObjectURL(objectUrl);
//          document.body.removeChild(a)
//
//        },
//        error : function(err){
//
//        }
//      });
//    },
//    page:function(){
//      var $this = this;
//      layui.use("laypage", function () {
//        var laypage = layui.laypage;
//        laypage.render({
//          elem: "page1",
//          count: $this.totalCount,
//          layout: ["prev", "page", "next", "skip"],
//          limit:3,
//          groups:3,
//          prev: "<",
//          next: ">",
//          jump: function (obj, first) {
//            //console.log(obj);
//            if (first) {
//              return
//            } else {
//              $this.data1.offset = obj.curr;
//              //$this.data1.pageSize = obj.limit;
//              $this.addData($this.data1);
//
//            }
//          }
//        });
//      });
//
//    },
//    addData:function(data){
//      var $this = this;
//      $.ajax({
//        url : $this.queryAnswerList,
//        type : 'post',
//        dataType : 'json',
//        contentType: 'application/json',
//        async: true,
//        data : JSON.stringify(data),
//        headers : {
//          "Authorization":localStorage.getItem('id'),
//        },
//        beforeSend: function () {
//          $("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
//        },
//        complete: function () {
//          $("#load").remove();
//        },
//        success : function(res){
//       //   console.log(res);
//          $("#load").remove();
//          if (res.statusCode == '401') {
//            // localStorage.setItem('url', window.location.pathname)
//            window.open("../../login.html", "_self");
//
//          } else {
//            $this.allData = res.data.data;
//            if($this.allData == ''){
//              $this.mapShow = true
//            }else{
//              $this.mapShow = false
//            }
//            $this.totalCount = res.data.totalCount;
//            if(data.offset == 1 && data.pageSize == 3){
//              $this.page()
//            }
//            $(document).ready(function(){
//              var height = $('#rightTable').get(0).scrollHeight;
//              $('#leftMenu_Box').css('height', height)
//            });
//          }
//
//        },
//        error : function(err){
//          console.log(err);
//          $("#load").remove();
//        }
//      });
//    },
//  },
//  filters: {
//    limitTo: function (value) {
//      if(value == ''|| value == null){
//        return '-'
//      }else{
//        return value.substring(0,19)
//      }
//
//    }
//  },
//  created:function() {
//    var $this = this;
//
//    //接收器，接收上面的两个ID
//    bus.$on("getBb", function(updata) {
//      //注意this指向问题
//      $this.data1.phone = updata.phone;
//      $this.data1.loginName = '';
//      $this.data1.offset = 1;
//      $this.data1.pageSize = 3;
//      $this.addData($this.data1);
//    });
//  },
//});
