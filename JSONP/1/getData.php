<?php 
	header("content-type:text/html;charset='utf-8'");

	$t = isset($_GET["t"]) ? $_GET["t"] : "num";
	$callback = isset($_GET["callback"]) ? $_GET["callback"] : "fn1";

	$arr1 = array('111111','222222','333333','444444','555555','666666');
	$arr2 = array('aaaaaa','bbbbbb','cccccc','eeeeee','dddddd','eeeeee');

	if ($t == "num") {
		$data = json_encode($arr1);
	}else{
		$data = json_encode($arr2);
	}

	echo $callback."(".$data.");";
 ?>