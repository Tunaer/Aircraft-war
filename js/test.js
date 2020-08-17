//使背景动起来
var jsBg1 = document.getElementById("bg1");
var jsBg2 = document.getElementById('bg2');
var timerBg = setInterval(function(){
	jsBg1.style.top = jsBg1.offsetTop + 1 + 'px';
	jsBg2.style.top = jsBg2.offsetTop + 1 + 'px';
	if(jsBg1.offsetTop >=768){
		jsBg1.style.top = "-768px";
	}
	if(jsBg2.offsetTop >=768){
		jsBg2.style.top = "-768px";
	}
},10)
//分数
var count = 0;

//让飞机动起来  鼠标拖拽效果
var mainScreen = document.getElementById("mainScreen");
var airplane = document.getElementById("airplane");

airplane.addEventListener('click',function(e){
	var ev = e||window.event;
	baseX = ev.pageX;
	baseY = ev.pageY;
	//console.log(baseX,baseY);
	moveX = 0;
	moveY = 0;
	
	//给主屏幕添加鼠标移动事件 =>飞机移动
	//发射子弹
	var timerBullet = setInterval(function(){
		//创建子弹
		var bullet = document.createElement('div');
		mainScreen.appendChild(bullet);
		bullet.className = 'bullet';
		bullet.style.left =airplane.offsetLeft + 25 + 'px';
		bullet.style.top = airplane.offsetTop - 10 +'px';

		//让子弹飞
		var timerBulletFly = setInterval(function(){
			bullet.style.top = bullet.offsetTop - 8 + 'px';
			if(bullet.offsetTop <= -20){
				clearInterval(timerBulletFly);
				mainScreen.removeChild(bullet);
			}
		},30);
		bullet.timer = timerBulletFly;

	},150);



	//出现坦克
	var timerTank = setInterval(function(){
		//创建坦克
		var tank = document.createElement('div');
		mainScreen.appendChild(tank);
		tank.className = 'tank';
		tank.style.left =randomNum(0,472) + 'px';
		tank.style.top = '0px';

		//让坦克动
		var timerTankFly = setInterval(function(){
			tank.style.top = tank.offsetTop + 10 + 'px';
			if(tank.offsetTop >= 768){
				clearInterval(timerTankFly);
				mainScreen.removeChild(tank);
			}
		},50);
		tank.timer = timerTankFly;

	},1000);


	var timerPZJC = setInterval(function(){
		var alltanks = document.getElementsByClassName('tank');
		var allbullets = document.getElementsByClassName('bullet');
		for(var i = 0;i<allbullets.length;i++){
			for(var j =0;j<alltanks.length;j++){
				 var b = allbullets[i];
				 var t = alltanks[j];
				 if(pzjcFunc(b,t)){
					 clearInterval(b.timer);
					 clearInterval(t.timer);
					 mainScreen.removeChild(b);
					 mainScreen.removeChild(t);
					 break;
				 }
			}
		}
	},100)
	//死亡检测
	var timerDie = setInterval(function(){
		var alltanks = document.getElementsByClassName('tank');
		for(var i = 0;i<alltanks.length;i++){
			if(pzjcFunc(alltanks[i],airplane)){
				for(var j = 0;j<100;j++){
					clearInterval(j);
				}
				alert('Game Over');
				break;
			}
			console.log(alltanks[i].style.top);
			if(alltanks[i].offsetTop > 720){
				for(var j = 0;j<100;j++){
					clearInterval(j);
				}
				alert('Game Over');
				break;
			}
			
		}
	},50)


	mainScreen.addEventListener('mousemove',function(e){
		var en = e||window.event;
		//en.preventDefault();
		moveX = en.pageX - baseX;
		baseX = en.pageX;
		moveY = en.pageY - baseY;
		baseY = en.pageY;
		//console.log(baseX,baseY);
		airplane.style.left = airplane.offsetLeft + moveX + "px";
		airplane.style.top = airplane.offsetTop + moveY + "px";
	},false);
},false);

/* //发射子弹
var timerBullet = setInterval(function(){
	//创建子弹
	var bullet = document.createElement('div');
	mainScreen.appendChild(bullet);
	bullet.className = 'bullet';
	bullet.style.left =airplane.offsetLeft + 44 + 'px';
	bullet.style.top = airplane.offsetTop - 10 +'px';

	//让子弹飞
	var timerBulletFly = setInterval(function(){
		bullet.style.top = bullet.offsetTop - 8 + 'px';
		if(bullet.offsetTop <= -20){
			clearInterval(timerBulletFly);
			mainScreen.removeChild(bullet);
		}
	},30);
	bullet.timer = timerBulletFly;

},100);



//出现坦克
var timerTank = setInterval(function(){
	//创建坦克
	var tank = document.createElement('div');
	mainScreen.appendChild(tank);
	tank.className = 'tank';
	tank.style.left =randomNum(0,472) + 'px';
	tank.style.top = '0px';

	//让坦克动
	var timerTankFly = setInterval(function(){
		tank.style.top = tank.offsetTop + 10 + 'px';
		if(tank.offsetTop >= 768){
			clearInterval(timerTankFly);
			mainScreen.removeChild(tank);
		}
	},50);
	tank.timer = timerTankFly;

},1000);


var timerPZJC = setInterval(function(){
	var alltanks = document.getElementsByClassName('tank');
	var allbullets = document.getElementsByClassName('bullet');
	for(var i = 0;i<allbullets.length;i++){
		for(var j =0;j<alltanks.length;j++){
			 var b = allbullets[i];
			 var t = alltanks[j];
			 if(pzjcFunc(b,t)){
				 clearInterval(b.timer);
				 clearInterval(t.timer);
				 mainScreen.removeChild(b);
				 mainScreen.removeChild(t);
				 break;
			 }
		}
	}
},100)
//死亡检测
var timerDie = setInterval(function(){
	var alltanks = document.getElementsByClassName('tank');
	for(var i = 0;i<alltanks.length;i++){
		if(pzjcFunc(alltanks[i],airplane)){
			for(var j = 0;j<100;j++){
				clearInterval(j);
			}
			alert('Game Over');
			break;
		}
		console.log(alltanks[i].style.top);
		if(alltanks[i].offsetTop > 720){
			for(var j = 0;j<100;j++){
				clearInterval(j);
			}
			alert('Game Over');
			break;
		}
		
	}
},50) */

//随机数
function randomNum(min,max){
	return parseInt(Math.random() * (max-min)+min);
}

//碰撞检测
function pzjcFunc(block1,block2){
	var left1 = parseInt(window.getComputedStyle(block1).left);
	var left2 = parseInt(window.getComputedStyle(block2).left);
	var top1 = parseInt(window.getComputedStyle(block1).top);
	var top2 = parseInt(window.getComputedStyle(block2).top);
	var width1 = parseInt(window.getComputedStyle(block1).width);
	var width2 = parseInt(window.getComputedStyle(block2).width);
	var height1 = parseInt(window.getComputedStyle(block1).height);
	var height2 = parseInt(window.getComputedStyle(block2).height);
	var center1 = {
		x: left1 + width1/2,
		y: top1 + height1/2
	}
	var center2 = {
		x: left2 + width2/2,
		y: top2 + height2/2
	}
	var diffx = Math.abs(center1.x - center2.x);
	var diffy = Math.abs(center1.y - center2.y);
	
	if(diffx < (width1 + width2) / 2 && diffy < (height1 + height2)/2){
		return true;//撞上了
	}
	return false;
}
var obutton = document.getElementById('replay');
obutton.onclick = function(){
	location.reload(true);
}






