<?php
    include 'connect.php';

    $_POST = json_decode(file_get_contents("php://input"), true);

    $name = addcslashes(htmlentities($_POST['name']));

    if ($_POST === null) {
        $result = "";
    }
    else {
        $sql = $conn -> query("INSERT INTO pru_db VALUES ('', 'name')");
    }

    if ($sql === TRUE) {
        $result = "Succeed";
    } else {
        $result = "Error: " . sql . "<br/>" . $conn -> error;
    }

    echo json_encode($result);

    $conn -> close();
?>