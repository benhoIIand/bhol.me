<?php

if(!isset($_GET['link_id'])) {
	die("no link was given");
}

require_once('functions.php');
require_once('database.class.php');

require_once('link.class.php');
require_once('user.class.php');

$link_id = $_GET['link_id'];

$link = new Link($link_id);
$link->count++;
$link->save();

$user = new User($link_id);
$user->save();

$url = $link->url;

header("HTTP/1.1 301 Moved Permanently");
header("Location: ". $url);
exit();