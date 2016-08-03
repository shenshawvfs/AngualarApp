<?php
include_once 'Database.php';

// Adapt to your Table
class UsersTable {

	private $db = null;
	
	function __construct() {
		
		$this->db = Database::connection();
		
	}
	
	function create( $data ){

	    $params = $this->setParams( $data );
		$sql = $this->db->prepare("INSERT INTO users(id, nickname) VALUES ( :id, :nickname)");
		$result = $sql->execute( $params );
		if(!$result) {
			return $db->errorCode();
		}

		return true;
	}


	function readByNickname( $nickname ){

		//$db = Database::connection();
		$sql = $this->db->prepare("SELECT * FROM users u WHERE u.nickname LIKE '%".trim($nickname)."%'");
		$sql->execute();
	
		// Fetch the rows.  Result will be an array of objects (PHP Data Objects[PDO])
		$result = $sql->fetchAll(\PDO::FETCH_OBJ);
		if (!isset( $result[0]->id ))
			$result = null;
		
		return $result;
	}


	function readByID( $id ){

		//$db = Database::connection();
		$sql = $this->db->prepare("SELECT * FROM users u where u.id=".$id);
		$sql->execute();

		$result[0] = $sql->fetch(\PDO::FETCH_OBJ);
		if (!isset( $result[0]->id ))
		    $result[0] = "No id found";

		return $result[0];
	}

	function update( $data ){

		$params = $this->setParams( $data );
	    //$db = Database::connection();
		$sql = $this->db->prepare('UPDATE users
		                           SET id = :id,
		                               nickname = :nickname
				                   WHERE id = :id');

		$result = $sql->execute( $params );
		if (!$result) {
			return $sql->errorCode();
		}
		
		return true;

	}

	private function setParams( $data ) {

	    $params = array(
            ':id'        =>$data['id'],
            ':nickname'  =>$data['nickname']
	    );
	    return $params;
	}

}


?>