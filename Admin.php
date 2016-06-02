<?
session_start();
define('DATA','data');
if(!isset($_SESSION['directories_user']) || $_SESSION['directories_user']===0){
	  header("Location: Login");
       die();
}
$cfg = 0;
if(file_exists(DATA.'/config.json')) $cfg = json_decode(file_get_contents(DATA.'/config.json'));

$settings = json_decode(file_get_contents(DATA.'/settings.json'));
$theme = $settings->theme;
?>
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Admin panel">
    <meta name="author" content="ulight Vlad">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <link href="js/lists/reset.css" rel="stylesheet" type="text/css"/>
    <link href="<?= $theme; ?>" rel="stylesheet" />
    <script type="text/javascript" src="js/libs/jquery-2.1.0.min.js"></script>
    <script>
        var u_admin=<?= file_get_contents(DATA.'/admin.json'); ?>;
        <? echo 'var u_cfg='.($cfg?json_encode($cfg):0).';';
        echo 'var U_id="'.$_SESSION['directories_user'].$_SESSION['directories_user_id'].$_SESSION['directories_role'].'";';

        ?>;
    </script>

   <!-- <script type="text/javascript" src="js/libs/bootstrap.min.js"></script>-->


<title>Interactive Directories Admin</title>

    <style>
        #PageBody .page-container {
            padding: 20px;
            border-radius: 10px;
        }
        #PageBody img.sel-img{
            border: thin solid khaki;
        }
        .umsg{
            position: absolute;
            z-index: 2000;
            background-color: ivory;
            padding: 0.3em;
            border-radius: 7px;
            box-shadow: 0 0 5px gray;

        }

        .ulist>ul>li.selected{
            background-color: khaki;
        }
        .abs{
            position:absolute;
        }

        .cover{
            background-color: rgba(0,0,0,0.5);
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: none;
        }

       #adminHeader{
            text-align: center;
        }
        .item.selected{
            background-color:khaki !important;
        }

        #Message{
            position: relative;
            z-index: 100;
        }
        #Message>div{
            background-color:#FFEFD5;
            padding: 0.5em;
            font-size: 0.7em;
            border-radius: 5px;
            position: absolute;

        }
        .border{
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .inline{
            display: inline-block;
        }
        .disabled{
            opacity: 0.5;
        }
        .pagenav{
            margin: 10px;
        }
        body>hr{
            margin: 5px;
        }
        .page-heading>*{
            display: inline-block;
        }

        .pagenav>ul{
            margin-left: 20px;
        }

        .pagenav>ul>li{
            display: inline;
            cursor: pointer;
            text-decoration: underline;
        }
        .pagenav li.active{
           cursor: auto;
            text-decoration:none;
        }

        .pagenav>ul>li+li:before {
            padding: 0 5px;
            color: #ccc;
            content: "/\00a0";
        }



    </style>

</head>
<body>
<div id="adminHeader" >
    <h4 >Interactive Directory Admin Panel </span>

        <a id="btnLogout" data-id="btnLogout" class="btn pull-right"><span class="fa fa-user-times"></span> LogOut</a>
        <button id="btnRestartKiosks" class="btn btn-warning pull-right">Restart Kiosks</button>
    </h4>
<?
 include ('htms/admin/Navigation.htm');
?>
</div>
<hr/>
    <div id="error"></div>

    <div id="content" class="">
    </div>
<!-------------------------pREVIEW kIOSK----------------------------------------------------------------------->
<?
    //include ('htms/admin/AdminMenu.htm');
    include ('htms/admin/AdminPreviewKiosk.htm');
    include ('htms/admin/AdminPreviewMobile.htm');
?>




<div id="cover" class="cover">

</div>
<div id="Confirm" class="modal">
    <style>
        #Confirm{
            background-color: rgba(200,200,200,0.2);
        }
    </style>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-id="btnClose">×</button>
                <h4 class="modal-title" data-id="title">Modal title</h4>
            </div>
            <div class="modal-body" data-id="text">
                <p>One fine body…</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-id="btnYes">Confirm</button>
                <button type="button" class="btn btn-default" data-id="btnNo">Cancel</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<hr/>
<!-- -->
<link href="js/libs/font-awesome.css" rel="stylesheet" type="text/css"/>
<link href="js/libs/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<!---->
<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0"></script>
<script type="text/javascript" src="js/gmap/GmapCtr.js"></script>
<script type="text/javascript" src="js/libs/underscore-min.js"></script>
<script type="text/javascript" src="js/libs/nicEdit.js"></script>
<script type="text/javascript" src="js/libs/Chart.js"></script>
<!--<script type="text/javascript" src="js/libs/bootstrap.min.js"></script>-->
<!---->

<script src="js/admin/com/Utils.js"></script>
<script type="text/javascript" src="js/admin/RegA.js"></script>
<script type="text/javascript" src="js/admin/net.js"></script>
<script type="text/javascript" src="js/admin/models.js"></script>
<script type="text/javascript" src="js/admin/com/GalleryPreview.js"></script>
<script type="text/javascript" src="js/admin/com/GalleryEditor.js"></script>
<script type="text/javascript" src="js/admin/screen/SettingsKiosks.js"></script>
<!--<script type="text/javascript" src="js/admin/screen/RestartKiosk.js"></script>-->
<script type="text/javascript" src="js/admin/screen/AttractLoopEdit.js"></script>

<script type="text/javascript" src="js/admin/categories/CategoryForm.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryListing.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryList.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryInListing.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoriesList.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryNotListing.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoriesManager.js"></script>

<script type="text/javascript" src="js/admin/screen/LabelsManager.js"></script>

<script type="text/javascript" src="js/admin/destinations/DestinationsList.js"></script>
<script type="text/javascript" src="js/admin/destinations/DetailsCategory.js"></script>
<script type="text/javascript" src="js/admin/destinations/DetailsForm.js"></script>
<script type="text/javascript" src="js/admin/destinations/DestinationsController.js"></script>
<script type="text/javascript" src="js/admin/destinations/DetailsImages.js"></script>

<script type="text/javascript" src="js/admin/etc/ImportExport.js"></script>



<script type="text/javascript" src="js/admin/etc/DeviceData.js"></script>
<script type="text/javascript" src="js/admin/etc/KioskChart.js"></script>
<script type="text/javascript" src="js/admin/etc/TopSearches.js"></script>
<script type="text/javascript" src="js/admin/etc/Statistics.js"></script>


<script type="text/javascript" src="js/admin/etc/KiosksManager.js"></script>

<script type="text/javascript" src="js/admin/info/InfoPagesEditor.js"></script>
<script type="text/javascript" src="js/admin/info/FrontPageEditor.js"></script>

<script type="text/javascript" src="js/admin/views/Menu.js"></script>
<script type="text/javascript" src="js/admin/views/Navigation.js"></script>

<script type="text/javascript" src="js/admin/DirsAdmin.js"></script>

<script type="text/javascript" src="js/Utils.js"></script>
<script type="text/javascript" src="js/Lists.js"></script>
<script type="text/javascript" src="js/Forms.js"></script>
<script type="text/javascript" src="js/admin/AdminsManage.js"></script>



    </body>
<script>
    $(document).ready(function(){
        var admin =  new uplight.Admin();
    })
</script>
</html>
