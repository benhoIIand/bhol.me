<?php

class User {

	public $id;
	public $link_id;
	public $ip_address;
	public $user_agent;
	public $referer;
	public $date_clicked;

	private $db;

	public function __construct($link_id = false) {
		$this->db = new DbConnection();
		if($link_id) $this->link_id = $link_id;
	}

	public function save() {
		$this->setProperties();
		$this->db->save('users', $this);
	}

	public function setProperties() {
		$this->ip_address   = $_SERVER['REMOTE_ADDR'];
		$this->user_agent   = $_SERVER['HTTP_USER_AGENT'];
		$this->referer      = $_SERVER['HTTP_REFERER'];
		$this->date_clicked = date("Y-m-d H:i:s");
	}

}