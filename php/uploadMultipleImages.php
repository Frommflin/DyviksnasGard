<?php
    include "dbConnect.php";

    try{
        //Array to store image file-names
        $imageArray = array();

        //looping through all incoming images
        foreach($_FILES["galleryUploads"]["name"] as $key=>$val){
            if($_FILES["galleryUploads"]["name"] != ""){
                $extension = explode(".", $_FILES["galleryUploads"]["name"][$key]);
                $newName = rand() . "." . $extension[1];
                $destination = "../images/galleryUploads/" . $newName;
                if(move_uploaded_file($_FILES["galleryUploads"]["tmp_name"][$key], $destination)){
                    array_push($imageArray,$newName);
                };
            }
        }
        echo json_encode($imageArray);
    } 
    catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>