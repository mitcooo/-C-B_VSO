function uniNumb(number){
	var digits = {};
	if (number.length != 4) {
		return false;
	}
	for(var i in number){
		if (number[i]=="0" || digits[number[i]]!==undefined){
			return false;
		}
		digits[number[i]] = 1;
	}
	return true;
}

var CandB = function () {
	this.init();
};

CandB.prototype.init = function(){
	while (true) {
		var number = (1000 + parseInt(Math.random()*9000))+"";
		if (uniNumb(number)){
			this.number = number;
			break;
		}
	}
	this.gameRunning = true;
	console.log(number);
};

CandB.prototype._win = function() {
	this.gameRunning = false;
	return this.onWin();
};

CandB.prototype.enterNumber = function(number) {
	if (this.gameRunning == false) {
		return false;
	}

	if (uniNumb(number)==false) {
		return false;
	}

	if (number == this.number) {
		this.gameRunning = false;
		this.onWin();
		return true;
	}

	var status = {
		b: 0,
		c: 0,
	};

	// проверка на i-я елемент, дали е бик или крава
	for (var i in number) {
		if (number[i]==this.number[i]) {
			// бик
			status.b++;
		}else if (this.number.indexOf(number[i])>=0) {
			// крава
			status.c++;
		}
	}

	return status;

};
(function(){

		var button = document.querySelector("#clickOnMe");
		var game = new CandB();
		var ul = document.querySelector("#numbers");

		button.onclick = function() {
			var numberField = document.querySelector("#numberValue");
			var number = numberField.value;
			var status = game.enterNumber(number);
			if (status === true) {
				return;
			} else if (status === false) {
				return alert("Числото трябва да съдържа различни цифри, различни от 0 и да е четирицифрено!");
			}
			addRes(ul, "Число " + number + ". Бикове: "+ status.b + ", Крави: "+status.c);

		};

		//извеждаме резултат при победа и бутон за нова игра
		game.onWin = function(){
			addRes(ul, "ПОБЕДА! Числото е:" +" " + game.number);
			
			addVideo(ul);
			addBtn(ul);
			button.disabled = true;

		};

		function addRes(ul, text) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(text));
			ul.appendChild(li);

		}
		function addVideo(ul){
			var video = document.createElement("video");
			var li = document.createElement("li");
			video.src = "images/winn.mov";
			video.width = '280';
			video.autoplay = true;
			li.appendChild(video);
			ul.appendChild(li);
		}
		function addBtn(ul) {
			var a = document.createElement("a");
			var li = document.createElement("li");
			a.href = "index.html";
			a.text = "Нова Игра";
			a.setAttribute("id", "newGame");
			li.appendChild(a);
			ul.appendChild(li);

		}


	})();