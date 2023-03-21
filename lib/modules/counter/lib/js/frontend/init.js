window.addEventListener('load', function() {
	const svwfw		= new sv_wishlist_for_woocommerce();
	
	addEventListener('storage', (event) => sv_wishlist_refresh_counter('setItem', event['key'], event['newValue']) );
	sv_watchAnyObject(window.localStorage, ['setItem', 'getItem', 'removeItem'], sv_wishlist_refresh_counter);
	
	function sv_wishlist_refresh_counter(method, key, args){
		if(method !== 'setItem'){
			return;
		}
		if(key !== 'sv_wishlist_for_woocommerce'){
			return;
		}
		
		document.querySelectorAll('.wp-block-group.is-style-wishlist-counter > i.count').forEach(counter => {
			if(!counter){
				return;
			}
			
			counter.innerHTML = JSON.parse(args).length;
			
			svwfw.refresh_items_as_added();
			
			let counter_ajax	= document.getElementById('sv_wishlist_for_woocommerce_counter_ajax');
			if(counter_ajax){
				counter_ajax.remove();
			}
		});
	}
	
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
				svwfw.set_items(r.items); // sync items in local storage
				
				const success_layer			= document.createElement('div');
				success_layer.id			= 'sv_wishlist_for_woocommerce_counter_ajax';
				success_layer.innerHTML 	= r.msg;
				
				document.querySelector('body').appendChild(success_layer);
				
				svwfw.refresh_items_count();
				
				document.querySelectorAll('.sv_wishlist_for_woocommerce_counter_remove').forEach(element => {
					element.addEventListener('click', function (e) {
						svwfw.remove_item(e.target.dataset.id);
						e.target.parentElement.parentElement.remove();
					});
					
					document.querySelector('.sv_wishlist_for_woocommerce_counter_close').addEventListener('click', function (e) {
						document.getElementById('sv_wishlist_for_woocommerce_counter_ajax').remove();
					});
				});
			}).catch(r => {
				// error
				console.log(r);
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
	unmark_items_as_added(){
		document.querySelectorAll('.sv_wishlist_for_woocommerce_add_entry').forEach(element => {
			if(!element){
				return;
			}
			
			element.classList.remove('added');
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
	refresh_items_as_added(){
		this.unmark_items_as_added();
		this.mark_items_as_added();
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
	set_items(product_ids){
		window.localStorage.setItem('sv_wishlist_for_woocommerce', JSON.stringify(product_ids));
	}
}