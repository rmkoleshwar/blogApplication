<?php
include_once("inc/facebook.php"); //include facebook SDK
######### Facebook API Configuration ##########
$appId = '913349218808968'; //Facebook App ID
$appSecret = 'bebd05d1e8ca54bd03e297aef9408762'; // Facebook App Secret
$homeurl = 'http://localhost/blogsApplication/public_html/';  //return to home
$fbPermissions = 'rushikeshkoleshwar@gmail.com';  //Required facebook permissions

//Call Facebook API
$facebook = new Facebook(array(
  'appId'  => $appId,
  'secret' => $appSecret

));
$fbuser = $facebook->getUser();
?>