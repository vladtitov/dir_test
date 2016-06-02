<?
define('DATA','../../data/');
 include 'cl/Destinations.php';
      $ctr=new Destinations();
		$res = $ctr->getAllDests();
		echo json_encode($res);
		;
			
		
		//include 'cl/Statistics.php';
       // $ctr=new Statistics();
		//$ctr->moveStatistics();
		//sleep(10);
		//$ctr->createNewDatabase();
?>