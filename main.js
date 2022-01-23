const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
// ctx.globalCompositeOperation='destination-over';

let drawing = false;
let optVal_value=1;
let color_opt='black';

const edge = 60;
const mouse = {
  x:null,
  y:null
};

window.addEventListener('mousemove',function(event){
  mouse.x=event.x;
  mouse.y=event.y;
  // console.log("hiiiiiii");
  // branchOut();
});

class Root
{
  constructor(x,y,color,centerX,centerY)
  {
    this.x=x;
    this.y=y;
    this.color=color;
    this.speedX=0;
    this.speedY=0;
    this.centerX=centerX;
    this.centerY=centerY;
    
  }
  
  draw()
  {
    if(drawing===true) {
      
    // console.log("hey")
    this.speedX += (Math.random()-0.5)/2;
    this.speedY += (Math.random()-0.5)/2;
    
    this.x += this.speedX;
    this.y += this.speedY;
    
    const distanceX = this.x - this.centerX;
    const distanceY = this.y - this.centerY;
    const distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
    let opt_val=getOptVal(edge);
    const radius = (-distance/edge + 1)*opt_val;
    // console.log(radius)
    if(radius > 0)
    {
      // console.log("hii there");
      requestAnimationFrame(this.draw.bind(this));
      ctx.beginPath();
      ctx.arc(this.x,this.y,radius,0,2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle= color_opt;//getRandomColor();
      ctx.stroke();
      
      
    }
  }
    }
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function branchOut()
{
  const centerX = mouse.x;
  const centerY = mouse.y;
  
  
  for(let i=0;i<3;i++)
  {
    
    let col = getRandomColor();
    
    const root = new Root(mouse.x,mouse.y,col,centerX,centerY);
    root.draw();
  // console.log("hey");
  }
}


function getOptVal(edge)
{
  if(optVal_value===1)
  {
    return (edge/10)
  }
  else if(optVal_value===2)
  {
    return (Math.cos(edge/10))
  }
}

function setOptVal1()
{
  optVal_value=2;
}

function setOptVal2()
{
  optVal_value=1;
}

function getColorRandomly()
{
  color_opt= getRandomColor();
}
function setManualColor(col)
{
  color_opt=col;
  drawing=true;
}

window.addEventListener('mousemove',function()
{
  // console.log('hii here')
  branchOut();
});


window.addEventListener('mouseup',function(){
  drawing = false;
})
window.addEventListener('mousedown',function(){
  drawing = true;
})
