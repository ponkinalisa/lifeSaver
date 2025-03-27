class Board{
    constructor(width, height){
        this.width = Math.floor(width / 64);
        this.height = Math.floor(height / 64);
        this.img = new Image();
        this.img.src = '../images/ground.png';
        this.background = [];
        for (let i = 0; i < this.width; i++){
            let arr = [];
            for (let j = 0; j < this.height; j++){
                arr.push([this.img, i * 64, j * 64, true]);
            }
            this.background.push(arr);
        }
        for (let i = 0; i < this.width; i++){
            for (let j = 0; j < this.height; j++){
                this.background[i][j][0].addEventListener("load", (e) => {
                    ctx.drawImage(this.background[i][j][0], this.background[i][j][1], this.background[i][j][2]);
                  });
            }
        }
        this.Draw();
    }
    Draw(){
        for (let i = 0; i < this.width; i++){
            for (let j = 0; j < this.height; j++){
                if (this.background[i][j][3]){
                    ctx.drawImage(this.background[i][j][0], this.background[i][j][1], this.background[i][j][2]);
                }
            }
        }

    }
}


class Doctor{
    constructor(){
        this.img = new Image();
        this.img.src = '../images/player.png';
        this.x = 0;
        this.y = 0;
        this.Draw();
        this.img.addEventListener("load", (e) => {
            ctx.drawImage(this.img, this.x, this.y);
          }
        );
        this.score = 0;
        this.Check_block();
    }

    Draw(){
        ctx.drawImage(this.img, this.x, this.y);
        this.Check_block();
    }
    Move(e){
        let x = this.x;
        let y = this.y;
        if (e.key.toLowerCase() == 'w'){
            y -= 64;
        }else if (e.key.toLowerCase() == 'd'){
            x += 64;
        }else if (e.key.toLowerCase() == 's'){
            y += 64;
        }else if (e.key.toLowerCase() == 'a'){
            x -= 64;
        };
        if (y < 0){
            y = canvas.height;
        }
        if (x < 0){
            x = canvas.width;
        }
        if (x >= canvas.width - 64){
            x = 0;
        }
        if (y >= canvas.height - 64){
            y = 0;
        }
        if (this.Check(x, y)){
            this.x = x;
            this.y = y;
        }
        this.Check_block();
    }
    Check_block(){
        board.background[Math.floor(this.x / 64)][Math.floor(this.y / 64)][3] = false;
        for (let i = 0; i < 10; i++){
            if (hearts[i].field_x == this.x / 64 && hearts[i].field_y == this.y / 64 && hearts[i].visible){
                hearts[i].visible = false;
                this.score += 1;
            }
        }
        for (let i = 0; i < 10; i++){
            if (stones[i].field_x == this.x / 64 && stones[i].field_y == this.y / 64){
                this.Lose();
            }
        }
    }
    Check(x, y){
        for (let i = 0; i < 10; i++){
            if (stones[i].field_x == x / 64 && stones[i].field_y == y / 64){
                return false;
            }
        }
        return true;
    }
    Win(){
        clearInterval(time_inter);
        localStorage.setItem('score', this.score);
        window.open('win.html');
    }
    Lose(){
        clearInterval(time_inter);
        localStorage.setItem('score', this.score);
        window.open('lose.html');
    }
}


class Heart{
    constructor(){
        this.img = new Image();
        this.img.src = '../images/heart.png';
        this.img.addEventListener("load", (e) => {
            ctx.drawImage(this.img, this.x, this.y);
          }
        );
        this.x = getRandomInt(0, canvas.width);
        this.y = getRandomInt(0, canvas.height);
        this.field_x = Math.floor(this.x / 64);
        this.field_y = Math.floor(this.y / 64);
        if (this.field_y >= board.background[0].length){
            this.field_y -= 1;
        }
        if (this.field_x >= board.background.length){
            this.field_x -= 1;
        }
        this.visible = true;
        this.Draw();
    }
    Draw(){
        if (this.visible){
            ctx.drawImage(this.img, this.field_x * 64, this.field_y * 64 + 10, 60, 45);
        }
    }
}


class Stone{
    constructor(){
        this.img = new Image();
        this.img.src = '../images/stone.png';
        this.img.addEventListener("load", (e) => {
            ctx.drawImage(this.img, this.x, this.y);
          }
        );
        this.x = getRandomInt(64, canvas.width);
        this.y = getRandomInt(64, canvas.height);
        this.field_x = Math.floor(this.x / 64);
        this.field_y = Math.floor(this.y / 64);
        console.log(this.field_x, this.field_y);
        if (this.field_y >= board.background[0].length){
            this.field_y -= 1;
        }
        if (this.field_x >= board.background.length){
            this.field_x -= 1;
        }
        this.Draw();
        setInterval(this.Check_block.bind(this), 2000);
    }
    Draw(){
        let f = false;
        for (let i = 0; i < 10; i++){
            if (hearts[i].field_x == this.field_x && hearts[i].field_y == this.field_y){
                this.img.src = '../images/heart-in-stone.svg';
                f = true;
            }
        }
        if (!f){
            this.img.src = '../images/stone.png';
        }
        ctx.drawImage(this.img, this.field_x * 64, this.field_y * 64);
    }
    Check_block(){
        console.log(this.field_x, this.field_y);
        
        if (Math.floor(doctor.x / 64) == this.field_x && Math.floor(doctor.y / 64) == this.field_y + 1){
            this.field_y += 1;
        }
        console.log(this.field_x, this.field_y);
        if (this.field_y >= board.background[0].length - 1){
            this.field_y += 1;
        } else if (this.field_y < (board.background[0].length - 1) && board.background[this.field_x][this.field_y + 1][3] == false){
            this.field_y += 1;
            console.log('yes');
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


function time_func() { 
    var now = new Date();
    var time = Math.floor((now - start_date) / 1000);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (minutes < 10){
        minute_field.innerHTML = '0' + minutes;
        localStorage.setItem('minutes', '0' + minutes);
    }else{
        minute_field.innerHTML = minutes;
        localStorage.setItem('minutes', minutes);
    }
    if (seconds < 10) {
        second_field.innerHTML = '0' + seconds;
        localStorage.setItem('seconds', '0' + seconds);
    }else{
        second_field.innerHTML = seconds;
        localStorage.setItem('seconds', seconds);
    }
}

function update_score(){
    score.innerHTML = doctor.score;
    if (doctor.score == 10){
        doctor.Win();
    }
}


function restart_func(){
    var start_date = new Date();
    localStorage.setItem('start_date', start_date);
    location.reload();
}

// основной цикл игры
function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // стираем все
    
    board.Draw();
    doctor.Draw();

    for (let i = 0; i < 10; i++){
        hearts[i].Draw();
    }
    for (let i = 0; i < 10; i++){
        stones[i].Draw();
    }
    update_score();
}


const canvas = document.getElementById('game');
canvas.width = document.documentElement.clientWidth * 0.9;
canvas.height = 500;
const ctx = canvas.getContext('2d');

var board = new Board(canvas.width, canvas.height);

const hearts = [];
for (let i = 0; i < 10; i++){
    let heart = new Heart();
    hearts.push(heart);
}

const stones = [];
for (let i = 0; i < 10; i++){
    let stone = new Stone();
    stones.push(stone);
}

var doctor = new Doctor();
document.addEventListener('keydown', function (e) {doctor.Move(e)});


var username = localStorage.getItem('username');
var user_field = document.getElementsByClassName('nick')[0];
user_field.innerHTML = username;
localStorage.setItem('username', username);


var start_date = new Date(localStorage.getItem('start_date'));
var minute_field = document.getElementById('minute');
var second_field = document.getElementById('second');
time_func();
var time_inter = setInterval(time_func, 1000);

const score = document.getElementById('score');

const restart = document.getElementById('re');
restart.addEventListener('click', restart_func);

requestAnimationFrame(loop);