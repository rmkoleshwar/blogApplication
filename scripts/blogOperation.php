<?php
	include('config.php');
        $db = new DB();
        
        
        if($_GET['methodName'] == 'blogList'){

            $data = $db->qryFire();

            echo json_encode($data);
                    
        }
        
        if($_GET['methodName'] == 'addData'){
            $data = json_decode(file_get_contents("php://input"));

            $sql = "INSERT INTO `blogs`(`title`,`description`,`status`,`addedDate`)VALUES('$data->title','$data->description','0','".date("Y-m-d H:i:s")."')";

            $data = $db->qryFire($sql);

            echo json_encode($data);
            
        }
        
        if($_GET['methodName'] == 'editData'){
            $data = json_decode(file_get_contents("php://input"));

            $sql = "UPDATE  `project`.`blogs` SET  `title` =  '".$data->title."',`description` =  '".$data->description."',`updatedDate` = '".date("Y-m-d H:i:s")."' WHERE  `blogs`.`id` =".$data->id."";

            $data = $db->qryFire($sql);

            echo json_encode($data);
            
        }
        
        if($_GET['methodName'] == 'deleteData'){
            $data = json_decode(file_get_contents("php://input"));
	
            $sql = "DELETE FROM `blogs` WHERE `id` = $data->id";

            $data = $db->qryFire($sql);

            echo json_encode($data);
            
        }
        
        if($_GET['methodName'] == 'changeStatus'){
            $data = json_decode(file_get_contents("php://input"));

            $sql = "UPDATE  `project`.`blogs` SET  `status` =  '".$data->status."' WHERE  `blogs`.`id` =".$data->id."";

            $data = $db->qryFire($sql);

            echo json_encode($data);
            
        }
?>