class playerModel {
	
	constructor(className){
		this.player = new htmlModel(className);
		
	}
	
}

class playerControlsModel{
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}
}

class playerVideoModel{
	
	constructor(nameClass){
		this.element = new htmlModel('playerVideo');
		this.play = false;
		this.playInterval = '';
	}
}

class playerPlayModel {
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}

	getStatus(){
		if(this.element.element.textContent == '>'){
			return false;
		}else{
			return true;
		}
	}
	
	setStatus(status = true){
		if(status){
			this.element.element.textContent = '||';
		}else{
			this.element.element.textContent = '>';
		}
	}
}

class playerVolumeModel {
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}
}
 
class playerTrackVolchokModel{
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
		this.interval = false;
	}
	
	
}

class playerVolumeBoxModel{
	
	constructor(nameClass){
		this.element  = new htmlModel(nameClass);
	}
}

class playerVolumeTrackModel {
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}
}


class playerVolumeTrackVolchokModel {
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}
}

class playerScreenModel {
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}
}

class playerReklamaModel{
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}
}

class htmlModel {
	
	constructor(nameClass){
		this.element = document.querySelector('.' + nameClass);
		this.mat = new mat();
	}
	
	left(x){
		this.element.style.left = parseInt(x) + 'px';
	}
	
	top(y){
		this.element.style.top = parseInt(y) + 'px';
	}
	
	toLeft(x){
		this.element.style.left = (this.getLeft(element) - parseInt(x)) + 'px';
	}
	
	toRight(x){
		this.element.style.left = (this.getLeft(element) + parseInt(x)) + 'px';
	}
	
	toUp(y){
		this.element.style.top = (this.getTop(element) - parseInt(y)) + 'px';
	}

	toDown(y){
		this.element.style.top = (this.getTop(element) + parseInt(y)) + 'px';
	}
	
	getLeft(){
		return this.element.style.left.replace('px','');
	}
	
	getTop(){
		return this.element.style.top.replace('px','');
	}
	
	show(display='flex'){
		this.element.style.display = display;
	}
	
	hide(){
		this.element.style.display = 'none';
	}
	
	setWidth(num){
		this.element.style.width = parseInt(num) + 'px';
	}
	
	setHeight(num){
		this.element.style.width = parseInt(num) + 'px';
	}
	
	getWidth(){
		
		return parseInt(this.element.offsetWidth);
		
	}
	
	getHeight(num){
		return parseInt(this.element.offsetHeight);
	}
}

class mat {
	
	getPercentBy(a,b){
		return parseInt(a)%parseInt(b);
	}
}

class mouse {
	
	constructor(mouse){
		this.mouse = mouse;
	}
	
	getClientX(mouse){
		return this.mouse.clientX;
	}
	
	getClientY(){
		return this.mouse.clientY;
	}
	
	getClientYByElement(element){
		return this.getClientY() - element.getLeft();
	}
}

class playerTrackModel {
	
	constructor(nameClass){
		this.element = new htmlModel(nameClass);
	}
}

let playerControls = new playerControlsModel('playerControls');
let pTrack 		   = new playerTrackModel('track');
let pTrackVolchok  = new playerTrackVolchokModel('playerTrackVolchok');

let pVolume 	 = new playerVolumeModel('volume');
let pVolumeBox   = new playerVolumeBoxModel('volumeBox');
let pVolumeTrack = new playerVolumeTrackModel('volumeTrack');
let pVolumeTrackVolchok = new playerVolumeModel('volumeTrackVolchok');

let playerVideo  = new playerVideoModel('playerVideo');
let playerScreen = new playerScreenModel('playerScreen');
let playerPlay   = new playerPlayModel('playerPlay');
let player       = new playerModel('player');


playerVideo.element.element.addEventListener('mouseover',function(e){
	playerControls.element.show();
});

pVolume.element.element.addEventListener('mouseover',function(e){
	pVolumeBox.element.show();
});

pVolumeBox.element.element.addEventListener('mouseout',function(e){
	pVolumeBox.element.hide();
});

playerPlay.element.element.addEventListener('click',function(e){
	if(playerPlay.getStatus()) {
		playerPlay.setStatus(false);
		playerVideo.element.element.pause();
		if(pTrackVolchok.interval){
			clearInterval(pTrackVolchok.interval);
			pTrackVolchok.interval=false;
		}
	} else {
		playerPlay.setStatus(true);
		playerVideo.element.element.play();
		
		let perTime  = playerVideo.element.element.duration / 100;
		let perWidth = pTrack.element.getWidth() / 100;
		
		
		pTrackVolchok.interval = setInterval(function(){
		let percent  = parseFloat(playerVideo.element.element.currentTime / perTime);	
			pTrackVolchok.element.left(percent * perWidth);
		},10);
	}
});

pTrack.element.element.addEventListener('click',function(mouse){
	
	pTrackVolchok.element.left(mouse.offsetX);
	let perTime  = playerVideo.element.element.duration / 100;
	let perWidth = pTrack.element.getWidth() / 100;
	let percent  = parseFloat(mouse.offsetX / perWidth);
	
	playerVideo.element.element.currentTime = perTime * percent;
});

pVolumeTrack.element.element.addEventListener('click',function(mouse){
	
	pVolumeTrackVolchok.element.top(mouse.offsetY);
	playerVideo.element.element.volume = 1 - mouse.offsetY/100;
	
});



