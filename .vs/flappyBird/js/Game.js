define([], function() {
    /**
     * @class Game
     * @param {CanvasRenderingContext2D} ctx canvas上下文
     * @param {Bird} bird 小鸟实例
     * @param {Pipe} pipe 管道实例
     * @param {Background} land 背景实例
     * @param {Background} mountain 背景实例
     */
    function Game(ctx, bird, pipe, land, mountain) {
        this.ctx = ctx;
        this.bird = bird;
        this.pipe = pipe;
        this.pipeArr = [pipe];
        this.land = land;
        this.mountain = mountain; 
        this.width = ctx.width;
        this.height = ctx.height;
        this.timebar = null; 
        //当前帧数   
        this.frame = 0;
        //当前分数
        this.score = 0;
    }
    /**
     * @method init 初始化
     * @for Game
     */
    Game.prototype.init = function() {
        this.startGame();
        this.bindEvent();   
    }
    /**
     * @method startGame 启动游戏
     * @for Game
     */
    Game.prototype.startGame = function() {
        //定时器间隔
        var interval = 1 / 60 * 1000;
        //启动定时器绘制画面
        this.timebar = setInterval(() => {
            //帧数加一
            this.frame++;
            //绘制前清空原有内容
            this.ctx.clearRect(0, 0, this.width, this.height);  
            //绘制背景
            this.renderMountain();
            this.renderLand();      
            //绘制小鸟儿
            this.renderBird();  
            //绘制管道
            this.renderPipe();
            //碰撞检测
            this.checkCrush();  
        }, interval);
    }
    /**
     * @method renderMountain 绘制背景
     * @for Game
     */
    Game.prototype.renderMountain = function() {
        var mountain = this.mountain;
        //边界处理
        if (mountain.x <= -mountain.img.width) {
            //重置横坐标
            mountain.x = 0;
        }
        //绘制
        this.ctx.drawImage(mountain.img, mountain.x, 0);
        //猫腻图
        this.ctx.drawImage(mountain.img, mountain.x + mountain.img.width, 0);
        //左移
        mountain.x -= mountain.speed / 60;       
    }
    /**
     * @method renderLand 绘制地面
     * @for Game
     */
    Game.prototype.renderLand = function() {
        var land = this.land;
        
        if (land.x <= -land.img.width) {
            land.x = 0;
        }
        this.ctx.drawImage(land.img, land.x, land.y);
        this.ctx.drawImage(land.img, land.x + land.img.width, land.y);  
        land.x -= land.speed / 60;
    }
    /**
     * @method renderBird 绘制小鸟儿
     * @for Game
     */
    Game.prototype.renderBird = function() {
        var bird = this.bird;
        this.ctx.save();
        //改变坐标系
        this.ctx.translate(bird.x, bird.y);
        //旋转坐标系
        this.ctx.rotate(bird.angle);
        this.ctx.drawImage(bird.img, -bird.img.width / 2, -bird.img.height / 2);
        //每10帧切换一张小鸟图片
        if (this.frame % 10 === 0) {
            bird.fly();           
        }
        //下落
        bird.flyDown();
        this.ctx.restore();
    }
    /**
     * @method renderPipe 绘制管道
     * @for Game
     */
    Game.prototype.renderPipe = function() {
        if (this.frame === 240) {
            this.createPipe();
        }
        for (var i = 0; i < this.pipeArr.length; i++) {
            var pipe = this.pipeArr[i];
        
            //边界处理
            if (pipe.x <= -pipe.pipeWidth) {
                pipe.x = this.ctx.canvas.width;
            }
            //下管道高度
            var pipeDownHeight = this.land.y - pipe.pipeUpY - pipe.interspace;
            pipe.x -= pipe.speed / 60;
            this.ctx.drawImage(pipe.imgDown, pipe.x, -pipe.pipeHeight + pipe.pipeUpY);
            this.ctx.drawImage(pipe.imgUp, 0, 0, pipe.pipeWidth, pipeDownHeight, pipe.x, pipe.pipeUpY + pipe.interspace, pipe.pipeWidth, pipeDownHeight);
            if(Math.round(pipe.x) == this.bird.x - pipe.pipeWidth) {
                this.score++;
                console.log(this.score);
            }
        }
    }
    /**
     * @method createPipe 创建管道
     * @for Game
     */
    Game.prototype.createPipe = function() {
        pipe = this.pipeArr[0].createPipe();
        this.pipeArr.push(pipe);
    }
    /**
     * @method bindEvent 事件绑定
     * @for Game
     */
    Game.prototype.bindEvent = function() {       
        this.ctx.canvas.onclick = () => {
            this.bird.flyUp();
        }
    }
    /**
     * @method checkCrush 碰撞处理
     * @for Game
     */
    Game.prototype.checkCrush = function() {
        
        var birdX = this.bird.x;
        var birdY = this.bird.y;
        // console.log(birdY);
        // this.ctx.strokeStyle = 'red';
        // this.ctx.lineWidth = 5;
        // this.ctx.beginPath();
        // this.ctx.moveTo(birdX, birdY);
        // this.ctx.lineTo(birdX, 200);
        // this.ctx.closePath();
        // this.ctx.stroke();
        for (var i = 0; i < this.pipeArr.length; i++) {
            //管道左侧边界
            var pipeLeftX = this.pipeArr[i].x;
            //管道右侧边界
            var pipeRightX = this.pipeArr[i].x + this.pipeArr[i].pipeWidth;
            //管道下方边界
            var pipeDownY = this.pipeArr[i].pipeDownY;
            //管道上方边界
            var pipeUpY = this.pipeArr[i].pipeUpY;
            //地面边界
            var landY = this.land.y;
            //判断碰撞
            if (birdX >= pipeLeftX - this.bird.img.width / 4 && birdX <= pipeRightX + this.bird.img.width / 4) {
                if (pipeDownY - birdY <= this.bird.img.height / 16 || birdY - pipeUpY <= this.bird.img.height / 16) {
                    this.gameOver();               
                }
            }
            else if(landY - birdY <= this.bird.img.height / 16) {
                this.gameOver();
            }
        }        
    }
     /**
     * @method reset 重置
     * @for Game
     */
    Game.prototype.reset = function() {
        //当前帧数   
        this.frame = 0;
        //当前分数
        this.score = 0;
        this.pipeArr[0].reset();
        if (this.pipeArr.length == 2) {
            this.pipeArr.pop();
        }
        this.bird.reset();
    }
    /**
     * @method gameOver 游戏结束
     * @for Game
     */
    Game.prototype.gameOver = function() {
        alert("游戏结束, 得分：" + this.score);
        clearInterval(this.timebar);
        
        this.reset();
        this.init();
    }
    return Game;
});