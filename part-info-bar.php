<div class="info-bar">
    <div class="container">
        <div class="row">
            <div class="col-md-4 hidden-sm hidden-xs">
                <div class="circled-social-icons circled-social-icons--grey">
                    <?php get_template_part('part', 'socials'); ?>
                </div><!-- /.circled-social-icons circled-social-icons--grey -->
                <div class="clearfix"></div><!-- /.clearfix -->
            </div><!-- /.col-md-4 col-sm-6 -->
            <div class="col-md-8">
                <div class="breadcrumbs pull-right" typeof="BreadcrumbList" vocab="http://schema.org/">
                	<?php if(function_exists('bcn_display')) bcn_display(); ?>
                </div><!-- /.breadcrumbs pull-right -->
            </div><!-- /.col-md-8 -->
        </div><!-- /.row -->
    </div><!-- /.container -->
</div><!-- /.info-bar -->
