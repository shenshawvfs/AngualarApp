<?php

//Set The default time zone
date_default_timezone_set ("US/Pacific");

class Database {

    // stores the MySQL instance
	private static $instance;

	private  static $mysql_host = "localhost:3306";

	// Edit these to match the db you created
	private  static $mysql_user = "root";
	private  static $mysql_pass = "";
	private  static $mysql_db = "risk";

	// block directly instantiating and cloning of the object, there can be only one.
	private function __construct() {}
	private function __clone() { }

	/**
	 * @name connection
	 * Establish a connection with a RDBMS instance
	 * @return PDO
	 */
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
			}
			catch(PDOException $ex){

			    // Fail pseudo gracefully
				die( json_encode( array( 'outcome' => false,
				                         'message' => 'Unable to connect',
				                         'error' => $ex->errorInfo )));

			}
		}

		// return the instance
		return self::$instance;
	}

}

?>