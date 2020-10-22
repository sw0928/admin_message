var accountType = localStorage.getItem('accountType');
var id = $api.localStorageId;
var UserName=null,IsmgName=null;
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
if(show_button(21211)){
	
}else{
	window.open("../../login.html", "_self");
}
/*详单列表*/
Vue.component("v-order-list", {
  template: '#list-template',
  data: function() {
    return {
      url: $api.OrderDetailList,
      orderDetailListExcelOut: $api.orderDetailListExcelOut,
      queryAnswerList: $api.queryAnswerList,
      answerListExcelOut: $api.answerListExcelOut,
      allData: [],
      allDataT: [],
      data1:{
        "endDate": getDay(0)+' 23:59:59',
        "startDate": getDay(0)+' 00:00:00',
        "offset": 1,
        "orderSn": "",
        "pageSize": 10,
        "phone": "",
        "status": "",
        "content":''
      },
      data2:{
        "endTime": getDay(0),
        "startTime": getDay(0),
        "offset": 1,
        "pageSize": 10,
        "phone": "",
        "receiptText": "",
        "ismgId": null,
        "userId":null
      },
      userData:UserName,
      ismgList:IsmgName,
      loginType:accountType,
      totalCount:'0',
      totalB:'0',
      showNo:true,
      code:0,
      smsText:'',
      mapShow: false //显示无数据图片
    };
  },
  mounted:function() {
    var $this = this;
   // setTimeout(() => {
      //$this.addData($this.data1)
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        //完整功能
      //  if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
          $this.page()
      //  }
        if($this.data2.offset !== 1 || $this.data2.pageSize !== 10){
          $this.page1()
        }
        if($this.loginType == '通道管理员'){
        	laydate.render({
						elem: "#test", //指定元素
						type: 'datetime',
						value: getDay(0)+' 00:00:00',
						min: -6 ,//7天前
	  		    max: getDay(0) //7天后
					});
					laydate.render({
						elem: "#test1", //指定元素
						type: 'datetime',
						value: getDay(0)+' 23:59:59',
						min: -6 ,//7天前
	  		    max: getDay(0) //7天后
					});
			  	laydate.render({
	          elem: "#test2", //指定元素
	          //type: 'datetime',
	          value: getDay(0),
	          min: -6 ,//7天前
	  		    max: getDay(0) //7天后
	        });		
	        laydate.render({
	          elem: "#test3", //指定元素
	         // type: 'datetime',
	          value: getDay(0),
	          min: -6 ,//7天前
	  		    max: getDay(0) //7天后
	        });	
			  }
        //监听提交
        form.on("submit(demo13)", function(data) {
          $this.data1.endDate = data.field.endDate;
          $this.data1.startDate = data.field.startDate;
          $this.data1.orderSn = data.field.orderSn.trim();
          $this.data1.phone = data.field.phone.trim();
          $this.data1.content = data.field.content.trim();
          $this.data1.status = data.field.status;
          $this.data1.offset = 1;
          $this.data1.pageSize = 10;
          $this.addData($this.data1);
         // $this.page()
          return false;
        });
        form.on("submit(demo12)", function (data) {
          //console.log(data)
          var text = $(".unlike2 .dropdown-selected").val();
          if(text == '' || text == undefined ){
            $this.data2.userId = ''
          }else{
            if(verify_user1($this.userData,$(".unlike2 .dropdown-selected"),text)){
              $this.data2.userId = $(".unlike2 .dropdown-selected").attr('data');
            }else{
              layer.msg('请选择下拉框内容！',{
                icon:2,
                time: 1300 //2秒关闭（如果不配置，默认是3秒）
              });
              return false;
            }
          }
          var text1 = $(".unlike3 .dropdown-selected1").val();
          if(text1 == '' || text1 == undefined){
            $this.data2.ismgId = ''
          }else{
            if(verify_ism($this.ismgList,$(".unlike3 .dropdown-selected1"),text1)){
              $this.data2.ismgId = $(".unlike3 .dropdown-selected1").attr('data');
            }else{
              layer.msg('请选择下拉框内容！',{
                icon:2,
                time: 1300 //2秒关闭（如果不配置，默认是3秒）
              });
              return false;
            }
          }
          $this.data2.startTime = data.field.startTime;
          $this.data2.endTime = data.field.endTime;
          $this.data2.phone = data.field.phone1.trim();
          $this.data2.receiptText = data.field.receiptText.trim();
          $this.data2.offset = 1;
          $this.data2.pageSize = 10;
          $this.addDataTwo($this.data2);
          //$this.page()
          return false;
        });
      });
    $('.table_tou h6').on('click', function () {
      $(this).addClass('addClass2').siblings().removeClass('addClass2')
      if ($(this).text() == '详单列表') {
        $this.code = 0;
        $this.allData = [];
        $('.table_nav  form .list2').addClass('dn')
        $('.table_nav  form .list').removeClass('dn')
        $this.data1.offset = 1;
        $this.data1.pageSize = 10;
        $this.totalCount = 0;
        $this.addData($this.data1)
        $this.page()
      } else if ($(this).text() == '上行列表') {
        $this.code = 1
        $this.allDataT = [];
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
    //导出
    importFile:function(){
      var $this =this;
      $this.data1.offset = 0;
      $this.data1.pageSize = 0;
      $this.data1.expTitle = '详单列表';
      $this.data1.exp = 'true';
      $.ajax({
        url : $this.url,
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
    importFileT:function(){
      var $this =this;
      $this.data2.offset = 0;
      $this.data2.pageSize = 0;
      $this.data2.expTitle = '上行列表';
      $this.data2.exp = 'true';
      $.ajax({
        url : $this.queryAnswerList,
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
    },
    shade:function(){
      var $this = this;
      $("#shade").fadeIn(500);
      $(".shade_con").fadeIn(500);
      var updata = {
        phone: $this.data1.phone
      };
      //console.log(updata);
      // 将选中的ID放到触发器的盆子里，下面拿着用
      bus.$emit("getBb", updata);
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
    page1:function(){
      var $this = this;
      layui.use("laypage", function () {
        var laypage = layui.laypage;
        laypage.render({
          elem: "page",
          count: $this.totalB,
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
        url: $this.url,
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
        url: $this.queryAnswerList,
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
          $this.allDataT = [];
          $this.totalB = 0;
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
              $this.allDataT = data.data.data
              $this.totalB = data.data.totalCount;
            }
            $(document).ready(function(){
              var height = $('#rightTable').get(0).scrollHeight;
              $('#leftMenu_Box').css('height', height)
            });
            if(data1.offset == 1 && data1.pageSize == 10){
              $this.page1()
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
