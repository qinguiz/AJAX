function getPics(){
	var oUl = document.querySelector("#ul1");
	var aLi = document.querySelectorAll("li");
	var iPage = 1;
	var b = true;
	getList();
	// var iLen = aLi.length;
	function getList(){
		ajax("get","php/getPics.php","cpage="+iPage+"",function(data){ //url以html文档为当前文件的路径,所以../php/getPics.php是错误的
		var data = JSON.parse(data);
		if (!data.length) {
			return;
		}
		for(var i=0;i<data.length;i++){
			var _index = getShortH();
			var oDiv = document.createElement("div");
			var oImg = document.createElement("img");
			oImg.src = data[i].preview;
			oImg.style.width = "225px";
			oImg.style.height = data[i].height * (225/data[i].width)+"px";
			oDiv.appendChild(oImg);
			var oP = document.createElement("p");
			oP.innerHTML = data[i].title;
			oDiv.appendChild(oP);
			aLi[_index].appendChild(oDiv);
		}
		b = true;
	})
	}

function getShortH(){
	var index = 0;
	var iH = aLi[index].offsetHeight;
	for(var i=1;i<aLi.length;i++){
		if (iH > aLi[i].offsetHeight) {
			index = i;
			iH = aLi[i].offsetHeight;
		}
	}
	return index;
}

window.onscroll = function(){
	var _index = getShortH();
	var oLi = aLi[_index];
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if (getTop(oLi)+oLi.offsetHeight<document.documentElement.clientHeight+scrollTop) {
		if (b) {
			b = false;
			iPage++;
			getList();
		}
	}
}

function getTop(obj){
	var iTop = 0;
	while(obj){
		iTop += obj.offsetTop;
		obj = obj.offsetParent; //obj.offsetParent == body
	}
	return iTop;
}
}
addLoadEvent(getPics);
