<?php
	namespace sv_wishlist_for_woocommerce;
	
	class modules extends init {
		public function init() {
			$this->load_module('counter');
			$this->load_module('add_entry');
		}
	}