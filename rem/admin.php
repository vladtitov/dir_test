<?
require_once ('inv.php');
session_start();
if(!isset($_SESSION['directories_user'])){
	echo 'please login';	
	exit;
}

$get=$_GET;
$post=$_POST;
//$a=explode('.',strtok(basename($_SERVER['REQUEST_URI']),'?'));

if(!isset($get['a'])) {
	echo 'set action';
	exit;
}
$a=explode('.',$get['a']);
$result = 0;

switch(array_shift($a)){
	case 'log_error':
		$result = new stdClass();
		$result->success='success';
		$txt=file_get_contents('php://input');
		error_log($txt,3,LOG.'sdmin_error.txt');
		if(mail($admin,'Error admin directories',$txt))	$result->result='emailed';	
	break;
		
	case 'get_statistics':
		include 'cl/Statistics.php';
		$ctr = new Statistics();
		$result = $ctr->getStatistics();
	break;
	case 'get_usage':
		include 'cl/Statistics.php';		
		$ctr = new Statistics();		
		$result = $ctr->getUsage($get['devices'],$get['from'],$get['to']);
	break;
	case 'get_devices_data':
	$result = utils()->getDevicesData();
	break;
	case 'restart_kiosks':		
		$result = utils()->restartKiosks($get);
	break;
	case 'upload_image':	
		$result = utils()->uploadImage($_FILES["file"],$get['folder'],$get['prefix']);	
	break;
	
	case 'save_settings':
		$result = utils()->saveSettings(file_get_contents('php://input'));
	break;	
	case 'get_data':
		$result = isset($get['file_name'])? utils()->getData($get['file_name']):' hello';
	break;
	case 'save_data':	
		if(!isset($get['file_name'])) die('ERROR 1');
		$result = utils()->saveData($get['file_name'],file_get_contents('php://input'));					
	break;	
	case 'save_page':
		if(!isset($get['url'])) die('ERROR 1');
		$result = utils()->savePage(REM.$get['url'],file_get_contents('php://input'));
	break;
	case 'get_page':
		if(!isset($get['url'])) die('ERROR 1');
		$result = file_get_contents(REM.$get['url']);
	break;
	case 'users':
		include 'cl/TableEditor.php';
		$ctr = new TableEditor('users');
		$ctr->where =  " WHERE role IS NOT 'test'";
		$ctr->defaultVals = array('role'=>'admin');
		$result = $ctr->process($a);
		break;
	
	
	// LARGE Classes here
	case 'cats':				
		include 'cl/Categories.php';
		$ctr=new Categories();		
		$result=$ctr->process($a,$post,$get);	
	break;
		
	case 'dests':		
	include 'cl/Destinations.php';
		$ctr=new Destinations();
		$result = $ctr->process($a,$post,$get);			
	break;
    case 'destination':
        include 'cl/Destinations.php';
        $ctr=new Destinations();
        $result = $ctr->process($a,$post,$get);
        break;
			
	case 'screen':
	include 'cl/Screen.php';		
		$ctr= new Screen();
		$result=$ctr->process($a,$post,$get);
	break;
	
	case 'importexport':
	include 'cl/ImportExport.php';		
		$ctr= new ImportExport();
		$result=$ctr->process($a,json_decode(file_get_contents("php://input")),$get);
	break;	
}

if(is_string($result)) echo($result);
else{
	header('Content-type: application/json');
	echo json_encode($result);
}



function utils(){
	include 'cl/Utils.php';
	return new Utils();
}
