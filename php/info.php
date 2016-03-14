<?php
//  Show all information, defaults to INFO_ALL
phpinfo();

// Show just the module information.
// phpinfo(8) yields identical results.
phpinfo(INFO_MODULES);

// This is in the PHP file and sends a Javascript alert to the client

if(isset($_POST['email'])) {
	$email = $_POST['email'];
}else{
	$email = "NOT SET!";
}

echo "<script type='text/javascript'>alert('$email');</script>";

?>