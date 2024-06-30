<?php
    include 'connnect.php';

    $id = $_GET['id'];

    $sql = "DELETE FROM pru_db WHERE id = $id";

    $result = "";

    if ($conn -> query($sql) === TRUE) {
        $result = "Deleted";
    } else {
        $result = "Cannot delete. " . $conn -> error;
    }

    echo json_encode($result);
    mysqli_close($conn);
?>