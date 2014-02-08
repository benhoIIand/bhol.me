<?php

class DbConnection {

	private $link;

	public function __construct() {
		// $this->link = new mysqli("localhost", "root", "", "shortener");
		$this->link = new mysqli("localhost", "root", "jaffa123", "url_shortener");
		if ($this->link->connect_errno) {
			die("Failed to connect to MySQL: (" . $this->link->connect_errno . ") " . $this->link->connect_error);
		}
	}

	public function select($table, 	$rows = '*', $where = array()) {

		$rows = (is_array($rows) ? implode(",", $rows) : $rows);

		$sql = 'SELECT '. $rows .' FROM '. $table;

		if(!empty($where)) {
			$i = 0;
			foreach($where as $col => $val) {
				if(!$i) {
					$sql .= ' WHERE '. $col .'="'. $val .'"';
					$i++;
				} else {
					$sql .= ' AND '. $col .'="'. $val .'"';
				}
			}
		}

		if($results = $this->link->query($sql)) {
			if($results->num_rows == 1) {
				return $results->fetch_object();
			} elseif($results->num_rows == 0) {
				di("No results were returned");
			} else {
				di("More than one result was returned");
			}
		} else {
			di("Database transaction failed. Please try again later");
		}
	}

	public function save($table, $obj) {
		$sql = 'SELECT id FROM '. $table .' WHERE id="'. $obj->id .'"';

		if($this->link->query($sql)->num_rows) {
			$this->update($table, $obj);
		} else {
			$this->insert($table, $obj);
		}
	}

	public function insert($table, $obj) {
		$sql = 'INSERT INTO '. $table .' SET';

		foreach($obj as $col => $val) {
			$vals[] = ' '. $col .'="'. $val .'"';
		}

		$sql .= implode(",", $vals);

		if($this->link->query($sql)) {
			return true;
		} else {
			di("Database transaction failed. Please try again later");
		}
	}

	public function update($table, $obj) {
		$sql = 'UPDATE '. $table .' SET';

		foreach($obj as $col => $val) {
			if($col !== 'id') {
				$vals[] = ' '. $col .'="'. $val .'"';
			}
		}

		$sql .= implode(",", $vals);
		$sql .= ' WHERE id="'. $obj->id .'"';

		if($this->link->query($sql)) {
			return true;
		} else {
			di("Database transaction failed. Please try again later");
		}
	}

}
