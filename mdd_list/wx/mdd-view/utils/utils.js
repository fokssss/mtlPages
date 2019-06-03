function getJsonParamers({ billnum = "", pageIndex = 1, pageSize = 10 }) {
  let parameters = {
    "billnum": billnum,
    "data": null,
    "item": null,
    "refCode": null,
    "key": null,
    "ruleKey": null,
    "id": null,
    "treename": null,
    "treeDomain": null,
    "ids": null,
    "fullname": null,
    "tplid": null,
    "mapCondition": null,
    "treeMapCondition": null,
    "treeCondition": null,
    "condition": {
      "filtersId": 47980261,
      "solutionId": 1000179448,
      "solutionName": null,
      "isDefault": 0,
      "commonVOs": [{
        "solutionId": 0,
        "itemId": null,
        "itemTitle": null,
        "refType": 0,
        "isCommon": 0,
        "rangeInput": 0,
        "multSelect": 0,
        "compareLogic": null,
        "itemName": "schemeName",
        "value1": "unhandledlist",
        "value2": null,
        "text": null,
        "token": 0,
        "orderId": 0,
        "dataSource": null,
        "itemType": null,
        "referCode": null,
        "defineId": null,
        "bhidden": null,
        "enumType": null,
        "enum": null,
        "autoflt": null
      },
      {
        "solutionId": 0,
        "itemId": null,
        "itemTitle": null,
        "refType": 0,
        "isCommon": 0,
        "rangeInput": 0,
        "multSelect": 0,
        "compareLogic": null,
        "itemName": "isDefault",
        "value1": false,
        "value2": null,
        "text": null,
        "token": 0,
        "orderId": 0,
        "dataSource": null,
        "itemType": null,
        "referCode": null,
        "defineId": null,
        "bhidden": null,
        "enumType": null,
        "enum": null,
        "autoflt": null
      }
      ],
      "advanceVOs": null,
      "queryConditionGroup": null,
      "simpleVOs": null,
      "extend": false
    },
    "partParam": null,
    "action": null,
    "dataType": null,
    "groupSchemaId": null,
    "groupSchemaName": null,
    "bSelfDefine": null,
    "cSelfDefineType": null,
    "externalData": null,
    "reportName": null,
    "reportId": null,
    "viewid": null,
    "subscriptionId": null,
    "url": null,
    "convertType": null,
    "page": {
      "pageIndex": pageIndex,
      "pageSize": 10,
      "totalCount": 0
    },
    "path": null,
    "queryOrders": null,
    "treeQueryOrders": null,
    "operator": null,
    "likeValue": null,
    "refEntity": null,
    "listBillNum": null,
    "print": false,
    "distinct": false,
    "orgId": null,
    "sum": false,
    "includeMeta": false,
    "publish": false,
    "onlyDimension": false,
    "onlyTotal": false,
    "onlyCount": false,
    "fromKanban": false
  }
  return parameters;
}

export {
  getJsonParamers
}