import behavior from '../../template-behavior';
import { getJsonParamers } from '../../../utils/utils'

const app = getApp()
    // const { universalSer } = app.globalData.api

// 审批列表页面模板
Component({
    behaviors: [behavior],
    data: {
        selectedIndex: 0,
        isModalHidden: true,
        modalType: '',
        modalData: {},
        cachedDatas: {},
    },
    lifetimes: {
        ready() {
            let mdd = this.data.mddObject;
            for (let action of['cmdSearchUnhandled', 'cmdSearchHandled', 'cmdSearchHandling']) {
                mdd.addActionHandler((action, args, space) => {
                    let dataSource = args[0];
                    let bindField = args[1];
                    if (!this.data.cachedDatas[action]) {
                        this.requestData({ action, dataSource, bindField, pageIndex: 1, })
                    }
                }, action);
            }

            for (let action of['cmdApprove', 'cmdReject']) {
                mdd.addActionHandler((action, args, space) => {
                    let taskid = args[0];
                    this.setData({
                        isModalHidden: false,
                        modalType: action,
                        modalData: {
                            taskid: taskid
                        },
                    })

                }, action);
            }

            mdd.addActionHandler((action, args, space) => {
                let taskid = args[0];
                let tenantCode = "h4q69gc0_NCApproval";
                let userCode = "ff";
                let metadataUrl = `http://x5sga4gn.c87e2267-1001-4c70-bb2a-ab41f3b81aa3.app.yyuap.com/billmeta/getbill?billno=taskDetailbill&bIncludeViewModel=true&tenantCode=${tenantCode}&userCode=${userCode}&id=${taskid}`
                wx.navigateTo({
                    url: '../__template_nameDetail/detail?metadataUrl=' + encodeURIComponent(metadataUrl)
                })
            }, 'cmdDetail');
        }
    },
    methods: {
        requestData({ action, dataSource, bindField, pageIndex = 1 }) {
            let tenantCode = "h4q69gc0_NCApproval"
            let userCode = "ff"
            let mdd = this.data.mddObject;
            let handleStatus = mdd.actions[action].parameter.handleStatus || '';
            wx.showLoading({ mask: true })
            wx.request({
                url: `http://x5sga4gn.c87e2267-1001-4c70-bb2a-ab41f3b81aa3.app.yyuap.com/bill/list?tenantCode=${tenantCode}&userCode=${userCode}&handleStatus=${handleStatus}`,
                data: getJsonParamers({
                    billnum: mdd.metadata.cardBillno,
                    pageIndex: pageIndex
                }),
                header: { 'content-type': 'application/json' },
                method: 'POST',
                success: (res) => {
                    if (res.data.code == 200) {
                        let data = res.data.data.recordList;
                        let isNoMoreData = (data.length < res.data.data.pageSize)
                        if (pageIndex != 1) {
                            let currentData = this.data.cachedDatas[action] || []
                            data = [...currentData, ...data];
                        }
                        mdd.postData({ data, pageIndex, isNoMoreData }, dataSource, bindField);
                        this.data.cachedDatas[action] = data;
                    }
                },
                complete: (res) => {
                    wx.hideLoading()
                }
            });
        },
        loadViews(metadata) {
            let containers = metadata.view.containers
            let header = containers.find(obj => obj.controlType == 'ListHeader').containers[0]
            let controls = header.controls.sort((a, b) => {
                return a.properties.order > b.properties.order
            })
            let segments = controls.map((obj, idx) => {
                return {
                    title: obj.properties.showCaption,
                    action: obj.action,
                    selected: idx == 0,
                }
            })
            let tables = containers.filter(obj => obj.controlType == 'Table')
            tables = tables.sort((a, b) => a.properties.order > b.properties.order)
            tables = tables.map((obj, idx) => {
                let segment = segments[idx]
                obj.hidden = idx != 0
                obj.bindField = segment.action
                segment.dataSource = obj.dataSource
                return obj
            })
            this.setData({
                header: segments,
                tables: tables,
            })
        },
        onSegmentChanged(e) {
            // 切换标签
            let index = e.detail.selectedIndex;
            this.data.selectedIndex = index;
            let tables = this.data.tables.map((obj, idx) => {
                obj.hidden = idx != index
                return obj
            })
            this.setData({
                tables: tables
            })
        },
        hideModal(e) {
            this.setData({
                isModalHidden: true,
                modalType: '',
                modalData: {},
            })
        },
        onClickModalOk(e) {
            let taskid = this.data.modalData.taskid
            let note = this.data.note
            if (this.data.modalType == 'cmdApprove') {
                this.doApprove(taskid, note)
            } else if (this.data.modalType == 'cmdReject') {
                this.doReject(taskid, note)
            }
            this.hideModal()
            this.data.note = null;
        },
        onInputChange(e) {
            // 审批意见输入框内容发生改变
            this.data.note = e.detail.value
        },
        doApprove(taskid, note) {
            // 执行批准请求
            // let user = "ff"
            // let uri = universalSer + '/universalSer/agree';
            // let info = {
            //     'action': 'doAgree',
            //     'note': note,
            //     'user': user,
            //     'taskid': taskid
            // }
            // this.doActionRequest(uri, info)
        },
        doReject(taskid, note) {
            // 执行驳回请求
            // let user = "ff"
            // let uri = universalSer + '/universalSer/reject';
            // let info = {
            //     'action': 'doReject',
            //     'note': note,
            //     'user': user,
            //     'taskid': taskid
            // }
            // this.doActionRequest(uri, info)
        },
        doActionRequest: function(uri, info) {
            // 业务请求入口
            let theInfo = Object.assign(info, this.userinfo);
            app.universalSerRequest(uri, theInfo, data => {
                if (data.flag == '0') {
                    wx.navigateBack()
                }
                util.showToast(data.des);
            })
        },
        onListRefresh(e) {
            let action = this.data.header[this.data.selectedIndex].action
            let { dataSource, bindField } = e.detail;
            this.requestData({ action, dataSource, bindField })
        },
        onListScrollToLower(e) {
            let action = this.data.header[this.data.selectedIndex].action
            let { dataSource, bindField, pageIndex } = e.detail;
            pageIndex += 1;
            this.requestData({ action, dataSource, bindField, pageIndex, })
        }
    }
})