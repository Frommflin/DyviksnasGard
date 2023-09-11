<?php
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
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dng_testing";

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