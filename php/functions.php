<?php
    function set_image_name($folder, $file)
    {
        $newName = "";

        //Rename image at least once, or until the name is unique in destination folder
        do{ 
            $extension = explode(".", $file);
            $newName = rand() . "." . $extension[1];
            $folder = "../images/" . $folder ."/";
            $filePath = $folder  . $newName;
        } while (file_exists($filePath));

        return $newName;
    }
?>
