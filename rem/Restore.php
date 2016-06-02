<?
require_once ('inv.php');
require 'cl/MyDB.php';
session_start();
class Restore{
	function process($a){
		switch (array_shift($a)) {
			case 'get_user_password':
				return $this->get_user_password(json_decode(file_get_contents("php://input"),TRUE));

				break;				
				case 'email_username':
				return $this->email_username(json_decode(file_get_contents("php://input"),TRUE));
					case 'email_password':
				return $this->email_password(json_decode(file_get_contents("php://input"),TRUE));
			
			default:
				
				break;
		}
	}
	
	function getValue($index,$db){		
		return $db->getField("SELECT val FROM extra WHERE ind = '$index' ");		
	}
	
	function get_user_password($ar){
		$email = $ar['email'];
		if(!$email) {
			return 'ERROR,No email';
		}
		$db =  new MyDB();
		$sql='SELECT username,password FROM users.sql WHERE email=?';
		$res = $db->queryA($sql, array($email));
		if($res && count($res)){
			$user = $res[username];
			$pass = $res[password];
			$user = $db->getField("SELECT value FROM extra WHERE index='$user'");
			$pass = $db->getField("SELECT value FROM extra WHERE index='$pass'");
			return 'RESULT,'.$user.','.$pass;			
		}
		return 'ERROR,no_user_with_email,'.$email;
	}
	
	
	function email_username($ar){
		$out=new stdClass();
		$email = $ar['email'];
		if(!$email) {
			return 'ERROR,No email';
		}
		$db =  new MyDB();

		$sql='SELECT username FROM users.sql WHERE email=?';

		$res = $db->queryA($sql, array($email));
		if($res && count($res)){
			$res = $res[0];
			$username = $res['username'];
			//$username = $this->getValue($index,$db);
			if(!$username) return 'ERROR,no_value_for,'.$email;
			$to= $email;
			 $subject= 'Username restore ';
			 $message ='Your username is: '.$username;
			 $headers = 'From: admin@front-desk.ca' . "\r\n" . 'Reply-To: admin@front-desk.ca' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
			if($_SERVER['SERVER_NAME']!=='localhost')	mail($to, $subject, $message,$headers);

				
				$out->success='username_sent_to';
				$out->result=$email;	
				$out->message= 'Username sent to '.$email;	
				$this->log('Username sent to '.$email);
			return $out;//'RESULT,username_sent_to'.$email;		
		}
		
		$this->logError('no_user_with_email '.$email);
		$out->error ='no_user_with_email';
		$out->message = 'No user with email '.$email;
		return $out;		
}
	
	function email_password($ar){
		$username = $ar['username'];
		if(!$username) {
			return 'ERROR,No email';
		}
		$out=new stdClass();

		$db =  new MyDB();
		$sql='SELECT password,email FROM users.sql WHERE username=?';
		$res = $db->queryA($sql, array($username));

		//return $username;//$db->getRows('SELECT * FROM users.sql');

		if($res && count($res)){
			$res= $res[0];
			$password = $res['password'];
			$email = $res['email'];		
			//$password = $this->getValue($pass,$db);//$db->getField("SELECT value FROM extra WHERE index='$pass'");
			if(!$password) return 'ERROR,no_value_for,'.$username;
			$to= $email;
			 $subject= 'Password restore for '.$username;
			 $message ='Your password is: '.$password;
			 $headers = 'From: admin@front-desk.ca' . "\r\n" . 'Reply-To: admin@front-desk.ca' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
			if($_SERVER['SERVER_NAME']!=='localhost') mail($to, $subject, $message,$headers);

				$out->success='password_sent_to';				
				$out->result=$email.$password;
				$out->message= 'Password sent to your email';
				$this->log('password_sent_to '.$email);
			return $out;//'RESULT,'.$password.','.$email;
		}
		$this->logError('no_user_with_username '.$username);
		$out->error ='no_user_with_username';
		$out->message = 'No user with Username '.$username;
		return  $out;//'ERROR,no_user_with_username,'.$username;
	}

	private function getUserId(){
		return '';
	}
	function log($log){
		error_log("\r\n ".date("Y-m-d H:i:s").'  '.$log,3,'../logs/restore_'.$this->getUserId().'.log');
	}

	function emailError($err){
		error_log($err,1,'uplight.ca@gmail.com');
	}
	
	function logError($err){
		error_log("\r\n ".date("Y-m-d H:i:s").'  '.$err,3,'../logs/ERROR_restore_'.$this->getUserId().'.log');
	}
}

if(isset($_GET['a'])){
	$a= explode('.',$_GET['a']);
	$res=0;
	if(array_shift($a)==='restore'){
		$restore = new Restore();
		$res = $restore->process($a);
	}
	if($res){
		echo is_string($res)?$res:json_encode($res);
	}
}
