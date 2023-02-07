<?php
	namespace sv_plugin_boilerplate;
	
	class example_shortcode extends modules {
		public function init() {
			$this->set_section_title( __( 'Example: Shortcode', 'sv_plugin_boilerplate' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			add_shortcode( $this->get_name(), array( $this, 'shortcode' ) );
		}
		protected function load_settings(): example_shortcode{
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
		public function shortcode( $settings = array() ): string {
			$output = '';

			$settings								= shortcode_atts(
				array(
					'example_parameter'				=> 'default value',
				),
				$settings,
				$this->get_module_name()
			);

			ob_start();
			require( $this->get_path( 'lib/tpl/frontend/shortcode.php' ) );
			$output = ob_get_clean();

			return $output;
		}
	}