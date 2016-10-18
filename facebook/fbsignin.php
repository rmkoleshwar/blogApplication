<?php
include_once("config.php");
include_once("includes/functions.php");

if(!$fbuser){
    //echo "<pre>";print_r($fbuser);die('in ! = condition');
    $fbuser = null;
    $url = $facebook->getLoginUrl(array('redirect_uri'=>$homeurl,'scope'=>$fbPermissions));
    
    $urloutput=file_get_contents($url);
//    echo "<pre>";print_r($url);die('in ! = condition');
    //echo $urloutput; //should print "N,-1,Cart id must be provided"  
    //echo json_encode(array('status'=>'success','msg'=>'Login successful.','session'=>$_SESSION));
    
}
else
{
    //echo "<pre>";die('dfsf');
    $user_profile = $facebook->api('/me?fields=id,first_name,last_name,email,gender,locale,picture');
	$user = new Users();
	$user_data = $user->checkUser('facebook',$user_profile['id'],$user_profile['first_name'],$user_profile['last_name'],$user_profile['email'],$user_profile['gender'],$user_profile['locale'],$user_profile['picture']['data']['url']);
        echo json_encode(array('status'=>'success','msg'=>'Login successful.','session'=>$_SESSION));
//	if(!empty($user_data)){
//		$output = '<h1>Facebook Profile Details </h1>';
//		$output .= '<img src="'.$user_data['picture'].'">';
//        $output .= '<br/>Facebook ID : ' . $user_data['oauth_uid'];
//        $output .= '<br/>Name : ' . $user_data['firstName'].' '.$user_data['lastName'];
//        $output .= '<br/>Email : ' . $user_data['email'];
//        $output .= '<br/>Gender : ' . $user_data['gender'];
//        $output .= '<br/>Locale : ' . $user_data['locale'];
//        $output .= '<br/>You are login with : Facebook';
//        $output .= '<br/>Logout from <a href="logout.php?logout">Facebook</a>'; 
//	}else{
//		$output = '<h3 style="color:red">Some problem occurred, please try again.</h3>';
//	}
    
}

?>
