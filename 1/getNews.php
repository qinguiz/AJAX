<?php 
	header("content-type:text/html;charset:'utf-8'");
	error_reporting(0);

	$news = array(
		array("title"=>"国开行原党委副书记被双开:受处分后仍不思悔改","date"=>"2016-9-13"),
		array("title"=>"海口原副市长看风向退赃 风平浪静后又索回","date"=>"2016-9-13"),
		array("title"=>"内蒙古乌兰察布书记被强制带走 巴彦淖尔书记被立案","date"=>"2016-9-13"),
		array("title"=>"天宫二号将于近日发射 跟宇航员瞧瞧空间实验室","date"=>"2016-9-13"),
		array("title"=>"蔡英文称：美国是最重要伙伴 感谢持续对台军售","date"=>"2016-9-13"),
		array("title"=>"内蒙古乌兰察布书记被强制带走 巴彦淖尔书记被立案","date"=>"2016-9-13"),
		);
	echo json_encode($news);
 ?>