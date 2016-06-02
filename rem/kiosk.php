<?php
require_once ('inv.php');
session_start();

$get=$_GET;
$post=$_POST;
//$a=explode('.',strtok(basename($_SERVER['REQUEST_URI']),'?'));

if(!isset($get['a'])) {
	echo 'Hello world';
	exit;
}
$a=explode('.',$get['a']);
$result= false;


switch(array_shift($a)){
	case 'get_stamp':
	echo json_encode(trackDevice($get));	
	break;
	case 'log_error':
		error_log(file_get_contents("php://input")."|\n\r|", 3,DATA.'logs/k_error'.date('m-y').'.log');			
	echo 'OK';		
	break;
	case 'log_log':
		file_put_contents(DATA.'logs/kiosk'.date("m-y").'.log', file_get_contents("php://input")."|\n\r|", FILE_APPEND);	
		echo 'OK';
	break;
	case 'log_stat':
		$type=$get['type'];		
		$val=$get['val'];	
		$db=new PDO('sqlite:'.DATA.'statistics.db');
		inserClick($get,$db);
		switch($type){
			case 'sr':
			$res = addRate('destinations',$val,$db);			
			break;
			case 'kb':
			$res = addRate('search',$val,$db);
			break;
			case 'kw':
			$res = addRate('keywords',$val,$db);
			break;
			case 'pg':
			$res = addRate('pages',$val,$db);
			break;
			case 'cp':
			$res = updateCategory($val,'+1',$db);
			break;
			case 'cm':
			$res = updateCategory($val,'-1',$db);
			break;
		
		}	
		
		if($res) echo 'OK';
		else echo json_encode($db->errorInfo());		
			
	break;
	case 'get_data':
	
		if(isset($get['index'])){
			$index= $get['index'];
			if(strpos($index,'.json') === false)$index=$index.'.json';
			$fn=DATA.$index;
			echo file_exists($fn)?file_get_contents($fn):'NO'.$fn;
		}			      
	break;	
	case 'get_keywords':
		$db = new PDO('sqlite:'.DATA.'statistics.db');
		$res=$db->query('SELECT value FROM keywords ORDER BY rate DESC LIMIT 100')->fetchAll(PDO::FETCH_NUM);
		$out = array();
		foreach($res as $val) $out[]=$val[0];
		echo json_encode($out);
	break;
	/*
	case 'get_categories':
		include_once('cl/DbConnector.php');
		$con= new DbConnector();
		$sql='SELECT catid,label FROM categories WHERE enable=1 ORDER BY sort';		
		$result=json_encode($con->query($sql));	
		//header('Content-type: application/json'); 
			      
	break;	
		*/
	case 'get_dests':
	include 'cl/DbConnector.php';	
		$con=new DbConnector();
		$out=new stdClass();
		header('Content-type: application/json');
		$cats = $con->query('SELECT * FROM categories WHERE enable=1 ORDER BY sort');
		foreach($cats as $val) $val->id=(int)$val->id;		
		$out->cats = $cats;
		
		$dests = $con->query('SELECT * FROM destinations ORDER by LOWER(name)');
		foreach($dests as $val) $val->id=(int)$val->id;		
		$out->dests = $dests;
		
		echo json_encode($out);
	break;	
}

function inserClick($get,$db){
		$type=substr($get['type'].$get['val'],0,10);	
		$who = isset($get['who'])?addslashes($get['who']): $_SERVER['REMOTE_ADDR'];	
		$stamp = isset($get['stamp'])?$get['stamp']:''.time();
		if(strlen($stamp)>10)$stamp = substr($stamp,0,10);
		$res= $db->query("INSERT INTO clicks (device,stamp,type) VALUES ('$who',$stamp,'$type')");		
		return $res;
}

function addRate($table,$word,$db){	
		$res = $db->query("UPDATE $table SET rate=rate+1 WHERE value='$word'");
		if($res->rowCount()===0)$res = $db->query("INSERT INTO $table (value,rate) VALUES('$word',1)");
		return $res;
}
function updateCategory($id,$incr,$db){		
		$res = $db->query("UPDATE categories SET rate=rate$incr WHERE id=".$id);
		if($res->rowCount()===0)$res = $db->query("INSERT INTO categories (id,rate) VALUES($id,10000)");
		return $res;
}

function trackDevice($get){	
		$out=new stdClass();
		$out->success='success';
		$id=isset($get['id'])?$get['id']:'00';		
		$file_name=DATA.'devs/track_'.$id.'.json';
		$dev = array();
		foreach($get as $key=>$val)	$dev[$key]=$val;		
		$dev['s_time']=time();
		$dev['ip'] = $_SERVER['REMOTE_ADDR'];			
		file_put_contents($file_name,json_encode($dev));					
		$out->result = file_exists(DATA.'devs/restart.log')?filemtime(DATA.'devs/restart.log'):10000;
		return $out;		
}



