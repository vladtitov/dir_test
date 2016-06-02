<?php
$strSettings=file_get_contents("data/settings.json");
$settings=json_decode($strSettings);
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=1920, initial-scale=0.5"/>
    <title></title>
    <style type="text/css">
        body{
            background-color: #000000;
            width: 100%;
            height: 100%;
        }
        </style>
    <script type="text/javascript">
        var url='Kiosk1920.php';
        var blank = <?=json_encode($settings->blank)?>

    </script>
    <script src="js/kiosk/BlackScreen.js"></script>
    <body>

    </body>
</html>