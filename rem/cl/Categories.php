<?
//include_once('DbConnector.php');
include_once('cl/DbConnector.php');
class Categories{
	//var $db;
	var $con;
	 function __construct(){
		$this->con = new DbConnector();		
        //$this->db = $this->con->db;		
    }
	
	public function process($a,$data,$get){		
		$out=new stdClass();
		
		switch(array_shift($a)){			
			case 'maintain':			
		
			break;			
			case 'get_all':	
		
			$out = $this->getCategories();	
			break;
			case 'get_icons':			
			$out=$this->getIcons();
			break;
			case 'delete':			 
			 $out = $this->deleteCategory($get['id']);
			break;
			case 'save':
			
			$out = $this->saveCategory($data);				
			break;
			case 'save_cat_dests':
					$catid = (int)$get['id'];
					$destids = json_decode(file_get_contents("php://input"));
			 $out = $this->updateDestsInCatategory($catid,$destids);
			break;
			
			
		}
		//header('Content-type: application/json');
		return $out;
	}
	
	
	private function updateDestsInCatategory($catid,$destids){
				$sql ='SELECT id,cats FROM destinations';
				$dests =  $this->con->query($sql);
				$dirty =array();
			foreach($dests as $dest){
							$ar=0;
							if($dest->cats == '')$ar= array();
							else $ar = explode(',',$dest->cats);
							$ind = array_search($catid,$ar);							
					if(array_search($dest->id,$destids)===false){								
								if($ind===false)continue;
								unset($ar[$ind]);
								$dest->cats=implode(',',$ar);
								$dirty[] = $dest;														
					}else{
							if($ind !== false) continue;
							$ar[] = $catid;
							$dest->cats=implode(',',$ar);
							$dirty[] = $dest;
					}							
			}
			
			$res = $this->updateteDestinationsCats($dirty);
			
			$out= new stdClass();
			
			if($res){
			$out->result=$dirty;
			$out->success=count($dirty).' Records updated';
			}else $out->error =$this->con->errorInfo();
			return $out;
			
	}
	
	
	
	private function parseTopic($topic){
			$topic = explode("\n",$topic);
			$out= array();
			$out[] = array_shift($topic);
			foreach($topic as $line){
						$line = trim($line);//str_replace(' ','',$string);
						if($line!='') $out[] = $line;
				}
			return $out;
	}
	private function getIcons(){
	$icons = file_get_contents('../../data/fa-icons.txt');
	$topics = explode('*',$icons);
	$out = array();
	
	foreach($topics as $topic){
			$topic= trim($topic);
			if($topic !='')$out[]= $this->parseTopic($topic);
	}
	
	return $out;
	}
	
	private function catSortOrder($ar){
		$this->con->beginTransaction('UPDATE categories SET sort=? WHERE id=?');		
		$i=1;			
		foreach($ar as $value) $this->con->execute(array($i++,$value));		
		return $this->con->commit();
	}
	
	/*
	private function catSortOrder($data){
		$this->db->beginTransaction();
		$sql="UPDATE categories SET sort=? WHERE catid=?";
		$stmt=$this->db->prepare($sql);
		$i=1;
		$data=$data['sort'];		
		foreach($data as $value) $stmt->execute(array($i++,$value));
		
		if($this->db-> commit()) return 'success';		
		return $this->db->errorInfo();
	}
	*/

	private function updateCategory($ar){
				$res= $this->con->updateRow('UPDATE categories SET label=? , icon=?,enable=?,sort=?  WHERE id=?',$ar);
				
			 return $res;
	}
	
	private function insertCategory($ar){
				$res= $this->con->insertRow("INSERT INTO  categories (label,icon,enable,sort) VALUES (?,?,?,?) ",$ar);				
			 return $res;
	}
	
	private function saveCategory($data){		
		$out= new stdClass();
		$label=$data['label'];
		$enable=$data['enable'];		
		$sort=(int)$data['sort'];		
		$icon=$data['icon'];
		$id=(int)$data['id'];
		
		
		$catIndex=0;
		
		if($id===0){
			$id = $this->insertCategory(array($label,$icon,$enable,$sort));			
			if(!$id){
				$out->error= $this->con->errorInfo();
				return $out;
			}			
		}else {
			$res =$this->updateCategory(array($label,$icon,$enable,$sort,$id));
			if(!$res){
				$out->error= $this->con->errorInfo();
				return $out;					
			}
		}
			
		
		$indexed = $this->getCategoriesIds();		
		$ind = $indexed[$sort-1];
		
		if($ind == $id) return $this->getCategories();

		$indexed = array_diff($indexed,array($id));
		array_splice($indexed,$sort-1,0,$id);
		$res =  $this->catSortOrder($indexed);
		
		if($res)return $this->getCategories();
		
		$out->error= $this->con->errorInfo();
		return $out;
				
	}
	
	private function getCategoriesIds(){	
			$res = $this->con->getAsArray('SELECT id FROM categories ORDER BY sort');
			$out=array();
			foreach($res as $value)$out[]=(int)$value[0];
		return  $out;				
	}
	
	private function getCategories(){
			$res = $this->con->getAllAsObj('SELECT * FROM categories ORDER BY sort');			
			foreach($res as $value){
					$value->id = (int)$value->id;
					$value->sort = (int)$value->sort;
					$value->enable = (int)$value->enable;
					$value->type = (int)$value->type;
			}
		return  $res;				
	}
	
	private function updateteDestinationsCats($ar){
			if(count($ar) ===0) return true;
			$this->con->beginTransaction('UPDATE destinations SET cats=? WHERE id=?');					
		foreach($ar as $dest) $this->con->execute(array($dest->cats,$dest->id));		
		return $this->con->commit();			
	}

	private function deleteCategoryFromDests($catid){
			$sql ='SELECT id,cats FROM destinations';
			$dests =  $this->con->query($sql);
			$out = array();
			foreach($dests as $dest){
					$ar= explode(',',$dest->cats);
					$ind = array_search($catid,$ar);					
					if($ind !== false) {					
						unset($ar[$ind]);
						$dest->cats=implode(',',$ar);
						$out[] = $dest;
					}					
			}
			return $out;
	}
	
	private function deleteCategory($catid){
		$catid =(int)$catid;
			
		$out = new stdClass();
		$out->catid=$catid;
		$ar = $this->deleteCategoryFromDests($catid);
		$out->result=$ar;
		$res = $this->updateteDestinationsCats($ar);
		if($res){
			$out->success=count($ar).' Records updated';
			$sql='DELETE FROM categories WHERE id='.$catid;
			$res = $this->con->deleteRecord($sql);
			
			if($res)$out->success.=' and Category deleted ';
			else $out->error=$this->con->errorInfo();
		}else $out->error=$this->con->errorInfo();
			
			
		
		return 	$out;
	}

}