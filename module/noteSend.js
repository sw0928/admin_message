/*下单失败*/
var id = $api.localStorageId;
var tracId = $api.localStorageTracId;
//组件通信
var bus = new Vue();
 //左侧菜单组件实例化
Vue.component("v-order-fail", {
  template: '#right-template',
  data: function() {
    return {
      queryDetail: $api.queryDetail,
      queryUserName:$api.queryUserName,
      data1:{
        "logId": "",
        "msgContent": "",
        "endTime": getDay(0),
        "startTime": getDay(0),
        "offset": 1,
        "pageSize": 10,
        "receiverMsisdn": "",
        "receiptText": "",
        "tracId":tracId
      },
      totalCount:'0',
      allData: [],
      mapShow: false //显示无数据图片
    };
  },
  mounted:function(){
    var $this = this;
    //setTimeout(() => {
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
        $this.data1.tracId = tracId;
        $this.data1.logId = data.field.logId;
        $this.data1.startTime = data.field.startTime;
        $this.data1.endTime = data.field.endTime;
        $this.data1.msgContent = data.field.msgContent.trim();
        $this.data1.receiptText = data.field.receiptText;
        $this.data1.receiverMsisdn = data.field.receiverMsisdn;
        $this.data1.offset = 1;
        $this.data1.pageSize = 10;
        $this.addData($this.data1);
        return false;
      });
    });
    //}, 100);
  },
  methods: {
    page: function(){
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
        url : $this.queryDetail,
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
        complete: function () {
          $("#load").remove();
        },
        success : function(res){
         // console.log(res);
          $("#load").remove();
          $this.allData = [];
          $this.totalCount = 0;
          if (res.statusCode == '401') {
            window.open("../../login.html", "_self");
          }else if(res.statusCode == '400'){
            $this.mapShow = true
            layer.msg(res.message,{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
          }  else {
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
    }
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
