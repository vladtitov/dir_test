<?php
class Screen{
	var $data;
	
	function load(){
		if(!$this->data) $this->data=json_decode(file_get_contents('../data/d1920.json'));
		return $this->data;
	}
	function saveSettings($prop,$index,$value){
		$filename='../data/settings.json';		
		$sett=json_decode(file_get_contents($filename));	
		if(!isset($sett->$prop)) $sett->$prop = new stdClass();
		$sett->$prop->$index=$value;
		return file_put_contents($filename,json_encode($sett));
	}
	
	
	function process($a,$post,$get){
		$out = new stdClass();
		switch(array_shift($a)){
			case 'test':
			$xml= simplexml_load_file('../kiosk1920.html');
			
			return $xml->asXML();
			break;
			case 'get_server_time':
			return time();
			break;
			case 'get_images':
			header('Content-type: application/json');
			$ar = scandir('../data/images');
			$out=[];
			foreach($ar as $img) if((strpos($img,'.jpg') !==false) || (strpos($img,'.svg') !==false) || (strpos($img,'.png') !==false) || (strpos($img,'.gif') !==false)){
				$item = new stdClass();
				$item->value='data/images/'.$img;
				$item->index=substr($img,0,-4);
				$out[]= $item;
			}
			return json_encode($out);
			break;
			
			case 'get_labels':
				header('Content-type: application/json');						
			return file_get_contents('../data/labels.json');
			break;			
			case 'save_labels':
				header('Content-type: application/json');
				$res=file_put_contents('../data/labels.json',file_get_contents('php://input'));	
				if($res) $out->success='file saved';
				else $out->error='cant save file';				
			break;			
			case 'save_setting':
						$prop=$get['prop'];
						$index=$get['index'];
			return  $this->saveSettings($prop,$index,json_decode(file_get_contents('php://input')));
			break;
			
			case 'kiosks_restart':	
					
					$file_name='../data/control.json';	
					if(!file_exists($file_name)) return 0;				
					
					$contr=json_decode(file_get_contents($file_name));
					$contr->restartall=time();
					$res = file_put_contents($file_name,json_encode($contr));
					if($res){
						$out->success='recorded';
						return $out;
					}		
			
			case 'save_data':
					if(!isset($get['file_name'])) die('ERROR');
					$file_name = $get['file_name'];
					header('Content-type: application/json');
					$filename='../data/'.$get['file_name'];
					if(!file_exists($filename))  die('ERROR 2');					
					rename($filename,'../data/arch/'.time().$file_name);					
					$res = file_put_contents($filename,file_get_contents('php://input'));	
					if($res){
						$out->success='file saved';
						$out->result= 'data/'.$file_name;
					}
					else $out->error='cant save file';	
			break;	
			
			case 'get_data':
			if(!isset($get['file_name'])) return 'ERROR';
			$file_name= '../data/'.$get['file_name'];
			if(file_exists($file_name)) return file_get_contents($file_name);

			break;			
			case 'save_rsss':
			return file_put_contents('../data/rss.json',file_get_contents('php://input'));
			break;			
			/*
			case 'save_image_index':
			$out = new stdClass();
			if(isset($get['file_name']) && isset($get['index'])){			
						$res = $this->saveSettings('labels',$get['index'],$get['file_name']);						
						if($res){
							$out->success=$res;
							$out->result=$get['file_name'];	
						} else $out->error='error';
					
			}
			return $out;
			
			break;
			*/
			case 'upload_image':
			header('Content-type: application/json');
			return $this->uploadImage($_FILES["file"]);
			break;
			
		}
		
		
	return $out;		
	}
	
	private function returnFile(){
		if ($_FILES["file"]["error"] > 0)return  $_FILES["file"]["error"];		
		return file_get_contents($_FILES["file"]["tmp_name"]);
	}
	
	
	private function uploadImage($file){
			$out=new stdClass();
			
		if ($file["error"] > 0){
			$out->error= $file["error"];
			return $out;
		}
		$filename= $file["name"];
		
		
		if(move_uploaded_file($file["tmp_name"],'../data/images/'.$filename)){
			$out->success='success';
			$out->result='data/images/'.$filename;
		}
		
		return $out;
		
		}
	private function saveFile($folder,$file){
		if ($file["error"] > 0)return  $file["error"]; 
		 $url= "data".$folder . $file["name"];
		$out='ERROR upload file: '.$url.' temp file: '.$file["tmp_name"];
		if(move_uploaded_file($file["tmp_name"],'../'.$url)); $out=$url;
    return $out;
	}	
	
}