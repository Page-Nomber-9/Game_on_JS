    if (localStorage.getItem('speed_gamer') != null) {
        document.getElementById('speed_gamer').setAttribute('value', localStorage.getItem('speed_gamer'));
    }
    else{
        localStorage.setItem('speed_gamer', document.getElementById('speed_gamer').getAttribute('value'));
    }
    if (localStorage.getItem('speed_block') != null) {
        document.getElementById('speed_block').setAttribute('value', localStorage.getItem('speed_block'));
    }
    else{
        localStorage.setItem('speed_block', document.getElementById('speed_block').getAttribute('value'));
    }
    if (localStorage.getItem('col_block') != null) {
        document.getElementById('col_block').setAttribute('value', localStorage.getItem('col_block'));
    }
    else{
        localStorage.setItem('col_block', document.getElementById('col_block').getAttribute('value'));
    }




var div_nastroyki = document.getElementById('nastroyki');
div_nastroyki.style.display = 'none';
document.getElementById('nastroyki_btt').addEventListener('submit', (e) => {
    e.preventDefault();
    div_nastroyki.style.display = 'flex';
    console.log(localStorage.getItem('speed_gamer'));
});
document.getElementById('form_nastroiky').addEventListener('reset', (e) => {
    div_nastroyki.style.display = 'none';
    if (localStorage.getItem('speed_gamer') != null) {
        document.getElementById('speed_gamer').setAttribute('value', localStorage.getItem('speed_gamer'));
    }
    else{
        localStorage.setItem('speed_gamer', document.getElementById('speed_gamer').getAttribute('value'));
    }
    if (localStorage.getItem('speed_block') != null) {
        document.getElementById('speed_block').setAttribute('value', localStorage.getItem('speed_block'));
    }
    else{
        localStorage.setItem('speed_block', document.getElementById('speed_block').getAttribute('value'));
    }
    if (localStorage.getItem('col_block') != null) {
        document.getElementById('col_block').setAttribute('value', localStorage.getItem('col_block'));
    }
    else{
        localStorage.setItem('col_block', document.getElementById('col_block').getAttribute('value'));
    }
});
document.getElementById('form_nastroiky').addEventListener('submit', (e) => {
    e.preventDefault();
    let val_form =  new FormData(document.getElementById('form_nastroiky'));
    div_nastroyki.style.display = 'none';
    localStorage.setItem('speed_gamer', val_form.get('speed_gamer'));
    localStorage.setItem('col_block', val_form.get('col_block'));
    localStorage.setItem('speed_block', val_form.get('speed_block'));
});