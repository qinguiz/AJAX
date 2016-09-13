function ajax(method, url, data, success){
	//创建XMLHttpRequest对象，
				//ie7以下 new ActiveXObject("Microsoft.XMLHTTP");
				var xhr;
				// if (window.XMLHttpRequest) {
				// 	xhr = new XMLHttpRequest;
				// }else{
				// 	xhr = new ActiveXObject("Microsoft.XMLHTTP");
				// }

				try{
					xhr = new XMLHttpRequest();
				}catch(e){
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}

				/*	
					GET:
					1.解决缓存的问题，在url？后面链接一个随机数
					2.乱码，编码encodeURI（）；

					POST:
					1.数据要放在send（）里面；
					并且设置请求头 xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
					声明发送的数据类型
					2.没有缓存问题
					3.无需编码
				*/

				/*
					open方法
					参数
						1.打开方式
						2.地址
						3.是否异步
							异步：true；非阻塞 不用等待前面的程序执行完再执行之后的程序
							同步：false；阻塞 等待前面的程序执行完才能执行后面的程序
				*/
				//准备工作
				if (method == "get" && data) {
					url += "?" + data;
				}
				xhr.open(method,url,true);
				if (method == "get") {
					//发送请求
					xhr.send();
				}else{
					xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
					xhr.send(data);
				}
				
				//等待服务器响应
				/*
					readyState：ajax的工作状态
					responseText：ajax请求返回的内容就被存在这个属性里面
					on readystate change：当readyState改变的时候触发
					status：服务器状态
				*/
				xhr.onreadystatechange = function(){
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							success && success(xhr.responseText);
							}else{
							alert("Error:"+xhr.status);
						}
}					}
				}