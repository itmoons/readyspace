function loadMode() {
    const isUserColorTheme = localStorage.getItem('color-theme');
    const colorTheme = isUserColorTheme ? isUserColorTheme  : 'dark';
    document.documentElement.setAttribute('color-theme', colorTheme);
}

function saveMode(mode) {
    localStorage.setItem('color-theme', mode);
}

function initMode(){
    loadMode();

    let mode = document.documentElement.getAttribute('color-theme');

    if (mode == "light"){
        $('ul.nat li.eng').removeClass('on');
        $('ul.nat li.kor').addClass('on');
    }else{
        $('ul.nat li.kor').removeClass('on');
        $('ul.nat li.eng').addClass('on');
    }
}

// 클릭시 모드 바꾸기
function changeMode(mode){
    if (mode == "light"){
        $('ul.nat li.eng').removeClass('on');
        $('ul.nat li.kor').addClass('on');
        document.documentElement.setAttribute('color-theme', 'light');
        saveMode('light');
    }else {
        $('ul.nat li.kor').removeClass('on');
        $('ul.nat li.eng').addClass('on');
        document.documentElement.setAttribute('color-theme', 'dark');
        saveMode('dark');
    }
}

$(document).ready(function() {
    loadMode();
    initMode();
    // document.addEventListener('DOMContentLoaded', function() {
    //     const container = document.getElementById('container');
      
    //     function createLight() {
    //       const light = document.createElement('div');
    //       light.className = 'light';
    //       light.style.left = `${Math.random() * 100}%`;
    //       container.appendChild(light);
      
    //       setTimeout(function() {
    //         light.remove();
    //       }, 2000);
    //     }
      
    //     setInterval(createLight, 200);
    // });
});