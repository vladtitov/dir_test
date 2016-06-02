<?php
$icons = file_get_contents('fa-icons2.txt');
$icons = explode('fa',$icons);
$out = array();
foreach($icons as $val)$out[] = substr($val,1,strpos($val,' ')-1);
var_dump($out);
file_put_contents('fa-icons.json',json_encode($out));

?>