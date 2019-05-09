<?php get_header(); ?>

<section class="intro-section" data-stellar-background-ratio="0.2" data-stellar-horizontal-offset="50"
     data-stellar-vertical-offset="50">
	<div class="vertical-center">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<h1 class="intro-section__title"><?php the_field('homepage_intro_title', 'option'); ?></h1><!-- /.intro-section__title -->
					<p class="intro-section__content"><?php the_field('homepage_intro_description', 'option'); ?></p><!-- /.intro-section__content -->
					<a href="#destinations" class="khaki-dust-button khaki-dust-button__outline khaki-dust-button__outline--white page-scroll">Destinations</a>
					<a href="#activities" class="khaki-dust-button khaki-dust-button__outline khaki-dust-button__outline--white page-scroll">Activities</a>
				</div><!-- /.col-xs-12 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div><!-- /.vertical-center -->
    <div class="clearfix"></div><!-- /.clearfix -->
	<a href="#who-we-are" class="intro-section__next-section page-scroll"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-arrow--right.svg" alt="Next section" /></a>
</section><!-- /.intro-section -->

<main class="homepage">

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <section id="who-we-are" class="who-we-are section-paddings--both text-center">
        			<div class="row">
        				<div class="col-xs-12">
        					<div class="circled-social-icons circled-social-icons--soft-grey">
        						<?php get_template_part('part', 'socials'); ?>
        					</div><!-- /.circled-social-icons circled-social-icons--soft-grey -->
        					<h2 class="who-we-are__title"><?php the_field('homepage_who_we_are_title', 'option'); ?></h2><!-- /.who-we-are__title -->
        				</div><!-- /.col-xs-12 -->
        			</div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <div class="who-we-are__content"><?php the_field('homepage_who_we_are_content', 'option'); ?></div><!-- /.who-we-are__content -->
        					<a href="<?php the_field('homepage_who_we_are_read_more_button', 'option'); ?>" class="khaki-dust-button khaki-dust-button__flat khaki-dust-button__flat--green animsition-link">Read more</a>
                        </div><!-- /.col-md-8 col-md-offset-2 -->
                    </div><!-- /.row -->
            	</section><!-- /.who-we-are section-paddings--both text-center -->


                <?php $destinations_countries_terms = get_terms( 'countries' ); ?>
                <?php $term_row = 0; ?>

                <?php foreach ( $destinations_countries_terms as $destinations_countries_term ): ?>
                    <?php
                        $loop = new WP_Query( array(
                            'post_type' => 'destinations_archive',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'countries',
                                    'field' => 'slug',
                                    'terms' => array( $destinations_countries_term->slug ),
                                    'operator' => 'IN'
                                )
                            )
                        ) );
                    ?>

                    <section id="destinations" class="destinations text-center">
            			<div class="row">
            				<div class="col-xs-12">

                				<div class="section-paddings--bottom">


            						<h2 class="bordered-title bordered-title--black"><?php echo $destinations_countries_term->name; ?></h2><!-- /.bordered-title bordered-title--black -->

                                        <?php if ( $loop->have_posts() ) : ?>

                                            <div class="destinations-gallery">
                    							<div class="row">

                                                    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                                                        <?php $post_id = get_the_ID(); ?>
                                                        <?php $images = get_field('gallery'); ?>
                                                        <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>


                                                        <div class="col-md-4 col-sm-6 col-ms-6 col-xs-12">
                                                            <div class="covered-link-image covered-link-image--height-430" style="background-image: url('<?php echo $featured_image_url; ?>');">
                                                                <div class="inside-wrapper">
                                                                    <div class="vertical-center">
                                                                        <a href="<?php echo $images[0]['url']; ?>" class="covered-link-image__show-gallery" rel="gallery-<?php echo $post_id; ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                            											<a href="<?php the_permalink(); ?>" class="covered-link-image__learn-more animsition-link"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-arrow--right.svg" alt="Learn more icon" /></a>
                            											<h3 class="covered-link-image__title"><?php the_title(); ?></h3><!-- /.single-destination__title -->
                                                                    </div><!-- /.vertical-center -->
                                                                </div><!-- /.inside-wrapper -->
                                                            </div><!-- /.covered-link-image covered-link-image--height-430 -->
                            							</div><!-- /.col-md-4 col-sm-6 col-ms-6 col-xs-12 -->


                                                        <?php if( $images ): ?>

                                                            <div class="fancybox-hidden">
                                                                <div class="image-gallery section-paddings--top">
                                                                    <div class="row">

                                                                    <?php $i=0; ?>
                                                                    <?php foreach( $images as $image ): ?>

                                                                        <?php if($i==0) { $i++; continue; } ?>

                                                                        <div class="col-xs-4">
                                                                            <div class="single-image">
                                                                                <img src="<?php echo $image['sizes']['image-gallery']; ?>" class="single-image__image img-responsive" alt="<?php echo $image['title']; ?>">
                                                                                <div class="inside-wrapper">
                                                                                    <div class="vertical-center">
                                                                                        <a href="<?php echo $image['url']; ?>" class="single-image__show-gallery" rel="gallery-<?php echo $post_id; ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                                                                                    </div><!-- /.vertical-center -->
                                                                                </div><!-- /.inside-wrapper -->
                                                                            </div><!-- /.single-image -->
                                                                        </div><!-- /"col-xs-4 -->

                                                                        <?php $i++; ?>

                                                                    <?php endforeach; ?>

                                                                    </div><!-- /.row -->
                                                                </div><!-- /.image-gallery section-paddings--top -->
                                                            </div><!-- /.fancybox-hidden -->

                                                        <?php endif; ?>

                                                    <?php endwhile; ?>

                                                </div><!-- /.row -->
                    						</div><!-- /.destinations-gallery -->

                                        <?php endif; ?>
                                    </div>

                                </div><!-- /.col-xs-12 -->
                			</div><!-- /.row -->
                    	</section><!-- /.destinations text-center -->

                    <?php $member_group_query = null; ?>
                    <?php wp_reset_postdata() ;?>
                    <?php $term_row++; ?>

                <?php endforeach; ?>

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.homepage -->

<?php get_template_part('part', 'activities'); ?>
<?php get_template_part('part', 'gallery'); ?>

<?php get_footer(); ?>
