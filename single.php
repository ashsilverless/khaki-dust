<?php get_header(); ?>
<?php the_post(); ?>

<?php get_template_part('part','hello-section'); ?>
<?php get_template_part('part','info-bar'); ?>

<?php $post_id = get_the_ID(); ?>
<?php $post_objects_activities = get_field('activities'); ?>
<?php $the_title = get_the_title(); ?>

<main class="single-post">

    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <article class="section-paddings--both">
                    <div class="row">
                        <div class="col-xs-12">
                            <h2 class="text-center"><?php the_field('title'); ?></h2><!-- /.text-center -->
                        </div><!-- /.col-xs-12 -->
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <?php the_field('excerpt'); ?>

                            <?php if(get_field('expanded_description')): ?>

                                <div class="collapse" id="collapseContent">
                                    <?php the_field('expanded_description'); ?>
                                </div>

                                <div class="text-center">
                                    <button id="toggle-content-button" class="khaki-dust-button khaki-dust-button__flat khaki-dust-button__flat--green" type="button" data-toggle="collapse" data-target="#collapseContent" aria-expanded="false" aria-controls="collapseContent">
                                        Read more
                                    </button>
                                </div><!-- /.text-center -->

                            <?php endif; ?>

                        </div><!-- /.col-md-8 col-md-offset-2 -->
                    </div><!-- /.row -->

                    <?php $images = get_field('gallery'); ?>

                    <?php if( $images ): ?>

                        <div class="image-gallery section-paddings--top">
                            <div class="row">

                            <?php foreach( $images as $image ): ?>

                                <div class="col-xs-4">
                                    <div class="single-image">
                                        <img src="<?php echo $image['sizes']['image-gallery']; ?>" class="single-image__image img-responsive" alt="<?php echo $image['title']; ?>">
                                        <div class="inside-wrapper">
                                            <div class="vertical-center">
                                                <a href="<?php echo $image['url']; ?>" class="single-image__show-gallery" rel="gallery-<?php the_slug(); echo '-'.$post_id; ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-plus.svg" /></a>
                                            </div><!-- /.vertical-center -->
                                        </div><!-- /.inside-wrapper -->
                                    </div><!-- /.single-image -->
                                </div><!-- /"col-xs-4 -->

                            <?php endforeach; ?>

                            </div><!-- /.row -->
                        </div><!-- /.image-gallery section-paddings--top -->

                    <?php endif; ?>

                </article><!-- /.section-paddings--both -->

            </div><!-- /.col-xs-12 -->
        </div><!-- /.row -->
    </div><!-- /.container -->

    <?php if(get_post_type($post->ID)=='destinations_archive'): ?>

        <?php get_template_part('part', 'lodges-destination'); ?>

    <?php else: ?>

        <?php get_template_part('part', 'lodges'); ?>

    <?php endif; ?>

    <?php if(get_post_type($post->ID)!='activities_archive'): ?>

        <?php if( $post_objects_activities ): ?>

            <section class="activities activities--subpage-part section-paddings--both">
                <div class="container">
                    <div class="title-subpage-section-wrapper title-subpage-section-wrapper--soft-grey-background">
                        <div class="row">
                            <div class="col-xs-12">
                                <?php if(get_post_type($post->ID)=='destinations_archive'): ?>
                                    <h3 class="title-subpage-section-wrapper__title">Activities in <?php echo $the_title; ?></h3><!-- /.lodges__title -->
                                <?php elseif(get_post_type($post->ID)=='camps_archive'): ?>
                                    <h3 class="title-subpage-section-wrapper__title">Activities to combine with <?php echo $the_title; ?></h3><!-- /.lodges__title -->
                                <?php endif; ?>
                            </div><!-- /.col-xs-12 -->
                        </div><!-- /.row -->
                    </div><!-- /.title-subpage-section-wrapper title-subpage-section-wrapper--soft-grey-background -->
                    <div class="activities-icons-gallery text-center">
                        <div class="row">

                            <?php foreach( $post_objects_activities as $post): // variable must be called $post (IMPORTANT) ?>

                                <?php setup_postdata($post); ?>
                                <?php $image = get_field('icon'); ?>

                                <div class="col-md-15 col-sm-4 col-ms-4 col-xs-6">
                                    <a href="<?php the_permalink(); ?>" class="single-icon-activity">

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

                            <?php endforeach; ?>

                            <?php wp_reset_postdata();?>

                        </div><!-- /.row -->
                    </div><!-- /.activities-icons-gallery text-center -->
                </div><!-- /.container -->
            </section><!-- /.activities activities--subpage-part section-paddings--both -->

        <?php endif; ?>

        <div class="map">

            <?php $location = get_field('location'); ?>

            <?php if( !empty($location) ): ?>

                <div class="acf-map">
                	<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
                </div>

            <?php endif; ?>

        </div><!-- /.map -->

    <?php endif; ?>

    <?php if(get_post_type($post->ID)=='destinations_archive'): ?>

        <?php $current_single_post_title = get_the_title(); ?>

        <?php
            $loop = new WP_Query( array(
                'post_type' => 'camps_archive',
                'posts_per_page' => 200
            ) );
        ?>

        <?php if ( $loop->have_posts() ) : ?>

            <div class="map">
                <div class="acf-map">

                    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

                        <?php $location = get_field('location'); ?>
                        <?php $post_object = get_field('relational_destination'); ?>
                        <?php $the_title = get_the_title(); ?>

                        <?php if( $post_object ): ?>

                        	<?php $post = $post_object; ?>
                        	<?php setup_postdata( $post ); ?>

                            <?php if(get_the_title() != $current_single_post_title): ?>
                                <?php continue; ?>
                            <?php endif; ?>

                            <?php wp_reset_postdata(); ?>
                        <?php endif; ?>

                        <div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>">
            				<b><?php echo $the_title; ?></b>
            			</div>

                    <?php endwhile; ?>

                </div><!-- /.acf-map -->
            </div><!-- /.map -->

        <?php endif; ?>

    <?php endif; ?>

</main><!-- /.single-post -->

<?php get_footer(); ?>
