<?php
    include "dbConnect.php";
    include "functions.php";

    try{
        //Array to store image file-names
        $imageArray = array();

        //looping through all incoming images
        foreach($_FILES["galleryUploads"]["name"] as $key=>$val){
            if($_FILES["galleryUploads"]["name"] != ""){

                $fileName = set_image_name("galleryUploads", $_FILES["galleryUploads"]["name"][$key]);
                $filePath = "../images/galleryUploads/" . $fileName;
                
                if(move_uploaded_file($_FILES["galleryUploads"]["tmp_name"][$key], $filePath)){
                    array_push($imageArray,$fileName);
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
