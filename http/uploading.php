<?php
if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
   $imageData = $GLOBALS['HTTP_RAW_POST_DATA'];

   $curl = curl_init();
   curl_setopt($curl, CURLOPT_URL, "http://155.138.208.114/buildshare/upload.php" );
   curl_setopt($curl, CURLOPT_TIMEOUT, 30);
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1 );
   curl_setopt($curl, CURLOPT_POST,           1 );
   curl_setopt($curl, CURLOPT_POSTFIELDS, $imageData);
   curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
   $result=curl_exec ($curl);
   echo $result;
   curl_close ($curl);
?>