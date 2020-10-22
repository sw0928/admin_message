/*用户发送统计*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(21013)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-user-count", {
  template: '#count-template',
  data: function() {
    return {
      url: $api.UserSendCountList,
      queryUserName:$api.queryUserName,
      userSendCountListExcelOut:$api.userSendCountListExcelOut,
      allData:[],
      userData:[],
      totalCount:'0',
      data1:{
        "endDate": getDay(0)+' 23:59:59',
        "startDate": getDay(0)+' 00:00:00',
        "offset": 1,
        "pageSize": 10,
        "userName": ""
      },
      mapShow: false //显示无数据图片
    };
  },
  mounted:function() {
    var $this = this;
    //setTimeout(() => {
      $this.addData($this.data1)
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
           $this.data1 = data.field;
           var text = $(".dropdown .dropdown-selected").val();
           if(text == ''){
             $this.data1.userName = ''
           }else{
             verify_user($this.userData,$(".dropdown .dropdown-selected"),text)
             $this.data1.userName =  $(".dropdown .dropdown-selected").attr('data')
           }
           $this.data1.startDate = $this.data1.startDate ;
           $this.data1.endDate = $this.data1.endDate;
           $this.data1.offset = 1;
           $this.data1.pageSize = 10;
           $this.addData($this.data1)
          return false;
        });
      });
  //  }, 100);
  },
  methods: {
    //导出
    importFile:function(){
      var $this =this;
      $this.data1.offset = 0;
      $this.data1.pageSize = 0;
      $this.data1.expTitle = '用户发送统计';
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
        url : $this.url,
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
          $this.allData = [];
          $this.totalCount = 0;
          if (res.statusCode == '401') {
            //localStorage.setItem('url', window.location.pathname)
            window.open("../../login.html", "_self");

          }else if(res.statusCode == '400'){
            $this.mapShow = true
            layer.msg(res.message,{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
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
          $("#load").remove();
          console.log(err);
        }
      });
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
