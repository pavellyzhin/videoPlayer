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
		this.element.element.volume = 0.1;
	}
	
	timeTrack(pTrack,point){

		let perTime  = this.element.element.duration / 100;
		let perWidth = pTrack.element.getWidth() / 100;
		let percent  = parseFloat(point / perWidth);
	
		this.element.element.currentTime = perTime * percent;		
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
		this.status = false;
		this.timeOutId = false;
	}
	
	append(cb){
		if(!this.status){
			let a = this;
			this.timeOutId = setTimeout(function(){
				a.status=true;
				a.element.show();
				return cb();
			},5000);
		}
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
	
	timeTrack(videoElement){
		let perTime  = videoElement.duration / 100;
		let perWidth = this.element.getWidth() / 100;
		let percent  = parseFloat(videoElement.currentTime / perTime);
		
		return percent * perWidth;
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

let playerReklama = new playerReklamaModel('playerReklama');


playerVideo.element.element.addEventListener('mouseover',function(e){
	playerControls.element.show();
});

playerVideo.element.element.addEventListener('click',function(e){
	playerPlay.element.element.click();
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
		
		if(!playerReklama.status){
			
			clearTimeout(playerReklama.timeOutId);
		}

		if(pTrackVolchok.interval){
			
			clearInterval(pTrackVolchok.interval);
			pTrackVolchok.interval=false;
			
		}
	} else {
		playerReklama.append(()=>{
			playerVideo.element.element.pause();
			playerPlay.setStatus(false);
		});	
		playerPlay.setStatus(true);
		playerVideo.element.element.play();
		
		pTrackVolchok.interval = setInterval(function(){
			pTrackVolchok.element.left(pTrack.timeTrack(playerVideo.element.element));
		},10);
	}
});

pTrack.element.element.addEventListener('click',function(mouse){
	
	pTrackVolchok.element.left(mouse.offsetX);
	
	playerVideo.timeTrack(pTrack,mouse.offsetX);
	
});

pVolumeTrack.element.element.addEventListener('click',function(mouse){
	
	pVolumeTrackVolchok.element.top(mouse.offsetY);
	playerVideo.element.element.volume = 1 - mouse.offsetY/100;
	
});



