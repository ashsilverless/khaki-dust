<?php $images = get_field('gallery', 13); ?>
<?php $rand = array_rand($images, 1); ?>

<?php if( $images ): ?>

    <section class="gallery section-paddings--both" style="background-image: url('<?php echo $images[$rand]['url']; ?>');">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h2 class="bordered-title bordered-title--white">Gallery</h2><!-- /.bordered-title bordered-title--white -->
                </div><!-- /.col-xs-12 -->
            </div><!-- /.row -->
        </div><!-- /.container -->
        <a href="<?php echo get_the_permalink(13); ?>" class="gallery__cta animsition-link">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        Visit our photo gallery
                        <img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-arrow--right.svg" alt="Go to gallery icon" />
                    </div><!-- /.col-xs-12 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </a>
        <div class="gallery__shadow"></div><!-- /.gallery__shadow -->
    </section><!-- /.gallery section-paddings--both -->

<?php endif; ?>
