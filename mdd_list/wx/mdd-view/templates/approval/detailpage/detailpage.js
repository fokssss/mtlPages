import behavior from '../../template-behavior';

// 审批详情页面模板
Component({
    behaviors: [behavior],
    data: {
        isModalHidden: true,
        modalType: '',
        modalData: {},
    },
    lifetimes: {
        ready() {
            let mdd = this.data.mddObject;
            let actions = [
                'cmdBillDetail',
                'cmdFlowSheet',
                'cmdDoAgree',
                'cmdDoDisAgree',
                'cmdDoReject',
                'cmdDoReassign',
                'cmdDoAddApprove'
            ]
            for (let action of actions) {
                mdd.addActionHandler((action, args, space) => {
                    let id = args[0];
                    let actionObj = mdd.actions[action]
                    let { svcUrl, httpMethod, parameter } = actionObj
                    let req = {
                        url: svcUrl,
                        method: httpMethod,
                        parameter: parameter,
                    }
                }, action);
            }

            mdd.addActionHandler((action, args, space) => {
                wx.navigateTo({
                    url: '/pages/attachments/attachments'
                })
            }, 'cmdAttachments');

            mdd.addActionHandler((action, args, space) => {
                let psnid = args[0]
                    // TODO: 用户详情
                let contactinfolist = [{
                        "propname": "手机",
                        "propvalue": "18500567889",
                        "msgtype": "0"
                    },
                    {
                        "propname": "办公电话",
                        "propvalue": "62456565",
                        "msgtype": "1"
                    },
                    {
                        "propname": "电子邮件",
                        "propvalue": "yonyou@yonyou.com",
                        "msgtype": "3"
                    }
                ]
                this.setData({
                    isModalHidden: false,
                    modalType: 'UserInfo',
                    modalData: contactinfolist,
                })
            }, 'showUserInfo');
        }
    },
    methods: {
        loadViews(metadata) {
            let containers = metadata.view.containers[0].containers
            let headerToolbar = containers.find(obj => obj.controlType == 'TabStart').containers[0]
            let header = containers.find(obj => obj.controlType == 'div')
            let body = containers.find(obj => obj.controlType == 'CardHeader')
            body.modelpath = 'body'
            let flow = containers.find(obj => obj.controlType == 'Flow')
            let footerToolbar = containers.find(obj => obj.controlType == 'TabAround').containers[0]
            let contentItems = [{
                type: 'card',
                data: header,
            }, {
                type: 'detail-body',
                data: body,
            }, {
                type: 'flow',
                data: flow,
            }]
            contentItems = contentItems.sort((item1, item2) => {
                return item1.data.properties.order > item2.data.properties.order
            })

            // TODO: 演示用
            contentItems = contentItems.filter(item => {
                return '{"visibility":"gone"}' != item.data.properties.style
            })

            this.setData({
                headerToolbar,
                contentItems: contentItems,
                footerToolbar,
            })

            let model = metadata.model
        },
        hideModal(e) {
            this.setData({
                isModalHidden: true,
                modalType: '',
                modalData: {},
            })
        },
        onClickModalOk(e) {},
        makePhoneCall(e) {
            let phoneNumber = e.currentTarget.dataset.value
            wx.makePhoneCall({
                phoneNumber: phoneNumber,
            })
        }
    }
})