<?php
	include('config.php');
        $db = new DB();
        
        
        //login method starts
        if($_GET['methodName'] == 'signin'){
            $data     = json_decode(file_get_contents("php://input"));
            $email    = $data->useremail;
            $password = $data->password;
            $sql = "SELECT `email`,`firstName`,`lastName`,`password` FROM `project`.`users` WHERE `users`.`email` ='".$email."'";
            
            $db_data     = $db->commonQry($sql);
            
            if(isset($db_data->email) && $db_data->email!= ''){
                $db_email    = $db_data->email;
                $db_password = $db_data->password;
                if($password == $db_password){
                    //The email and password you entered don't match. 
                    $_SESSION['uid']       = uniqid('ang_');
                    $_SESSION['email']     = $db_data->email;
                    $_SESSION['firstName'] = $db_data->firstName;
                    $_SESSION['lastName']  = $db_data->lastName;
                    echo json_encode(array('status'=>'success','msg'=>'Login successful .','session'=>$_SESSION));
                }
                else
                {
                    echo json_encode(array('status'=>'error','msg'=>'Email and password you entered don\'t match.'));
                }
            }
            else
            {
                echo json_encode(array('status'=>'error','msg'=>'Email is not registered with this site.'));
            }
        }
        
        
        //registration method starts
        if($_GET['methodName'] == 'signup'){
            $data     = json_decode(file_get_contents("php://input"));
            $email    = $data->useremail;
            
            $sql = "SELECT `email` FROM `users` WHERE `email` ='".$email."'";
            $num_rows = $db->commonQry($sql);
            //echo "<pre>";print_r($num_rows);echo "<pre>";die;
            if(count($num_rows)>=1)
            {
                echo json_encode(array('status'=>'error','msg'=>'Email already exists.'));
            }
            else
            {
                //echo "<pre>";print_r(getdate());die;
                //insert query goes here
                $sql = "INSERT INTO `project`.`users` (`userName`, `firstName`, `lastName`, `email`, `password`, `status`, `createdDate`) VALUES ('".$data->username."', '".$data->firstname."', '".$data->lastname."', '".$data->useremail."', '".$data->password."', '1', '".date("Y-m-d H:i:s")."')";
                $data = $db->commonQry($sql);
                echo json_encode(array('status'=>'success','msg'=>'User registered successfully.'));
            }
        }
?>