<?php get_header(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<main class="archive-camps">

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <?php $camps_countries_terms = get_terms( 'countries' ); ?>

                <?php if($camps_countries_terms): ?>

                    <section class="camps-gallery section-paddings--top">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- Nav tabs -->
                                <div class="nav-tabs-wrapper">
                                    <ul class="nav nav-tabs" role="tablist">

                                        <?php $terms_row = 0; ?>
                                        <?php foreach ( $camps_countries_terms as $camps_countries_term ): ?>

                                            <li role="presentation"<?php if($terms_row == 0) echo ' class="active"'; ?>><a href="#collapse-tab-<?php echo $terms_row ?>" aria-controls="collapse-tab-<?php echo $terms_row ?>" role="tab" data-toggle="tab"><?php echo $camps_countries_term->name; ?></a></li>

                                            <?php $terms_row++; ?>
                                        <?php endforeach; ?>

                                    </ul>
                                </div><!-- /.nav-tabs-wrapper -->

                                <!-- Tab panes -->
                                <div class="tab-content">

                                    <?php $second_terms_row = 0; ?>
                                    <?php foreach ( $camps_countries_terms as $camps_countries_term ): ?>

                                        <div role="tabpanel" class="tab-pane fade<?php if($second_terms_row == 0) echo ' in active'; ?>" id="collapse-tab-<?php echo $second_terms_row ?>">
                                            <div class="mix-it-up">

                                                <?php
                                                    $loop = new WP_Query( array(
                                                        'post_type' => 'destinations_archive',
                                                        'tax_query' => array(
                                                            array(
                                                                'taxonomy' => 'countries',
                                                                'field' => 'slug',
                                                                'terms' => array( $camps_countries_term->slug ),
                                                                'operator' => 'IN'
                                                            )
                                                        )
                                                    ) );
                                                ?>

                                                <?php if ( $loop->have_posts() ) : ?>

                                                    <div class="mix-it-up__controls">
                                                        <button class="filter-<?php echo $second_terms_row; ?>" data-filter="all">All</button>

                                                        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                                                            <button class="filter-<?php echo $second_terms_row; ?>" data-filter=".<?php the_slug(); ?>"><?php the_title(); ?></button>

                                                        <?php endwhile; ?>

                                                    </div><!-- /.mix-it-up-controls -->

                                                <?php endif; ?>

                                                <?php $loop = null; ?>
                                                <?php wp_reset_postdata(); ?>


                                                <?php
                                                    $loop = new WP_Query( array(
                                                        'post_type' => 'camps_archive',
                                                        'tax_query' => array(
                                                            array(
                                                                'taxonomy' => 'countries',
                                                                'field' => 'slug',
                                                                'terms' => array( $camps_countries_term->slug ),
                                                                'operator' => 'IN'
                                                            )
                                                        )
                                                    ) );
                                                ?>

                                                <?php if ( $loop->have_posts() ) : ?>

                                                    <div id="mix-it-up-<?php echo $second_terms_row; ?>" class="mix-it-up__container">

                                                        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                                                            <?php $post_id = get_the_ID(); ?>
                                                            <?php $images = get_field('gallery'); ?>
                                                            <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
                                                            <?php $the_title = get_the_title(); ?>
                                                            <?php $the_permalink = get_permalink($post->ID);  ?>

                                                            <?php $post_object = get_field('relational_destination'); ?>

                                                            <?php if( $post_object ): ?>

                                                            	<?php $post = $post_object; ?>
                                                            	<?php setup_postdata( $post ); ?>

                                                                <div class="mix single-camp <?php the_slug(); ?>">

                                                                <?php wp_reset_postdata(); ?>
                                                            <?php endif; ?>

                                                                <div class="covered-link-image covered-link-image--height-430" style="background-image: url('<?php echo $featured_image_url; ?>');">
                                                                    <div class="inside-wrapper">
                                                                        <div class="vertical-center">
                                                                            <a href="<?php echo $images[0]['url']; ?>" class="covered-link-image__show-gallery" rel="gallery-<?php echo $post_id; ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                                                                            <a href="<?php echo $the_permalink; ?>" class="covered-link-image__learn-more animsition-link"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-arrow--right.svg" alt="Learn more icon" /></a>
                                                                        </div><!-- /.vertical-center -->
                                                                    </div><!-- /.inside-wrapper -->
                                                                </div><!-- /.covered-link-image covered-link-image--height-430 -->
                                                                <div class="title-wrapper">
                                                                    <a href="<?php echo $the_permalink; ?>" class="title-wrapper__title"><h3><?php echo $the_title; ?></h3></a>

                                                                    <?php if( $post_object ): ?>

                                                                    	<?php $post = $post_object; ?>
                                                                    	<?php setup_postdata( $post ); ?>

                                                                        <span class="title-wrapper__place"><?php the_title(); ?></span>

                                                                        <?php wp_reset_postdata(); ?>
                                                                    <?php endif; ?>

                                                                </div><!-- /.title-wrapper -->
                                                            </div>


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

                                                        <div class="gap"></div>
                                                        <div class="gap"></div>
                                                    </div><!-- /#botswana-camps-mix.container -->

                                                <?php endif; ?>

                                            </div><!-- /.mix-it-up -->
                                        </div>

                                        <?php wp_reset_postdata() ;?>
                                        <?php $second_terms_row++; ?>
                                    <?php endforeach; ?>

                                </div>
                            </div><!-- /.col-xs-12 -->
                        </div><!-- /.row -->

                    </section><!-- /.camps-gallery section-paddings--top -->

                <?php endif; ?>

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.archive-camps -->

<?php get_template_part('part', 'gallery'); ?>

<?php get_footer(); ?>
