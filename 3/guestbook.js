window.onload = function(){
	// 验证用户名
	var oUserName1 = document.querySelector("#username1");
	var oPassWord1 = document.querySelector("#password1");
	
	var verifyUserNameMsg = document.querySelector("#verifyUserNameMsg");
	var oReg = document.querySelector("#reg");
	var oLogin = document.querySelector("#login");
	var oUser = document.querySelector("#user")
	var oUserInfo = document.querySelector("#userinfo");

	var iPage = 1;
	
	

	updata();
	function updata(){
		var uid = getCookie("uid");
		var username = getCookie("username");
		if (uid) {
			oUser.style.display = "block";
			oUserInfo.innerHTML = username;
			oReg.style.display = "none";
			oLogin.style.display = "none";
		}else{
			oUser.style.display = "none";
			oUserInfo.innerHTML = "";
			oReg.style.display = "block";
			oLogin.style.display = "block";

		}
	}

	oUserName1.onblur = function(){
		ajax("get","guestbook/index.php","m=index&a=verifyUserName&username=" + this.value,function(data){
			var d = JSON.parse(data)
			verifyUserNameMsg.innerHTML = d.message;
			if (d.code == 0) {
				verifyUserNameMsg.style.color = "green";
			}else{
				verifyUserNameMsg.style.color = "red";
			}
		})
	}
	oReg.onclick = function(){
		ajax("post","guestbook/index.php","m=index&a=reg&username="+encodeURI(oUserName1.value)+"&password="+oPassWord1.value,function(data){
			var d = JSON.parse(data);
			// alert(d.message)
			// alert(data.message);
		})
	}

	var oUserName2 = document.querySelector("#username2");
	var oPassWord2 = document.querySelector("#password2");
	oLogin.onclick = function(){
		ajax("get","guestbook/index.php","m=index&a=login&username="+encodeURI(oUserName2.value)+"&password="+oPassWord2.value,function(data){
			var d = JSON.parse(data);
			// alert(d.message);
			if (d.code) {
				updata();
			}
			// alert(data.message);
		})
	}

	var oLogout = document.querySelector("#logout");
	oLogout.onclick = function(){
		ajax("get","guestbook/index.php","m=index&a=logout",function(data){
			var d = JSON.parse(data);
			alert(d.message);
			if (!d.code) {
				updata();
			}
		})
		return false;
	}

	var oContent = document.querySelector("#content");
	var oPostBtn = document.querySelector("#btnPost");
	var oShowMore = document.querySelector("#showMore")

	

	oPostBtn.onclick = function(){
		ajax("post","guestbook/index.php","m=index&a=send&content="+encodeURI(oContent.value),function(data){
			var d = JSON.parse(data);
			alert(d.message);
				if (!d.code) {
				createList(d.data,true);
			}
		})
	}

	oShowMore.onclick = function(){
		iPage++;
		showList();
	}

	function createList(data,insert){
				var oList = document.querySelector("#list")
				var oDl = document.createElement("dl");
				var oDt = document.createElement("dt");
				var oStrong = document.createElement("strong");
				oStrong.innerHTML = data.username;
				oDt.appendChild(oStrong);

				var oDd1 = document.createElement("dd");
				oDd1.innerHTML = data.content;
				var oDd2 = document.createElement("dd");
				oDd2.className = "t";
				var oA1 = document.createElement("a");
				oA1.href = "";
				oA1.innerHTML = "顶(<span>"+data.support+"</span>)";
				var oA2 = document.createElement("a");
				oA2.href= "";
				oA2.innerHTML = "踩(<span>"+data.oppose+"</span>)";
				oDd2.appendChild(oA1);
				oDd2.appendChild(oA2);

				oDl.appendChild(oDt);
				oDl.appendChild(oDd1);
				oDl.appendChild(oDd2);

				if (insert && oList.children[0]) {
					oList.insertBefore(oDl,oList.children[0]);
				}else{
					oList.appendChild(oDl);
				}
	}

	// showList();
	function showList(){
		ajax("get","guestbook/index.php","m=index&a=getList&n=2&page="+iPage,function(data){
			var d = JSON.parse(data);
			// alert(d.message);
			var data = d.data;

			if (data) {
				for(var i=0;i<data.list.length;i++){
					createList(data.list[i]);
				}
			}else{
				if (iPage == 1) {
					oList.innerHTML = "还没有留言，快来抢沙发!"
				}
				oShowMore.style.display = "none";
			}

		})
	}

	function getCookie(key){
		var arr1 = document.cookie.split("; ");
		for(var i=0;i<arr1.length;i++){
			var arr2 = arr1[i].split("=");
			if (arr2[0] == key) {
				return arr2[1];
			}
		}
	}
}