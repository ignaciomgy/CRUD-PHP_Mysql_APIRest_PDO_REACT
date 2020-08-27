<?php
$pdo = null;
$host = "localhost";
$user = "root";
$password = "";
$db = "moviecenter";


function conectar(){
    try {
        $GLOBALS['pdo'] = new PDO("mysql:host=".$GLOBALS['host']."; dbname=".$GLOBALS['db']."",$GLOBALS['user'],$GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOExcption $e) {
        print "Error al conectar con la base".$bd."<br>";
        print $e;
        die();
    }
}

function desconectar() {
    $GLOBALS['pdo'] = null;
}


//definicion metodos CRUD
function metGet($query) {
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp-> setFetchMode(PDO::FETCH_ASSOC);
        $stmp->execute();
        desconectar();
        return $stmp;

    } catch (Exception $e) {
        print "error".$e;
    }
}



function metPost($query, $idAI) {
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp->execute();
        $i_ai = metGet($idAI)->fetch(PDO::FETCH_ASSOC);
        $result = array_merge($i_ai, $_POST);
        $stmp->closeCursor();
        desconectar();
        return $result;

    } catch (Exception $e) {
        print "error".$e;
    }
}

//el metodo put realiza un merge con el get y post ya que lo que viene sera por url
function metPut($query) { 
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp->execute();
        $result = array_merge($_GET, $_POST);
        $stmp->closeCursor();
        desconectar();
        return $result;

    } catch (Exception $e) {
        print "error".$e;
    }
}

function metDelete($query) {
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp->execute();
        $stmp->closeCursor();
        desconectar();
        return $_GET['id'];
    } catch (Exception $e) {
        print "error".$e;
    }
}




?>