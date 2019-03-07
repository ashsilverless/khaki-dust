        <section id="contact" class="contact section-paddings--both">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="text-center">
                            <h2 class="bordered-title bordered-title--black">Contact</h2><!-- /.bordered-title bordered-title--black -->
                        </div><!-- /.text-center -->
                    </div><!-- /.col-xs-12 -->
                </div><!-- /.row -->
                <div class="row">
                    <div class="col-sm-6">
                        <ul class="contact-details-list">
                            <?php if(get_field('people', 'option')): ?>
                                <li>
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__footer--user.svg" alt="People icon" class="contact-details-list__icon" />
                                    <?php the_field('people', 'option') ?>
                                </li>
                            <?php endif; ?>
                            <?php if(get_field('phone_number_1', 'option')): ?>
                                <li>
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__footer--smartphone.svg" alt="Phone icon" class="contact-details-list__icon" />
                                    <a href="tel:<?php the_field('phone_number_1', 'option') ?>"><?php the_field('phone_number_1', 'option') ?></a>
                                </li>
                            <?php endif; ?>
                            <?php if(get_field('phone_number_2', 'option')): ?>
                                <li>
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__footer--smartphone.svg" alt="Phone icon" class="contact-details-list__icon" />
                                    <a href="tel:<?php the_field('phone_number_2', 'option') ?>"><?php the_field('phone_number_2', 'option') ?></a>
                                </li>
                            <?php endif; ?>
                            <?php if(get_field('email_address', 'option')): ?>
                                <li>
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__footer--email.svg" alt="Mail icon" class="contact-details-list__icon" />
                                    <a href="mailto:<?php the_field('email_address', 'option'); ?>"><?php the_field('email_address', 'option'); ?></a>
                                </li>
                            <?php endif; ?>
                            <?php if(get_field('email_address_2', 'option')): ?>
                                <li>
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__footer--email.svg" alt="Mail icon" class="contact-details-list__icon" />
                                    <a href="mailto:<?php the_field('email_address_2', 'option'); ?>"><?php the_field('email_address_2', 'option'); ?></a>
                                </li>
                            <?php endif; ?>

<?php if(get_field('email_address_3', 'option')): ?>
                                <li>
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__footer--email.svg" alt="Mail icon" class="contact-details-list__icon" />
                                    <a href="mailto:<?php the_field('email_address_3', 'option'); ?>"><?php the_field('email_address_3', 'option'); ?></a>
                                </li>
                            <?php endif; ?>


                            <?php if(get_field('address', 'option')): ?>
                                <li>
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__footer--address.svg" alt="Address icon" class="contact-details-list__icon" />
                                    <address>
                                        <?php the_field('address', 'option'); ?>
                                    </address>
                                </li>
                            <?php endif; ?>
                        </ul><!-- /.contact-details-list -->
                        <div class="clearfix"></div><!-- /.clearfix -->
                        <div class="circled-social-icons circled-social-icons--dark-grey">
    						<?php get_template_part('part', 'socials'); ?>
    					</div><!-- /.circled-social-icons circled-social-icons--dark-grey -->
                    </div><!-- /.col-sm-6 -->
                    <div class="col-sm-6">
                        <?php echo do_shortcode('[contact-form-7 id="4" title="Contact form"]'); ?>
                    </div><!-- /.col-sm-6 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.contact section-paddings--both-->

        <footer class="footer">
            <div class="footer__first-stage">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="footer-panel">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/logo.svg" alt="Khaki & Dust Safari" class="footer-panel__logo" />
                            </div><!-- /.footer-panel -->
                        </div><!-- /.col-md-3 -->
                        <div class="col-md-3 col-sm-4">
                            <div class="footer-panel">
                                <h4 class="footer-panel__title">Khaki & Dust</h4><!-- /.footer-panel__title -->
                                <p class="footer-panel__content"><?php the_field('site_description', 'option'); ?></p><!-- /.footer-panel__content -->
                            </div><!-- /.footer-panel -->
                        </div><!-- /.col-md-3 col-sm-4 -->
                        <div class="col-md-3 col-sm-4">
                            <div class="footer-panel">
                                <h4 class="footer-panel__title">Tags</h4><!-- /.footer-panel__title -->
                                <?php if( have_rows('tags', 'option') ): ?>

                                	<div class="footer-panel__tags">

                                	<?php while( have_rows('tags', 'option') ): the_row(); ?>

                                        <?php $post_object = get_sub_field('subpage'); ?>

                                        <?php if( $post_object ): ?>

                                        	<?php $post = $post_object; ?>
                                        	<?php setup_postdata( $post ); ?>

                                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>

                                            <?php wp_reset_postdata(); ?>

                                        <?php endif; ?>

                                	<?php endwhile; ?>

                                	</div><!-- /.footer-panel__tags -->

                                <?php endif; ?>

                            </div><!-- /.footer-panel -->
                        </div><!-- /.col-md-3 col-sm-4 -->

                        <?php
                            $loop = new WP_Query(
                                array(
                                    'post_type' 		=> 'testimonials',
                                    'posts_per_page' 	=> 5
                                )
                            );
                        ?>
                        <?php if ($loop->have_posts()) :  ?>

                            <div class="col-md-3 col-sm-4">
                                <div class="footer-panel">
                                    <div class="row">
                                        <div class="col-xs-7">
                                            <h4 class="footer-panel__title">Testimonials</h4><!-- /.footer-panel__title -->
                                        </div><!-- /.col-xs-7 -->
                                        <div class="col-xs-5">
                                            <div class="carousel-controls-wrapper">
                                                <a href="#carousel-testimonials" role="button" data-slide="prev">
                                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-arrow--right.svg" alt="Previous testimonial" />
                                                </a>
                                                <a href="#carousel-testimonials" role="button" data-slide="next">
                                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon__bordered-arrow--right.svg" alt="Next testimonial" />
                                                </a>
                                            </div><!-- /.carousel-controls-wrapper -->
                                        </div><!-- /.col-xs-5 -->
                                    </div><!-- /.row -->
                                    <div id="carousel-testimonials" class="carousel slide" data-ride="carousel" data-interval="false">
                                        <!-- Wrapper for slides -->
                                        <div class="carousel-inner" role="listbox">

                                            <?php $i = 0; ?>
                    						<?php while ($loop->have_posts()) : $loop->the_post();?>

                                                <div class="item<?php if($i==0) echo ' active'; ?>">
                                                    <blockquote>
                                                        <?php the_field('content'); ?>
                                                    </blockquote>
                                                    <span class="author"><?php the_title(); ?></span>
                                                </div>

                                            <?php $i++; ?>
                                            <?php endwhile; ?>

                                        </div>
                                    </div>
                                </div><!-- /.footer-panel -->
                            </div><!-- /.col-md-3 col-sm-4 -->

                        <?php endif; ?>

                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.footer__first-stage -->
            <div class="footer__second-stage">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <span class="copyrights">© Khaki & Dust <?php echo date('Y'); ?>. All Rights Reserved</span>
                        </div><!-- /.col-md-4 -->
                        <div class="col-md-4">
                            <div class="circled-social-icons circled-social-icons--white">
        						<?php get_template_part('part', 'socials'); ?>
        					</div><!-- /.circled-social-icons circled-social-icons--white -->
                        </div><!-- /.col-md-4 -->
                        <div class="col-md-4">
                            <div class="text-right">
                                <span class="website-by">Website by <a href="http://www.silverless.co.uk/" target="_blank">Silverless</a></span>
                            </div><!-- /.text-right -->
                        </div><!-- /.col-md-4 -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.footer__second-stage -->
        </footer><!-- /.footer -->

        <div id="overlay-search">
            <div class="vertical-center">
                <div class="clearfix"></div><!-- /.clearfix -->
                <form action="<?php echo home_url( '/' ); ?>" class="searchform" id="searchform" method="get" role="search">
                    <input type="text" id="s" name="s" value="" placeholder="Search">
                    <button type="submit" id="searchsubmit"><i class="fa fa-search"></i></button>
                </form>
            </div><!-- /.vertical-center -->
            <button id="close"><i class="fa fa-times"></i></button>
        </div><!-- /#overlay-search -->

        <script src="<?php echo get_template_directory_uri(); ?>/scripts/scripts.min.js<?php echo '?' . filemtime( get_stylesheet_directory() . '/scripts/scripts.min.js'); ?>"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCfmuHSVdoHt6v_T1fRxvaNYEZqH1nZIlw"></script>

        <?php wp_footer(); ?>

        <script>
            new WOW().init();
        </script>

        <script src="https://use.fontawesome.com/4250061cbb.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
    </body>
</html>
