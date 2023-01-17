//variáveis globais
var trex,bordas;
var trex_img;
var trexmorto_img;
var chao;
var chaoImg;
var chaofantasma;
var nuvem;
var cloudImg;
var cacto;
var cactoImg1, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6;
var gameOver,gameOver_Img;
var reiniciou,reiniciou_Img;
var grupoNuvem, grupoCacto;
var morteSom, checkPointSom, PuloSom;
var puntos = 0;
var PLAY = 1;
var END = 0;
var estadoJogo = PLAY;

//carregar os arquivos
function preload(){

    //imagens
    cloudImg = loadImage("cloud.png");
    trex_img = loadAnimation("cp2bmekrean61.gif");
    //trexmorto_img = loadImage("")
    chaoImg = loadImage("ground2.png");
    cactoImg1 = loadImage("Spikes-PNG-Clipart.png");
    cactoImg2 = loadImage("Spikes-PNG-Clipart.png");
    cactoImg3 = loadImage("Spikes-PNG-Clipart.png");
    cactoImg4 = loadImage("Spikes-PNG-Clipart.png");
    cactoImg5 = loadImage("Spikes-PNG-Clipart.png");
    cactoImg6 = loadImage("Spikes-PNG-Clipart.png");
    gameOver_Img = loadImage("gameOver.png");
    reiniciou_Img = loadImage("restart.png");
    
    //sons

}



//criando objetos e suas propriedades
function setup(){
   
    createCanvas(windowWidth,windowHeight);
   // chaofantasma = createSprite(300,200,600,10);
    chao = createSprite(300,height-180,600,10);
    chao.addImage(chaoImg);
    chaofantasma = createSprite(300,height-160,600,10);
    chaofantasma.visible = false;
    
    gameOver = createSprite(width/2,height-400,100,50);
    gameOver.visible = false;
    reiniciou = createSprite(width/2,height-350,50,50);
    reiniciou.visible = false;
      trex = createSprite(50,height-180,30,70);
      trex.addAnimation("correndo",trex_img);

   bordas=createEdgeSprites();

      trex.scale = 0.6;

    grupoNuvem = new Group();
    grupoCacto = new Group();

    gameOver.addImage(gameOver_Img);
    gameOver.scale = 0.7;
    //
    reiniciou.addImage(reiniciou_Img);
    reiniciou.scale = 0.5;
}
function draw(){
    background("white");

  //puntos k
  textSize(12);
  textFont("arial black");
  text("Pontos:"+puntos,width-110,height-610);
   
  //Estados kapa
  if(estadoJogo === PLAY){
    console.log("za warudo")
    //puntos correndo
    puntos = puntos + Math.round(frameCount/60);

    //chao movimento kk
    chao.velocityX = -7;
    //pulo
    if(touches.length > 0 || keyDown("space") && trex.y > 130){
        trex.velocityY  = -10;
      
        touches=[];
    }
    //grupos
   gerarNuvem();
   gerarCacto(); 
   //muda o estado
       //bate bate
   if(grupoCacto.collide(trex)){    
    estadoJogo = END;


}
  if(estadoJogo === END){
    console.log("perdeu kk")
    chao.velocityX = 0;
    //parar no lugar se perder
      grupoCacto.setVelocityXEach(0);
      grupoNuvem.setVelocityXEach(0);
      grupoNuvem.setLifetimeEach(-1);
      grupoCacto.setLifetimeEach(-1);
      gameOver.visible = true;
      reiniciou.visible = true;
      puntos = 0;
    } 
}
   if (mousePressedOver(reiniciou)){
     console.log("reiniciou!")
     reset();
   }
    

 //mais chao kk
 if(chao.x < 0){
    chao.x = chao.width/2;
 }
  
    
  //graviti
trex.velocityY = trex.velocityY + 0.5;
    drawSprites();
    //chão fantasma 
    trex.collide(chaofantasma);
   num1 = random(1,100);
   //console.log(frameCount);
}
    function gerarNuvem(){
    if(frameCount%60 === 0){
    var nuvem = createSprite(width-50,random(130,200),50,10);
    nuvem.addImage(cloudImg); 
    nuvem.scale = 1.4;
    nuvem.velocityX = -3;
    nuvem.depth = trex.depth;
    grupoNuvem.add(nuvem);

    trex.depth = trex.depth +1;
    nuvem.lifetime = width/2;
    }
    }
     function gerarCacto(){
    if(frameCount%90 === 0){
    var cacto = createSprite(width-50,height-228,5,3); 
    cacto.addImage(cactoImg1);
    cacto.velocityX = - (6 + cacto/100);
    cacto.velocityX = -4;
    cacto.scale = 0.2;
    //gerar cacto aleatorio
    var num = Math.round(random(1,6));
    switch(num){
        case 1: cacto.addImage(cactoImg1);
        break;

        case 2: cacto.addImage(cactoImg2);
        break;

        case 3: cacto.addImage(cactoImg3);
        break;

        case 4: cacto.addImage(cactoImg4);
        break;

        case 5: cacto.addImage(cactoImg5);
        break;

        case 6: cacto.addImage(cactoImg6);
        break;
    }
    cacto.depth = trex.depth = -1;
    grupoCacto.add(cacto);
    cacto.lifetime = width/2;
    }

    }

function reset(){
 estadoJogo = PLAY;
 gameOver.visible = false;
 reiniciou.visible = false;
 grupoCacto.destroyEach();
 grupoNuvem.destroyEach();
 
}







