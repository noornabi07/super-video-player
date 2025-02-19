<?php

/**
 * Plugin Name: Video Player Noornabi
 * Description: Super Video Player – A powerful and customizable video player for WordPress.
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: svp
 */

// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}

// Constant
define('SVP_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0');
define('SVP_DIR_URL', plugin_dir_url(__FILE__));
define('SVP_DIR_PATH', plugin_dir_path(__FILE__));

if (!class_exists('SVPPlugin')) {
	class SVPPlugin
	{
		function __construct()
		{
			add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
			add_action('init', [$this, 'onInit']);
		}


		function enqueueBlockAssets()
		{
			// wp_register_script( 'plyrIoJS', SVP_DIR_URL . 'assets/js/plyr.js', [], '3.7.8' );
			wp_register_script('plyrIoJS', 'https://cdn.plyr.io/3.7.8/plyr.js', [], '3.7.8');
			wp_register_style('plyrIoCSS', 'https://cdn.plyr.io/3.7.8/plyr.css', [], '3.7.8');
			// wp_register_style( 'plyrIoCSS', SVP_DIR_URL . 'assets/css/plyr.css', [], '3.7.8' );

			wp_register_script('hls',SVP_DIR_URL . 'assets/js/hls.js',array(),SVP_VERSION,false);

			// wp_register_script('svp-shaka-js', SVP_DIR_URL . 'assets/js/shaka.js', array(), SVP_VERSION, false );
			wp_register_script('dash', SVP_DIR_URL . 'assets/js/dash.all.min.js', array(), SVP_VERSION, false );
		}

		function onInit()
		{
			register_block_type(__DIR__ . '/build');
		}
	}
	new SVPPlugin();
}
