define([], function() {
    /**
     * 
     * @param {HtmlImageElement} img 图片
     * @param {Number} speed 速度
     * @param {Number} x 横坐标
     * @param {Number} y 纵坐标
     */
    function Background(img, speed, x, y) {
        this.img = img;
        this.speed = speed;
        this.y = y;
        this.x = x;
    }
    return Background;
});