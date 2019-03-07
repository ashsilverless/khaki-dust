<?php
    /*
        Template Name: About -> About Your Safari
    */
?>

<?php get_header(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<main class="template-about-your-safari">

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <article class="section-paddings--top">
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
                </article><!-- /.section-paddings--top -->

                <?php if( have_rows('repeater_field_name') ): ?>

                	<?php while( have_rows('repeater_field_name') ): the_row(); ?>

                        <section class="feature section-paddings--both">
                            <div class="row">
                                <div class="col-md-8 col-md-offset-2">
                                    <h2 class="feature__title"><?php the_sub_field('title'); ?></h2><!-- /.feature__title -->
                                    <?php the_sub_field('description'); ?>
                                </div><!-- /.col-md-8 col-md-offset-2 -->
                            </div><!-- /.row -->

                            <?php $images = get_sub_field('gallery'); ?>

                            <?php if( $images ): ?>

                                <div class="image-gallery section-paddings--top">
                                    <div class="row">

                                    <?php foreach( $images as $image ): ?>

                                        <div class="col-sm-6 col-ms-6">
                                            <div class="single-image">
                                                <img src="<?php echo $image['sizes']['image-your-safari']; ?>" class="single-image__image img-responsive" alt="<?php echo $image['title']; ?>">
                                                <div class="inside-wrapper">
                                                    <div class="vertical-center">
                                                        <a href="<?php echo $image['url']; ?>" class="single-image__show-gallery" rel="gallery-<?php echo $post_id; ?>" title="<?php echo $image['caption']; ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                                                    </div><!-- /.vertical-center -->
                                                </div><!-- /.inside-wrapper -->
                                            </div><!-- /.single-image -->
                                        </div><!-- /"col-xs-4 -->

                                    <?php endforeach; ?>

                                    </div><!-- /.row -->
                                </div><!-- /.image-gallery section-paddings--top -->

                            <?php endif; ?>

                        </section><!-- /.feature section-paddings--both -->

                	<?php endwhile; ?>

                <?php endif; ?>


                <?php if( have_rows('section') ): ?>

                    <?php $section_row; ?>
                	<?php while( have_rows('section') ): the_row(); ?>

                        <section class="feature section-paddings--both">
                            <div class="row">
                                <div class="col-md-8 col-md-offset-2">
                                    <h2 class="feature__title"><?php the_sub_field('title'); ?></h2><!-- /.feature__title -->
                                    <?php the_sub_field('description'); ?>
                                </div><!-- /.col-md-8 col-md-offset-2 -->
                            </div><!-- /.row -->

                            <?php $images = get_sub_field('gallery'); ?>

                            <?php if( $images ): ?>

                                <div class="image-gallery section-paddings--top">
                                    <div class="row">

                                    <?php foreach( $images as $image ): ?>

                                        <div class="col-sm-6 col-ms-6">
                                            <div class="single-image">
                                                <img src="<?php echo $image['sizes']['image-your-safari']; ?>" class="single-image__image img-responsive" alt="<?php echo $image['title']; ?>">
                                                <div class="inside-wrapper">
                                                    <div class="vertical-center">
                                                        <a href="<?php echo $image['url']; ?>" class="single-image__show-gallery" rel="gallery-<?php echo $section_row; ?>" title="<?php echo $image['caption']; ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                                                    </div><!-- /.vertical-center -->
                                                </div><!-- /.inside-wrapper -->
                                            </div><!-- /.single-image -->
                                        </div><!-- /"col-xs-4 -->

                                    <?php endforeach; ?>

                                    </div><!-- /.row -->
                                </div><!-- /.image-gallery section-paddings--top -->

                            <?php endif; ?>

                        </section><!-- /.feature section-paddings--both -->

                        <?php $section_row++; ?>
                	<?php endwhile; ?>

                <?php endif; ?>


                <?php if( have_rows('collapse') ): ?>

                    <section class="safari-advice section-paddings--both">
                        <div class="row">
                            <div class="col-md-8 col-md-offset-2">
                                <div class="text-center">
                                    <h2 class="bordered-title bordered-title--black"><?php the_field('collapse_title') ?></h2><!-- /.bordered-title bordered-title--black -->
                                </div><!-- /.text-center -->
                                <div class="panel-group section-paddings--top" id="accordion" role="tablist" aria-multiselectable="true">

                                    <?php $collapse_row = 1; ?>
                                    <?php while( have_rows('collapse') ): the_row(); ?>

                                        <div class="panel panel-default">
                                            <div class="panel-heading" role="tab" id="heading1">
                                                <h4 class="panel-title">
                                                    <a<?php if($collapse_row == 1) echo ' class="collapsed"'; ?> role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-<?php echo $collapse_row; ?>" aria-expanded="true" aria-controls="collapse-<?php echo $collapse_row; ?>">
                                                        <?php the_sub_field('title') ?>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="collapse-<?php echo $collapse_row; ?>" class="panel-collapse collapse<?php if($collapse_row == 1) echo ' in'; ?>" role="tabpanel" aria-labelledby="heading1">
                                                <div class="panel-body">
                                                    <?php the_sub_field('content'); ?>
                                                </div>
                                            </div>
                                        </div>

                                        <?php $collapse_row++; ?>
                                    <?php endwhile; ?>

                                </div>
                            </div><!-- /.col-md-8 col-md-offset-2 -->
                        </div><!-- /.row -->
                    </section><!-- /.safari-advice section-paddings--both -->

                <?php endif; ?>

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.template-about-your-safari -->

<?php get_template_part('part', 'plan-your-next-safari'); ?>

<?php get_footer(); ?>
