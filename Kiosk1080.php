<?
include('KioskHeader.php');
?>
<link href="css/kiosk1080.css" rel="stylesheet" />
    <style>
    .hide{
        display: none;
    }
    li>a{
        display: block;
        color: inherit;
    }
    body{
        <?= isset($labels['bg_1080'])?'background-image:url("'.$labels['bg_1080'].'");':'' ?>
    }

	
	
	

</style>
</head>
<body>
<div id="Templates" class="hidden"> </div>
<div id="History" class="hidden"></div>

<div id="container">
    <section id="u-header" class="banner-color view-port">

            <div id="brand-logo" >
                <?= isset($labels['logo'])?'<img src="'.$labels['logo'].'" />':''; ?>
            </div>
            <div id="brand-name" >
                   <?= isset($labels['kiosk_header'])?$labels['kiosk_header']:''; ?>
            </div>
            <div id="brand-more">
                <div id="Clock" data-ctr="uplight.Clock">
                </div>

            </div>
            <p id="brand-slogan">
                <?= isset($labels['slogan'])?$labels['slogan']:''; ?>
            </p>

    </section>


    <section id="mainview" class="view-port">
        <style>

            #Pages>div{
                width:1480px;
                height: 1077px;
             }

           #Pages>div>div{
               float: left;
               white-space: normal;
               width:725px;
               height: 1070px;
               overflow-y: auto;
               padding: 22px;
           }

           #Pages .page>.header{
               font-size: large;
               margin-bottom: 1em;
           }



        </style>
        <div id="mainport" class="mainbg u-glow view-port-content">
            <section id="SearchResult" data-ctr="uplight.SearchResult">

                <div class="col-sm-12">
                    <div id="list-header" >
                        <div id="list-header-main" >
                            <h4 data-id="header">  <?= isset($labels['list-header'])?$labels['list-header']:''; ?></h4>
                        </div>
                    </div>
                </div>
                <hr style="margin-bottom: 0"/>
                <div  class="col-lg-12">
                    <div id="list-scroll">
                        <div class="nano-content" data-id="list">
                        </div>
                    </div>
                </div>
                <hr style="margin-top: 0"/>
                <div  class="col-sm-12">
                    <div class="more col-sm-8" >
                        <p style="vertical-align: text-bottom; line-height: 140px">  <?=  isset($labels['list_footer'])?$labels['list_footer']:'( <span class="fa fa-plus"></span> More... More Info Available )'; ?></p>
                    </div>
                    <div class="col-sm-4">
                        <div id="searchinput" data-ctr="uplight.SearchInput">
                            <style>
                                #searchinput{
                                    position: relative;
                                }
                                #searchinput .fa-times-circle{
                                    position: absolute;
                                    top: 25px;
                                    right: 10px;
                                    font-size: 30px;
                                    color: #adadad;
                                }
                                #searchinput #textInput{
                                    border-radius: 30px;
                                    font-size: 30px;
                                    width: 400px;
                                    height: 82px;
                                    border: none;
                                    padding: 20px 40px 20px 20px;
                                    margin-right: -20px;
                                }
                            </style>
                            <!-- <span class="fa fa-search"></span>-->
                            <div id="textInput" data-id="input" class="input-text pull-right" ></div>
                            <span class="fa fa-times-circle"  data-id="btnClear"></span>
                        </div>
                    </div>
                </div>
            </section>
               <section id="Pages" data-ctr="uplight.InfoPagesModel">

                </section>
        </div>

    </section>


    <section id="sideview" class="view-port">
        <hr/>
        <div id="toolsview" class="mainbg view-port-content" data-ctr="uplight.LowPanelController">
            <section data-ctr="uplight.PagesMenu" class="row">
                <style>
                    #btnSearch{
                        font-size:100px;
                        padding:20px;
                    }

                    #MenuList{
                        height: 230px;
                        overflow-y:auto;

                    }
                    #MenuList  li.item {
                        border-radius: 20px;
                        margin: 12px 0 12px 0;
                        padding: 12px;
                        width: 98%;
                        font-size: 30px;
                    }
                </style>

                <div class="col-sm-2"></div>
                <div class="col-sm-6">
                    <h3 class="text-center">
                        <?= isset($labels['infopages'])?$labels['infopages']:'&nbsp;'; ?>
                    </h3>
                    <div>
                        <div id="MenuList" class="nano" data-id="list">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <h3 class="text-center">
                        <?= isset($labels['btnSearch'])?$labels['btnSearch']:'&nbsp;'; ?>
                    </h3>
                    <div id="btnSearch" class="fa fa-search pull-right" >

                    </div>

                </div>
                <div class="col-sm-2"></div>
            </section>


            <section id="SearchView" class="row">
        <style>
            #sideview h3{
                color: #9d9d9d;
            }

            #SearchView h3>a{
                padding: 12px;
                border-radius: 12px;
            }
            #Categories{
                margin-left: 2em;
            }
            #kw-container{
                float: right;
                height:270px ;
                width: 150px;
                overflow-y: auto;
                margin-right: 50px;

            }
            #kw-container li>a{
                width: 100%;
                text-align: left;
                /* text-decoration: underline;*/
                /*  margin: 0.5em;*/
                /*  border-bottom: thin #f8f8f8 solid;*/

            }
            #Categories>.list{
                height: 250px;
                overflow-y: auto;
                overflow-x: hidden;
                width: 220px;
                margin-left: -10px;
            }
            #Categories ul>li{
                font-size: 16px;
                width: 100%;
                text-align: left;
                /*  line-height:25px;*/
            }

            #Categories li .icon{
                display: inline-block;
                width: 16px;
                height: 16px;

            }

            #Categories li>.check{
                display:inline-block;
                width: 20px;
                color:#9d9d9d;
            }

        </style>
        <section class="col-sm-3">
            <div id="Categories" data-ctr="uplight.CategoriesCheck">

                <h3>
                    <?= isset($labels['categories'])?$labels['categories']:'Categories'; ?>
                </h3>
                <div class="list">

                </div>

            </div>
        </section>
        <section class="col-sm-6 text-center">
            <h3 class="text-center">
                <?= isset($labels['keyboard'])?$labels['keyboard']:'&nbsp;'; ?>
            </h3>
            <div id="Keyboard"  class="text-center" data-ctr="uplight.Keyboard">
            </div>
            <hr/>
            <h3 class="text-center">
                <a id="btnShowMenu" class="brand-color">
                <?= isset($labels['topages'])?$labels['topages']:'&nbsp;'; ?>
                </a>
            </h3>
        </section>
        <section class="col-sm-3">
            <div  data-id="btnClose" class="btn pull-right btn-close"><span class="fa fa-close"></span></div>
            <div id="keywords" data-ctr="uplight.Keywords">
                <h3 class="text-center">
                    <?= isset($labels['keywords'])?$labels['keywords']:'Keywords'; ?>
                </h3>


                <div id="kw-container" class="nano" data-id="list">
                </div>

            </div>

        </section>


    </section>
        </div>
        <hr/>
    </section>
    <style>
        #DetailsLarge>.modal-dialog{
            width: 730px;
            top:380px;
            margin-top: 0;

        }
        #DetailsLarge .modal-content{
            height: 1100px;
        }
    </style>
    <?php
    include('htms/kiosk/DetailsLarge.htm');
    ?>

</div> <!--End of container-->

<section id="AttractLoop" data-ctr="uplight.AttractLoop">
    <style>
        #AttractLoop {
            position: absolute;
            top: 170px;
        }
        #AttractLoop{
            width: 1080px;
            height: 1750px;
        }
        #AttractLoop .gal_650x1024 {
            position: absolute;
            margin: auto;
            padding: 0;
            left: 0;
            right: 0;
            top:200px;
            width: 650px;
            height: 1024px;
            overflow: hidden;
        }
        #Touchclip{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 1080px;
            height: 120px;
        }
    </style>
    <div  class="cover" data-id="cover">
    </div>

    <link href="css/AttractLoop.css" rel="stylesheet" />
   <!-- <link href="css/AL_1080.css" rel="stylesheet" />-->
    <script src="js/kiosk/als/AttractLoop.js"></script>
    <script src="js/kiosk/als/ScreenSaver.js"></script>
    <script src="js/kiosk/als/TouchClip.js"></script>
    <script src="js/kiosk/als/GalleryDisplay.js"></script>
</section>



<script src="js/kiosk/Registry.js"></script>
<script src="js/kiosk/Connector.js"></script>
<script src="js/kiosk/search/models.js"></script>

<link href="js/kiosk/search/Keyboard.css" rel="stylesheet" />
<script src="js/kiosk/search/KeyboardSimple.js" ></script>

<script src="js/kiosk/search/Keywords.js" ></script>
<script src="js/kiosk/search/SearchResult.js"></script>
<script src="js/kiosk/search/DetailsLarge.js"></script>

<script src="js/kiosk/search/SearchModel.js"></script>
<script src="js/kiosk/search/Categories.js"></script>

<script src="js/kiosk/InfoPage.js"></script>
<script src="js/kiosk/MainMenu.js"></script>
<script src="js/kiosk/views.js"></script>
<script src="js/kiosk/utils/Relay.js"></script>
<script src="js/kiosk/utils/Timeout.js"></script>

<script src="js/kiosk/Banner.js" ></script>

<script src="js/kiosk/Kiosk.js" ></script>

</body>
</html>
