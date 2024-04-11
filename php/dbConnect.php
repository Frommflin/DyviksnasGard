<?php
    require_once '../vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable("../");
    $dotenv->load();

    //--------------------------------------------------------------------------
    // Displays nicely formatted error and exits
    //--------------------------------------------------------------------------
    function err($errmsg) {
        header("HTTP/1.0 500 Internal server error:".$errmsg,true,500);
        echo $errmsg;
        exit;
    }

    //--------------------------------------------------------------------------
    // Try connecting to database, else print errormessage
    //--------------------------------------------------------------------------
    global $pdo;
    $host = $_ENV['DB_HOST'];
    $username = $_ENV['DB_USER'];
    $password = $_ENV['DB_PASSWORD'];
    $dbname = $_ENV['DB_NAME'];

    try
    {
        $pdo = new PDO("mysql:host=".$host.";dbname=".$dbname, $username, $password);
        
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $error)
    {
        err("Error!: ".$error->getMessage());
        die();
    }

?>
