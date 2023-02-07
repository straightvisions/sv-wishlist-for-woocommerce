<?php
	namespace sv_plugin_boilerplate;
	
	class example_scripts extends modules {
		public function init() {
			$this->set_section_title( __( 'Example: Scripts', 'sv_plugin_boilerplate' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				$this->register_scripts();
			}
		}
		protected function load_settings(): example_scripts{
			$this->get_setting( 'activate' )
				->set_title( __( 'Enable Feature', 'sv100_premium' ) )
				->set_description( __( 'Description', 'sv100_premium' ) )
				->load_type( 'checkbox' );
				
			return $this;
		}
		public function is_active(): bool{
			// activate not set
			if(!$this->get_setting('activate')->get_data()){
				return false;
			}
			// activate not true
			if($this->get_setting('activate')->get_data() !== '1'){
				return false;
			}

			return true;
		}
		protected function register_scripts(): example_scripts{
			$this->get_script('common')
				->set_path('lib/css/common/common.css')
				->set_is_enqueued();

			$this->get_script('frontend')
				->set_type('js')
				->set_path('lib/js/frontend/init.js')
				->set_is_enqueued();

			return $this;
		}
	}