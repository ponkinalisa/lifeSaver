const click = () => {
    let user = document.getElementById('input').value;
    if (user) {
        btn.disabled = false;
        localStorage.setItem('username', user);
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('username'));
        window.open('pages/board.html');
    } else{
        btn.setAttribute('disabled', '');
    }
}


const input = () => {
    let user = document.getElementById('input').value;
    if (user) {
        btn.disabled = false;
    } else{
        btn.setAttribute('disabled', '');
    }
}


const btn = document.getElementsByClassName('btn-start')[0];
btn.addEventListener('click', click);
let inp = document.getElementById('input');
inp.addEventListener('input', input);
inp.addEventListener('change', input);
input();