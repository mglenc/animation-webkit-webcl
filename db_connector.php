<?php
require_once("./config.inc.php");

$link = mysql_connect($config['db_host'], $config['db_user'], $config['db_pass']);

if(!$link) {
	print("Nie mozna polaczyc z baza danych: " . mysql_error());
}

$db_selected = mysql_select_db($config['db_name'], $link);

if(!$db_selected) {
	die("Nie mozna ustawic bazy danych: " . mysql_error());
}

$mode = $_GET['mode'];

switch ($mode) {
	case '1':
		//exporting to database
		$xml = $_POST['xml'];
		$frames = $_POST['frames'];
		$name = $_POST['name'];
		
		$result = mysql_query("INSERT INTO task(name, scene_description, total_frames, done_frames, subtask_width, subtask_height, status, created_at, modified_at) VALUES ('" . $name . "', '" . $xml . "', '" . $frames . "', '0', '100', '100', '0', NOW(), NOW());");
		
		if($result != FALSE) {
			print(mysql_insert_id() + " Dodano zadanie do bazy danych!\n");
		} else {
			die("Blad bazy danych!");
		}
		break;
	case '2':
		//getting scenes list
		$result = mysql_query("SELECT id, name, total_frames, done_frames, status, created_at FROM task");
		
		if($result == FALSE)  {
			die("Blad bazy danych!");
		}
		
		$responce->records = mysql_num_rows($result);
		$responce->total = "1";
		$responce->page = "1";
		
		//$responce->userdata = "";
		
		$i = 0;
		while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			//$responce->rows[$i]['id'] = $row['id'];
			$responce->rows[$i]['id'] = $row['id'];
			$responce->rows[$i]['name'] = $row['name'];
			$responce->rows[$i]['total_frames'] = $row['total_frames'];
			$responce->rows[$i]['done_frames'] = $row['done_frames'];
			$responce->rows[$i]['status'] = $row['status'];
			$responce->rows[$i]['created_at'] = $row['created_at'];
			$i++;
		}
		
		echo json_encode($responce);
		break;
	case '3':
		//getting scene_description
		$id = $_POST['id'];
		
		$result = mysql_query("SELECT scene_description FROM task WHERE id='" . $id . "' LIMIT 1");
		
		if($result == FALSE) {
			die("Blad bazy danych!");
		}
		
		$row = mysql_fetch_row($result);
		$desc = $row[0];
		
		echo $desc;
		break;
	case '4':
		$id = $_POST['id'];
		
		$result = mysql_query("SELECT done_frames FROM task WHERE id='" . $id  . "' LIMIT 1");
		
		if($result == FALSE) {
			die("Blad bazy danych!");
		}
		
		$row = mysql_fetch_row($result);
		$progress = $row[0];
		
		echo $progress;
		break;
	case '5':
		//downloading animation
		$id = $_GET['id'];
		
		$result = mysql_query("SELECT video FROM data WHERE task_id='" . $id  . "' LIMIT 1");
		
		if($result == FALSE) {
			die("Blad bazy danych!");
		}
		
		$row = mysql_fetch_row($result);
		$anim = $row[0];
		
		header("Content-Length: ".strlen($anim) . "\n");
		//header("Content-Type: application/octet-stream");
		header("Content-Type: video/avi");
		
		echo $anim;
      	
		break;
}
mysql_close($link);
?>
