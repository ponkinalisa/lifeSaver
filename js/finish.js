function restart_func(){
    var start_date = new Date();
    localStorage.setItem('start_date', start_date);
    window.open('board.html');
}


var minutes = localStorage.getItem('minutes');
var seconds = localStorage.getItem('seconds');
var minute_field = document.getElementById('minute');
var second_field = document.getElementById('second');
minute_field.innerHTML = minutes;
second_field.innerHTML = seconds;


const restart = document.getElementById('restart');
restart.addEventListener('click', restart_func);

var username = localStorage.getItem('username');
var user_field = document.getElementById('nick');
user_field.innerHTML = 'Твой ник: ' + username;

var score = localStorage.getItem('score');
var score_field = document.getElementById('score-end');
score_field.innerHTML = 'Всего ты собрал сердец ' + score;
console.log('hi');