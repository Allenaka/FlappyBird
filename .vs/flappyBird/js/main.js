config = {
    baseUrl: './'
}
//引入依赖
require([
    'Bird',
    'Pipe',
    'Background',
    'Game'
],function(Bird, Pipe, Background, Game) {
    //图片地址列表
    var imgList = [
        "./imgs/bird0_0.png",
        "./imgs/bird0_1.png",
        "./imgs/bird0_2.png",
        "./imgs/bg_day.png",
        "./imgs/bg_night.png",
        "./imgs/land.png",
        "./imgs/pipe_up.png",
        "./imgs/pipe_down.png"
    ];

    //加载图片
    function loadImage(arr, callback) {
        //加载好的图片列表
        var result = [];
        //已加载完成的数量
        var num = 0;
        //数组长度
        var len = arr.length;
        //遍历数组
        for (var i = 0; i < len; i++) {
            var img = new Image();
            //图片加载完成
            img.onload = function() {
                //加载完成后增加一张
                num++;
                //全部加载完成后，执行回调函数
                if (num === len) {
                    callback(result);
                }
            }
            img.src = arr[i];
            result.push(img);
        }
    }
    //调用loadImage方法加载图片
    loadImage(imgList, function(arr) {
        //获取画布
        var canvas = document.getElementById('app');
        //获取上下文对象
        var ctx = canvas.getContext('2d');
        //获取背景图片宽高
        var width = arr[5].width;
        var height = arr[3].height; 
        //设置画布宽高
        canvas.width = width;
        canvas.height = height;
        //创建Bird、Pipe、Background实例对象，并传递给Game类
        var bird = new Bird(arr.slice(0,3), 100, 100);
        var pipe = new Pipe(arr[6], arr[7], 50, 200);
        var land = new Background(arr[5], 50, 0, 400);
        var mountain = new Background(arr[3], 10, 0, 0);
        //传递给Game
        var game = new Game(ctx, bird, pipe, land, mountain);
        //启动游戏
        game.init();
    });
});


