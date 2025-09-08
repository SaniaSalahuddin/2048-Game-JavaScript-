let board;
let score=0;
let rows=4;
let columns=4;
window.onload=function(){
    startGame();
}
function startGame(){
    board=[
       [ 0,0,0,0],
       [0,0,0,0],
       [0,0,0,0],
       [0,0,0,0]
    ];
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++)
        {
let tile=document.createElement('div');
tile.id=r.toString()+"-"+c.toString();
let num=board[r][c];
updateTile(tile,num);
document.getElementById('board').appendChild(tile);

        }
    }
    //create 2 to begin the game
    setTwo();
    setTwo();
}
function updateTile(tile,num)
{
    tile.innerText="";
    tile.classList.value="";
    tile.classList.add('tile');
    if(num>0){
        tile.innerText=num;
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add('x8192');
        }
    }
}

document.addEventListener("keyup",(e)=>{
    if(e.code=="ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code=="ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code=="ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code==="ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById('score').innerText=score;
})
function filterZero(row){
    return row.filter(num=>num!==0);
}
function slide(row){
    //[0,2,2,2]
    row=filterZero(row);
    //[2,2,2]
    for(let i=0;i<row.length-1;i++){
        if(row[i]===row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    //402
    row=filterZero(row);//42
    while(row.length<columns){
        row.push(0);
    }
    //4200
    return row;
}
function slideLeft(){
    for(let r=0;r<rows;r++){
        let row=board[r];
        row=slide(row);
        board[r]=row;
        for(let c=0;c<columns;c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}
function slideRight(){
    for(let r=0;r<rows;r++){
        let row=board[r];//0,2,2,2
        row.reverse();//2,2,2,0
        row=slide(row);//4,2,0,0
        board[r]=row.reverse();//0,0,2,4
        for(let c=0;c<columns;c++){
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }

    }
}
function slideUp(){
    for(let c=0;c<columns;c++){
        let row=[board[0][c], board[1][c], board[2][c],board[3][c]];
        row=slide(row);
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}
function slideDown(){
    for(let c=0;c<columns;c++){
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]];
        row=slide(row);
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}
function setTwo(){
    if(!hasEmpty()){
        return;
    }
    let found=false;
    while(!found){
        //find random row and column to place a 2
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);
        if(board[r][c]===0){
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            found=true;
        }
    }
}
function hasEmpty(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]===0){
                return true;
            }
        }
    }
    return false;
}