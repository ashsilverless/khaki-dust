<?php

/* ~~~~~~~~~~ File URL (with all of files tree) ~~~~~~~~~~ */

if(!defined('THEME_DIR')) {
	define('THEME_DIR', get_theme_root().'/'.get_template().'/');
}


/* ~~~~~~~~~~ File URL ~~~~~~~~~~ */

if(!defined('THEME_URL')) {
	define('THEME_URL', WP_CONTENT_URL.'/themes/'.get_template().'/');
}


/* ~~~~~~~~~~ Add options page to Wordpress with ACF ~~~~~~~~~ */

if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Khaki & Dust',
		'menu_title'	=> 'Khaki & Dust',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Home',
		'menu_title'	=> 'Home',
		'parent_slug'	=> 'theme-general-settings',
	));
}


/* ~~~~~~~~~~ Add custom Wordpress navigation ~~~~~~~~~~ */

if(function_exists('register_nav_menus')) {
	register_nav_menus(
		array(
			'main_nav' => 'Main - navigation'
		)
	);
}


/* ~~~~~~~~~~ Set one jquery version for all of plugins ~~~~~~~~~~ */

if( !is_admin()){
	wp_deregister_script('jquery');
	wp_register_script('jquery', ("https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"), false, '1.11.2');
	wp_enqueue_script('jquery');
}


/* ~~~~~~~~~~ Specific image dimensions ~~~~~~~~~~ */

add_image_size( 'image-your-safari', '585', '200', true);
add_image_size( 'image-gallery', '400', '400', true);


/* ~~~~~~~~~~ Let Wordpress use SVG files ~~~~~~~~~~ */

function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');


/* ~~~~~~~~~~ Protection for e-mail addresses in html ~~~~~~~~~~ */

//add_filter('acf/load_value', 'eae_encode_emails');


/* ~~~~~~~~~~ OG Image fix ~~~~~~~~~~ */

add_filter('wpseo_pre_analysis_post_content', 'mysite_opengraph_content');
function mysite_opengraph_content($val) {
	return preg_replace("/<img[^>]+>/i", "", $val);
}


/* ~~~~~~~~~~ Display all of posts from custom post type in top navbar ~~~~~~~~~~ */

add_filter( 'wp_get_nav_menu_items', 'cpt_archive_menu_filter', 10, 2 );

function cpt_archive_menu_filter( $items, $args ) {

	$child_items = array();
	
	$number = 1000000;
	
	$main_menu = array_filter($items, function ($item) {
	    return ($item->menu_item_parent == '0');
	});
	
	foreach($main_menu as $item_menu) {
		
		if($item_menu->post_name != "camps" && $item_menu->post_name != "activities" && $item_menu->post_name != "destinations") {
			$id = $item_menu->ID;
			
			$children = array_filter($items, function ($item) use ($id) {
			    return ($item->menu_item_parent == $id);
			});
			
			if(sizeof($children) > 0) {
				$index = findMenu($main_menu, $item_menu->ID);
				array_splice($main_menu, $index, 0, $children);
			}
			
		} else if($item_menu->post_name == "activities") {
			$args = array(
		        'post_type'   => 'activities_archive',
		        'post_status' => 'published',
		        'orderby'     => 'title',
		        'order'       => 'ASC'	
		    );
		    
		    $order = 1;
			
			remove_all_filters('posts_orderby');
			
		    $query = new WP_Query($args);
		    
		    $posts = $query->get_posts();
		    
		    if(sizeof($posts) > 0) {
			    
			    foreach ($posts as $post) {
				    $post->menu_item_parent = $item_menu->ID;
				    $post->post_type        = 'nav_menu_item';
			        $post->object           = 'custom';
			        $post->type             = 'custom';
			        $post->title            = $post->post_title;
			        $post->url              = get_permalink($post->ID);
			        $post->object_id        = $post->ID;
			    }
			    
			    $index = findMenu($main_menu, $item_menu->ID);
				array_splice($main_menu, $index, 0, $posts);
		    }
		} else if($item_menu->post_name == "destinations") {
			
			$terms = get_terms('countries');
			
			$children = array();
			
			foreach($terms as $term) {
				
		        $subitem = (object)array(
	                'ID'                => $number,
	                'db_id'             => $number,
	                'title'             => $term->name,
	                'url'               => '#',
	                'menu_item_parent'  => $item_menu->ID,
	                'type'              => '',
	                'object'            => '',
	                'object_id'         => '',
	                'classes'           => array("pt-special-dropdown")
	            );
		        
		        array_push($children, $subitem);
		        
		        $number++;
		        
		        $args = array(
			        'post_type'   => 'destinations_archive',
			        'post_status' => 'publish',
			        'orderby'     => 'title',
			        'order'       => 'ASC',
			        'tax_query' => array(
						array(
							'taxonomy' => 'countries',
							'field'    => 'slug',
							'terms'    => $term->slug,
						)
					)
			    );
			    
			    remove_all_filters('posts_orderby');
			    
			    $query = new WP_Query($args);
		    
				$posts = $query->get_posts();
				
				if(sizeof($posts) > 0) {
			    
				    foreach ($posts as $post) {
				        
				        $child_item = (object)array(
			                'ID'                => $number++,
			                'title'             => $post->post_title,
			                'url'               => get_permalink($post->ID),
			                'menu_item_parent'  => $subitem->ID,
			                'type'              => '',
			                'object'            => '',
			                'object_id'         => $post->ID,
			                'db_id'             => ''
			            );
				        
				        array_push($children, $child_item);
				    }
				    
			    }
			}
			
			$index = findMenu($main_menu, $item_menu->ID);
			array_splice($main_menu, $index, 0, $children);
			
		} else if($item_menu->post_name == "camps") {
			
			$terms = get_terms('countries');
			
			$children = array();
			
			foreach($terms as $term) {
				
		        $subitem = (object)array(
	                'ID'                => $number,
	                'db_id'             => $number,
	                'title'             => $term->name,
	                'url'               => '#',
	                'menu_item_parent'  => $item_menu->ID,
	                'type'              => '',
	                'object'            => '',
	                'object_id'         => ''
	            );
		        
		        array_push($children, $subitem);
		        
		        $number++;
		        
		        $args = array(
			        'post_type'   => 'destinations_archive',
			        'post_status' => 'publish',
			        'orderby'     => 'title',
			        'order'       => 'ASC',
			        'tax_query' => array(
						array(
							'taxonomy' => 'countries',
							'field'    => 'slug',
							'terms'    => $term->slug,
						)
					)
			    );
			    
			    remove_all_filters('posts_orderby');
			    
			    $query = new WP_Query($args);
		    
				$destinations = $query->get_posts();
				
				if(sizeof($destinations) > 0) {
			    
				    foreach ($destinations as $destination) {
				        
				        $dest_item = (object)array(
			                'ID'                => $number,
			                'db_id'             => $number,
			                'title'             => $destination->post_title,
			                'url'               => get_permalink($destination->ID),
			                'menu_item_parent'  => $subitem->ID,
			                'type'              => '',
			                'object'            => '',
			                'object_id'         => $destination->ID,
			                'classes'           => array("pt-special-dropdown")
			            );
				        
				        $args = array(
					        'post_type'   => 'camps_archive',
					        'post_status' => 'publish',
					        'orderby'     => 'title',
					        'order'       => 'ASC',
					        'meta_key'    => 'relational_destination',
							'meta_value'  => $destination->ID,
					        'tax_query'   => array(
								array(
									'taxonomy' => 'countries',
									'field'    => 'slug',
									'terms'    => $term->slug,
								)
							)
					    );
					    
					    remove_all_filters('posts_orderby');
					    
					    $query = new WP_Query($args);
				    
						$camps = $query->get_posts();
						
						if(sizeof($camps) > 0) {
							
							array_push($children, $dest_item);
				        
							$number++;
					    
						    foreach ($camps as $camp) {
							    						        
						        $child_item = (object)array(
					                'ID'                => $number++,
					                'title'             => $camp->post_title,
					                'url'               => get_permalink($camp->ID),
					                'menu_item_parent'  => $dest_item->ID,
					                'type'              => '',
					                'object'            => '',
					                'object_id'         => $camp->ID,
					                'db_id'             => ''
					            );
						        
						        array_push($children, $child_item);
						    }
						    
					    }
				    }
				    
			    }
			}
			
			$index = findMenu($main_menu, $item_menu->ID);
			array_splice($main_menu, $index, 0, $children);
			
		}
	}
	
	$menu_order = 0;
	
	foreach($main_menu as $item) {
		$item->menu_order = ++$menu_order;
	}
	
	return  $main_menu;
	
}

function findMenu($menu, $id) {
	$count = 0;
	foreach($menu AS $item){
		$count++;
		
		if($item->ID == $id){
			return $count;
		}
	}
	return $count;
}


/* ~~~~~~~~~~ Add Custom Navigation Walker ~~~~~~~~~~ */

require_once(THEME_DIR.'wp_bootstrap_navwalker.php');


/* ~~~~~~~~~~ Add featured image to page ~~~~~~~~~~ */

add_theme_support( 'post-thumbnails', array( 'post', 'destinations_archive', 'activities_archive', 'camps_archive', 'page' ) );


/* ~~~~~~~~~~ Disable ACF ~~~~~~~~~~ */

// add_filter('acf/settings/show_admin', '__return_false');


function my_acf_init() {

	acf_update_setting('google_api_key', 'AIzaSyCfmuHSVdoHt6v_T1fRxvaNYEZqH1nZIlw');
}

add_action('acf/init', 'my_acf_init');


/* ~~~~~~~~~~ The slug functions ~~~~~~~~~~ */

function the_slug($echo=true){
	$slug = basename(get_permalink());
    do_action('before_slug', $slug);
    $slug = apply_filters('slug_filter', $slug);
    if( $echo ) echo $slug;
    do_action('after_slug', $slug);
    return $slug;
}


/* ~~~~~~~~~~ Custom pagination ~~~~~~~~~~ */

function custom_pagination() {
    global $wp_query;
    $big = 999999999; // need an unlikely integer
    $pages = paginate_links( array(
            'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
            'format' => '?paged=%#%',
            'current' => max( 1, get_query_var('paged') ),
            'total' => $wp_query->max_num_pages,
            'prev_next' => false,
            'type'  => 'array',
            'prev_next'   => TRUE,
			'prev_text'    => __('<'),
			'next_text'    => __('>'),
        ) );
        if( is_array( $pages ) ) {
            $paged = ( get_query_var('paged') == 0 ) ? 1 : get_query_var('paged');
            echo '<ul class="pagination">';
            foreach ( $pages as $page ) {
                    echo "<li>$page</li>";
            }
           echo '</ul>';
        }
}


/**
* Add the images to the submenu -> the submenu items with the parent with 'pt-special-dropdown' class.
*
* @param array $items List of menu objects (WP_Post).
* @param array $args  Array of menu settings.
* @return array
*/
function add_images_to_submenu( $items ) {
	$special_menu_parent_ids = array();

	foreach ( $items as $item ) {
		if ( in_array( 'pt-special-dropdown', $item->classes, true ) && isset( $item->ID ) ) {
			$special_menu_parent_ids[] = $item->ID;
		}

		if ( in_array( $item->menu_item_parent, $special_menu_parent_ids ) && has_post_thumbnail( $item->object_id ) ) {
    			$item->title = sprintf(
				'<span>%2$s</span> %1$s ',
				get_the_post_thumbnail( $item->object_id, 'thumbnail' ),
				$item->title 
			);
		}
	}

	return $items;
}

add_filter( 'wp_nav_menu_objects', 'add_images_to_submenu' );

/**
* Remove  post type from url.
*/
add_filter('bcn_add_post_type_arg', 'my_add_post_type_arg_filt', 10, 3);
function my_add_post_type_arg_filt($add_query_arg, $type, $taxonomy)
{
    return false;
}





?>
