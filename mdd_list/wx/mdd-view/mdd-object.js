import { UUID } from "./utils/uuid"

/**
 * 
 * 核心类，模板内部的UI元数据处理和action的监听处理
 * */
class MDDObject {

    /**
     * 存储MDDObject实例的对象，里面是key:value的形式存储，key=identifier，value=MDDObject.instance
     */
    static _instances = {};

    /**
     * 通过identifier获取 {@link _instances}对象中的MDDObject
     * @param {string} identifier 
     */
    static instanceOf(identifier) {
        if (!identifier || identifier.length == 0) {
            return null;
        }
        return MDDObject._instances[identifier];
    }

    /**
     * 创建MDDObject空对象，并把该对象实例放到 {@link _instances}中存储
     * @param {string} identifier MDDObject的唯一标识
     */
    constructor(identifier = (new UUID()).uuidString) {
        this.identifier = identifier;
        this.metadata = {}
        this.data = {}
        this.actions = {}
        this.observers = {}
        this.actionSpaces = {}

        MDDObject._instances[identifier] = this
    }

    /**
     * 避免内存泄露，提供销毁MDDObject的方法
     */
    destroy() {
        MDDObject._instances[this.identifier] = null;
    }

    /**
     * 添加监听事件，数据更改以后刷新UI
     * @param {*} observer 监听函数
     * @param {*} dataSource 属性名的拼接前缀字符串
     * @param {*} field 属性名的拼接后缀字符串
     */
    addObserver(observer, dataSource, field = null) {
        if (!observer || !dataSource) {
            return;
        }
        let keyPath = dataSource + ((field && field.length > 0) ? ("." + field) : "")
        let observerArray = this.observers[keyPath] || []
        observerArray.push(observer)
        this.observers[keyPath] = observerArray;
    }

    /**
     * 
     * @param {*} data 业务数据
     * @param {*} dataSource 
     * @param {*} field 
     */
    postData(data, dataSource, field = null) {
        if (!dataSource) {
            return;
        }
        let keyPath = dataSource + ((field && field.length > 0) ? ("." + field) : "");
        let oldVal = this._valueOf(keyPath);
        let newVal = data;
        this._setValue(data, keyPath);
        let observerArray = this.observers[keyPath] || [];
        for (let observer of observerArray) {
            observer(oldVal, newVal);
        }
    }

    addActionHandler(handler, action, space = "DEFAULT") {
        if (!handler || !action) {
            return;
        }
        let actionSpace = this.actionSpaces[space] || {}
        let actionHandlers = actionSpace[action] || []
        actionHandlers.push(handler);
        actionSpace[action] = actionHandlers;
        this.actionSpaces[space] = actionSpace;
    }

    callAction(action, args = [], space = "DEFAULT") {
        if (!action) {
            return;
        }
        let actionSpace = this.actionSpaces[space] || {}
        let actionHandlers = actionSpace[action] || []
        for (let handler of actionHandlers) {
            handler(action, args)
        }
    }

    _valueOf(keyPath) {
        return keyPath.split('.').reduce((previous, current) => {
            return previous && previous[current];
        }, this.data)
    }

    _setValue(val, keyPath) {
        this.data = this._settingValue(this.data, keyPath.split('.'), val)
    }

    _settingValue(object, keyComponents, val) {
        let key = keyComponents.shift()
        if (keyComponents.length == 0) {
            object[key] = val;
        } else {
            object[key] = this._settingValue(object[key] || {}, keyComponents, val);
        }
        return object;
    }
}
export { MDDObject };