var coinImage = new Image();
coinImage.src = "coin-sprite.png";


var canvas = document.getElementById("coinAnimation");
canvas.width = 100;
canvas.height = 100;

function sprite (options) {
	var that = {};

	var frameIndex = 0;
	var tickCount = 0;
	var ticksPerFrame = 3;
	numberOfFrames = options.numberOfFrames || 1;

	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;

	console.dir(that.context);

	that.render = function () {
		that.context.clearRect(0, 0, canvas.width, canvas.height);
		that.context.drawImage(
			that.image,
			frameIndex * that.width,
			0,
			that.width,
			that.height,
			0,
			0,
			that.width,
			that.height);
	};

	that.loop = options.loop;

	that.update = function () {
		tickCount += 1;

		if (tickCount > ticksPerFrame) {
			tickCount = 0;
			//  If the current frame index is in range
			if (frameIndex < numberOfFrames - 1) {
				// Go to the next frame
				frameIndex += 1;
			} else if (that.loop) {
				frameIndex = 0;
			}
		};
	};

	return that;
}

var coin = sprite({
	// ?? ask about this
	context: canvas.getContext("2d"),
	width: 44,
	height: 40,
	image: coinImage,
	numberOfFrames: 10,
	loop: true

});

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	coin.render();
	coin.update();
}

coinImage.addEventListener("load", gameLoop);