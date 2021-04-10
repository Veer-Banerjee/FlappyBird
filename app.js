var myGamePiece ;
var myObsatacles = [] ; 
var myScore ;
var flappy = "https://www.pngitem.com/pimgs/b/184-1842507_flappy-bird-png.png" ;

function startGame(){
    myGameArea.start();
    myGamePiece = new component(30,30,flappy,10,120,"image")
    myScore = new component("30px","Consolas","#5f27cd",280,40,"text");
}

var myGameArea = {
    canvas:document.createElement("canvas"),
    start:function(){
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.context=this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea,20);
    },
    clear:function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop:function(){
        clearInterval(this.interval);
    }
}

function component(width,height,color,x,y,type){
    this.type = type;
    if(type == "image"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function(){
        ctx = myGameArea.context;
        if(type == "text"){
            ctx.font = this.width + "" + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text,this.x,this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }

        if(type == "image"){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    this.crashWith = function(otherobj){
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);

        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);

        var crash = true;
        if((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)){
            crash = false;
        }
        return crash;
    }
}

function updateGameArea(){
    var x, y, gap, minHeight, maxHeight, minGap, maxGap;
    for(i=0; i<myObsatacles.length; i+=1){
        if(myGamePiece.crashWith(myObsatacles[i])){
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if(myGameArea.frameNo == 1 || everyinterval(150)){
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        minGap = 50;
        maxGap = 200;

        height = Math.floor(Math.random() * (maxHeight-minHeight+1)+minHeight);
        gap = Math.floor(Math.random() * (maxGap-minGap+1)+minGap);

        myObsatacles.push(new component(10,height,"black",x,0));
        myObsatacles.push(new component(10,x-height-gap,"black",x,height+gap));
    }
    for(i=0;i<myObsatacles.length;i++){
        myObsatacles[i].speedX = -1;
        myObsatacles[i].newPos();
        myObsatacles[i].update();
    }

    myScore.text = "SCORE :" +myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n){
    if((myGameArea.frameNo / n)%1 == 0){
        return true;
    }
    return false;
}

 function moveup(){
     myGamePiece.speedY = -1;
 }

 function movedown(){
    myGamePiece.speedY = +1;
}

function moveleft(){
    myGamePiece.speedX = -1;
}

function moveright(){
    myGamePiece.speedX = +1;
}

function clearmove(){
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}