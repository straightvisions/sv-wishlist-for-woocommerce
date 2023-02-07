<?php
	namespace sv_plugin_boilerplate;
	
	class modules extends init {
		public function init() {
			$this->load_module('example_shortcode');
			$this->load_module('example_scripts');
		}
	}