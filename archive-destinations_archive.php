<?php get_header(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<main class="archive-destinations">

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <?php $destinations_countries_terms = get_terms( 'destinations_countries' ); ?>
                <?php foreach ( $destinations_countries_terms as $destinations_countries_term ): ?>
                    <?php
                        $loop = new WP_Query( array(
                            'post_type' => 'destinations_archive',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'destinations_countries',
                                    'field' => 'slug',
                                    'terms' => array( $destinations_countries_term->slug ),
                                    'operator' => 'IN'
                                )
                            )
                        ) );
                    ?>

                    <section class="destinations section-paddings--both text-center">
            			<div class="row">
            				<div class="col-xs-12">
            					<h2 class="bordered-title bordered-title--black"><?php echo $destinations_countries_term->name; ?></h2><!-- /.bordered-title bordered-title--black -->
            					<div class="destinations-gallery">
            						<div class="row">

                                        <?php if ( $loop->have_posts() ) : ?>
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
                                        <?php endif; ?>

                                    </div><!-- /.row -->
            					</div><!-- /.destinations-gallery -->
            				</div><!-- /.col-xs-12 -->
            			</div><!-- /.row -->
                	</section><!-- /.destinations section-paddings--both text-center -->

                    <?php $member_group_query = null; ?>
                    <?php wp_reset_postdata() ;?>
                <?php endforeach; ?>

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.archive-destinations -->

<?php get_template_part('part', 'activities'); ?>
<?php get_template_part('part', 'gallery'); ?>

<?php get_footer(); ?>
