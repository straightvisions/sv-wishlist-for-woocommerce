window.addEventListener('load', function() {
	const svwfw		= new sv_wishlist_for_woocommerce();
	
	document.querySelectorAll('.sv_wishlist_for_woocommerce_add_entry').forEach(element => {
		if(!element){
			return;
		}
		
		element.addEventListener('click', function (e) {
			e.preventDefault();
			
			if(element.classList.contains('added')){
				svwfw.remove_item(this.dataset.id);
			}else{
				svwfw.add_item(this.dataset.id);
			}
		});
	});
	
	document.querySelectorAll('.is-style-wishlist-counter').forEach(element => {
		if(!element){
			return;
		}
		
		element.addEventListener('click', function (e) {
			e.preventDefault();
			
			fetch(js_sv_wishlist_for_woocommerce_counter_scripts_init.ajax_url + '?' + new URLSearchParams({action: 'sv_wishlist_get_list'}),
				{
					method: 'POST',
					body: JSON.stringify(svwfw.get_items()),
				}
			)
				.then(function (response) {
					if(!response.ok) {
						return response.json().then(r => { throw (r.msg) })
					}
					
					return response.json();
				})
				.then(function (r) {
					// update client cart counter
					window.localStorage.setItem('sv_cart_count', r.msg);
				}).catch(r => {
					console.log(r);
				//document.querySelector('.sv_baaboo_custom_wc_add_to_cart_ajax_notice').innerHTML 	= ;
			});
		});
	});
});
class sv_wishlist_for_woocommerce{
	constructor() {
		this.init_items_count();
		this.mark_items_as_added();
	}
	get_items(){
		let items	= window.localStorage.getItem('sv_wishlist_for_woocommerce');
		
		if(items === null){
			return [];
		}
		
		items		= JSON.parse(items);
		
		if(!Array.isArray(items)){
			return [];
		}
		
		return items;
	}
	get_items_count(){
		return this.get_items().length;
	}
	init_items_count(){
		document.querySelectorAll('.wp-block-group.is-style-wishlist-counter').forEach(counter => {
			if(!counter){
				return;
			}
			
			counter.insertAdjacentHTML('afterbegin', '<i class="count">'+this.get_items_count()+'</i>');
		});
	}
	refresh_items_count(){
		document.querySelectorAll('.wp-block-group.is-style-wishlist-counter > i.count').forEach(counter => {
			if(!counter){
				return;
			}
			
			counter.innerHTML = this.get_items_count();
		});
	}
	mark_items_as_added(){
		if(this.get_items_count() === 0){
			return;
		}
		
		for (let item of this.get_items()){
			this.mark_item_as_added(item);
		}
	}
	mark_item_as_added(product_id){
		document.querySelectorAll('.sv_wishlist_for_woocommerce_add_entry').forEach(element => {
			if(!element){
				return;
			}
			
			if(element.dataset.id === product_id){
				element.classList.add('added');
			}
		});
	}
	unmark_item_as_added(product_id){
		document.querySelectorAll('.sv_wishlist_for_woocommerce_add_entry').forEach(element => {
			if(!element){
				return;
			}
			
			if(element.dataset.id === product_id){
				element.classList.remove('added');
			}
		});
	}
	add_item(product_id){
		let items	= this.get_items();
		items.push(product_id);
		
		window.localStorage.setItem('sv_wishlist_for_woocommerce', JSON.stringify(items));
		this.mark_item_as_added(product_id);
		this.refresh_items_count();
	}
	remove_item(product_id){
		let items	= this.get_items().filter(e => e !== product_id);
		
		window.localStorage.setItem('sv_wishlist_for_woocommerce', JSON.stringify(items));
		this.unmark_item_as_added(product_id);
		this.refresh_items_count();
	}
}