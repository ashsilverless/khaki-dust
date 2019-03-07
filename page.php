<?php
    /*
        Template Name: About -> About Khaki & Dust
    */
?>

<?php get_header(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<main>

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <article class="section-paddings--both">
                    <div class="row">
                        <div class="col-xs-12">
                            <h2 class="text-center"><?php the_title(); ?></h2><!-- /.text-center -->
                        </div><!-- /.col-xs-12 -->
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <?php the_content(); ?>
                        </div><!-- /.col-md-8 col-md-offset-2 -->
                    </div><!-- /.row -->
                </article><!-- /.section-paddings--both -->

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main>

<?php get_template_part('part', 'gallery'); ?>

<?php get_footer(); ?>
