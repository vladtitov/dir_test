<?php
include_once('DbConnector.php');
include_once('cl/DbConnector.php');
class Pages{
    var  $db;
	var $con;
	var $P='../data/pages/p';
    function __construct(){      
		$this->con = new DbConnector();
		$this->db = $this->con->db;	
    }
    
  
	public function process($a,$post,$get){
		$out=new stdClass();
		
		switch(array_shift($a)){			
			case 'maintain':			
			
			break;
			case 'get_all':
			$out = $this->getAllPages();
			break;			
			case 'save_order':
			$out=$this->savePagesOrder($post['seq']);
			break;
			
			case 'get_info':
			return $this->getPageInfo((int)$get['pageid']);
			break;
			case 'save_info':
                $out->result=$this->savePageInfo((int)$get['pageid'],file_get_contents('php://input'));
                break;

            case 'save_page':
                $id=(int)$get['pageid'];
                $label=urldecode($get['label']);
                $sort=(int)$get['sort'];


                if(!$id)$this->insertPage(array('label'=>$label,'enable'=>1,'sort'=>$sort));
                else $this->updatePage(array('label'=>$label,'enable'=>1,'id'=>$id));
                $out->result=$this->savePageInfo($id,file_get_contents('php://input'));
                break;

            case 'add':
                $id=(int)$post['id'];
                $label=$post['label'];
                $sort=(int)$post['sort'];
                $new_id=$this->insertPage(array('label'=>$label,'enable'=>1,'sort'=>$sort));
                if(!$new_id) {
                    $out='ERROR Creating ne page '.$this->con->errorInfo();
                    break;
                }
                $old_id=$post['old_id'];
               if($this->copyPageInfo($old_id,$new_id))   $out=$new_id;
                else $out='ERROR coping file';
			break;
			case 'delete':
			$out->result=$this->deletePage((int)$post['pageid']);
			break;
			
			case 'update':
			$res=0;
			if($post['id']==0)$res=$this->insertPage($post);
			else $res=$this->updatePage($post);
					
			$out=$res;
			break;			
		}
		//header('Content-type: application/json');
		return $out;
	}
	private function  updatePage($page){			
		return	$this->con->updateRow("UPDATE pages SET label=?,enable=? WHERE id=?",array($page['label'],$page['enable'],$page['id']));		
	}
	private function  insertPage($page){			
		return	$this->con->insertRow("INSERT INTO pages (label,enable,sort) VALUES(?,?,?)",array($page['label'],$page['enable'],$page['sort']));		
	}
	private function getAllPages(){
        $sql='SELECT id,label,enable,sort FROM pages WHERE enable=1 ORDER BY sort';
       $res =  $this->con ->query($sql);

        $sql='SELECT id,label,enable,sort FROM pages WHERE enable=2 ORDER BY label';
        $res1 =  $this->con ->query($sql);

        $sql='SELECT id,label,enable,sort FROM pages WHERE enable=0 ORDER BY sort';
        $res2 = $this->con ->query($sql);
			return array_merge($res,$res1,$res2);
				
	}
	private function deletePage($pageid){		
		return $this->con->query("DELETE FROM pages WHERE id=".$pageid);		
	}
	//private function createPage($label){
		//$res=$this->con->queryRow("SELECT id,label,enable,sort FROM pages  WHERE label='New Page'");
		//if($res)return $res ;
		//$this->con ->insert("INSERT INTO pages (label,enable,sort) VALUES ('New Page',1,1000)");
		//return $this->con->queryRow("SELECT id,label,enable,sort FROM pages  WHERE label='New Page'");
	//}

    private function copyPageInfo($old_id,$new_id){
        $fn=$this->P.$old_id.'.htm';
        $fn2=$this->P.$new_id.'.htm';
        return copy($fn,$fn2);
    }
	private function savePageInfo($pageid,$data){
		$fn=$this->P.$pageid.'.htm';
		return file_put_contents($fn,$data);
		//$sql="UPDATE pages SET info=? WHERE id=?";
		//$stmt=$this->db->prepare($sql);	
		//return $stmt->execute(array($data['pageid'],$data['info']));		
	}
	private function getPageInfo($pageid){
		$fn=$this->P.$pageid.'.htm';
		return file_exists($fn)?file_get_contents($fn):'no Content';
			//$sql='SELECT info FROM pages WHERE id='.$pageid;
			//$res=$this->db->query($sql);						 
			//return $res->fetchColumn();				
	}
	private function saveAllPages($data){
		$this->con->beginTransaction("UPDATE pages SET sort=? WHERE id=?");
							
		foreach($data as $value) $this->con->execute(array($value['sort'],$value['id']));
		
		return $this->con-> commit();	
		
	}
    private function savePagesOrder($data){
        $this->con->beginTransaction("UPDATE pages SET sort=? WHERE id=?");
$i=0;
        foreach($data as $value) $this->con->execute(array($i++,$value));

        return $this->con-> commit();

    }

}
