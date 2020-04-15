const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d');

for(let x = 0; x < 448; x+=28){
    context.moveTo(x,0);
    context.lineTo(x,448);
}

for(let y = 0; y < 448; y+=28){
    context.moveTo(0,y);
    context.lineTo(448,y);
}

context.strokeStyle = '#fff'
context.lineWidth = 1
context.stroke()

canvas.addEventListener('mousedown',(event)=>{
    var x = event.x;
    var y = event.y;

    x-=canvas.offsetLeft;
    y-=canvas.offsetTop;

    console.log("x: "+Math.floor(x/28))
    console.log("y: "+Math.floor(y/28))

    let X_offset = Math.floor(x/28)*28;
    let Y_offset = Math.floor(y/28)*28;

    if(event.button===0){
        context.fillStyle = "#fff";
        context.fillRect(X_offset,Y_offset,28,28)
    }else{
        context.clearRect(X_offset,Y_offset,28,28)
        context.moveTo(X_offset,0);
        context.lineTo(X_offset,28);
        context.strokeStyle = '#fff'
        context.lineWidth = 1
        context.stroke()
    }
  
})