//定义Bird模块
define([],function() {
    /**
     * @class Bird
     * @param {Array} 小鸟图片数组  
     * @param {Number} 小鸟初始横坐标  
     * @param {Number} 小鸟初始纵坐标  
     */
    function Bird(imgArr, x, y) {
        //存储信息
        this.imgArr = imgArr;
        this.x = x;
        this.y = y;
        //当前选择图片下标
        this.index = 0;
        //当前选择的小鸟图片
        this.img = imgArr[this.index];
        //小鸟飞行初速度
        this.speed = 0;
        //初始下落加速度
        this.acc = 10;
        //飞行方向状态，true为向下，false为向上
        this.direction = true;
        //角度
        this.angle = 0;
    };
    /**
     * @method fly 小鸟飞行
     * @for Bird
     */
    Bird.prototype.fly = function() {
        this.img = this.imgArr[this.index++];
        if (this.index == 3) {
            this.index = 0;
        }
    }
    /**
     * @method flyDown 小鸟向下飞行
     * @for Bird
     */
    Bird.prototype.flyDown = function() {
        //计算飞行角度
        if (this.direction) {
            //向下飞
            this.angle = Math.PI / 180 * this.speed * 2;
            // this.acc++;
            this.speed += this.acc * (1 / 60);
            this.y += this.speed;
        }
        else {
            //向上飞
            this.angle = -Math.PI / 180 * this.speed * 2;
            //上边界
            if (this.y < 0) {
                this.y = this.img.height / 4;
            }
            this.speed--;
            if (this.speed === 0) {
                this.direction = true;
                return;
            }
            this.y -= this.speed;
        }
    }
    /**
     * @method flyDown 小鸟向上飞行
     * @for Bird
     */
    Bird.prototype.flyUp = function() {
        //改变飞行状态
        this.direction = false;
        //向上初速度
        this.speed = 10;
    }
    /**
     * @method reset 重置
     * @for Bird
     */
    Bird.prototype.reset = function() {
        this.index = 0;
        this.y = 100;
        this.speed = 0;
        this.acc = 10;
        this.direction = true;
        this.angle = 0;
    }
    return Bird;
});
