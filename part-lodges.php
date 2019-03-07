<?php $post_objects = get_field('relational_camp'); ?>

<?php if( $post_objects ): ?>

    <section class="lodges lodges--subpage-part <?php if(get_post_type($post->ID)!='activities_archive') echo ' section-paddings--bottom'; ?>">
        <div class="container">
            <div class="title-subpage-section-wrapper">
                <div class="row">
                    <div class="col-md-8">
                        <?php if(get_post_type($post->ID)=='destinations_archive'): ?>
                            <h3 class="title-subpage-section-wrapper__title">Lodges in <?php the_title(); ?></h3><!-- /.lodges__title -->
                        <?php else: ?>
                            <h3 class="title-subpage-section-wrapper__title">Lodges to combine with <?php the_title(); ?></h3><!-- /.lodges__title -->
                        <?php endif; ?>
                    </div><!-- /.col-md-8 -->
                    <div class="col-md-4">
                        <div class="circled-social-icons circled-social-icons--soft-grey">
                            <?php get_template_part('part', 'socials'); ?>
                        </div><!-- /.circled-social-icons circled-social-icons--soft-grey -->
                    </div><!-- /.col-md-4 -->
                </div><!-- /.row -->
            </div><!-- /.title-subpage-section-wrapper -->
            <div class="lodges-gallery section-paddings--top">
                <div class="row">

                    <?php foreach( $post_objects as $post_object): ?>

                        <?php $post_id = get_the_ID(); ?>
                        <?php $images = get_field('gallery', $post_object->ID); ?>
                        <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id($post_object->ID) ); ?>
                        <?php $the_title = get_the_title($post_object->ID); ?>
                        <?php $the_permalink = get_permalink($post_object->ID);  ?>

                        <div class="col-md-3 col-sm-6 col-ms-6">
                            <div class="covered-link-image covered-link-image--height-260" style="background-image: url('<?php echo $featured_image_url; ?>');">
                                <div class="inside-wrapper">
                                    <div class="vertical-center">
                                        <a href="<?php echo $images[0]['url']; ?>" class="covered-link-image__show-gallery" rel="gallery-<?php echo $post_id; ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                                        <a href="<?php echo $the_permalink; ?>" class="covered-link-image__learn-more animsition-link"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-arrow--right.svg" alt="Learn more icon" /></a>
                                        <h4 class="covered-link-image__title"><?php echo $the_title; ?></h4><!-- /.single-destination__title -->
                                    </div><!-- /.vertical-center -->
                                </div><!-- /.inside-wrapper -->
                            </div><!-- /.covered-link-image covered-link-image--height-260 -->
                        </div><!-- /.col-md-3 col-sm-6 col-ms-6 -->

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

                    <?php endforeach; ?>

                </div><!-- /.row -->
            </div><!-- /.lodges-gallery section-paddings--top -->
        </div><!-- /.container -->
    </section><!-- /.lodges lodges--subpage-part section-paddings--bottom -->

<?php endif;
