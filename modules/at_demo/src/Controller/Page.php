<?php

namespace Drupal\at_demo\Controller;

use Drupal\at_demo\Utility\DescriptionTemplateTrait;

/**
 * Simple page controller for drupal.
 */
class Page {

  use DescriptionTemplateTrait;

  /**
   * {@inheritdoc}
   */
  public function getModuleName() {
    return 'at_demo';
  }

}
