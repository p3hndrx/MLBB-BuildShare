<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

// Requires php5
define('UPLOAD_DIR', 'export/');
$img = $_POST['imgBase64'];
$name = $_POST['name'];
$reference = $_POST['ref'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . $name . '.png';
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';

// write log
$log = UPLOAD_DIR  . 'bs.log';
if (strpos(file_get_contents($log), $name) == false)
{
        $txt = $name . "," . $reference
        $myfile = file_put_contents($log, $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
 }


?>