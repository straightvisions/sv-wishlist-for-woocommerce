<?php
	namespace sv_wishlist_for_woocommerce;
	
	class add_entry extends modules {
		public function init() {
			$this->register_scripts();

			add_filter( 'render_block', array($this, 'render_block'), 10, 2 );
			add_filter( 'woocommerce_blocks_product_grid_item_html', array($this, 'woocommerce_blocks_product_grid_item_html'), 10, 3);
		}
		protected function register_scripts(): add_entry{
			$this->get_script('add_entry')
				->set_path('lib/css/common/common.css')
				->set_is_enqueued();

			return $this;
		}
		public function render_block( $block_content, $block ) {
			if(is_admin()){
				return $block_content;
			}

			if(wp_is_json_request()){
				return $block_content;
			}

			if ($block['blockName'] !== 'woocommerce/product-image'){
				return $block_content;
			}

			global $post;

			if(!$post){
				return $block_content;
			}

			$product    = wc_get_product($post);

			return $this->get_output($block_content, $product);
		}
		public function woocommerce_blocks_product_grid_item_html($block_content, $data, $product){
			return $this->get_output($block_content, $product);
		}
		public function get_output($block_content, $product){
			if(!$product){
				return $block_content;
			}

			$add_entry = '<span class="'.$this->get_prefix().'" data-id="'.$product->get_ID().'"></span>';

			return str_replace('<img', $add_entry.'<img', $block_content);
		}
	}