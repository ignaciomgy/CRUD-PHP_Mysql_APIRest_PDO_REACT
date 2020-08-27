<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') 
{
    if (isset($_GET['id']))
    {
        $query = "SELECT * FROM movies WHERE id=".$_GET['id'];
        $result = metGet($query);
        echo json_encode($result->fetch(PDO::FETCH_ASSOC));

    }
    else
    {        
        $query = "SELECT * FROM movies";
        $result = metGet($query);
        echo json_encode($result->fetchALL());
    }
    //header("HTTP/1.1 200 OK");
    exit();
}

if (isset($_POST)) {

    if ($_POST['METHOD'] == 'POST') 
    {
        $name = $_POST['name'];
        $year = $_POST['year'];
        $director = $_POST['director'];

        $query = "INSERT INTO movies (name, year, director) VALUES ('$name', '$year', '$director')";
        $query_ai = "SELECT MAX(id) as id FROM movies";
        $result = metPost($query, $query_ai);
        echo json_encode($result);

        header("HTTP/1.1 200OK");
        exit();

    }


    if ($_POST['METHOD'] == 'PUT') 
    {
        unset($_POST['METHOD']);

        $id=$_GET['id'];

        $name = $_POST['name'];
        $year = $_POST['year'];
        $director = $_POST['director'];

        $query = "UPDATE movies set name='$name', year='$year', director='$director'";
        
        $result = metPut($query, $query_ai);
        echo json_encode($result);

        header("HTTP/1.1 200OK");
        exit();

    }


    if ($_POST['METHOD'] == 'DELETE') 
    {
        unset($_POST['METHOD']);
        $id=$_GET['id'];
        $query = "DELETE FROM movies WHERE id='$id'";
        $result = metDelete($query);
        echo json_encode($result);

        header("HTTP/1.1 200OK");
        exit();
    }
}

header("HTTP/1.1 400 Bad Request");


?>