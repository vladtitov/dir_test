<?php

$sqls =  explode(';',file_get_contents('../data/start/directories.sql'));
$db = new PDO('sqlite:../data/start/directories.db');
foreach($sqls as $sql){
    $db->query($sql);
    var_dump($db->errorInfo());
}

$db = new PDO('sqlite:../data/start/statistics.db');

$sqls =  explode(';',file_get_contents('../data/start/statistics.sql'));
//foreach($sqls as $sql)$db->query($sql);




