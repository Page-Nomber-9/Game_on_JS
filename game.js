var start_game = new Date();
let my_div1 =  document.getElementsByClassName("spbtv")[0];
var my_div = parseInt(window.getComputedStyle(my_div1).height);
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


var stop1 = false;
var div_stop = document.getElementById("div_stop");
div_stop.style.display = 'none';
var space_time_start;
var spac_time_result = 0;

document.getElementById('stop_btt').addEventListener('submit', (e) => {
    e.preventDefault();
    stop1 = true;
    div_stop.style.display = 'flex';
    let pr = new Date();
    space_time_start = pr;
});
document.getElementById('cont_btt').addEventListener('submit', (e) => {
    e.preventDefault();
    stop1 = false;
    div_stop.style.display = 'none';
    let pr = new Date();
    spac_time_result = spac_time_result + (pr - space_time_start);
});
//класс элемент по своей сути
class block_info {
    width;
    height;
    texture = new Image;
    pos_x;
    pos_y;
    speed;
    el_name;
}

//функция - выведи мне картинку
function show_img(where, el) {
    var section = document.querySelector(where);
    var elem = document.createElement("img");
    elem.setAttribute("src", el.texture.src);
    elem.setAttribute("width", el.width);
    elem.setAttribute("height", el.height);
    elem.setAttribute("id", el.el_name);
    section.appendChild(elem);
}

function show_block(where, el, pos, id_el) {
    var section = document.querySelector(where);
    var elem = document.createElement("img");
    elem.setAttribute("src", el.texture.src);
    elem.setAttribute("width", el.width);
    elem.setAttribute("height", el.height);
    elem.setAttribute("id", id_el);
    elem.setAttribute("class", el.el_name);
    section.appendChild(elem);
    elem.style.position = "absolute";
    elem.style.right = el.pos_x + "px";
    if (pos == 0) {
    elem.style.top = my_div + "px";
    }
    else
    elem.style.bottom = 0 + "px";
}
//функция - выведи мне текст
function show_p(where, text_p) {
    var section = document.querySelector(where);
    var el = document.createElement("p");
    var el_text = document.createTextNode(text_p);
    el.appendChild(el_text);
    section.appendChild(el)
}

//объявляю элемент-игрок
var gamer = new block_info;
gamer.texture.src = "img/gamer.png";
gamer.width = 100;
gamer.height = 100;
gamer.pos_x = 30;
gamer.pos_y = 200;
gamer.speed = parseInt(localStorage.getItem('speed_gamer'));
gamer.el_name = "gamer";



//вывожу игрока на экран
show_img("section.screen_wind", gamer);

var gamer_el = document.getElementById("gamer");
gamer_el.tabIndex = 0;


gamer_el.style.position = "absolute";
gamer_el.style.left = gamer.pos_x + "px";
gamer_el.style.top = gamer.pos_y + "px";

document.body.style.overflow = "hidden";



var arr_block = [];
arr_block[0] = new block_info;
arr_block[1] = new block_info;
arr_block[2] = new block_info;
arr_block[3] = new block_info;
arr_block[4] = new block_info;
arr_block[5] = new block_info;

for (let i = 0; i <=5; i++){
    arr_block[i].el_name = "pas_arr_block";
    arr_block[i].texture.src = "img/st_bl.jpg";
    arr_block[i].width = 100;
    arr_block[i].height = 200  + 100 * i;
    arr_block[i].speed = parseInt(localStorage.getItem('speed_block'));
    arr_block[i].pos_x = -100;
}



let keyNumPress;
let keyNumUp;

let k_up_press = false;
let k_left_press  = false;
let k_down_press  = false;
let k_right_press  = false;
let k_space_press = false;



let k_space_date = new Date();
let k_space_start = false;
let may_count_time_space = false;
let pause_date = new Date();
let recharge = 2000;

var p_recharge = document.getElementById("recharge");
var div_recharge = document.getElementById("div_recharge");

var mortal = true;
//анимация движения игрока
function gamer_ani() {
    if (!stop1) {
        if (mortal) {
            gamer_el.style.filter = 'contrast(100%)';
        }
        else{
            gamer_el.style.filter = 'contrast(500%)';
        }
        if (may_count_time_space) {
            mortal = true;
            let date_now = new Date();
            if (date_now - pause_date >= 2000){
                if (!k_space_press) {
                    may_count_time_space = false;
                    k_space_start = false;
                }
                recharge = 2000;
                p_recharge.textContent = "100%";
                div_recharge.style.background = "rgb(240, 99, 99)";
            }
            else {
                recharge = date_now - pause_date;
                p_recharge.textContent = Math.floor(recharge/2000*100) + "%";
                div_recharge.style.background = "linear-gradient(to top, rgb(240, 99, 99)" + Math.floor(recharge/2000*100) +"%, rgb(192, 71, 71) 0%)";
            }
        }
        if (k_down_press) {
            gamer.pos_y += gamer.speed;
        }
        if (k_left_press) {
            gamer.pos_x -= gamer.speed;
        }
        if (k_right_press){
            gamer.pos_x += gamer.speed;
        }
        if (k_up_press) {
            gamer.pos_y -= gamer.speed;
        }
        if ((k_space_press)&&(!may_count_time_space)) {
            let date_now = new Date();
            if (date_now - k_space_date <= 140)
            {
                mortal = false;
                div_recharge.style.background = "rgb(192, 71, 71)";
                if (k_down_press) {
                    gamer.pos_y += gamer.speed * 5;
                }
                if (k_left_press) {
                    gamer.pos_x -= gamer.speed * 5;
                }
                if (k_right_press){
                    gamer.pos_x += gamer.speed * 5;
                }
                if (k_up_press) {
                    gamer.pos_y -= gamer.speed * 5;
                }
            }
            else {
                may_count_time_space = true;
                let date_now = new Date();
                pause_date = date_now;
            }

        }
        if ((parseInt(window.innerWidth) > gamer.pos_x + 100) && (parseInt(window.innerWidth) - gamer.pos_x < parseInt(window.innerWidth))) {
            gamer_el.style.left = gamer.pos_x + "px";
        }
        else
        gamer.pos_x = parseInt(gamer_el.style.left); 
        if ((parseInt(window.innerHeight) > gamer.pos_y + 100) && (parseInt(window.innerHeight) - gamer.pos_y + my_div < parseInt(window.innerHeight))){
            gamer_el.style.top = gamer.pos_y + "px";
        }
        else
        gamer.pos_y = parseInt(gamer_el.style.top);
    }
}

//анимация фона
let bk_pos_ani = 0;
function bk_ani() {
    if (!stop1) {
        document.body.style.backgroundPosition = bk_pos_ani + "vw";
        bk_pos_ani -= 0.2;
        if (bk_pos_ani >= 100) {
            bk_pos_ani = 0;
        }
    }
}

function keyPress(event) {
    if (!stop1) { 
        keyNumPress = event.keyCode;
        switch(keyNumPress){

        case 37:  // если нажата клавиша влево
        case 65:
            k_left_press  = true;
        break;

        case 38:   // если нажата клавиша вверх
        case 87:
            k_up_press = true;
        break;

        case 39:   // если нажата клавиша вправо
        case 68:
            k_right_press  = true;
        break;

        case 40:   // если нажата клавиша вниз
        case 83:
            k_down_press  = true;
        break;
        case 32:// если нажат пробел
            k_space_press = true;
            if (!k_space_start) {
                let date_now = new Date();
                k_space_date = date_now;
                k_space_start = true;
            }
        break;
    }
    //console.log("Нажата" + keyNumPress);
    }
}

function keyEsc(event) {
    keyNumPress = event.keyCode;
    if(keyNumPress == 27){
        if (stop1) {
            stop1 = false;
            div_stop.style.display = 'none';
            let pr = new Date();
            spac_time_result = spac_time_result + (pr - space_time_start);
        }else{
            stop1 = true;
            div_stop.style.display = 'flex';
            let pr = new Date();
            space_time_start = pr;
        }
    }
}

function keyUp(event) {
    if (!stop1) { 
        keyNumUp = event.keyCode;
        switch(keyNumUp){
            
            case 37:  // если отжата клавиша влево
            case 65:
                k_left_press  = false;
            break;

            case 38:   // если отжата клавиша вверх
            case 87:
                k_up_press = false;
            break;

            case 39:   // если отжата клавиша вправо
            case 68:
                k_right_press  = false;
            break;
            case 40:   // если отжата клавиша вниз
            case 83:
                k_down_press  = false;
            break;
            case 32:// если отнажат пробел
                k_space_press = false;
                if (!may_count_time_space){
                    may_count_time_space = true;
                    let date_now = new Date();
                    pause_date = date_now;
                }
            break;
        }
        //console.log("отпущена" + keyNumUp);
    }
}

let rand_el;
let rand_pos;
//функция - регулярно создавай мне блоки
function create_block() {
    for(let i = 0; i < arr_block.length; i++){
        show_block("section.screen_wind", arr_block[i], 0, i);
    }
    for(let i = 0; i < arr_block.length; i++){
        show_block("section.screen_wind", arr_block[i], 1, i + arr_block.length);
    }
}


function block_choose_move() {
    if (!stop1) {
        let our_block = document.getElementsByClassName("pas_arr_block");
        let i = getRandomInt(our_block.length);
        let style_1 = window.getComputedStyle(our_block[i]);
        our_block[i].setAttribute("class", "act_arr_block");
    }
}
function block_ani(){
    if (!stop1) {
        i_am_lose = false;
        time_spent();
        let our_block = document.getElementsByClassName("act_arr_block");
        for (let i = 0; i < our_block.length; i++){
            our_block[i].style.right = parseInt(our_block[i].style.right) + arr_block[0].speed  + "px";
            let style_1 = window.getComputedStyle(our_block[i]);
            let style_gamer = window.getComputedStyle(gamer_el);
            //ищем запретный x
            if (((parseInt(style_1.right) + 100 > parseInt(style_gamer.right))&&
            (parseInt(style_1.right) < parseInt(style_gamer.right))) || ((parseInt(style_1.right) + 100 > parseInt(style_gamer.right) + 100)&&
            (parseInt(style_1.right) < parseInt(style_gamer.right) + 100))) {
                //ищем запретный y
                if (((parseInt(style_1.top) == my_div)&&(parseInt(style_1.height) + my_div > parseInt(style_gamer.top))) ||
                ((parseInt(style_1.bottom) == 0)&&(parseInt(style_1.height) > parseInt(style_gamer.bottom)))){
                    if (mortal){
                        localStorage.setItem('time_result', diff_time_live);
                        window.location.href = "you_lose.html";
                    }
                }
            }
            if (parseInt(our_block[i].style.right) > window.innerWidth) {
                our_block[i].style.right = "-100px";
                our_block[i].setAttribute("class", "pas_arr_block");
            }
        }
    }
}
var diff_time_live;
function time_spent(){
    let time_1 = new Date();
    diff_time_live = (time_1 - start_game) - spac_time_result;
    let p_result = document.getElementById("result_time");
    let m = Math.floor(diff_time_live / 1000/ 60);
    let s = Math.floor(diff_time_live / 1000);
    p_result.textContent = m + ":" + (s - m * 60) + ":" + (diff_time_live - m*60*1000 - s*1000);
}

addEventListener("keydown", keyPress);
addEventListener("keydown", keyEsc);
addEventListener("keyup", keyUp);
setInterval(gamer_ani, 20);
setInterval(bk_ani, 20);
create_block();
setInterval(block_choose_move, 5000/parseInt(localStorage.getItem('col_block')));
setInterval(block_ani, 20);