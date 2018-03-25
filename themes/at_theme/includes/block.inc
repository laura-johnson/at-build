<?php

/**
 * @file
 * Preprocess block functions.
 */
use Drupal\block\Entity\Block;

/**
 * Implements hook_theme_suggestions_HOOK_alter() for blocks.
 */
function at_theme_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  $bundle = '';
  if (isset($variables['elements']['content']['#block_content'])) {
    $bundle = $variables['elements']['content']['#block_content']->bundle();
  }

  // Add per region block theme hook suggestions.
  if (!empty($variables['elements']['#id'])) {
    $block = Block::load($variables['elements']['#id']);
    $suggestions[] = 'block__' . $block->getRegion();
    if ($bundle) {
      $suggestions[] = 'block__' . $bundle;
      $suggestions[] = 'block__' . $block->getRegion() . '__' . $bundle;
    }
    $suggestions[] = 'block__' . $block->getRegion() . '__' . $variables['elements']['#id'];
  }
 return $suggestions;
}
