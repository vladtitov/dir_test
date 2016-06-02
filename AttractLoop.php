<?php
$sett='settings.json';
if(isset($_GET['settings']))$sett=$_GET['settings'];
$res='1080';
if(isset($_GET['res']))$res=$_GET['res'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="js/libs/jquery-2.1.0.min.js"></script>
    <script src="js/libs/svgjs.js"></script>
    <title></title>
    <link href="js/lists/reset.css" rel="stylesheet" />
    <link href="css/AttractLoop.css" rel="stylesheet" />
    <link href="css/AL_<?=$res;?>.css" rel="stylesheet" />

	<script>
	var u_settings = <?php echo file_get_contents('../data/'.$sett); ?>
	</script>

</head>
<body>
<section id="AttractLoop" data-ctr="uplight.AttractLoop">
    <style>
        #AttractLoop {
            top: 0 !important;
        }
    </style>
    <div  class="cover" data-id="cover">
    </div>
    <script src="js/kiosk/Registry.js"></script>
    <script src="js/kiosk/Connector.js"></script>

    <script src="js/kiosk/als/AttractLoop.js"></script>
    <script src="js/kiosk/als/ScreenSaver.js"></script>
    <script src="js/kiosk/als/TouchClip.js"></script>
    <script src="js/kiosk/als/Gallery.js"></script>
</section>
<script>
    $(document).ready(function(){

        var ts = new uplight.AttractLoop(document.getElementById('AttractLoop'));

    })

</script>
</body>
</html>