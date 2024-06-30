<?php
    include 'connnect.php';

    $_POST = json_decode(file_get_contents("php://input"), true);

    $id = $_POST['id'];
    $name = $_POST['name'];

    $result = '';

    $sql = $conn -> query("UPDATE pru_db SET name = '$name'
                                            WHERE id = $id");

    if (mysqli_query($conn, $sql)) {
        $result = "Updated";
    } else {
        $result = "Cannot update " . mysql_error($conn);
    }

    echo json_encode($result);
    mysqli_close($conn);
?>