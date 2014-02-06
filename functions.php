<?php

function pre_r($i) {
	echo "<pre>";
	print_r($i);
	echo "</pre>";
}

function di($i) {
	pre_r($i);
	die();
}