//Imports
const Picker = require('vanilla-picker/dist/vanilla-picker');

//Variables
let currentColorPrimary = '#fff'
let currentColorSecondary = '#fff'
let painting = false;
let mouseButton = '';
let pixelArray = []


//HTML elements
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d');
const picker_parent_primary = document.getElementById('color-picker-primary')
const picker_parent_secondary = document.getElementById('color-picker-secondary')

let pickerPrimary= new Picker({
    parent:picker_parent_primary,
    popup: 'top',
    color:'#fff',
    onChange: (color)=>{
        picker_parent_primary.style.background = color.rgbaString;
        currentColorPrimary = color.rgbaString;
    },
    alpha: false
});
let pickerSecondary=new Picker({
    parent:picker_parent_secondary,
    popup: 'top',
    color:'#fff',
    onChange: (color)=>{
        picker_parent_secondary.style.background = color.rgbaString;
        currentColorSecondary = color.rgbaString;
    },
    alpha: false
});


//Eventos
canvas.addEventListener('mousedown',(e)=>startDrawing(e))
canvas.addEventListener('mouseup',(e)=>stopDrawing(e))
canvas.addEventListener('mousemove',(e)=>draw(e))
window.addEventListener('keypress',(e)=>shortCuts(e))
window.addEventListener('load',(e)=> init(e))

//Funciones
const drawGrid= ()=>{
    for(let x = 0; x < 448; x+=28){
        context.moveTo(x,0);
        context.lineTo(x,448);
    }
    
    for(let y = 0; y < 448; y+=28){
        context.moveTo(0,y);
        context.lineTo(448,y);
    }
    
    context.strokeStyle = '#fff'
    context.lineWidth = 2
    context.stroke()
}

const getData = event =>{
    let x = event.x;
    let y = event.y;

    x-=canvas.offsetLeft;
    y-=canvas.offsetTop;

    let X_offset = Math.floor(x/28)*28;
    let Y_offset = Math.floor(y/28)*28;

    return [X_offset,Y_offset]
}

const draw=(event)=>{
    //si no esta pintando no hace nada
    if(!painting) return;
    
    //obtener los datos
    let [X,Y]= getData(event);

    switch(selectedButton){
        case 'pen':{
            if(mouseButton===0){
                pixelArray[X/28][Y/28] = currentColorPrimary
                drawPixel(X,Y,currentColorPrimary)
            }
            if(mouseButton===2){
                pixelArray[X/28][Y/28] = currentColorSecondary
                drawPixel(X,Y,currentColorSecondary)
            }
            break;        
        }
        case 'eraser':{
            pixelArray[X/28][Y/28] = ''
            deletePixel(X,Y)
            break;
        }
        case 'picker':{
            if(mouseButton===0){
                let color = pixelArray[X/28][Y/28]
                if(color!==''){
                    picker_parent_primary.style.background = color
                    currentColorPrimary = color
                    pickerPrimary.setOptions({color: currentColorPrimary})
                    buttons[0].click();
                }
            }
            if(mouseButton===2){
                let color = pixelArray[X/28][Y/28]
                if(color!==''){
                    picker_parent_secondary.style.background = color
                    currentColorSecondary = color
                    pickerSecondary.setOptions({color: currentColorSecondary})
                    buttons[0].click();
                }
            }
            break;
        }
        default:
            break;
    }
    
}

const drawPixel = (X,Y,Color)=>{
    context.fillStyle = Color;
    context.fillRect(X,Y,28,28)
}

const deletePixel = (X,Y)=>{
    context.beginPath()
    context.clearRect(X,Y,28,28)
    context.moveTo(X,Y);
    context.lineTo(X,Y+28);
    context.moveTo(X,Y);
    context.lineTo(X+28,Y);
 
    context.strokeStyle = '#fff'
    context.lineWidth = 2
    context.stroke()
    
}

const startDrawing=(e)=>{
    mouseButton= e.button
    painting = true;
    draw(e)
}
const stopDrawing=(e)=>{
    mouseButton = ''
    painting = false;
}

const shortCuts=(e)=>{
    const key = e.keyCode
    switch(key){
        case 49:{
            buttons[0].click();
            break;   
        }
        case 50:{
            buttons[1].click();
            break;   
        }
        case 51:{
            buttons[2].click();
            break;   
        }
        case 52:{
            buttons[3].click();
            break;   
        }
        case 53:{
            buttons[4].click();
            break;   
        }
        case 54:{
            buttons[5].click();
            break;   
        }
        case 55:{
            buttons[6].click();
            break;   
        }
        default:
            break;
    }
}

const init=(e)=>{
    drawGrid();
    for (let i = 0; i < 16; i++) {
        pixelArray.push(['','','','','','','','','','','','','','','',''])
    }
}
