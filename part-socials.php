<ul>
    <?php if(get_field('twitter', 'option')): ?>
        <li>
            <a href="<?php the_field('twitter', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
    <?php if(get_field('youtube', 'option')): ?>
        <li>
            <a href="<?php the_field('youtube', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-youtube" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
    <?php if(get_field('pinterest', 'option')): ?>
        <li>
            <a href="<?php the_field('pinterest', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-pinterest" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
    <?php if(get_field('facebook', 'option')): ?>
        <li>
            <a href="<?php the_field('facebook', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
    <?php if(get_field('instagram', 'option')): ?>
        <li>
            <a href="<?php the_field('instagram', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
    <?php if(get_field('linkedin', 'option')): ?>
        <li>
            <a href="<?php the_field('linkedin', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
    <?php if(get_field('google_plus+', 'option')): ?>
        <li>
            <a href="<?php the_field('google_plus+', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-google-plus" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
    <?php if(get_field('tumblr', 'option')): ?>
        <li>
            <a href="<?php the_field('tumblr', 'option'); ?>">
                <div class="vertical-center">
                    <i class="fa fa-tumblr" aria-hidden="true"></i>
                </div><!-- /.vertical-center -->
            </a>
        </li>
    <?php endif; ?>
</ul>
