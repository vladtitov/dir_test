<?php
require_once ('inv.php');
session_start();
$opt=$_GET;
$data=$_POST;
//$a=explode('.',strtok(basename($_SERVER['REQUEST_URI']),'?'));

if(!isset($opt['a'])) {
	echo 'set action';
	exit;
}
$a=explode('.',$opt['a']);
$result= false;
$out=new stdClass();

switch(array_shift($a)){
	
	case 'get_menu':
		$out->result='success';
		$out->type='menu';
		$xml=simplexml_load_file('data/menu.xml');
		$items=array();
		foreach($xml->children() as $node){
			$item=new stdClass();
			$item->t=(string)$node['href'];
			$item->label=(string)$node;
			$items[]=$item;
		}
		$out->data=$items;
		header('Content-type: application/json'); 
		$result=json_encode($out);		      
		break;
	case 'get_settings':
		header('Content-type: application/json');
		$out->data=json_decode(file_get_contents('data/d1920.json'));
		$out->result='success';
		$out->type='settings';
		$result=json_encode($out);
		break;
	case 'data':
	include 'cl/DbConnector.php';
	
		$ctr=new DbConnector();		
		$result= json_encode($ctr->process($a,$data,$opt));
		header('Content-type: application/json');
		break;
		case 'get_all_data':
	include 'cl/DbConnector.php';
		$ctr=new DbConnector();
		$result= json_encode($ctr->getAllData());
		header('Content-type: application/json');
		break;
	
	case 'screen':
		include 'cl/Screen.php';
		
		$ctr= new Screen();
		$result=$ctr->process($a,$data);
		break;
		case 'login':
		include('gateway.php');	
		exit();
		break;
}


if($result) echo($result);
else if(isset($GLOBALS['ERROR'])) echo($GLOBALS['ERROR']);
else echo'no result no errors';


?>