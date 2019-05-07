<?php   // Get terms for post
 $terms = get_the_terms( $post->ID , 'countries' );
 // Loop over each item since it's an array
 if ( $terms != null ){
 foreach( $terms as $term ) {
 // Print the name method from $term which is an OBJECT
 print $term->slug ;
} } ?>

    <?php $leaderImg = get_field('hero_image', $term); ?>

<section class="hello-section<?php if(is_search()) echo ' hello-section--search'; ?> background-cover text-center section-paddings--both" style="background-image: url(<?php echo $leaderImg['url']; ?>)">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1 class="hello-section__title"><?php single_term_title(); ?></h1><!-- /.hello-section__title -->
                <?php if(!is_search()): ?>
                    <div class="hello-section__content">
                            <?php the_field('hello_section_content' , $term); ?>
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
