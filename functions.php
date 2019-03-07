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

add_filter( 'wp_get_nav_menu_items', 'cpt_archive_menu_filter', 10, 3 );
function cpt_archive_menu_filter( $items, $menu, $args ) {
	/* alter the URL for cpt-archive objects */

	$menu_order = count($items); /* Offset menu order */

	$child_items = array();
	foreach ( $items as &$item ) {
	    if ( $item->title != '##activities##' && $item->title != '##destinations##' && $item->title != '##camps##') continue;

		if($item->title == '##activities##') {
			$item->url = get_post_type_archive_link('activities_archive');
		    $item->title = 'Activities';

		    foreach ( get_posts( 'post_type=activities_archive&numberposts=-1' ) as $post ) {
		        $post->menu_item_parent = $item->ID;
		        $post->post_type = 'nav_menu_item';
		        $post->object = 'custom';
		        $post->type = 'custom';
		        $post->menu_order = ++$menu_order;
		        $post->title = $post->post_title;
		        $post->url = get_permalink( $post->ID );
		        /* add children */
		        $child_items []= $post;
		    }
		} elseif ($item->title == '##destinations##') {
			$item->url = get_post_type_archive_link('destinations_archive');
		    $item->title = 'Destinations';

		    foreach ( get_posts( 'post_type=destinations_archive&numberposts=-1' ) as $post ) {
		        $post->menu_item_parent = $item->ID;
		        $post->post_type = 'nav_menu_item';
		        $post->object = 'custom';
		        $post->type = 'custom';
		        $post->menu_order = ++$menu_order;
		        $post->title = $post->post_title;
		        $post->url = get_permalink( $post->ID );
		        /* add children */
		        $child_items []= $post;
		    }
		} else {
			$item->url = get_post_type_archive_link('camps_archive');
		    $item->title = 'Camps';

		    foreach ( get_posts( 'post_type=camps_archive&numberposts=-1' ) as $post ) {
		        $post->menu_item_parent = $item->ID;
		        $post->post_type = 'nav_menu_item';
		        $post->object = 'custom';
		        $post->type = 'custom';
		        $post->menu_order = ++$menu_order;
		        $post->title = $post->post_title;
		        $post->url = get_permalink( $post->ID );
		        /* add children */
		        $child_items []= $post;
		    }
		}

	}
	return array_merge( $items, $child_items );
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

?>
