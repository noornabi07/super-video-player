<?php
$id = wp_unique_id( 'svpVideoPlayer-' );



foreach($attributes['videos'] as $video){
    if(pathinfo($video['src'], PATHINFO_EXTENSION) === 'm3u8'){
        wp_enqueue_script('hls');
    }else if(pathinfo($video['src'], PATHINFO_EXTENSION) === 'mpd'){
        wp_enqueue_script('dash' );
    }
}

?>
<div <?php echo get_block_wrapper_attributes(); ?> id='<?php echo esc_attr( $id ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>