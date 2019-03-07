<?php
    /*
        Template Name: About -> About Khaki & Dust
    */
?>

<?php get_header(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<main class="template-about-khaki-dust">

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

                <?php if( have_rows('people') ): ?>

                    <section class="people section-paddings--bottom">
                        <h2 class="hide">People</h2><!-- /.hide -->
                        <div class="row">

                            <?php $row = 1; ?>
                        	<?php while( have_rows('people') ): the_row(); ?>

                                <div class="col-md-4<?php if($row % 2 != 0) echo ' col-md-offset-2'; ?>">
                                    <div class="single-man">

                                        <?php $image = get_sub_field('image'); ?>

                                        <?php if( !empty($image) ): ?>

                                            <div class="covered-link-image covered-link-image--height-430" style="background-image: url('<?php echo $image['url']; ?>');">
                                                <div class="inside-wrapper">
                                                    <div class="vertical-center">
                                                        <?php if(get_sub_field('email_address')): ?>
                                                            <a href="mailto:<?php the_sub_field('email_address'); ?>" class="covered-link-image__send-email"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-mail.svg" alt="Send email icon" /></a>
                                                        <?php endif; ?>
                                                    </div><!-- /.vertical-center -->
                                                </div><!-- /.inside-wrapper -->
                                            </div><!-- /.covered-link-image covered-link-image--height-430 -->

                                        <?php endif; ?>

                                        <h3 class="single-man__name"><?php the_sub_field('name'); ?></h3><!-- /.single-man__name -->
                                        <span class="single-man__position"><?php the_sub_field('position'); ?></span>
                                        <div class="single-man__content">
                                            <?php the_sub_field('description'); ?>
                                        </div><!-- /.single-man__content -->
                                    </div><!-- /.single-man -->
                                </div><!-- /.col-md-4 col-md-offset-2 -->

                                <?php if($row % 2 == 0): ?>
                                    </div><!-- /.row -->
                                    <div class="row">
                                <?php endif; ?>

                                <?php $row++; ?>
                        	<?php endwhile; ?>

                        </div><!-- /.row -->
                    </section><!-- /.people section-paddings--bottom -->

                <?php endif; ?>

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.template-about-khaki-dust -->

<?php get_template_part('part', 'plan-your-next-safari'); ?>

<?php get_footer(); ?>
