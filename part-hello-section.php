<?php if(is_post_type_archive('destinations_archive')): ?>
    <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id(5) ); ?>
<?php elseif(is_post_type_archive('activities_archive')): ?>
    <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id(7) ); ?>
<?php elseif(is_search()): ?>
    <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id(7) ); ?>
<?php elseif(is_post_type_archive('camps_archive')): ?>
    <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id(9) ); ?>
<?php else: ?>
    <?php $featured_image_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
<?php endif; ?>

<?php global $wp_query; ?>

<section class="hello-section<?php if(is_search()) echo ' hello-section--search'; ?> background-cover text-center section-paddings--both" style="background-image: url('<?php echo $featured_image_url; ?>')">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1 class="hello-section__title">
                    <?php if(is_archive()) {
                        post_type_archive_title();
                    } elseif(is_search()) {
                        echo $wp_query->found_posts; ?> search results for "<?php if(isset($_GET['s'])) echo $_GET['s'];
                    } else {
                        the_title();
                    } ?>
                </h1><!-- /.hello-section__title -->
                <?php if(!is_search()): ?>
                    <div class="hello-section__content">
                        <?php if(is_post_type_archive('destinations_archive')): ?>
                            <?php the_field('hello_section_content', 5); ?>
                        <?php elseif(is_post_type_archive('activities_archive')): ?>
                            <?php the_field('hello_section_content', 7); ?>
                        <?php elseif(is_post_type_archive('camps_archive')): ?>
                            <?php the_field('hello_section_content', 9); ?>
                        <?php else: ?>
                            <?php the_field('hello_section_content'); ?>
                        <?php endif; ?>
                    </div><!-- /.hello-section__content -->
                <?php endif; ?>
            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

    <?php if(is_single()): ?>

        <?php $prev_post = get_next_post(); ?>
        <?php if($prev_post): ?>

             <a class="carousel-arrow carousel-arrow--left animsition-link" href="<?php echo get_permalink($prev_post->ID); ?>" role="button" data-slide="prev">
                <div class="vertical-center">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </div><!-- /.vertical-center -->
            </a>

        <?php endif; ?>

        <?php $next_post = get_previous_post(); ?>
        <?php if($next_post): ?>

            <a class="carousel-arrow carousel-arrow--right animsition-link" href="<?php echo get_permalink($next_post->ID); ?>" role="button" data-slide="next">
                <div class="vertical-center">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </div><!-- /.vertical-center -->
            </a>

        <?php endif; ?>

    <?php endif; ?>
</section><!-- /.hello-section background-cover text-center section-paddings--both -->
