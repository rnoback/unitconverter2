<?php

    $errors = array();  // array to hold validation errors
    $data = array();        // array to pass back data

    // validate the variables ========
    if (empty($_POST['name']))
      $errors['name'] = 'Name is required.';

    if (empty($_POST['email']))
      $errors['email'] = 'Email is required.';

    if (empty($_POST['comments']))
      $errors['comments'] = 'No comment.';

    // return a response ==============

    // response if there are errors
    if ( ! empty($errors)) {

      // if there are items in our errors array, return those errors
      $data['success'] = false;
      $data['errors']  = $errors;
    } else {

      // if there are no errors, return a message
      $data['success'] = true;
      $data['message'] = 'Success!';
    }

    // return all our data to an AJAX call
    echo json_encode($data);

    $email_to = 'noback@xs4all.nl';
    $email_subject = 'Comment From Unit Converter App';
    //$email_message = htmlentities($_POST['result'], ENT_COMPAT, "UTF-8");
    $email_message = $_POST['comments'];     
    $email_from = $_POST['email'];
 
    // create email headers
     
    $headers = 'From: '.$email_from."\r\n".
     
    'Reply-To: '.$email_from."\r\n" .
     
    'X-Mailer: PHP/' . phpversion();

    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-Transfer-Encoding: 8bit\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\n";
 
    @mail($email_to, $email_subject, $email_message, $headers);  

?>