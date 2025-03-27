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
                arr.push([this.img, i * 64, j * 64]);
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
        console.log(this.background);
        this.Draw();
    }
    Draw(){
        for (let i = 0; i < this.width; i++){
            for (let j = 0; j < this.height; j++){
                let styles = window.getComputedStyle(this.background[i][j][0]);
                console.log(styles.display);
                if (styles.display == 'none' || styles.visibility == 'hidden'){
                    console.log(0);
                    ctx.clearRect(this.background[i][j][1], this.background[i][j][2], 64, 64);
                }else{
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
          });
    }

    Draw(){
        ctx.drawImage(this.img, this.x, this.y);
    }
    Move(e){
        if (e.key.toLowerCase() == 'w'){
            this.y -= 64;
        }else if (e.key.toLowerCase() == 'd'){
            this.x += 64;
        }else if (e.key.toLowerCase() == 's'){
            this.y += 64;
        }else if (e.key.toLowerCase() == 'a'){
            this.x -= 64;
        };
        if (this.y < 0){
            this.y = canvas.height;
        }
        if (this.x < 0){
            this.x = canvas.width;
        }
        if (this.x >= canvas.width - 64){
            this.x = 0;
        }
        if (this.y >= canvas.height - 64){
            this.y = 0;
        }
        this.Check_block();
    }
    Check_block(){
        console.log(0);
        board.background[Math.floor(this.x / 64)][Math.floor(this.y / 64)][0].style.display = 'none';
        board.background[Math.floor(this.x / 64)][Math.floor(this.y / 64)][0].style.visibility = 'hidden';
    }
}

class Heart{
    constructor(){

    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // стираем всеыconsole.log(board.background[Math.floor(doctor.x / 64)][Math.floor(doctor.y / 64)][0].style.visibility);
    
    board.Draw();
    doctor.Draw();
}

// Поле, на котором всё будет происходить, — тоже как бы переменная
const canvas = document.getElementById('game');
// Классическая змейка — двухмерная, сделаем такую же
const ctx = canvas.getContext('2d');
// Размер одной клеточки на поле — 16 пикселей
var grid = 16;
// Служебная переменная, которая отвечает за скорость змейки
var count = 0;
var board = new Board(canvas.width, canvas.height);
document.addEventListener('keydown', function (e) {doctor.Move(e)});
var doctor = new Doctor();
requestAnimationFrame(loop);




var username = localStorage.getItem('username');
var user_field = document.getElementsByClassName('nick')[0];
user_field.innerHTML = username;