<?php

include_once 'Database.php';

// Adapt to your Table
class DatabaseTable {

	function create( $data ){

		$db = Database::connection();

		$params = array(
            ':name'           =>$data['name'],
		    ':wholesale_price'=>$data['wholesale_price'],
		    ':retail_price'   =>$data['retail_price'],
		    ':quantity'       =>$data['quantity'],
		    ':box_id'         =>$data['box_id'],
		    ':id'             =>$data['id']
		);

		$sql = $db->prepare("INSERT INTO products(id, name, wholesale_price, retail_price, quantity, box_id)
		  			              VALUES ( NULL, :name, :wholesale_price, :retail_price, :quantity, :box_id)");
		if(!$db->execute( $params ))
		{
			return $sql->errorCode();
		}

		return true;

	}


	function update($data){

		$db = Database::connection();

		$params = array(
            ':name'           =>$data['name'],
		    ':wholesale_price'=>$data['wholesale_price'],
		    ':retail_price'   =>$data['retail_price'],
		    ':quantity'       =>$data['quantity'],
		    ':box_id'         =>$data['box_id'],
		    ':id'             =>$data['id']
		);
		$sql = $db->prepare('UPDATE databasetable
		                     SET name = :name,
	                             wholesale_price = :wholesale_price,
		                         retail_price = :retail_price,
					             quantity = :quantity,
		                         box_id = :box_id
						     WHERE id= :id');

		if (!$sql->execute( $params )) {

			return $sql->errorCode();
		}

		return true;

	}

	function readProductByName($name){

        $db = Database::connection();
		$handler = $db->prepare("SELECT * FROM products p where p.name LIKE '%".trim($name)."%'");

		$sql->execute();

		$result = $sql->fetchAll(\PDO::FETCH_OBJ);

		if(empty($result)) $result[]["name"] = "No product found";

		return $result;

	}

	function readProductByID($id){

        $db = Database::connection();
		$handler = $db->prepare("SELECT * FROM products p where p.id=".$id );

		$sql->execute();

		$row = $sql->fetch(\PDO::FETCH_OBJ);

		if (!isset( $row->id )) $row = "No product found";

		return $row;
	}
}
?>
