define([], function() {
    /**
     * @class Pipe
     * @param {HTMLImageElement} imgUp 上管道图片
     * @param {HTMLImageElement} imgDown 下管道图片
     * @param {Number} speed 管道速度
     * @param {Number} x 管道横坐标
     */
    function Pipe(imgUp, imgDown, speed, x) {
        //存储数据
        this.imgUp = imgUp;
        this.imgDown = imgDown;
        this.speed = speed;
        this.x = x;
    }
    return Pipe;
});