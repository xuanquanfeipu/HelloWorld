(function(){
        var CREATE = 1;
        var MODIFY = 2;
        var VERIFY = 3;

        window.GestureLock = function(obj, listener){
            this.chooseType = 3;

            this.operType = obj.operType;
            this.password = obj.password || '';
            this.canvasId = obj.canvasId || 'canvas';

            this.touchStep = 1;
            this.listener = listener;  //向此模块注册的监听对象

            this.devicePixelRatio = window.devicePixelRatio || 1;

            this.canListen = true;
        };

        //组件初始化
        GestureLock.prototype.init = function() {
            this.initDom();

            this.lastPoint = [];
            this.touchFlag = false;

            this.ctx = this.canvas.getContext('2d');

            this.createCircle();

            this.bindEvent();
        };

		GestureLock.prototype.setOperType = function(operType) {
		    this.operType = operType;
		};

		GestureLock.prototype.setPassword = function(password) {
		    this.password = password;
		};

		GestureLock.prototype.getPassword = function() {
		    return this.password;
		};

        GestureLock.prototype.drawCircle = function(x, y) { // 初始化解锁密码面板 小圆圈
            this.ctx.strokeStyle = '#87888a';//密码的点点默认的颜色
            this.ctx.lineWidth = 4;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
        };
        GestureLock.prototype.drawPoint = function(color) { // 初始化圆心
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2.5, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        };
        GestureLock.prototype.drawTouchedCircle = function(color) { // 绘制轨迹经过的圆圈
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 4;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        };
        GestureLock.prototype.drawLine = function(color, po, lastPoint) {//style:颜色 解锁轨迹
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 4;
            this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);

            for (var i = 1 ; i < this.lastPoint.length ; i++) {
                this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            }
			
			if (po) {
				this.ctx.lineTo(po.x, po.y);
			}
			
            this.ctx.stroke();
            this.ctx.closePath();

        };
        GestureLock.prototype.createCircle = function() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径

            var n = this.chooseType;
            var count = 0;
            this.r = this.ctx.canvas.width / 14;
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0 ; i < n ; i++) {
                for (var j = 0 ; j < n ; j++) {
                    count++;
                    var obj = {
                        x: j * 4 * r + 3 * r,
                        y: i * 4 * r + 3 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            for (var i = 0 ; i < this.arr.length ; i++) {
                this.drawCircle(this.arr[i].x, this.arr[i].y);
            }
            //return arr;
        };
        GestureLock.prototype.getPosition = function(e) {// 获取touch点相对于canvas的坐标
            var rect = e.currentTarget.getBoundingClientRect();
            var po = {
                x: (e.touches[0].clientX - rect.left)*this.devicePixelRatio,
                y: (e.touches[0].clientY - rect.top)*this.devicePixelRatio
              };
            return po;
        };
        GestureLock.prototype.update = function(po) {// 核心变换方法在touchmove时候调用
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
                this.drawCircle(this.arr[i].x, this.arr[i].y);
            }

            this.drawPoint('#27AED5');// 每帧花轨迹
            this.drawTouchedCircle('#27AED5');// 每帧花轨迹

            this.drawLine('#27AED5',po , this.lastPoint);// 每帧画圆心


            for (var i = 0 ; i < this.restPoint.length ; i++) {
                if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {

                    /*
                     * 在处理当前触摸到的点之前，先检查当前点与上一个点的连线上是否有未处理的点，如果有，先将此未处理的点处理掉
                     * 计算当前点与上一个已选点左边间的差值的一半，如果计算出的坐标存在于restPoint数组中，则将该点先于当前点加入lastPoint数组中
                     * 注意：这种处理方法仅使用与3X3点阵的手势密码场景
                     */
                    var curPoint = this.restPoint[i];
                    if (this.lastPoint.length > 0) {
                        var prePoint = this.lastPoint[this.lastPoint.length - 1];
                        if ((Math.abs(curPoint.x - prePoint.x) / 2) % (this.r * 4) == 0 && (Math.abs(curPoint.y - prePoint.y) / 2) % (this.r * 4) == 0) {
                            var targetX = Math.abs(curPoint.x - prePoint.x) / 2 + Math.min(curPoint.x, prePoint.x);
                            var targetY = Math.abs(curPoint.y - prePoint.y) / 2 + Math.min(curPoint.y, prePoint.y);

                            for (var restIdx = 0; restIdx < this.restPoint.length; restIdx++) {
                                if (restIdx == i) {
                                    continue;
                                }
                                if (this.restPoint[restIdx].x == targetX && this.restPoint[restIdx].y == targetY) {

                                    this.drawPoint(targetX, targetX);
                                    this.lastPoint.push(this.restPoint[restIdx]);
                                    this.restPoint.splice(restIdx, 1);

                                    //restPoint数组元素减少，如果减少的元素在当前处理元素之前，则要把当前元素下标减1
                                    if (restIdx < i) {
                                        i--;
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    //处理当前点
                    this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
                    this.lastPoint.push(this.restPoint[i]);
                    this.restPoint.splice(i, 1);

                    break;
                }
            }

        };

        GestureLock.prototype.afterTouch = function(touchTrial) {// touchend结束之后对密码和状态的处理
            //获取当前输入的手势密码
            var password = '';
            for (var i = 0; i < touchTrial.length; i++) {
                password += touchTrial[i].index;
            }

            var ret = {
                'operType' : this.operType,
                'touchStep' : this.touchStep,
                'isSuccess' : false
            };


            if (this.operType == CREATE || this.operType == MODIFY) {  //创建或修改手势密码
                if (this.touchStep == 1) {
                    //设置手势密码第一轮

                    //手势密码要求不少于4个点
                    if (password.length >= 4) {
                        ret.isSuccess = true;

                        this.tmpPassword = password;
                        this.touchStep = 2;
                    } else {
                        ret.isSuccess = false;
                    }

                } else {
                    if (password == this.tmpPassword) {
                        this.setPassword(password);
                        ret.isSuccess = true;

                        this.drawTouchedCircle('#2CFF26');
                        this.drawPoint('#2CFF26');
                    } else {
                        ret.isSuccess = false;

                        this.drawTouchedCircle('red');
                        this.drawPoint('red');

                        this.touchStep = 1;
                    }
                }
            } else if (this.operType == VERIFY) {  //验证手势密码
                if (password == this.password) {
                    ret.isSuccess = true;

                    this.drawTouchedCircle('#2CFF26');//小点点外圈高亮
                    this.drawPoint('#2CFF26');
                    this.drawLine('#2CFF26', null, this.lastPoint);// 每帧画圆心
                } else {
                    ret.isSuccess = false;

                    this.drawTouchedCircle('red');
                    this.drawPoint('red');
                    this.drawLine('red', null, this.lastPoint);// 每帧画圆心
                }
            }

            //调用监听对象的回调函数
            if (this.listener) {
                this.listener.callback(ret);
            }

        };
        //初始化页面相关
        GestureLock.prototype.initDom = function(){
            this.canvas = document.getElementById(this.canvasId);

            var width = this.width || document.body.clientWidth;
            var height = this.height || document.body.clientWidth;

            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.canvas.height = height * this.devicePixelRatio;
            this.canvas.width = width * this.devicePixelRatio;
        };
		//组件复位
        GestureLock.prototype.reset = function() {
            this.createCircle();
        };
        //注册事件监听
        GestureLock.prototype.bindEvent = function() {
            var self = this;
            this.canvas.addEventListener("touchstart", function (e) {
                if (!self.canListen) {
                    return;
                }

                e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
                 var po = self.getPosition(e);

                 for (var i = 0 ; i < self.arr.length ; i++) {
                    if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {

                        self.touchFlag = true;
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i,1);
                        break;
                    }
                 }
             }, false);
             this.canvas.addEventListener("touchmove", function (e) {
                if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
             }, false);
             this.canvas.addEventListener("touchend", function (e) {
                 if (self.touchFlag) {

                    self.canListen = false;
				 
					//重绘初始图形
					self.ctx.clearRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height);
					for (var i = 0 ; i < self.arr.length ; i++) {
						self.drawCircle(self.arr[i].x, self.arr[i].y);
					}
					
                     self.touchFlag = false;
                     self.afterTouch(self.lastPoint);

                     setTimeout(function(){
                        self.reset();
                        self.canListen = true;
                    }, 200);
                 }


             }, false);
        };
})();
