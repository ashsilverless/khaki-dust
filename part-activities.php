<?php
    $loop = new WP_Query( array(
        'post_type' => 'activities_archive'
    ) );
?>

<?php if ( $loop->have_posts() ) : ?>

    <section id="activities" class="activities section-paddings--both text-center">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h2 class="bordered-title bordered-title--black">Activities</h2><!-- /.bordered-title bordered-title--black -->
                </div><!-- /.col-xs-12 -->
            </div><!-- /.row -->
            <div class="activities-icons-gallery">
                <div class="row">

                    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                        <?php $image = get_field('icon'); ?>

                        <div class="col-md-15 col-sm-4 col-ms-4 col-xs-6">
                            <a href="<?php the_permalink(); ?>" class="single-icon-activity animsition-link match-height">

                                <?php if( !empty($image) ): ?>

                                    <div class="single-icon-activity__icon">
                                        <div class="vertical-center">
                                            <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['title']; ?>" />
                                        </div><!-- /.vertical-center -->
                                    </div><!-- /.single-icon-activity__icon -->

                                <?php endif; ?>

                                <h3 class="single-icon-activity__title"><?php the_title(); ?></h3><!-- /.single-icon-activity__title -->
                            </a><!-- /.single-icon-activity -->
                        </div><!-- /.col-md-15 col-sm-4 col-ms-4 col-xs-6 -->

                    <?php endwhile; ?>

                </div><!-- /.row -->
            </div><!-- /.activities-icons-gallery -->
        </div><!-- /.container -->
    </section><!-- /.activities section-paddings--both text-center -->

<?php endif; ?>
