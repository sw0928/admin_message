//var url1 = "http://mouse.molesoft.cn";
var url1 = "http://localhost:30005/searchmouse-admin";
 //var url1 = "http://192.168.2.104:8080/searchmouse-admin";

var $api = {
		//获取localStorage.getItem('id')
		localStorageId: localStorage.getItem('id'),
		//获取localStorage.getItem('tracId');
		localStorageTracId: localStorage.getItem('tracId'),
    //签名申请ajax
    signatureList: "/icos/signature/signatureList",

    //下单失败
    orderFailList:  "/icos/order/orderFailList",
    //下单失败统计
    orderFailTotalList:  "/icos/order/orderFailTotalList",

    //签名删除
    removeSignature: "/icos/signature/removeSignature",

    //申请签名接口
    signatureApply:  "/icos/signature/signatureApply",

    //获取客户行业类别
    getTrade: "/icos/signature/getTrade",
    //修改签名状态
    editSignature:  "/icos/signature/editSignature",

    signatureApplyInfo:  "/icos/signature/signatureApplyInfo",

    repulseSignatureApply:  "/icos/signature/repulseSignatureApply",

    queryUsedIsmgName:  "/icos/signature/queryUsedIsmgName",

    querySignatueIsmg:  "/icos/signature/querySignatueIsmg",

    addExtend:  "/icos/signature/addExtend",

    auditSign:  "/icos/signature/auditSign",

    buildOrderTemplate:  "/icos/signature/buildOrderTemplate",
    //投诉率列表接口
    complainProbabilityList: "/icos/complain/complainProbabilityList",

    //审核投诉列表接口
    cheackComplainList:  "/icos/complain/cheackComplainList",

    //投诉内容列表接口
    complainContentList: "/icos/complain/complainContentList",

    // 审核号码列表接口
    complainPhoneList: "/icos/complain/complainPhoneList",

    // 投诉审核详情列表接口
    complaintHisTableList: "/icos/complain/complaintHisTableList",

    // 查询导入号码批次字符串接
    complaintHisMobileNo: "/icos/complain/complaintHisMobileNo",

    // 审核投诉接
    auditComplaint: "/icos/complain/auditComplaint",
    //删除
    removeComplaint:"/icos/complain/removeComplaint",
    //用户查看短信模板申请列表
    templateApplyList: "/icos/template/templateApplyList",

    //用户查看短信模板申请详情
    templateApplyInfo: "/icos/template/templateApplyInfo",

    //用申请户短信模板接口
    templateApply: "/icos/template/templateApply",
    //匹配模板内容
    getTemplateNameAndContent: "/icos/template/getTemplateNameAndContent",
    //拒绝短信模板接口
    repulseTemplateApply:"/icos/template/repulseTemplateApply",

    //查询运维列表接口
    queryOperationList: "/icos/user/queryOperationList",

    //查询用户详细信息接口
    queryUserInfo: "/icos/user/queryUserInfo",

    //移除用户接口
    removeUser: "/icos/user/removeUser",

    //重置密码接口
    resetPassword: "/icos/user/resetPassword",

    ///修改用户接口
    saveUser: "/icos/user/saveUser",

    //新增用户接口
    createUser: "/icos/user/createUser",

    //用户重新申请被拒绝短信模板接口
    againTemplate: "/icos/template/againTemplateApply",

    //用户删除短信模板申请记录
    removeTemplate: "/icos/template/removeTemplateApply",

    //订单管理--订单列表
    OrderManagerList: "/icos/order/queryOrderManagerList",

    //订单管理--订单浏览列表
    queryOrderList:  "/icos/order/queryOrderList",
    //回复列表
    queryAnswerList:  "/icos/order/queryAnswerList",
    //详单列表接口
    OrderDetailList:  "/icos/order/queryOrderDetailList",

    //用户发送统计接口
    UserSendCountList: "/icos/order/queryUserSendCountList",

    //用户发送明细接口
    UserSendDetailList: "/icos/order/queryUserSendDetailList",
    //用户发送明细回执统计
    queryUserSendDetailTotal: "/icos/order/queryUserSendDetailTotal",
    //查询用户管理接口
    UserManageList: "/icos/usermanager/queryUserManageList",

    //查询用户名
    queryUserName: '/icos/user/queryUserName',

    //查询角色菜单，传用户ID时，查询用户已有的和为分配的角色菜单，不传用户ID查询角色默认菜单权限
    UserDefultMenu: '/icos/queryUserDefultMenu',

    //修改用户权限接口
    UserMenuRole:  '/icos/editUserMenuRole',

    //查询订单模板列表接口
    TemplateOrderList: '/icos/templateOrder/queryTemplateOrderList',

    //创建订单模板接口
    createTemplateOrder:  '/icos/templateOrder/createTemplateOrder',

    //修改订单模板接口
    editTemplateOrder: '/icos/templateOrder/editTemplateOrder',

    //移除订单模板
    removeTemplateOrder: '/icos/templateOrder/removeTemplateOrder',

    //查询网关列表接口
    queryIsmgList: '/icos/ismg/queryIsmgList',
    
    managementStatus:"/icos/channelManagement/changeStatus",

    //新建网关接口
    createIsmg:  '/icos/ismg/createIsmg',
    //查询网关名称
    queryIsmgName:  '/icos/ismg/queryIsmgName',
    //查询原网关名称
    queryCurrentIsmg:  '/icos/order/queryCurrentIsmg',
    //2.修改网关信息接口
    editIsmg: "/icos/ismg/editIsmg",

    //查看网关详情接口
    IsmgInfo: "/icos/ismg/queryIsmgInfo",

    //删除网关记录接口
    removeIsmg: "/icos/ismg/removeIsmg",

    //查询用户管理基本信息
    queryUserInfo1: "/icos/usermanager/queryUserInfo",

    //修改用户管理信息接口
    editUser: "/icos/usermanager/editUser",
    //查询设置计费总账户列表接口
    queryBillingAccountList: "/icos/billingaccount/queryBillingAccountList",
    //新增或修改计费总账户接口
    saveBillingAccount: "/icos/billingaccount/saveBillingAccount",
    //移除计费总账户接口
    removeBillingAccount:"/icos/billingaccount/removeBillingAccount",
    //审核列表接口
    AuditToSendList: "/icos/audit/queryAuditToSendList",
    //审核拒绝放行接口
    auditTaskNoPass: "/icos/audit/auditTaskNoPass",
    //审核放行接口
    auditTaskPass: "/icos/audit/auditTaskPass",
    //查询模板内容接口
    queryAuditMsgContent: "/icos/audit/queryAuditMsgContent",
    //通过模板申请记录
    auditTemplateApply: "/icos/template/auditTemplateApply",

    //查询敏感词列表接口
    BizExpressionList: "/icos/bizexpression/queryBizExpressionList",

    //查询敏感词详情接口
    BizExpressionInfo: "/icos/bizexpression/queryBizExpressionInfo",

    //修改敏感词接口
    editBizExpression: "/icos/bizexpression/editBizExpression",

    //新增敏感词接口
    createBizExpression: "/icos/bizexpression/createBizExpression",

    //移除敏感词接口
    removeBizExpression: "/icos/bizexpression/removeBizExpression",

    //查询内容分类列表接口
    queryBizType:  "/icos/bizexpression/queryBizType",

	//查询关键字列表接口
    queryBadWordList:"/icos/badword/queryBadWordList",

	//移除关键字接口
    removeBadWord : "/icos/badword/removeBadWord",

	//查询关键字详情接口
    queryBadWordInfo :"/icos/badword/queryBadWordInfo",

	//修改关键字接口
    editBadWord : "/icos/badword/editBadWord",

	//新增关键字接口
    createBadWord :"/icos/badword/createBadWord",

	//查询黑名单列表接口
    queryBlackList :"/icos/blacklist/queryBlackList",

	//查询黑名详情接口
    queryBlackInfo : "/icos/blacklist/queryBlackInfo",
        //修改黑名单接口
    editBlackList :"/icos/blacklist/editBlackList",

	//新增黑名单接口
    createBlackList :"/icos/blacklist/createBlackList",

	//查询Vip人员列表接口
    queryVipMsisdnList :"/icos/vipmsisdn/queryVipMsisdnList",

	//查询Vip人员详情接口
    queryVipMsisdnInfo : "/icos/vipmsisdn/queryVipMsisdnInfo",

	//修改Vip人员接口
    editVipMsisdn :"/icos/vipmsisdn/editVipMsisdn",

	//创建Vip人员接口
    createVipMsisdn :"/icos/vipmsisdn/createVipMsisdn",

	//移除Vip人员接口
    removeVipMsisdn : "/icos/vipmsisdn/removeVipMsisdn",

	//查询路由列表接口
    queryRouteList : "/icos/routeconfig/queryRouteList",

	//新建路由接口
    createRoute :"/icos/routeconfig/createRoute",

	//修改路由接口
    editRoute :  "/icos/routeconfig/editRoute",

	//查询路由配置列表接口
    queryRouteConfigList :"/icos/routeconfig/queryRouteConfigList",

    queryRouteConfigInfo :"/icos/routeconfig/queryRouteConfigInfo",

    editRouteConfig : "/icos/routeconfig/editRouteConfig",

    createRouteConfig :"/icos/routeconfig/createRouteConfig",

	//移除路由配置详情
    removeRouteConfig : "/icos/routeconfig/removeRouteConfig",
    //下单限速
    createSubmitLimit : "/icos/submitlimit/createSubmitLimit",

    editSubmitLimit : "/icos/submitlimit/editSubmitLimit",

    querySubmitLimitInfo : "/icos/submitlimit/querySubmitLimitInfo",

    querySubmitLimitList :"/icos/submitlimit/querySubmitLimitList",

    removeSubmitLimit : "/icos/submitlimit/removeSubmitLimit",
    //通路选择
    createRouteRule : "/icos/routerule/createRouteRule",

    editRouteRule : "/icos/routerule/editRouteRule",

    queryLocationList : "/icos/routerule/queryLocationList",
    //退订名单
    queryUnsubscribeList : "/icos/unsubscribeList/queryUnsubscribeList",
    //退订名单删除
    deleteUnsubscribeList : "/icos/unsubscribeList/deleteUnsubscribeList",

    queryRouteRuleInfo :"/icos/routerule/queryRouteRuleInfo",

    queryRouteRuleList : "/icos/routerule/queryRouteRuleList",

    removeRouteRule : "/icos/routerule/removeRouteRule",
	//签名管理
    createSignIsmg : "/icos/signismg/createSignIsmg",

    editSignIsmg : "/icos/signismg/editSignIsmg",

    querySignIsmgInfo : "/icos/signismg/querySignIsmgInfo",

    querySignIsmgList :"/icos/signismg/querySignIsmgList",
    
    batchQuerySignIsmgList :"/icos/signismg/batchQuerySignIsmgList",

    removeSignIsmg : "/icos/signismg/removeSignIsmg",
    
    createMultipleSignIsmg : "/icos/signismg/createMultipleSignIsmg",
    //测试发送
    testSendMsg : "/icos/testsend/testSendMsg",
    //全部导出接口
    orderFailListExcelOut : "/icos/export/orderFailListExcelOut",

    badWordListExcelOut : "/icos/export/badWordListExcelOut",

    bizExpressionListExcelOut : "/icos/export/bizExpressionListExcelOut",

    templateOrderListExcelOut : "/icos/export/templateOrderListExcelOut",

    signatureListExcelOut : "/icos/export/signatureListExcelOut",

    userManageListExcelOut : "/icos/export/userManageListExcelOut",

    orderDetailListExcelOut : "/icos/export/orderDetailListExcelOut",

    orderFailTotalListExcelOut:"/icos/export/orderFailTotalListExcelOut",

    userSendDetailListExcelOut:"/icos/export/userSendDetailListExcelOut",

    userSendCountListExcelOut:"/icos/export/userSendCountListExcelOut",

    signIsmgListExcelOut:"/icos/export/signIsmgListExcelOut",

    answerListExcelOut:"/icos/export/answerListExcelOut",

    networkSendListExcelOut:"/icos/export/networkSendListExcelOut",

    signDistributionListExcelOut:"/icos/export/signDistributionListExcelOut",

    signCountListExcelOut:"/icos/export/signCountListExcelOut",
    //新增接口
    orderTypeList:"/icos/orderTypeList/queryList",

    networkSendList:"/icos/networkSendList/queryList",

    networkSendCountList:"/icos/networkSendList/queryCountList",

    querySignDistributionList:"/icos/signList/querySignDistributionList",

    queryCountList:"/icos/signList/queryCountList",

    queryRiskRules:"/icos/risk/queryRiskRules",

    queryRiskResults:"/icos/risk/queryRiskResults",
    //告警，新增，删除
    querySubscribeList:"/icos/alarm/querySubscribeList",

    createSubscribe:"/icos/alarm/createSubscribe",

    updateSubscribe:"/icos/alarm/updateSubscribe",

    deleteSubscribe:"/icos/alarm/deleteSubscribe",
    //告警类型，新增，删除，
    queryAlarmType:"/icos/alarm/queryAlarmType",

    createAlarmType:"/icos/alarm/createAlarmType",

    updateAlarmType:"/icos/alarm/updateAlarmType",

    deleteAlarmType:"/icos/alarm/deleteAlarmType",
    //值班人员，新增，删除
    queryUser:"/icos/alarm/queryUser",

    createDutyUser:"/icos/alarm/createDutyUser",

    updateDutyUser:"/icos/alarm/updateDutyUser",

    deleteDutyUser:"/icos/alarm/deleteDutyUser",
    //新增通道信息
    queryChannelManagementList:"/icos/channelManagement/queryChannelManagementList",

    queryChannelManagementInfo:"/icos/channelManagement/queryChannelManagementInfo",

    createChannelManagement:"/icos/channelManagement/createChannelManagement",

    editChannelManagement:"/icos/channelManagement/editChannelManagement",

    deleteChannelManagement:"/icos/channelManagement/deleteChannelManagement",
    
    managementStatus:"/icos/channelManagement/changeStatus",

    //接单明细
    orderSubmitDetail:"/icos/orderSubmitDetail/queryList",

    orderQueryDetail:"/icos/orderSubmitDetail/queryDetail",

    //接单模板导入
    importModel:"/icos/templateOrder/importModel",

    //接单模板删除
    batchRemoveTemplateOrder:"/icos/templateOrder/batchRemoveTemplateOrder",

    //接单模板状态
    batchEditTemplateOrder:"/icos/templateOrder/batchEditTemplateOrder",

    submitModel:"/icos/templateOrder/submitModel",
    //被叫分布
    querySendList:"/icos/position/querySendList",

    //归属地
    queryHomeList:"/icos/location/queryLocationList",

    queryLocationInfo:"/icos/location/queryLocationInfo",

    createLocation:"/icos/location/createLocation",

    editLocation:"/icos/location/editLocation",

    deleteLocation:"/icos/location/deleteLocation",
    //号段归属
    queryPhoneLocationList:"/icos/phoneLocation/queryPhoneLocationList",

    queryPhoneLocationInfo:"/icos/phoneLocation/queryPhoneLocationInfo",

    createPhoneLocation:"/icos/phoneLocation/createPhoneLocation",

    editPhoneLocation:"/icos/phoneLocation/editPhoneLocation",

    deletePhoneLocation:"/icos/phoneLocation/deletePhoneLocation",
    //  运营商号段
    queryPhoneOperatorList:"/icos/phoneOperator/queryPhoneOperatorList",

    queryPhoneOperatorInfo:"/icos/phoneOperator/queryPhoneOperatorInfo",

    createPhoneOperator:"/icos/phoneOperator/createPhoneOperator",

    editPhoneOperator:"/icos/phoneOperator/editPhoneOperator",

    deletePhoneOperator:"/icos/phoneOperator/deletePhoneOperator",
    //  IP
    queryIpLocationList:"/icos/ipLocation/queryIpLocationList",

    queryIpLocationInfo:"/icos/ipLocation/queryIpLocationInfo",

    createIpLocation:"/icos/ipLocation/createIpLocation",

    editIpLocation:"/icos/ipLocation/editIpLocation",

    deleteIpLocation:"/icos/ipLocation/deleteIpLocation",
    //导入模板
    uploadSignIsmg:"/icos/signismg/uploadSignIsmg",
    
    commitUploadSignIsmg:"/icos/signismg/commitUploadSignIsmg",
    
    //用户数据统计
    querySendCount:"/icos/userSendController/querySendCount",
    
    //报告状态记录和重推
    
    queryListForCus:"/icos/statereport/queryListForCus",
     
    reportUpload:"/icos/statereport/upload",
      
    resendReceipt:"/icos/statereport/resendReceipt",
    
    queryListForRecipt:"/icos/statereport/queryListForRecipt",
     
    uploadReceipt:"/icos/statereport/uploadReceipt",
    
    commitImport:"/icos/statereport/commitImport",
    
    batchUpdate:"/icos/statereport/batchUpdate",
    
    //MFA解绑
    changeMfaState:"/icos/authenticator/changeMfaState",
    //粘贴
    queryInferUserInfo:"/icos/user/queryInferUserInfo",
    
    //访问日志
    AccesslogList:"/icos/system/Accesslog/list",
    
    AccesslogTotalList:"/icos/system/Accesslog/totalList",
    
    AccesslogDetail:"/icos/system/Accesslog/detail",
    
    //短链列表
    queryShortLinks:"/icos/link/queryShortLinks",
    //新增
    createShortLink:"/icos/link/createShortLink",
    //发送详情
    queryDetail:"/icos/link/queryDetail",
    //访问详情
    queryVisitDetail:"/icos/link/queryVisitDetail",
    //访问统计
    countVisit:"/icos/link/countVisit",
    //时间统计
    countVisitByHour:"/icos/link/countVisitByHour",
    //设备统计
    countVisitByEquipment:"/icos/link/countVisitByEquipment",
    //城市统计
    countVisitByCity:"/icos/link/countVisitByCity",
    //城市统计
    countMobileByCity:"/icos/link/countMobileByCity",
    //名牌名
    queryVendor:"/icos/link/queryVendor",
    //设备品牌
    queryDeviceName:"/icos/link/queryDeviceName",
    //添加设备品牌
    setVendorInfo:"/icos/link/setVendorInfo",
    //短链审核列表
    queryCheckLinks:"/icos/link/queryCheckLinks",
    //审核详情
    queryCheckInfo:"/icos/link/queryCheckInfo",
    //短链审核
    checkTemplate:"/icos/link/checkTemplate",
    //短链匹配
    auditTemplateLinkApply:"/icos/link/auditTemplateLinkApply",
    //黑名单倒入接口
    importBlack:"/icos/blacklist/importBlack",
    //黑名单确认倒入
    submitBlack:"/icos/blacklist/submitBlack",     
    //签名归属地查询
    querySignProtect:"/icos/locationProtect/querySignProtect",  
    //用户归属地保护查询
    queryLocationProtect:"/icos/locationProtect/queryLocationProtect",  
    //新增签名保护
    addSignProtect:"/icos/locationProtect/addSignProtect",  
    //新增用户保护
    addLocationProtect:"/icos/locationProtect/addLocationProtect",  
    //归属地保护删除
    deleteLocationProtect:"/icos/locationProtect/deleteLocationProtect",
    //归属地新增预览
    previewLastSend:"/icos/locationProtect/previewLastSend",  
    //订单规则查询
    orderRuleList:"/icos/orderRule/orderRuleList",  
    //删除规则
    deleteRule:"/icos/orderRule/deleteRule",  
    //订单规则新增
    createRule:"/icos/orderRule/createRule", 
    //修改规则
    updateRule:"/icos/orderRule/updateRule", 
    //查询规则详情
    queryRuleInfo:"/icos/orderRule/queryRuleInfo", 
    //全局配置查询
    queryOverallSituation:"/icos/orderRule/queryOverallSituation", 
    //全局配置修改
    updateOverallSituationState:"/icos/orderRule/updateOverallSituationState", 
    //用户级复制
    copyRulesByUser:"/icos/orderRule/copyRulesByUser", 
    //省份查询
    queryLocation:"/icos/orderRule/queryLocation", 
    //运营商查询
    queryOperator:"/icos/orderRule/queryOperator", 
    //包含及排除归属地查询
    queryProvince:"/icos/orderRule/queryProvince", 
    //包含及排除归属地新增
    addProvince:"/icos/orderRule/addProvince", 
    //包含及排除归归属地删除
    deleteProvince:"/icos/orderRule/deleteProvince", 
    //包含及排除关键字组列表
    queryWord:"/icos/orderRule/queryWord", 
    //包含及排除关键自组新增
    addWord:"/icos/orderRule/addWord", 
    //包含及排除关键自组删除
    deleteWord:"/icos/orderRule/deleteWord", 
    //通道发送详情
    orderSendDetail:"/icos/order/orderSendDetail", 
     //内容分布
    orderDetail:"/icos/order/orderDetail", 
     //失败换网关列表
    queryChangeTaskISMG:"/icos/order/queryChangeTaskISMG", 
     //失败换网关
    changeTaskResendISMG:"/icos/order/changeTaskResendISMG", 
     //强制失败列表
    querySelFailedReceipt:"/icos/order/querySelFailedReceipt", 
    //强制改为失败
    trunToFailed:"/icos/order/trunToFailed", 
     //Z类补发列表
    queryInterceptReissue:"/icos/order/queryInterceptReissue", 
      //失败网关列表
    previewLastSend:"/icos/order/queryFailureOrderISMG",
      //待发更换网关
    changeISMG:"/icos/order/changeISMG",
      //取消启发限制
    cannelLimit:"/icos/order/cannelLimit",
      //超时重发
    retryTimeOut:"/icos/order/retryTimeOut",
      //失败重发
    retryFailed:"/icos/order/retryFailed",
}

//克隆数据源
function cloneFun(obj) {
    if (!obj || "object" != typeof obj) {
        return null;
    }
    var result = (obj instanceof Array) ? [] : {};
    for (var i in obj) {
        result[i] = ("object" != typeof obj[i]) ? obj[i] : cloneFun(obj[i]);
    }
    return result;
};
function total(a,b,c,d){
    let total = a;
    let selected = b;
    let uls =  c ;
    let ds =  d ;
    selected.click(function(event){
        event.stopPropagation();
        //console.log('222')
        $('.layui-inline ul').addClass('dns');
        uls.removeClass('dns')
        let text = selected.val();
        if(text == ''){
            total.removeClass('active')
        }
    })

    selected.keyup(function(event){
        event.stopPropagation();
        uls.removeClass('dns')
        let aa =[];
        let text = selected.val();
        let lis_a = total;
        for (let i=0;i<lis_a.length;i++)
        {
            if($(lis_a[i]).find('a').html().indexOf(text) > -1){
                aa.push(lis_a[i])
            }
        }
        uls.html(aa)
    })
    selected.keyup(function(event){
        //event.stopPropagation();
        let bb = [];
        if(event.keyCode == 8){
            let text = selected.val();
            if(text == ''){
                uls.html(total);
                $(this).attr('data','')
            }
            for (let i=0;i<total.length;i++)
            {
                if($(total[i]).find('a').html().indexOf(text) > -1){
                    bb.push(total[i])
                }
            }
            uls.html(bb);

        }
    });
    ds.on("click", "ul li ", function (event) {
        event.stopPropagation();
        selected.val($(this).find('a').text());
        selected.attr('data',$(this).find('a').attr('data'))
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        $(this).parent().addClass('dns')
        return false;
    })
    // 点击除按钮和弹框之外任意地方隐藏表情
//            $("body").click(function (e) {
//                if (!$(e.target).closest(".unlike4 ul,.unlike4").length) {
//                    uls.addClass('dns')
//                }
//            });
    $(document).click(function(event){
        uls.addClass('dns');
        uls.html(total);
    });
}
//校验用户内容是否一致
function verify_user(arr,input,text,back){
    let yes = false,userId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].loginName == text){
            yes = true;
            userId = arr[i].userId
        }
    }
    if(!yes){
        layer.open({
            content:  '请选择下拉框内容！'
            ,yes: function(index){
                layer.close(index);
                input.val('');
                input.attr('data','')
                return false;
            }
        });
    }else{
        input.attr('data',userId)
        if(back != null){
            back()
        }
    }
}
function verify_ism(arr,input,text,back){
    let yes = false,data_show = true,ismgId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].ismgName == text){
            yes = true;
            ismgId = arr[i].ismgId
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
        //layer.open({
        //    content:  '请选择下拉框内容！'
        //    ,yes: function(index){
        //        layer.close(index);
        //        input.val('');
        //        input.attr('data','')
        //        return false;
        //    }
        //});
    }else{
        input.attr('data',ismgId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
function verify_route(arr,input,text,back){
    let yes = false,data_show = true,routeId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].routeName == text){
            yes = true;
            routeId = arr[i].routeId
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
        //layer.open({
        //    content:  '请选择下拉框内容！'
        //    ,yes: function(index){
        //        layer.close(index);
        //        input.val('');
        //        input.attr('data','')
        //
        //    }
        //});
    }else{
        input.attr('data',routeId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
function verify_loca(arr,input,text,back){
    let yes = false,data_show = true,locationId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].locationDec == text){
            yes = true;
            locationId = arr[i].locationId
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
        //layer.open({
        //    content:  '请选择下拉框内容！'
        //    ,yes: function(index){
        //        layer.close(index);
        //        input.val('');
        //        input.attr('data','')
        //
        //    }
        //});
    }else{
        input.attr('data',locationId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
function verify_user1(arr,input,text,back){
    let yes = false,data_show = true,userId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].loginName == text){
            yes = true;
            userId = arr[i].userId
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
    }else{
        input.attr('data',userId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
function verify_user1(arr,input,text,back){
    let yes = false,data_show = true,userId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].loginName == text){
            yes = true;
            userId = arr[i].userId
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
    }else{
        input.attr('data',userId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
function verify_evice(arr,input,text,back){
    let yes = false,data_show = true,userId = '';
    console.log(arr)
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i] == text){
            yes = true;
            userId = arr[i]
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
    }else{
        input.attr('data',userId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
function verify_Type(arr,input,text,back){
    let yes = false,data_show = true,typeId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].typeNameCn == text){
            yes = true;
            typeId = arr[i].typeId
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
    }else{
        input.attr('data',typeId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
function verify_queryUser(arr,input,text,back){
    let yes = false,data_show = true,empId = '';
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].empName == text){
            yes = true;
            empId = arr[i].empId
        }
    }
    if(!yes){
        input.attr('data','')
        input.val('')
        return data_show = false;
    }else{
        input.attr('data',empId)
        return data_show = true;
        if(back != null){
            back()
        }
    }
}
//获取时间
function getDay(day) {
    //Date()返回当日的日期和时间。
    var days = new Date();
    //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
    var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
    //setTime()以毫秒设置 Date 对象。
    days.setTime(gettimes);
    var year = days.getFullYear();
    var month = days.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    var today = days.getDate();
    if(today<10){
        today="0"+today;
    }
    return year + "-" + month + "-" + today;
}

//验证是否为空 ，若为空  返回true   反之，返回 false
function isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

function changeDate(day) {
    var ndate = new Date();
    var Y = ndate.getFullYear() + "-";
    var M = (ndate.getMonth() + 1 < 10 ? '0' + (ndate.getMonth() + 1) : ndate.getMonth() + 1) + "-";
    var D = (ndate.getDate() < 10 ? '0' + (ndate.getDate()) : ndate.getDate() + " ");
    var h = (ndate.getHours() < 10 ? '0' + (ndate.getHours()) : ndate.getHours()) + ':';
    var m = (ndate.getMinutes() < 10 ? '0' + (ndate.getMinutes()) : ndate.getMinutes()) + ':';
    var s = (ndate.getSeconds() < 10 ? '0' + (ndate.getSeconds()) : ndate.getSeconds());
    ndate = Y + M + D + h + m +s; //
    return ndate;
}

//流量入口封装
function activityUV(node) {
    var str;
    if (node.siblings(".checkBox").hasClass("select")) {
        str = node.val()
    } else {
        str = "";
    }
    return str
}


//存储cookie
////如果需要设定自定义过期时间
//function setCookie(name, value, time) {
//    var strsec = getsec(time);
//    var exp = new Date();
//    exp.setTime(exp.getTime() + strsec * 1);
//    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
//}
////获取cookie
//function getCookie(name) {
//    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//    if (arr = document.cookie.match(reg))
//        return unescape(arr[2]);
//    else
//        return null;
//};
function workbench(){
    var authorities = localStorage.getItem('authoritiesTwo');
    var loginName = localStorage.getItem('loginName');
    var accountType = localStorage.getItem('accountType');
    var lis = JSON.parse(authorities);
    if (lis == null || lis == "") {
        var toUrl = "../../login.html";
        //localStorage.setItem('url', window.location.pathname);
        window.open(toUrl, "_self");
    }else{        
        $('.sign .ren').text(loginName)
        $('.sign .type').text(accountType)
        var top_a = $('.top-a-box');
        var left_a = $('.left_a');
        var topNav = [], left = [];
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].roleId.toString().length < 4 && lis[i].roleId.toString().length > 2 && lis[i].roleId.toString().substr(0, 1) == 2) {
                topNav.push(lis[i])
            }
        }
        for (var i = 0; i < top_a.length; i++) {
            var aa = false
            for (var j = 0; j < topNav.length; j++) {
                if ($(top_a[i]).data('value') == topNav[j].roleId) {
                    aa = true
                }
            }
            if(aa == false){
                $(top_a[i]).remove()
            }
        }
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].roleId.toString().length == 5 && lis[i].roleId.toString().substring(0, 3) == '210') {
                left.push(lis[i])
            }
        }
        for (var i = 0; i < left_a.length; i++) {
            var bb = false
            for (var j = 0; j < left.length; j++) {
                if ($(left_a[i]).data('value') == left[j].roleId) {
                    bb = true
                }
            }
            if(bb == false){
                $(left_a[i]).remove()
            }else{
            	$(left_a[i]).removeClass('dn');
            }
        }
    }

}
function show_button(num){
	 var authorities = localStorage.getItem('authoritiesTwo');
	 var lis = JSON.parse(authorities);
	 let yes = false,data_show = true;
	  for (var i = 0; i < lis.length; i++) {
            if(num == lis[i].roleId){
            	 yes = true;
            }else{
            }
        }
	  if(!yes){
        return data_show = false;
    }else{
        return data_show = true;       
    }
}
function user_manage(){
    var authorities = localStorage.getItem('authoritiesTwo');
    var loginName = localStorage.getItem('loginName');
    var accountType = localStorage.getItem('accountType');
    var lis = JSON.parse(authorities);
    if (lis == null || lis == "") {
        var toUrl = "../../login.html";
        //localStorage.setItem('url', window.location.pathname);
        window.open(toUrl, "_self");
    }else{        
        $('.sign .ren').text(loginName)
        $('.sign .type').text(accountType)
        var top_a = $('.top-a-box');
        var left_a = $('.left_a');
        var topNav = [], left = [];
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].roleId.toString().length < 4 && lis[i].roleId.toString().length > 2 && lis[i].roleId.toString().substr(0, 1) == 2) {
                topNav.push(lis[i])
            }
        }
        for (var i = 0; i < top_a.length; i++) {
            var aa = false
            for (var j = 0; j < topNav.length; j++) {
                if ($(top_a[i]).data('value') == topNav[j].roleId) {
                    aa= true
                }
            }
            if(aa == true){

            }else{
                $(top_a[i]).remove()
            }
        }
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].roleId.toString().length == 5 && lis[i].roleId.toString().substring(0, 3) == '211') {
                left.push(lis[i])
            }
        }
        for (var i = 0; i < left_a.length; i++) {
            var dd = false
            for (var j = 0; j < left.length; j++) {
                if ($(left_a[i]).data('value') == left[j].roleId) {
                    dd= true
                }
            }
            if(dd == false){
                $(left_a[i]).remove()
            }else{
            	$(left_a[i]).removeClass('dn');
            }
        }
    }

}
function order_manage(){
    var authorities = localStorage.getItem('authoritiesTwo');
    var loginName = localStorage.getItem('loginName');
    var accountType = localStorage.getItem('accountType');
    var lis = JSON.parse(authorities);
    if (lis == null || lis == "") {
        var toUrl = "../../login.html";
        //localStorage.setItem('url', window.location.pathname);
        window.open(toUrl, "_self");
    }else{        
        $('.sign .ren').text(loginName)
        $('.sign .type').text(accountType)
        var top_a = $('.top-a-box');
        var left_a = $('.left_a');
        var topNav = [], left = [];
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].roleId.toString().length < 4 && lis[i].roleId.toString().length > 2 && lis[i].roleId.toString().substr(0, 1) == 2) {
                topNav.push(lis[i])
            }
        }
        for (var i = 0; i < top_a.length; i++) {
            var aa = false
            for (var j = 0; j < topNav.length; j++) {
                if ($(top_a[i]).data('value') == topNav[j].roleId) {
                    aa= true
                }
            }
            if(aa == false){
                $(top_a[i]).remove()
            }
        }
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].roleId.toString().length == 5 && lis[i].roleId.toString().substring(0, 3) == '212') {
                left.push(lis[i])
            }
        }
        for (var i=0;i<lis.length;i++)
        {
            if(lis[i].roleId.toString().length >= 7  && lis[i].roleId.toString().substring(0,3) == '212'){
                left.push(lis[i])
            }
        }
       //console.log(left)
       // for (var i = 0; i < left_a.length; i++) {
       //     var ee = false
       //     for (var j = 0; j < left.length; j++) {
       //         if ($(left_a[i]).data('value') == left[j].roleId) {
       //             ee= true
       //         }
       //     }
       //     if(ee == false){
       //         $(left_a[i]).hide()
       //     }
       // }
        for (var i = 0; i < left_a.length; i++) {
            var bb = false
            for (var j = 0; j < left.length; j++) {
                if ($(left_a[i]).data('value') == left[j].roleId) {
                    bb = true
                }
            }
            if(bb == true){
                $(left_a[i]).removeClass('dn');
            }else{
                $(left_a[i]).remove()
            }
        }
    }

}
function resource(){
    var authorities = localStorage.getItem('authoritiesTwo');
    var loginName = localStorage.getItem('loginName');
    var accountType = localStorage.getItem('accountType');
    var lis = JSON.parse(authorities);
    if (lis == null || lis == "") {
        var toUrl = "../../login.html";
        //localStorage.setItem('url', window.location.pathname);
        window.open(toUrl, "_self");
    }else{        
        $('.sign .ren').text(loginName)
        $('.sign .type').text(accountType)
        var top_a = $('.top-a-box');
        var left_a = $('.left_a');
        var topNav = [], left = [];
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].roleId.toString().length < 4 && lis[i].roleId.toString().length > 2 && lis[i].roleId.toString().substr(0, 1) == 2) {
                topNav.push(lis[i])
            }
        }
        for (var i = 0; i < top_a.length; i++) {
            var aa = false
            for (var j = 0; j < topNav.length; j++) {
                if ($(top_a[i]).data('value') == topNav[j].roleId) {
                    aa= true
                }
            }
            if(aa == false){
                $(top_a[i]).remove()
            }
        }
        for (var i=0;i<lis.length;i++)
        {
            if(lis[i].roleId.toString().length == 5  && lis[i].roleId.toString().substring(0,3) == '213'){
                left.push(lis[i])
            }
        }
        for (var i=0;i<lis.length;i++)
        {
            if(lis[i].roleId.toString().length >= 7  && lis[i].roleId.toString().substring(0,3) == '213'){
                left.push(lis[i])
            }
        }
        //for (var i = 0; i < left_a.length; i++) {
        //    for (var j = 0; j < left.length; j++) {
        //        if ($(left_a[i]).data('value') == left[j].roleId) {
        //            $(left_a[i]).removeClass('dn');
        //            return
        //        }
        //    }
        //}
        for (var i = 0; i < left_a.length; i++) {
            var bb = false
            for (var j = 0; j < left.length; j++) {
                if ($(left_a[i]).data('value') == left[j].roleId) {
                    bb = true
                }
            }
            if(bb == true){
                $(left_a[i]).removeClass('dn');
            }else{
                $(left_a[i]).remove()
            }
        }
    }

}
function sign(){
    var toUrl = "../../login.html";
    //localStorage.setItem('url', window.location.pathname);
    window.open(toUrl, "_self");
}
function derive(text){
    var bb = text;
    if( bb== null || bb== undefined){
        layer.msg('您无权限导出该记录!',{
            icon:2,
            time: 1300 //2秒关闭（如果不配置，默认是3秒）
        });
        return false
    }else{
        var html = "";
        $.ajax({
            url : '/icos/exp/queryExpTrans',
            type : 'post',
            data : {
                "taskNumber":bb,
            },
            headers : {
                "Authorization":localStorage.getItem('id'),
            },
            success : function(data){
                if(data.statusCode === 200){
                    html += '<div class="sw_trade">当前导出进度为' +data.data.currentNumber + '/' + data.data.totalNumber+ '</div>';
                    //html += '<div><span class="sw_btn2 dn sw_down"  onclick=down("'+bb+'")>下载</span></div>  ';
                    layer.open({
                        type: 1,
                        btn: ['下载','关闭'],
                        title: false,
                        closeBtn: 0,
                        shadeClose: false,
                        skin: 'your_class',
                        content:html,
                        yes: function(index, layero){
                            layer.close(index)
                            var tempwindow = window.open('_blank');
                            tempwindow.location = '/iccs/exp/expTransDownload?taskNumber=' + bb + "&Authorization=" +localStorage.getItem('id');
                        },
                        btn2: function(index, layero){
                            //按钮【按钮二】的回调
                            layer.close(index)
                            //return false 开启该代码可禁止点击该按钮关闭
                        }
                    });
                    var timer =  setInterval(function(){
                        $.ajax({
                            url : '/icos/exp/queryExpTrans',
                            type : 'post',
                            data : {
                                "taskNumber":bb,
                            },
                            headers : {
                                "Authorization":localStorage.getItem('id'),
                            },
                            success : function(response){
                                $('.sw_trade').html('当前导出进度为'+response.data.currentNumber + "/" + response.data.totalNumber);
                                if(response.data.isFinish == 1) {
                                    clearInterval(timer);
                                    $('.sw_trade').html('任务号:'+ bb + "导出完毕!");
                                    $(".your_class .layui-layer-btn .layui-layer-btn0").addClass('dib')
                                } else {
                                    return
                                }
                            },
                            error : function(err){

                            }
                        });

                    },1000)
                }else{
                    layer.msg(data.message,{
                        icon:2,
                        time: 1300 //2秒关闭（如果不配置，默认是3秒）
                    });
                }

            },
            error : function(err){

            }
        });
    }
}
function flexible(event) {
    var el = event.currentTarget;
    if($(el).find('span').hasClass("icon-xiangzuo")){
        $(el).find('span').removeClass("icon-xiangzuo");
        $(el).find('span').addClass("icon-xiangyou");
        $('#leftMenu_Box').animate({width:'0%'},'slow');
        $('#leftMenu_Box .leftMenu ul').fadeOut();
        $('#rightTable').animate({width:'100%'},'100');
        $('.sw_row table').animate({width:'100%'},'100');
    }else{
        $(el).find('span').removeClass("icon-xiangyou");
        $(el).find('span').addClass("icon-xiangzuo");
        $('#leftMenu_Box').animate({width:'15.08%'},'slow');
        $('#leftMenu_Box .leftMenu ul').fadeIn(1500);
        $('#rightTable').animate({width:'84.9%'},'1000');
        $('.sw_row table').css('width','100%')
    }

}
function aa(event){
        var el = event.currentTarget;
        if($(el).parent().find('div').hasClass("prop") ){
            $(el).parent().find('.prop').fadeIn(500);
            if($(el).find('i').hasClass("icon-iconfontfold")){
                $(el).parent().find('.prop').fadeIn(500);
                $(el).find('i').removeClass("icon-iconfontfold");
                $(el).find('i').addClass("icon-icon11");
            }else{
                $(el).parent().find('.prop').fadeOut(500);
                $(el).find('i').addClass("icon-iconfontfold");
                $(el).find('i').removeClass("icon-icon11");
            }
        }else{
            return
        }
}
//删除cookie
// delCookie("planCookie");
//function delCookie(name) {
//    var exp = new Date();
//    exp.setTime(exp.getTime() - 1);
//    var cval = getCookie(name);
//    if (cval != null) {
//        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
//    }
//}
//
//
//function changeDate2(val) {
//    var date = new Date().getTime() - (val * 24 * 60 * 60 * 1000);
//    var ndate = new Date(date);
//    var Y = ndate.getFullYear();
//    var M = ndate.getMonth() + 1 < 10 ? '0' + (ndate.getMonth() + 1) : (ndate.getMonth() + 1) + "";
//    var D = (ndate.getDate() < 10 ? '0' + (ndate.getDate()) : ndate.getDate() + "");
//    ndate = Y + M + D;
//    return ndate;
//}

// 导出表格
function inputExcel(id, name) {
    $(id).table2excel({
        exclude: ".noExl", // 不想导出的行加上class='noExl'即可
        name: "Excel Document Name.xls", // excel文档名
        filename: name // excel文件名
    });
}
                               