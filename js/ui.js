var show = true;
var isMobile = 'ontouchstart' in document.documentElement;  // 检测是否为手机


// 显示对话框
function showTextarea(id) {
    let inputDiv = document.getElementById(id);
    if (show == false) {
        inputDiv.classList.remove('input-active')
        inputDiv.classList.add('input-inactive')
        show = true;
    } else {
        inputDiv.classList.remove('input-inactive')
        inputDiv.classList.add('input-active')
        show = false;
    }
}

// // 检测回车事件
// function clickEnter(e) {
//     var theEvent = e || window.event;
//     var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
//     if (code == 13) {
//         // 阻止事件的默认行为
//         e.preventDefault();
//         startMusic();
//     }
// }

// 为琴键添加事件
for (let node of document.querySelectorAll('.triangle')) {
    let key = node.querySelector('.key').id;
    if (isMobile) {
        node.addEventListener('touchstart', e => {
            if (show != -1) play(key, true);
        });
    } else {
        node.addEventListener('mousedown', e => {
            if (show != -1) play(key, true);
        });
    }
    removeID(node.parentNode.childNodes[1]);
}

// BPM自动更新
let bpmField = document.getElementById("bpm");
bpmField.addEventListener('focusout', () => {
    updateBpm(bpmField.value);
});

// 转调自动更新
document.getElementById('transpose-num').addEventListener('change', e => {
    transpose= parseInt(e.target.value);
});

function removeID(spread) {
    spread.addEventListener("animationend", function () {
        spread.removeAttribute('id');
    }, false);
}


// 设置调式
function selectMode(node){
    mode = node.innerText;
    document.querySelector("#modeText").innerText = node.innerText;
}

let volumeSlider = document.getElementById('volume');
volumeSlider.addEventListener('change',e=>{
    masterVolume.gain.value = Math.pow(volumeSlider.value /100,2);
})

// 设备方向检测与横屏提醒
function checkOrientation() {
    const orientationWarning = document.getElementById('orientationWarning');
    const isMobileOrTablet = isMobile || (window.innerWidth < 1024); // 检测是否为手机或平板
    const isPortrait = window.innerHeight > window.innerWidth; // 检测是否为竖屏
    
    // 在手机或平板且为竖屏时显示横屏提醒
    if (isMobileOrTablet && isPortrait) {
        orientationWarning.style.display = 'flex';
    } else {
        orientationWarning.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('instrumentDropdown');
    const comboItems = dropdown.querySelector('.combo-items');
    
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        comboItems.style.display = comboItems.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            comboItems.style.display = 'none';
        }
    });
});

// 添加关闭按钮事件监听
window.addEventListener('load', function() {
    const closeBtn = document.querySelector('.close-orientation-warning');
    const orientationWarning = document.getElementById('orientationWarning');
    
    if (closeBtn && orientationWarning) {
        closeBtn.addEventListener('click', function() {
            orientationWarning.style.display = 'none';
        });
    }
});

// 页面加载完成后检测一次
window.addEventListener('load', checkOrientation);

// 窗口大小变化或设备方向变化时重新检测
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);