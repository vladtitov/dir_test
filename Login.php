<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directories Login</title>
    <script type="text/javascript" src="js/libs/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="js/libs/require.js"></script>

    <style>
        #loginForm{
            width: 350px;
            height: 280px;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }

        #Message{
            position: absolute;
            bottom: 20px;
            padding: 5px;
            background-color: #faebcc;
            border-radius: 5px;
            box-shadow: 5px 5px 5px gray;
        }



    </style>
    <script>
        $(document).ready(function(){
            require(['js/Utils'],function(){
                require(['js/Forms'],function(){
                    var login = new uplight.LoginForm($('#loginForm'),'login,login','AdminLogin');
                    console.log(login);
                    login.init();


                })
            })

        })

    </script>

    <link href="js/libs/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="js/libs/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="row">

        <div id="loginForm" class="panel panel-default">
            <a style="font-size: x-small"  title="Forget username or password" class="btn pull-right" href="RestoreUser">Forget username/password</a>
            <div class="panel-body">
                <div style="position: relative">
                    <div id="Message" class="hidden" data-id="message">

                    </div>
                </div>
                <form class="form">
                    <div class="form-group">
                        <label for="user">Username</label>
                        <input type="text" class="form-control" name="username" id="user">
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" name="password" id="pwd">
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" data-id="chkPass" name="showpassword"> Show password</label>
                    </div>
                    <hr/>
                    <button type="submit" class="btn btn-primary pull-right">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>