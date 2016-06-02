<?
class MyDB{
	var  $db;
	var $stmt;

	function MyDB(){
		if(file_exists(DATABASE)){
			$this->db = new PDO('sqlite:'.DATABASE);
		}
	}

	function delete($sql){
		return $this->db->query($sql);
	}
	function getRows($sql){
		$res = $this->db->query($sql);
		if($res) return $res->fetchAll(PDO::FETCH_ASSOC);
		return 0;

	}
	function getField($sql){
		$res = $this->db->query($sql);
		if($res) return $res->fetchColumn();
		return 0;
	}
	function queryPure($sql){
		return  $this->db->query($sql);
	}


	function getAsArray($sql){
		return  $this->db->query($sql)->fetchAll(PDO::FETCH_NUM);
	}
	function getAllAsObj($sql){
		return  $this->db->query($sql)->fetchAll(PDO::FETCH_OBJ);
	}
	function query($sql,$ar){
		$stmt =   $this->db->prepare($sql);
		if(!$stmt) return $this->db->errorInfo();
		$res = $stmt->execute($ar);
		if($res)return $stmt->fetchAll(PDO::FETCH_OBJ);
		return  $this->db->errorInfo();
		//return $stmt->execute($arVars);
	}
	function queryA($sql,$ar){
		$stmt =   $this->db->prepare($sql);
		if($stmt){
			$res = $stmt->execute($ar);
			if($res) return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		return 0;
	}
	function getNextAsSoc($result){
		return $result->fetch(PDO::FETCH_ASSOC);
	}

	function beginTransaction($sql){
		$this->db->beginTransaction();
		$this->stmt=$this->db->prepare($sql);

	}
	function prepare($sql){
		return $this->db->prepare($sql);
	}

	function commit(){
		return $this->db()-> commit();
	}
	function errorInfo(){
		return $this->db->errorInfo();
	}

	function updateRow($sql,$ar){
		$stmt = $this->db->prepare($sql);
		$res = $stmt->execute($ar);
		return $res;
	}

	function insertRow($sql,$ar){
		$stmt = $this->db->prepare($sql);
		if(!$stmt) return 0;
		$res = $stmt->execute($ar);
		if($res) return $this->db->lastInsertId();
		return 0;
	}

}