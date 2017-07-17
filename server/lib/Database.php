<?php

//Set The default time zone
date_default_timezone_set ("US/Pacific");

class Database {

	private static $instance; // stores the MySQL instance

	private  static $mysql_host = "pgwm.vfs.local:3306";
	private  static $mysql_user = "warehouse";
	private  static $mysql_pass = "";
	private  static $mysql_db = "warehouse_alphagator";


	private function __construct() {} // block directly instantiating
	private function __clone() { } // block cloning of the object

	public static function connection() {
		// create the instance if it does not exist
		if(!isset(self::$instance)) {
			// the MYSQL_* constants should be set to or
			//  replaced with your db connection details
			try{
				self::$instance = new PDO( 'mysql:host='.self::$mysql_host.';dbname='.self::$mysql_db.';charset=utf8mb4',
					                        self::$mysql_user,
					                        self::$mysql_pass,
					                        array(
					                            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
					                            \PDO::ATTR_PERSISTENT => false,
					                        	\PDO::ATTR_EMULATE_PREPARES => false
					                        )
		                    			);

				//die(json_encode(array('outcome' => true)));
			}
			catch(PDOException $ex){
				die(json_encode(array('outcome' => false, 'message' => 'Unable to connect', 'error' => $ex->errorInfo)));
			}
		}
		// return the instance
		return self::$instance;
	}

}

?>