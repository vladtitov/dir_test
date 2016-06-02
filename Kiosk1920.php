<?
include('KioskHeader.php');
?>
    <!--<script src="js/kiosk/Kiosk.js"></script>-->
<!--<link href="css/kiosk1920.css" rel="stylesheet" />-->
<style>
    body{
        width: 1920px;
        height: 1080px;
        overflow: hidden;
    }
    .hide{
        display: none;
    }
    li>a{
        display: block;
        color: inherit;
    }
    body{
        <?= isset($labels['bg_1920'])?'background-image:url("'.$labels['bg_1920'].'");':'' ?>
    }
    .mainbg{
        background-color: rgba(255,255,255,0.75);
        border-radius: 20px;
    }
    #container{
        width: 1920px;
        height: 1080px;
        overflow: hidden;
        top:0;
        left: 0;
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
           #mainport, #cover>.detailsL {
                position: absolute;
                width:725px;
                left: 0;
                right: 0;
                margin: auto;
                overflow: hidden;
               white-space: nowrap;
            }

           #mainport>section{
               display: inline-block;
               width:725px;
               vertical-align: top;
           }

           /* #mainport .view-port{
                position: absolute;
                width: 90%;
                height: 95%;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
            }*/
           #Pages{
               overflow: hidden;
           }
           #Pages .page>.content{
               height: 740px;
               overflow-y: auto;
               overflow-x: hidden;
           }
            #Pages>div{
                width:1480px;

               /* white-space: nowrap;*/
             }
           #Pages>div>div{
               float: left;
               white-space: normal;
               /*display: inline-block;*/
              /* vertical-align: top;*/
               width:725px;
               height: 1077px;
               padding: 22px;

           }
           #Pages .page>.header{
               font-size: large;
               margin-bottom: 1em;
           }

           #u-header #brand-name{
               font-size: 50px;
               top: 45px;
               left:180px;
               width: 1500px;
               position: absolute;
               /* white-space: nowrap;*/
           }

           #mainport>section{
               display: inline-block;
               width:725px;
               vertical-align: top;
           }
           #Pages{
               overflow: hidden;
           }
           #Pages>div{
               width:1480px;
               height: 725px;
               /* white-space: nowrap;*/
           }
           #Pages>div>div{
               float: left;
               white-space: normal;
               /*display: inline-block;*/
               /* vertical-align: top;*/
               width:725px;
               height: 726px;
               padding: 22px;

           }
           .k1080{
               display: none;
           }

           #list-scroll{
               width:99%;
               height: 680px;
               overflow-y: scroll;
           }

           #mainview{
               top: 250px;
               width: 725px;
               height: 740px;
               left:100px;
           }

           #mainport, #cover>.detailsL {
               position: absolute;
               width:100%;
               height: 100%;
               left: 0;
               right: 0;
               margin: auto;
               overflow: hidden;
               white-space: nowrap;
           }

        </style>
        <div id="mainport" class="mainbg view-port-content">
            <section id="SearchResult" data-id="searchResult" data-ctr="uplight.SearchResult">
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

                    </div>
                </div>
                <hr style="margin-top: 0"/>
            </section>
               <section id="Pages"  data-ctr="uplight.InfoPagesModel">

                </section>
        </div>

    </section>


    <section id="sideview" class="view-port">
        <style>
            #sideview{
                position: absolute;
               width: 180px;
                bottom: 170px;
                height: 150px;
                right: 320px;
                text-align: center;
            }
            .btn-xxlarge{
                width: 100px;
                height: 100px;
                font-size: 50px;
                line-height: 50px;
                border-radius: 10px;
            }

        </style>
        <hr/>
        <!--<div id="toolsview" class="view-port-content" data-ctr="notSwitchView">-->
            <div data-ctr="uplight.ButtonSearch">

                <button  data-id="btnSearch" class="btn-danger btn-xxlarge">
                    <span class="fa fa-search" ></span>
                </button>
                <h3 class="text-center">
                    <?= isset($labels['btnSearch'])?$labels['btnSearch']:'&nbsp;'; ?>
                </h3>
            </div>


        <!--</div>-->
    </section>
    <section id="KeyboardView" class="text-center mainbg" data-ctr="uplight.KeyboardView">
        <h3 class="text-center">
            <?= isset($labels['keyboard'])?$labels['keyboard']:'&nbsp;'; ?>
        </h3>
        <div class="col-sm-10">

            <div id="searchinput" data-ctr="uplight.SearchInput">
                <style>
                    #KeyboardView{
                        position: absolute;
                        width:520px;
                        padding: 10px;
                        padding-bottom: 20px;
                        bottom: 50px;
                        right: 150px;
                    }
                    #KeyboardView.show{
                        transform: translateY(0);
                    }
                    #KeyboardView{
                        transition: transform 0.5s;
                        transform: translateY(500px);
                    }
                    #KeyboardView h3{
                        margin: 0;

                    }
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
                </style>
                <!-- <span class="fa fa-search"></span>-->
                <div id="textInput" data-id="input" class="pull-right" ></div>
                <span class="fa fa-times-circle"  data-id="btnClear"></span>
            </div>

            <style>
                #searchinput .fa-times-circle{
                    top:10px;
                    right: 0;
                }
                #searchinput #textInput {
                    border-radius: 10px;
                    font-size: 30px;
                    width: 400px;
                    height: 42px;
                    border: none;
                    padding: 5px 5px 5px 5px;
                    margin-right: -20px;
                    text-align: left;
                    background-color: white;
                }
            </style>
        </div>
        <div class="col-sm-2">
            <button class="btn btn-danger" data-id="btnClose"><span class="fa fa-close"></span></button>
        </div>
        <div id="Keyboard" data-ctr="uplight.Keyboard" class="text-center">
        </div>
    </section>

        <section id="view3" class="mainbg">
            <style>
                #view3{
                    position: absolute;
                    top: 300px;
                    right: 215px;
                    padding: 0 5px 20px 5px;
                }
            </style>
            <div id="MainMenu" data-ctr="uplight.MainMenu">
                <style>
                    #MainMenuList{
                        width: 400px;
                        height: 300px;
                        overflow-y: scroll;
                        overflow-x: hidden;
                        padding-left: 10px;
                    }

                    #MainMenuList li.item {
                        border-radius: 20px;
                        margin: 12px 0 12px 0;
                        padding: 12px;
                        width: 98%;
                        font-size: 30px;
                    }
                    #MainMenuList li:active{
                        transform: scale(1.05);
                    }
                </style>
                <h2 class="text-center">Menu</h2>
                <div id="MainMenuList" data-id="list">

                </div>

            </div>
        </section>

    <section id="footer">
        <?= isset($labels['footer'])?$labels['footer']:''; ?>
    </section>
    <style>
        #DetailsLarge>.modal-dialog{
            width: 730px;
            top:40px;
            margin-top: 0;

        }
        #DetailsLarge .modal-content{
            height: 1000px;
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
            width: 1920px;
            height: 910px;
        }
        #AttractLoop .gal_650x1024 {
            position: absolute;
            right: 0;
            bottom: 0px;
            width: 650px;
            height: 1024px;
            overflow: hidden;
        }
        #Touchclip {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 1920px;
            height: 120px;
        }
    </style>
    <div  class="cover" data-id="cover">
    </div>
    <link href="css/AttractLoop.css" rel="stylesheet" />
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
<script src="js/kiosk/utils/Relay.js"></script>
<script src="js/kiosk/utils/Timeout.js"></script>
<script src="js/kiosk/views.js"></script>

<script src="js/kiosk/Banner.js" ></script>


<script src="js/kiosk/Kiosk.js" ></script>

</body>
</html>
