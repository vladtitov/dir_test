<?
class Utils{
	public function getDevicesData(){
				$out = new stdClass();
				$devices = json_decode($this->getData('devices'));
				foreach($devices  as $device){
						$filename=DATA.'devs/track_'.$device->type.$device->id.'.json';
						if(file_exists($filename))$device->track = json_decode(file_get_contents($filename));
				}
				$out->result = $devices;//  json_decode($this->getData(array('file_name'=>'devices.json')));
				$out->success = time();
				return $out;
	}

	public function restartKiosks($get){
				$vars = json_encode($get);
				error_log('restart: '.date("Y-m-d H:i:s")."  $vars  /r/n", 3, DATA.'devs/restart.log');
				$out=new stdClass();
				$out->success='success';
				return $out;				
	}	
	public function getData($file_name){
				$file_name= DATA.$file_name.(strpos($file_name,'.json')?'':'.json');
				if(file_exists($file_name)) return file_get_contents($file_name);
			return 'ERROR';
	}
			
	public function saveData($file_name,$data){
		$out=new stdClass();
		if(strpos($file_name,'.json') === false)$file_name=$file_name.'.json';			
		if(!file_exists(DATA.$file_name)) {
					$out->error='hacker';
					return $out;				
		}						
		rename(DATA.$file_name,DATA.'arch/'.time().$file_name);
		$res = file_put_contents(DATA.$file_name,$data);	
			
		if($res){
			$out->success='success';
			$out->result= 'data saved';
		} else $out->error='cant save file';
		
		return $out;
	}
	
	public function savePage($file_name,$data){
		$out=new stdClass();
		$res = file_put_contents($file_name,$data);
		if($res){
			$out->success='file saved';
			$out->result= $file_name;
		} else $out->error='cant save file';
		
		return $out;
	}



	public function uploadImage($file,$topic,$type){
			$out=new stdClass();
			
		if ($file["error"] > 0){
			$out->error= $file["error"];
		switch ($file["error"]) {
			case UPLOAD_ERR_OK:
				$out->result = 'UPLOAD_ERR_OK';
            break;
			case UPLOAD_ERR_NO_FILE:
				$out->result = 'UPLOAD_ERR_NO_FILE';            
			case UPLOAD_ERR_INI_SIZE:
			case UPLOAD_ERR_FORM_SIZE:
				$out->result = 'UPLOAD_ERR_INI_SIZE';
			default:
				$out->result = 'UNKNOWN_ERROR';
		}
			
			return $out;
		}
		
		if (!file_exists(REM.MEDIA.$topic)) mkdir(REM.MEDIA.$topic, 0755, true);

		$filename = MEDIA.$topic.'/'.$type.'_'.$file["name"];
		
		if(move_uploaded_file($file["tmp_name"],REM.$filename)){
			$out->success='success';
			$out->result=$filename;
		}		
		return $out;
		
	}


}
