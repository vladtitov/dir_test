<?php
class DbConnector{
    var  $dbpdo;
	var $stmt;
	var $file = 'directories.db';
	//var $folder ='../data/';
	var $arch ='../data/arch/';


	public function backup(){
			$date = date("m-d-y");
			return copy(DATA.$this->file,DATA.'arch/'.$date.$this->file);

	}


	public function db(){
			if(!$this->dbpdo)$this->dbpdo=new PDO('sqlite:'.DATA.$this->file);
		return $this->dbpdo;
	}

	function getField($sql){
		return $this->db()->query($sql)->fetchColumn();
	}
	function queryPure($sql){
		return  $this->db()->query($sql);
	}
	function deleteRecord($sql){
		return  $this->db()->query($sql);
	}
	function getAllAsObj($sql){
		return  $this->db()->query($sql)->fetchAll(PDO::FETCH_OBJ);
	}
	function query($sql){
		return  $this->db()->query($sql)->fetchAll(PDO::FETCH_OBJ);
	}
	function getAsArray($sql){
		return  $this->db()->query($sql)->fetchAll(PDO::FETCH_NUM);
	}
	function queryRow($sql){
		return  $this->db()->query($sql)->fetch(PDO::FETCH_OBJ);
	}
	function queryDb($sql,$arVars){
		return $this->db()->prepare($sql)->execute($arVars)->fetchAll(PDO::FETCH_OBJ);
		//return $stmt->execute($arVars);		
	}
	function getNextAsSoc($result){
		return $result->fetch(PDO::FETCH_ASSOC);
	}
	function updateRow($sql,$ar){
			$stmt = $this->db()->prepare($sql);
			if($stmt) return  $stmt->execute($ar);
		return	0;
	}
	function beginTransaction($sql){
		$this->db()->beginTransaction();
		$this->stmt=$this->db()->prepare($sql);
		
	}
	function execute($arVars){
		$this->stmt->execute($arVars);
	}
	function commit(){
		return $this->db()-> commit();
	}
	function errorInfo(){
	return $this->db()->errorInfo();
	}
	
	function insert($sql,$ar){
			$stmt = $this->db()->prepare($sql);
			if(!$stmt) return 0;
		 	$res = $stmt->execute($ar);//$this->db()->query($sql);
			if($res) return $this->db()->lastInsertId();
			return 0;
	}

	function insertRow($sql,$arVars){
		 $this->db()->prepare($sql)->execute($arVars);
		  return $this->db()->lastInsertId();
	}
}