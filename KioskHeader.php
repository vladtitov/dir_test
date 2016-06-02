<?php
session_start();
define('DATA','data');
$kiosk_id=0;
$id=0;
$sett_file= 'settings.json';
$settings = json_decode(file_get_contents(DATA.'/'.$sett_file));
if(isset($settings->attract_loop)){
    $settings->attract_loop = json_decode(file_get_contents(DATA.'/'.$settings->attract_loop));
}
foreach($_GET as $key=>$val) $settings->$key=$val;

//overwrite settings with get
$theme = isset($settings->theme)?$settings->theme:'css/themeWhite.css';



$l=file_get_contents(DATA.'/'.$settings->labels);


$lbs = json_decode($l);
$labels = array();
foreach($lbs as $label) $labels[$label->index] = $label->value;
?>
<!DOCTYPE html>
<html ln="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kiosk 1080">
    <meta name="author" content="Vlad">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<title>Kiosk</title>
    <link href="css/reset.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/kiosk.css" rel="stylesheet" />
    <link href="<?= $theme; ?>" rel="stylesheet" />
   
    <link href="js/libs/font-awesome.css" rel="stylesheet" type="text/css"/>

    <script src="js/libs/jquery-2.1.0.min.js"></script>
    <script src="js/libs/underscore-min.js"></script>
    <script src="js/libs/svgjs.js"></script>
    <script type="text/javascript">
        <?
                $out = ' var u_settings ='.json_encode($settings).";\n";
                $out.=' var u_labels = '.json_encode($labels).";\n";
                echo $out;
        ?>;
    </script>

