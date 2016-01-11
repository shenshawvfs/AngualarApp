<?php
include '../AJAXServer.php';

class Server extends AJAXServer {
	// ========================================================================
	//
	// Login Handler
	//

	public function handleAction( $request ) {

		// The 'action' requested is named for the folder this server lives in

		$username = $request['name'];
		$passwd = $request['passwd'];

		// Authenticate with username and password


		$response["id"] = password_hash( $passwd, PASSWORD_DEFAULT );
		$response["error"] = 0;

		$data = array(
			'id'        =>$response['id'],
			'lastname'  =>$username,
			'firstname' =>"",
			'phone'     =>"555-555-5555",
			'email'     =>$username . "@vfs.com",
			'office'    =>"101",
			'title'     =>""
		);
		$userTable = UserTable();
		$userTable.create( $data );

		return $response;
	}
}

$myServer = new Server();
?>