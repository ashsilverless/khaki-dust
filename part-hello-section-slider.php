<?php $images = get_field('slider_images'); ?>

<?php if( $images ): ?>

    <section class="hello-section hello-section--slider text-center section-paddings--both">
        <div id="carousel-hello-section" class="carousel slide" data-ride="carousel">

            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">

                <?php $i = 0; ?>
                <?php foreach( $images as $image ): ?>

                    <div class="item<?php if($i==0) echo ' active'; ?>">
                        <div class="background-cover" style="background-image: url('<?php echo $image['url']; ?>')"></div><!-- /.background-cover -->
                    </div>

                    <?php $i++; ?>
                <?php endforeach; ?>

            </div>

            <!-- Controls -->
            <a class="carousel-arrow carousel-arrow--left" href="#carousel-hello-section" role="button" data-slide="prev">
                <div class="vertical-center">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </div><!-- /.vertical-center -->
            </a>
            <a class="carousel-arrow carousel-arrow--right" href="#carousel-hello-section" role="button" data-slide="next">
                <div class="vertical-center">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </div><!-- /.vertical-center -->
            </a>

            <div class="clearfix"></div><!-- /.clearfix -->
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="hello-section__title"><?php the_title(); ?></h1><!-- /.hello-section__title -->
                    <div class="hello-section__content">
                        <?php the_field('slider_content'); ?>
                    </div><!-- /.hello-section__content -->
                </div><!-- /.col-xs-12 -->
            </div><!-- /.row -->
        </div><!-- /.container -->
    </section><!-- /.hello-section background-cover text-center section-paddings--both -->

<?php endif; ?>
