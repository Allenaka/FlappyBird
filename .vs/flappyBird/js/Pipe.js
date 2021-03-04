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
        this.width = x;
        this.x = x;
        //上下管道间隔
        this.interspace = 150;
        //管道长度
        this.pipeHeight = imgUp.height;
        //管道宽度
        this.pipeWidth = imgUp.width;
        //随机上管道高度
        this.pipeUpY = 10 + Math.random() * 230;
        //下管道高度
        this.pipeDownY = this.pipeUpY + this.interspace;
    }
    /**
     * @method createPipe 创建管道实例
     * @for Pipe
     */
    Pipe.prototype.createPipe = function() {
        return new Pipe(this.imgUp, this.imgDown, this.speed, this.width);
    }
    /**
     * @method reset 重置
     * @for Pipe
     */
    Pipe.prototype.reset = function() {
        this.x = this.width;
        this.pipeUpY = 10 + Math.random() * 230;
        this.pipeDownY = this.pipeUpY + this.interspace;
    }
    return Pipe;
});