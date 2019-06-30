function ClsProviderSlider(_objInit){
	var oldx = 0;
	var diff = 0;
	var posLeft = 0;
	var newX = 0;
	var firstDiv = _objInit.innerDiv + ':first-child';
	var lastDiv = _objInit.innerDiv + ':last-child';
	var sliderInterval;
	var marginLeft;
	var marginRight;
	function animateSlider(){
		var reset = 0;
		var marginLeft = parseInt($(_objInit.divCont + ' ' + firstDiv).css("marginLeft"));
		var marginRight = parseInt($(_objInit.divCont + ' ' + firstDiv).css("marginRight"));
		$(_objInit.divCont).animate({ "left": "-=" + ($(_objInit.divCont + ' ' + firstDiv).outerWidth() + marginLeft + marginRight) + "px" }, "slow" ).promise().done(function() {
			cloneAppend($(_objInit.divCont + ' ' + firstDiv));
			$(_objInit.divCont).css({left: reset  + 'px'});
		});
	}
	function resetSlider(){
		$(_objInit.divCont).animate({ "left": "0" }, 100 );
	}
	function cloneAppend(div){
		var divToRemove = div;
		divToRemove.clone().appendTo(_objInit.divCont);
		divToRemove.remove();
	}
	function clonePrepend(div){
		var divToRemove = div;
		divToRemove.clone().prependTo(_objInit.divCont);
		divToRemove.remove();
	}

	this.init = function(){
		sliderInterval = setInterval(function(){
			animateSlider();
		}, 4000);
		$(".container").mousedown(function (event) {
			event.preventDefault();
			oldx = event.pageX;
			posLeft = $(_objInit.divCont).position().left;
			$(this).mousemove(function (event) {
				event.preventDefault();
				marginLeft = parseInt($(_objInit.divCont + ' ' + firstDiv).css("marginLeft"));
				marginRight = parseInt($(_objInit.divCont + ' ' + firstDiv).css("marginRight"));
				firstDivWidth = $(_objInit.divCont + ' ' + firstDiv).outerWidth() + marginLeft + marginRight;
				diff = oldx - event.pageX;
				newX = posLeft - diff;

				if((firstDivWidth + newX)< 0){
					cloneAppend($(_objInit.divCont + ' ' + firstDiv));
					posLeft = $(_objInit.divCont + ' ' + firstDiv).outerWidth() + marginLeft + marginRight;
					oldx = event.pageX + $(_objInit.divCont + ' ' + firstDiv).outerWidth() + marginLeft + marginRight;
					diff = oldx - event.pageX;
					newX = posLeft - diff;
				}
				if(newX > 1){
					posLeft = - ($(_objInit.divCont + ' ' + lastDiv).outerWidth() + marginLeft + marginRight);
					clonePrepend($(_objInit.divCont + ' ' + lastDiv));
					oldx = event.pageX;
					diff = oldx - event.pageX;
					newX = posLeft - diff;
				}

				$(_objInit.divCont).css({left: newX  + 'px'});
			});
		}).mouseup(function () {
			$(this).off('mousemove');
			resetSlider();
		}).mouseleave(function() {
			$(this).off('mousemove');
			resetSlider();
			sliderInterval = setInterval(function(){
				animateSlider();
			}, 4000);
		}).mouseover(function(){
			clearInterval(sliderInterval);
		});
	};
}