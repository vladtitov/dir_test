<section  id="FilterPage"  data-ctr="FilterPage" class="container">

    <style>
        #FilterPage li>a:active{
            background-color: khaki;
        }


        .anim{
            -webkit-transition: 1s ease-in-out;
            -moz-transition: 1s ease-in-out;
            -o-transition: 1s ease-in-out;
            transition: 1s ease-in-out;
        }

        #FilterPage li.selected  .fa-angle-double-left{
            transform: rotate(180deg);
        }
        #FilterPage li.selected>a{
            background-color: #ebebeb;
            /* border-color: #000000;
             border-width: 1px;*/
            background-image: linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(235, 235, 235, 1) 99%, rgba(235, 235, 235, 1) 100%);
            background-image: -moz-linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(235, 235, 235, 1) 99%, rgba(235, 235, 235, 1) 100%);
            background-image: -webkit-linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(235, 235, 235, 1) 99%, rgba(235, 235, 235, 1) 100%);
            background-image: -o-linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(235, 235, 235, 1) 99%, rgba(235, 235, 235, 1) 100%);
            background-image: -ms-linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(235, 235, 235, 1) 99%, rgba(235, 235, 235, 1) 100%);

        }

        #FilterPage li.selected{/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,fcfcfc+100 */
            background: rgb(255,255,255); /* Old browsers */
            background: -moz-linear-gradient(top,  rgba(255,255,255,1) 0%, rgba(252,252,252,1) 100%); /* FF3.6+ */
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(252,252,252,1))); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(252,252,252,1) 100%); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(252,252,252,1) 100%); /* Opera 11.10+ */
            background: -ms-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(252,252,252,1) 100%); /* IE10+ */
            background: linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(252,252,252,1) 100%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#fcfcfc',GradientType=0 ); /* IE6-9 */
            background-color: #c1e2b3;
            margin-bottom: 5px;
            box-shadow: 0 3px 3px #999;
        }

        #FilterPage .list-group-item>.details{
            max-height:0;
            overflow: hidden;
            -webkit-transition: max-height 0.5s;
            -moz-transition: max-height 0.5s;
            -ms-transition: max-height 0.5s;
            -o-transition: max-height 0.5s;
            transition: max-height 0.5s;
           /* display: none;*/
        }

        #FilterPage .list-group-item.selected>.details {
          /*
            min-height: 50px;*/
           /* padding-top: 15px;*/
           max-height:400px;
           /* transition: height 1s;*/
        }

        #FilterPage li>a{
            display: block;
            /*  width: 110%;*/
            padding: 10px 15px;
            margin: -10px -15px;
            position: relative;
            background-color: inherit;

        }
        #FilterPage li>a>.fa{
            font-size: 1em;
            width: 12px;
            margin-left: -5px;
        }
        #FilterPage .more, .tmb{
            display: inline-block;

        }
        #FilterPage .tmb{
            float: right;
        }
        #FilterPage .tmb>img{
            max-height: 50px;
        }
        #FilterPage .details>.imgs{
            max-width: 100%;
            overflow-y: hidden;
            overflow-x: auto;
            height: 40px;
        }
        #FilterPage .details>.imgs img{
            max-height: 35px;
        }
        #FilterPage .details>.imgs>div{
            white-space: nowrap;
        }
        #FilterPage table{
            font-size: 0.9em;
        }
        #FilterPage .fa{
            width: 14px;
        }
        #FilterPage hr{
            margin: 0;
        }
        /*
                                #FilterPage a.selected>.details{
                                    display: block;
                                }*/

    </style>
    <!--    <div class="row">
            <div class="col-sm-12">
                <div data-id="tiFilter" >
                    <div style="position: absolute; right: 10px;">
                        <span data-id="btnClear" id="FilterPageClose" class="btn fa fa-times-circle" style="font-size: 1.5em; color: #bbbbbb"></span>
                    </div>

                    <input type="text" data-id="filter" class="form-control">
                </div>
            </div>

        </div>-->



        <div class="row">
           <div class="hr"></div>
            <div class="title">
                <span class="fa fa-angle-left"></span>
                <span data-id="catTitle"></span>
                <span class="pull-right">Unit</span>
            </div>
            <div class="hr"></div>
        </div>
    <div class="row space">

    </div>

    <div class="row">

        <div >
            <nav data-id="list" class="list-group">

            </nav>

        </div>

    </div>



</section>