<?php
include '../AJAXServer.php';
include '../UsersTable.php';

class Server extends AJAXServer {
	// ========================================================================
	//
	// Registration Handler
	//

	public function handleAction( $request ) {

		// The 'action' requested is named for the folder this server lives in

		$username = $request['name'];
		$passwd = $request['passwd'];

		// Authenticate with username and password
		$data['pass_hash'] = password_hash( $passwd, PASSWORD_DEFAULT );
		$data['id'] = -1;
		$data['lastname'] = "";
		$data['firstname'] = "";
		$data['phone'] = "5555555555";
		$data['email'] = $username;
		$data['office'] = "unknown";
		$data['title'] = "";

		$dbTable = UsersTable();
		if ($dbTable.create( $data )) {
		    // true result means creation was OK.
		    $response["id"] = $data['pass_hash'];
		    $response["error"] = 0;
		}

		return $response;
	}
}

$myServer = new Server();
?>