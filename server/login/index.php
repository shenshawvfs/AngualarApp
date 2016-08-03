<?php
include '../AJAXServer.php';
include '../UsersTable.php';

class Server extends AJAXServer {
	// ========================================================================
	//
	// Login Handler
	//

	public function handleAction( $request ) {

		// The 'action' requested is named for the folder this server lives in

		$username = $request['nickname'];

		$response['id'] = 0; // User zero by default, will be updated.
		$response['nickname'] = "unknown";
		$response['error'] = 1;

		$userTable = new UsersTable();

		// First try and see if this user exists (by nickname) 
		$result = $userTable->readByNickname( $username );
		if (empty( $result )) {
		
			// If they don't exist, create them.		
			$data = array(
				'id'        =>$response['id'],
				'nickname'  =>$username
			);
		
			if ($userTable->create( $data )) {
				
				$response['nickname'] = $username;	
				$response['error'] = 0;			
			}
			
		} else {
			
			$response['id'] = $result[0]->id;
			$response['nickname'] = $result[0]->nickname;
			$response['error'] = 0;				
		}
		
		return $response;
	}
}

$myServer = new Server();
?>