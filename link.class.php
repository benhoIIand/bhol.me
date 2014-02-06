<?php

class Link {

	public $id;
	public $link_id;
	public $url;
	public $count;
	public $date_created;

	private $db;

	public function __construct($link_id = false) {
		$this->db = new DbConnection();
		if($link_id) $this->read($link_id);
	}

	public function read($link_id) {
		$this->link_id = $link_id;
		$this->getLink($this->link_id);
	}

	public function save() {
		$this->db->save('urls', $this);
	}

	public function getLink($link_id) {
		$details = $this->db->select('urls', '*', array('link_id' => $link_id));
		$this->setProperties($details);
	}

	private function setProperties($link) {
		$this->id           = $link->id;
		$this->link_id      = $link->link_id;
		$this->url          = $link->url;
		$this->count        = $link->count;
		$this->date_created = $link->date_created;
	}
}