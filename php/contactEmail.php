<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require '../vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable("../");
    $dotenv->load();

    $host = $_ENV["MAIL_HOST"];
    $user = $_ENV["MAIL_USER"];
    $password = $_ENV["MAIL_PWD"];

    $mailerName = $_POST["senderName"];
    $mailerEmail = $_POST["senderEmail"];
    $subject = $_POST["subject"];
    $targetEmail = $_POST["recipient"];
    $message = $_POST["message"];
    
    $mail = new PHPMailer();
    $mail->isSMTP(); 
    $mail->Host = $host;
    $mail->Port = 587;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true; 
    $mail->Username = $user; // SMTP username
    $mail->Password = $password; // SMTP password
    $mail->CharSet = "UTF-8";
    
    $mail->setFrom = ($user);
    $mail->addReplyTo($mailerEmail, $mailerName);
    $mail->addAddress($targetEmail); // Add a recipient
    
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = "<p>$message</p>";
    $mail->AltBody = $message;
    
    if(!$mail->send()) {
        echo "Message could not be sent.";
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message has been sent";
    }
?>
