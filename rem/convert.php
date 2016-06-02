<?php
$file=$_FILES['file'];
$type=pathinfo($file["name"], PATHINFO_EXTENSION);
echo 'data:image/' . $type . ';base64,' . base64_encode(file_get_contents($file['tmp_name']));
?>