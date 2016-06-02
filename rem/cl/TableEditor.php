<?
require_once 'MyDB.php';
class TableEditor{
    var $table;
    var $db;
    var $select='*';
    var $where='';
    var $defaultVals = array();
    function TableEditor($table){
        $this->table= $table;
        $this->db=new MyDB();
    }
    function process($a){
        switch($a[0]){
            case 'get_all':
                $res = $this->db->getRows('SELECT '.$this->select.' FROM '.$this->table.$this->where);
                if(!$res){
                    $res= new stdClass();
                    $res->success='nodata';
                }
                return $res;
                break;
            case 'update':
                return $this->update();
            break;
            case 'insert':
                return $this->insert();
                break;
            case 'delete':
                return $this->delete();
                break;
        }
    }

    private function delete(){
        $data = json_decode(file_get_contents('php://input'));
        $id=(int)$data->id;
        $sql='DELETE FROM '.$this->table.' WHERE id='.$id;
        $res = $this->db->delete($sql);
        $out=new stdClass();
        if($res){
            $out->success='delete';
            $out->result= $id;
            $out->message ='Recored deleted';
        }
        else{
            $out->error='delete';
            $out->result= $this->db->errorInfo();
            $out->message ='Internal Error';

        }
        return $out;

    }
   private function insert(){
       $data = json_decode(file_get_contents('php://input'),TRUE);

       foreach ($this->defaultVals as $key=>$val)if(!isset($data[$key])) $data[$key] = $val;
       $vals = array();
       $keys = array();
       $q=array();
       foreach($data as $key=>$val){
           $keys[]= $key;
           $q[]='?';
           $vals[] = $val;
       }
       $sql  = 'INSERT INTO '.$this->table.' ('.implode(',',$keys).')  VALUES ('.implode(',',$q).')';
        $res =   $this->db->insertRow($sql,$vals);

       $out=new stdClass();
       if($res){
           $out->success='insert';
           $out->result= $res;
           $out->message ='Recored inserted';
       }
       else{
           $out->error='insert';
           $out->result= $this->db->errorInfo();
           $out->message ='Internal Error';
           $out->details=$sql;

       }
       return $out;

   }

    private function update(){
        $data = json_decode(file_get_contents('php://input'));
        $id=$data->id;
        $vals = array();
        $keys=array();
        foreach($data as $key=>$val){
            $keys[]= $key.'=?';
            $vals[] = $val;
        }

        $sql  = 'UPDATE '.$this->table.' SET '.implode(',',$keys).' WHERE id='.$id;
        $res = $this->db->updateRow($sql,$vals);

        $out=new stdClass();
        if($res){
            $out->success='update';
            $out->result= $res;
            $out->message ='Recored updated';
        }
        else{
            $out->error='update';
            $out->result= $this->db->errorInfo();
            $out->message ='Internal Error';

        }
        return $out;

    }

}
