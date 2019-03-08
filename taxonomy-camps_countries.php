<?php get_header(); ?>

<?php $classes = get_body_class();?>
<?php get_template_part('part','tax-top'); ?>
<?php get_template_part('part','info-bar'); ?>

<main class="homepage country-tax">

    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                
                <?php $camps_countries_terms = get_terms( 'camps_countries' ); ?>

                    <section id="destinations" class="destinations text-center <?php if (in_array('tax-camps_countries',$classes)) {echo 'country-page';};?>">
            			<div class="row">
            				<div class="col-xs-12">

<?php $tax = $wp_query->get_queried_object();?>
sssss
<?php 

    $terms = wp_get_post_terms( $post->ID, 'camps_countries'); 
    $terms_ids = [];

    foreach ( $terms as $term ) {
        $terms_ids[] = $term->term_id;
    }

    $args = array(
        'post_type' => 'camps_archive',
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'camps_countries',
                'field'    => 'term_id',
                'terms'    => $terms_ids
            )
        ),
    );

    $query = new WP_Query($args);
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
    ?>

                <?php $query->the_post();?>


    <?php } } ?>

                                <?php if($term_row != 0): ?>

                                    <button class="khaki-dust-button khaki-dust-button__bordered-arrow section-paddings--bottom" type="button" data-toggle="collapse" data-target="#collapseBeyondBotswana" aria-expanded="false" aria-controls="collapseBeyondBotswana">
                					  	<?php echo $camps_countries_term->name; ?>
                						<div class="arrow-wrapper">
                							<img src="<?php echo get_template_directory_uri(); ?>/images/icon__arrow--down.svg" alt="Arrow icon" />
                						</div><!-- /.arrow-wrapper -->
                					</button>

                					<div id="collapseBeyondBotswana" class="collapse section-paddings--bottom">

                                <?php endif; ?>

                                        <?php if (in_array('tax-camps_countries',$classes)) {?>
                                            <div class="row">
                                                <div class="col-md-8 col-md-offset-2">
                                                    <p><?php echo ''. $tax->description .''; ?></p>
                                                </div>
                                            </div>
                                        <?php };?>

                                                <?php if ( $query->have_posts() ) : ?>

                                            <div class="destinations-gallery">
                    							<div class="row">

                                                    <?php while ( $query->have_posts() ) : $query->the_post(); ?>

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

                                    <?php if($term_row != 0): ?>
                                        </div>
                                    <?php endif; ?>

                                </div><!-- /.col-xs-12 -->
                			</div><!-- /.row -->
                    	</section><!-- /.destinations text-center -->

                    <?php $member_group_query = null; ?>
                    <?php wp_reset_postdata() ;?>
                    <?php $term_row++; ?>



            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.homepage -->

<?php get_template_part('part', 'gallery'); ?>

<?php get_footer(); ?>
