<?php
    /*
        Template Name: Gallery
    */
?>

<?php get_header(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<main class="template-about-gallery">

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <?php $images = get_field('gallery'); ?>

                <?php if( $images ): ?>

                    <section class="section-paddings--both">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="text-center">
                                    <h2 class="bordered-title bordered-title--black">Gallery</h2><!-- /.bordered-title bordered-title--black -->
                                </div><!-- /.text-center -->
                            </div><!-- /.col-xs-12 -->
                        </div><!-- /.row -->
                        <div class="image-gallery section-paddings--top">
                            <div class="row">

                                <?php foreach( $images as $image ): ?>

                                    <div class="col-xs-4">
                                        <div class="single-image">
                                            <img src="<?php echo $image['sizes']['image-gallery']; ?>" class="single-image__image img-responsive" alt="<?php echo $image['title']; ?>">
                                            <div class="inside-wrapper">
                                                <div class="vertical-center">
                                                    <a data-fancybox="gallery" href="<?php echo $image['url']; ?>" class="single-image__show-gallery" rel="gallery"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                                                </div><!-- /.vertical-center -->
                                            </div><!-- /.inside-wrapper -->
                                        </div><!-- /.single-image -->
                                    </div><!-- /"col-xs-4 -->

                                <?php endforeach; ?>

                            </div><!-- /.row -->
                        </div><!-- /.image-gallery section-paddings--top -->
                    </section><!-- /.section-paddings--both -->

                <?php endif; ?>

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.template-about-gallery -->

<?php get_template_part('part', 'plan-your-next-safari'); ?>

<?php get_footer(); ?>
