<?php
	namespace sv_wishlist_for_woocommerce;
	
	class counter extends modules {
		public function init() {
			$this->register_scripts();

			add_action('wp_ajax_sv_wishlist_get_list', array($this, 'ajax'));
			add_action('wp_ajax_nopriv_sv_wishlist_get_list', array($this, 'ajax'));
		}
		protected function register_scripts(): counter{
			$this->get_script('wishlist-counter')
				->set_path('lib/css/styles/counter.css')
				->set_block_style(__('Wishlist Counter', 'sv_wishlist_for_woocommerce'), 'core/group')
				->set_is_enqueued();

			$this->get_script('init')
				->set_type('js')
				->set_path('lib/js/frontend/init.js')
				->set_localized(array(
					'ajax_url'         => admin_url( 'admin-ajax.php' )
				))
				->set_is_enqueued()
				->set_deps(array($this->get_active_core()->get_script('object_watcher_js')->get_handle()));;

			$this->lib_enqueue('object_watcher');

			return $this;
		}
		public function ajax(){
			$input  = file_get_contents('php://input');

			if(strlen($input) === 0){
				$this->send_response(array(
					'status'    => 'error',
					'msg'       => __('No Items', 'sv_baaboo_custom')
				));
			}

			$items  = json_decode($input);

			if(!$items || count($items) === 0){
				$this->send_response(array(
					'status'    => 'error',
					'msg'       => __('No Items', 'sv_baaboo_custom')
				));
			}

			$args       = array(
				'include'          => $items,
				'post_type'         => 'product', // prevent queries for other post types
				'posts_per_page'    => 50, // limit max entries to prevent abuse of this query
			);

			$products   = wc_get_products($args);

			if(!$products || count($products) === 0){
				$this->send_response(array(
					'status'    => 'error',
					'msg'       => __('No Items found', 'sv_baaboo_custom')
				));
			}

			ob_start();
			require_once($this->get_path('lib/tpl/frontend/init.php'));
			$output     = ob_get_clean();

			array_walk($products, function(&$value){ $value = strval($value->get_ID()); });

			$this->send_response(array(
				'status'    => 'success',
				'msg'       => $output,
				'items'     => $products
			), 200);
		}
		public function send_response(array $response, $status_code = 500){
			wp_send_json($response, $status_code);
		}
	}