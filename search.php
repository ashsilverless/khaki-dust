<?php get_header(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<main class="search-results section-paddings--bottom">

    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">

                <?php if (have_posts()) :  ?>

                    <?php while (have_posts()) : the_post();?>

                        <div class="row">
                            <div class="col-xs-12">
                                <article class="search-result section-paddings--top">
                                    <a class="search-result__title-link" href="<?php the_permalink(); ?>"><h3><?php the_title(); ?></h3></a>
                                    <p class="search-result__description"><?php echo wp_trim_words( get_the_content(), 40, '...' ); ?></p>
                                    <a class="search-result__learn-more" href="<?php the_permalink(); ?>">Learn more</a>
                                </article><!-- /.search-result section-paddings--top -->
                            </div><!-- /.col-xs-12 -->
                        </div><!-- /.row -->

                    <?php endwhile; ?>
                    
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="pagination-wrapper">
                                <?php echo custom_pagination(); ?>
                            </div><!-- /.pagination-wrapper -->
                        </div><!-- /.col-xs-12 -->
                    </div><!-- /.row -->

                <?php else: ?>

                    <div class="search-problem">
                        <h2>We're really sorry!</h2>
                        <p>We couldn't find what you're looking for. "<?php if(isset($_GET['s'])) echo $_GET['s']; ?>" doesn't seem to be here.</p>
                    </div><!-- /.search-problem -->

                <?php endif; ?>

            </div><!-- /.col-md-8 col-md-offset-2 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

</main><!-- /.search results section-paddings--bottom -->

<?php get_template_part('part', 'gallery'); ?>

<?php get_footer(); ?>
