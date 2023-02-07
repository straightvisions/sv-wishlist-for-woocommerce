window.addEventListener('load', function() {
	const svwfw		= new sv_wishlist_for_woocommerce();
	
	document.querySelectorAll('.sv_wishlist_for_woocommerce_counter').forEach(counter => {
		if(!counter){
			return;
		}
		
		console.log(svwfw.get_items());
		
		/*
		if(e.target.classList.contains('wp-block-navigation__responsive-container-open')){
			return;
		}
		if(e.target.classList.contains('wp-block-navigation__responsive-container-close')){
			return;
		}
		if (!menuContainer.contains(e.target)) {
			document.querySelector('html').classList.remove('has-modal-open');
			menuContainer.classList.remove('is-menu-open', 'has-modal-open');
		}*/
	});
});
class sv_wishlist_for_woocommerce{
	constructor() {
	
	}
	get_items(){
		if(window.localStorage.getItem('sv_wishlist_for_woocommerce') !== null){
			return window.localStorage.getItem('sv_wishlist_for_woocommerce');
		}
		
		return [];
	}
	get_items_count(){
		return sv_wishlist_for_woocommerce_get_items().length;
	}
}