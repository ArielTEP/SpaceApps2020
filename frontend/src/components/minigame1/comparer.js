function getImageData(url, callback) {
	var img = document.createElement('img');
	var canvas = document.createElement('canvas');
 
	img.onload = function () {
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		callback(ctx.getImageData(0, 0, img.width, img.height));
	};
 
	img.src = url;
}

// https://rosettacode.org/wiki/Percentage_difference_between_images#JavaScript
function compare(target, secondImage, callback) {
	getImageData(target, function (imgTarget) {
		getImageData(secondImage, function (img2) {
			if (imgTarget.width !== img2.width || imgTarget.height !== img2.height) {
				callback(NaN);
				return;
			}

			// Checking if there is a value in the secondImage where the imgTarget
			// says there should be
			var good  = 0
			var total = 0;
			for (var i = 0; i < imgTarget.data.length / 4; i++) {
				if(imgTarget.data[4 * i + 3] !== 0) {
					good += (img2.data[4 * i + 3] > 0) ? 1 : 0
					total += 1;
				}
			}
			// Return hit percentage
			callback(100 * good / total);
		});
	});
}

export default compare;