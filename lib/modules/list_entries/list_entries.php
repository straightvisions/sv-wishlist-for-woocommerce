<?php
	namespace sv_baaboo_custom;

	class list_entries extends modules {
		protected $block_classes = 'wp-block-sv-wishlist-for-woocommerce-list-entries';

		public function init() {
			$this->register_scripts();
			add_action('acf/init', array($this, 'register_block'));
		}
		protected function register_scripts(): list_entries{
			$this->get_script('common')
			     ->set_path('lib/css/common/common.css')
			     ->set_is_gutenberg();

			return $this;
		}
		public function register_block() {
			if( function_exists('acf_register_block_type') ) {
				acf_register_block_type(array(
					'name'              => $this->get_prefix(),
					'title'             => __('SV Wishlist for WooCommerce - List Entries', 'sv_baaboo_custom'),
					'description'       => __('List Wishlist Entries of current user.', 'sv_baaboo_custom'),
					'render_callback'   => array($this,'output'),
					'category'          => 'straightvisions',
					'keywords'          => array( 'wishlist' ),
					'enqueue_assets'    => function(){ $this->get_script( 'common' )->set_is_enqueued(); }
				));
			}
		}
		public function output($block){
			require($this->get_path('lib/tpl/frontend/default.php'));
		}
	}