<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kiosk 1080">
    <meta name="author" content="Vlad">
    <title>Kiosk</title>
    <style>
        #Preview{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        iframe{
            -ms-zoom: 0.5;
            -moz-transform: scale(0.5);
            -moz-transform-origin: 0 0;
            -o-transform: scale(0.5);
            -o-transform-origin: 0 0;
            -webkit-transform: scale(0.5);
            -webkit-transform-origin: 0 0;
           width: 1080px;
            height: 1920px;

        }
       html, body{
            overflow:hidden;
        }
    </style>

</head>
<body>
<div id="Preview">
<iframe src="" scrolling="no" frameborder="0">

</iframe>
</div>
</body>
</html>