<?php
require_once ('inv.php');
session_start();
class Login{
	function process($a){
		$username = 0;
		$password = 0;
		$out = new stdClass();
		$post = json_decode(file_get_contents('php://input'),TRUE);

		if (isset($post['username'])) $username = $post['username'];
		if (isset($post['password'])) $password = $post['password'];

		if ($username && $password) {
			$db = new MyDB();
			$sql = "SELECT * FROM users WHERE username=? AND password=?";
			$res = $db->queryA($sql, array($username, $password));
			if ($res && count($res)) {
				$res=$res[0];
				$_SESSION['directories_user'] = $res['username'];
				$_SESSION['directories_role'] = $res['role'];
				$_SESSION['directories_user_id'] = $res['id'];

				//$_SESSION['directories_folder']=$res->folder;
				$out->success = 'loggedin';
				$out->result='Admin';
				return $out;
			}
			$out->error = 'wrong';
			if (isset($_GET['debug'])) $out->error = $db->errorInfo();
			$out->message = 'Please check username and password';
			return $out;
		}
		$out->error = 'data empty';
		$out->message = 'Please fill the form';
		return $out;
	}

}

if(isset($_GET['a'])){
	$a= explode('.',$_GET['a']);
	$res=0;
	switch(array_shift($a)){
		case 'login':
			require('cl/MyDB.php');
			$login = new Login();
			$res = $login->process($a);
			break;
		case 'logout':
			$_SESSION['directories_user']=0;
			$_SESSION['directories_role'] = 0;
			$_SESSION['directories_user_id']=0;
			$res = new stdClass();
			$res->success='logout';
			$res->result='Login';
			break;
	}

	if($res){
		echo is_string($res)?$res:json_encode($res);
	}
}
?>