<?
session_start();
if(isset($_SESSION['directories_user_id']) && $_SESSION['directories_user_id']){

    echo shell_exec('git pull 2>&1');
}else{

echo 'Hello World';
}
?>
