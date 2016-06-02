<?
require_once ('inv.php');
if(isset($_GET['a'])){
    $a= explode('.',$_GET['a']);
    $id='';
    if(isset($_GET['id'])) $id= $_GET['id'];
    $res=0;
    $msg = file_get_contents('php://input');
    $msg = $id.$msg;

    switch(array_shift($a)){
        case 'LOG':
          $res =  error_log($msg,3,LOG.'log_'.date('m-d-Y').'.log');
            break;
        case 'ERROR':
            $res =   error_log($msg,3,LOG.'error_'.date('m-d-Y').'.log');
            break;
        case 'EMAIL':
            $res =   error_log($msg,1,ADMIN_EMAIL);
            break;
    }
}
echo 'Im logger:'.$res;
?>
