/**
 * 生成唯一id，用于MDDObject
 */
class UUID {
    /**
     * @constructor
     */
    constructor() {
        var d = new Date().getTime();
        this.uuidString = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
    }
}

export { UUID }