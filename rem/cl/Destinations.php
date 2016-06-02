<?php
include_once('DbConnector.php');
//include_once('cl/DbConnector.php');
class Destinations{
    //var  $db;
	var $con;
	//var $P='../data/details/p/p';
	var $root='../';
    function __construct(){
		$this->con= new DbConnector();
       // $this->db =$this->con->db;
    }


	
	public function process($a,$post,$get){		
		$out=new stdClass();
		
		switch(array_shift($a)){			
			case 'maintain':
					
			break;			
			case 'get_dests':						
			$out = $this->getAllDests();		
			break;
			case 'drop_table':
			if($get['table']=='tenants'){
					$res =$this->overwriteDestsinations(array());
					if($res){
							$out->success='success';
							$out->msg='table destinations empty';
							include_once('Statistics.php');	
							$ctr=new Statistics();
							$ctr->moveStatistics();
							sleep(5);
							$ctr->createNewDatabase();
					}else{
						$out->error='error';
						$out->result=$this->con->errorInfo();
					}			
				}			
			break;			
			case 'save_pages':
			$uid=$get['uid'];
			$data = file_get_contents("php://input");
			$res = file_put_contents(PREFIX.PAGAS.$uid.'.htm',$data);
			$out = new stdClass();
			if(!$res) {
			$out->error = 'error';
			$out->info='cant save';

			}else {
				$out= new stdClass();
				$out->success = 'success';
				$out->result=PAGAS.$uid.'.htm';			
			return $out;
			}
			break;

			case 'save':
				$dest = json_decode(file_get_contents("php://input"));
				$res =$this->updateDestination($dest);
				$this->normalizeKeywords();
				return $res;				
				break;
			case 'delete':
			$res =  $this->deleteDest((int)$get['destid']);
			if($res){
				$out->result='success';
				$this->normalizeKeywords();
			}
			else  {
				$out->result='error';
				$out->reason=$this->con->errorInfo();
			}
			
			break;
			case 'saveCatDests':			
			 $out->result=$this->updateCatDests($post);
			 
			break;			
		/*	
			case 'add':							
			 $out->result=$this->addDests(json_decode(file_get_contents("php://input")));	
			
			break;
			
			case 'overwrite':						
			 $out->result=$this->overwriteDestsinations(json_decode(file_get_contents("php://input")));	
			 include_once('Statistics.php');	
			$ctr=new Statistics();
			$ctr->moveStatistics();
			sleep(5);
			$ctr->createNewDatabase();
					 
			break;	
*/			
			case 'dest_image':
				if(isset($get['id'])){
						$id= $get['id'];
						return $this->saveDestinationImage($_FILES['file'],$id);
						
				}
				return 'error '.$get['id'];
			break;
			
		}
		//header('Content-type: application/json');
		if($out===false)$out=json_encode($this->con->errorInfo());
		return $out;	
	}
	
	
	private function saveDestinationImage($file,$id){
		$out=new stdClass();
			
		if ($file["error"] > 0){
			$out->error= $file["error"];
			return $out;
		}
		
		$ext = '.'.pathinfo($file["name"], PATHINFO_EXTENSION);
		$filename=$id.'_'.time().$ext;
		
		if(move_uploaded_file($file["tmp_name"],PREFIX.DETAILS_IMG.$filename)){
			$out->success='success';
			$out->result=DETAILS_IMG.$filename;
		}
		
		return $out;
		
	
	}	
	
	private function updateCatDests($data){
		$this->con->beginTransaction('UPDATE destinations SET cats=? WHERE destid=?');		
		foreach($data as $key=>$value) $this->con->execute(array($value,$key));		
		return $this->con-> commit();		
	}/*
	private function updateDests($data){
		$this->con->beginTransaction('UPDATE destinations SET name=?,unit=?,cats=? WHERE destid=?');		
		foreach($data as $value) $this->con->execute(array($value['name'],$value['unit'],$value['cats'],$value['destid']));		
		return $this->con-> commit();
	}
	
	
	
	private function insertDestinationsArray($data){
		$this->con->beginTransaction('INSERT INTO destinations (uid,name,unit,cats,kws,meta,more,info,pgs) VALUES (?,?,?,?,?,?,?,?,?)');
		foreach($data as $value){
				$cats = $this->trimWhites($value[3]);
				$kws = $this->trimWhites($value[4]);				
				$this->con->execute(array($value[0],$value[1],$value[2],$cats,$kws,$value[5],$value[6],$value[7].$value[8]));
		}
		return $this->con-> commit();		
	}
	private function overwriteDestsinations($data){
		$this->con->queryPure("DROP TABLE destinations");
		$this->con->queryPure("CREATE TABLE destinations (id INTEGER PRIMARY KEY,uid TEXT,name TEXT,unit TEXT,cats TEXT,kws TEXT,more TEXT,tmb TEXT,meta TEXT,info TEXT,pgs TEXT,imgs TEXT)");
		return $this->insertDestinationsArray($data);
	}
	*/
	public function normalizeKeywords(){
					$res = $this->con->getAsArray('SELECT kws FROM destinations ');
					
					$kws=array();
					foreach($res as $val) {
							$kw=explode(',',$val[0]);
							foreach($kw as $word){
							$word = trim($word,' ');							
							if(array_search($word,$kws)===FALSE)$kws[]=$word;
							}
					}
					sleep(1);
					include_once('Statistics.php');					
					$stat = new Statistics();
					$kwsStat = $stat->getKeywords();
					$res=array();
					foreach($kwsStat as $val)if(array_search($val[0],$kws)===FALSE){
											if($stat->removeKeyword($val[0]))$res[] = $val[0];
											else $res[]='ERROR '.$val[0].' '.json_encode($stat->getError());;
											}
					
					return $res;				
	
	}
	
	private function cleanData(){
				$result=$this->con ->getAllAsObj('SELECT * FROM destinations ORDER BY LOWER(name)');
				foreach($result as $value) {
								$dirty=0;
								$cats= explode(',',$value->cats);
								if(array_search('0',$cats) !==false){;											
											array_splice($cats,array_search('0',$cats),1);
											$value->cats = implode(',',$cats);
											$dirty =1;
								}
								if(strlen($value->more)<3){
									$value->more='';
									$dirty =2;
								}
				}
				
	}
	
	private function getAllDests(){		
		$result=$this->con ->getAllAsObj('SELECT * FROM destinations ORDER BY LOWER(name)');
		
		
			//foreach($result as $value) if($value->more)$value->more = json_decode($value->more);
		return $result; 			
	}
	
	private function deleteDest($id){

		return $this->con ->query('DELETE FROM destinations WHERE id='.(int)$id);
	}

	
	private function trimWhites($str){
			$ar = explode(',',$str);
			$out=array();
			foreach($ar as $v) $out[] = trim($v);
			return implode(',',$out);
	}
	
		private function updateDestination($dest){
				$out = new stdClass();
				$res=false;
				$cats='';
				$imgs='';
				if(isset($dest->cats)){
							if(is_array($dest->cats)) $cats = implode(',',$dest->cats);
							else $cats = $dest->cats;
							// $cats = trim($cats,'0,');
							  //$cats= $this->trimWhites($cats);
							
						//if(is_string($dest->cats))$dest->cats = array($dest->cats);
						
						//if(array_search('0',$dest->cats) !==false)	array_splice($dest->cats,array_search('0',$dest->cats),1);											
						//$cats = implode(',',$dest->cats);
				}
				if(isset($dest->imgs))	$imgs = is_array($dest->imgs)?implode(',',$dest->imgs):$dest->imgs;
					
				if(!isset($dest->tmb))$dest->tmb='';
				if(strlen($dest->more)<3)$dest->more='';
				if(strlen($dest->tmb)<3)$dest->tmb='';	
				if(strlen($dest->info)<3)$dest->info='';
				if(strlen($dest->pgs)<3)$dest->pgs='';
				$kws=$this->trimWhites($dest->kws);				
				
				$ar = array($dest->uid,$dest->name,$dest->unit,$cats,$kws,$dest->more,$dest->tmb,$dest->info,$dest->meta,$dest->pgs,$imgs);
				$id=(int) $dest->id;
				$res=false;
				if($id){				
					$res= $this->con->updateRow('UPDATE destinations SET uid=?,name=?,unit=?,cats=?,kws=?,more=?,tmb=?,info=?,meta=?,pgs=?,imgs=? WHERE id='.$id,$ar);
					if($res){
						$out->success='updated';
						$out->result=$id;
						$out->msg = $dest->name.' updated';						
						}					
				}else {				
					$res = $this->con->insert('INSERT INTO destinations (uid,name,unit,cats,kws,more,tmb,info,meta,pgs,imgs) VALUES (?,?,?,?,?,?,?,?,?,?,?)',$ar);
					if($res){
						$out->success='inserted';
						$out->result=$res;
						$out->msg = $dest->name.' inserted';
					}					
				}
				
				if(!$res)$out->error = $this->con->errorInfo();				
				return $out;
		}
	
	
}
