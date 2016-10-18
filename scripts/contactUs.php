<?php
	include('config.php');
        $db = new DB();

        if($_GET['methodName'] == 'add'){
            $data = json_decode(file_get_contents("php://input"));
            
            $sql = "INSERT INTO `project`.`contact_us` (`userName`, `email`, `phone`, `comment`, `createdDate`) VALUES ('".$data->username."', '".$data->useremail."', '".$data->phonenumber."', '".$data->comment."', '".date("Y-m-d H:i:s")."')";

            $data = $db->qryFire($sql);

            echo json_encode(array('status'=>'success','msg'=>'Thank you! Your message has been successfully sent. We will contact you very soon!'));
        }
        
        if($_GET['methodName'] == 'editData'){
            $data = json_decode(file_get_contents("php://input"));

            $sql = "UPDATE  `project`.`blogs` SET  `title` =  '".$data->title."',`description` =  '".$data->description."' WHERE  `blogs`.`id` =".$data->id."";

            $data = $db->qryFire($sql);

            echo json_encode($data);
            
        }
        if($_GET['methodName'] == 'deleteData'){
            $data = json_decode(file_get_contents("php://input"));
	
            $sql = "DELETE FROM `blogs` WHERE `id` = $data->id";

            $data = $db->qryFire($sql);

            echo json_encode($data);
            
        }
?>