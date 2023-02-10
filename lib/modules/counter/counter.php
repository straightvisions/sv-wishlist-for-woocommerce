<?php
	namespace sv_wishlist_for_woocommerce;
	
	class counter extends modules {
		public function init() {
			$this->register_scripts();
		}
		protected function register_scripts(): counter{
			$this->get_script('wishlist-counter')
				->set_path('lib/css/styles/counter.css')
				->set_block_style(__('Wishlist Counter', 'sv_wishlist_for_woocommerce'), 'core/group')
				->set_is_enqueued();

			$this->get_script('frontend')
				->set_type('js')
				->set_path('lib/js/frontend/init.js')
				->set_is_enqueued();

			return $this;
		}
	}