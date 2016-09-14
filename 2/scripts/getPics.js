function getPics(){
	var oUl = document.querySelector("#ul1");
	var aLi = document.querySelectorAll("li");
	// var iLen = aLi.length;
	ajax("get","php/getPics.php","cpage=1",function(data){ //url以html文档为当前文件的路径,所以../php/getPics.php是错误的
		var data = JSON.parse(data);
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
	})
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
}
addLoadEvent(getPics);