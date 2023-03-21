<style>
	<?php
		ob_start();
		require_once($this->get_path('lib/css/common/ajax.css'));
		$css	= ob_get_clean();

		echo apply_filters('sv_wishlist_for_woocommerce_ajax_css', $css);
	?>
</style>
<div class="<?php echo $this->get_prefix('content'); ?>">
	<div class="<?php echo $this->get_prefix('close'); ?>"></div>
	<h2><?php _e('My Wishlist', 'sv_wishlist_for_woocommerce'); ?></h2>
	<div class="<?php echo $this->get_prefix('list'); ?>">
		<?php
			foreach($products as $product){
				?>
			<div class="<?php echo $this->get_prefix('entry'); ?>">
				<div class="<?php echo $this->get_prefix('image'); ?>">
					<a href="<?php echo $product->get_permalink(); ?>"><?php echo $product->get_image('thumbnail'); ?></a>
					<span class="<?php echo $this->get_prefix('remove'); ?>" data-id="<?php echo $product->get_ID(); ?>"></span>
				</div>
				<div class="<?php echo $this->get_prefix('title'); ?>"><a href="<?php echo $product->get_permalink(); ?>"><?php echo $product->get_title(); ?></a></div>
				<div class="<?php echo $this->get_prefix('price'); ?>"><?php echo $product->get_price_html(); ?></div>
				<div class="<?php echo $this->get_prefix('button'); ?>"><a href="<?php echo $product->is_type( 'variable' ) ? $product->get_permalink() : wc_get_cart_url().'?add-to-cart='.$product->get_ID().'&quantity=1'; ?>" class="single_add_to_cart_button button wp-element-button"><?php echo $product->is_type( 'variable' ) ? __('Choose Version', 'sv_wishlist_for_woocommerce') : __('Add to Cart', 'sv_wishlist_for_woocommerce'); ?></a></div>
			</div>
		<?php } ?>
	</div>
</div>