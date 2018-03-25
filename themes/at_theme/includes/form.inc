<?php

/**
 * @file
 * Preprocess form functions.
 */
use Drupal\Core\Form\FormStateInterface;

function at_theme_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Prepare data for form item theme hook suggestions.
  $form_id = $name = str_replace('-', '_', $form['#id']);
  $form['actions']['data-twig-suggestion'] = $form_id;
  $form['actions']['submit']['#attributes']['data-twig-suggestion'] = $form_id;
  $form['keys']['#attributes']['data-twig-suggestion'] = $form_id;
}


/**
 * Implements hook_theme_suggestions_HOOK_alter() for form templates.
 */
function at_theme_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];

  // Add per form theme hook suggestion.
  $suggestions[] = 'form__' . $element['#form_id'];
}


/**
 * Implements hook_theme_suggestions_HOOK_alter() for container templates.
 */
function at_theme_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];

  // Add per type theme hook suggestion.
  $suggestions[] = 'container__' . $element['#type'];

  // Add per form theme hook suggestion.
  if (isset($element['data-twig-suggestion'])) {
    $suggestions[] = 'container__' . $element['#type'] . '__' . $element['data-twig-suggestion'];
  }
}


/**
 * Implements hook_theme_suggestions_HOOK_alter() for form element templates.
 */
function at_theme_theme_suggestions_form_element_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];

  // Add per type theme hook suggestion.
  $suggestions[] = 'form_element__' . $element['#type'];

  // Add per form theme hook suggestion.
  if (isset($element['#attributes']['data-twig-suggestion'])) {
    $suggestions[] = 'form_element__' . $element['#type'] . '__' . $element['#attributes']['data-twig-suggestion'];
  }
}


/**
 * Implements hook_theme_suggestions_HOOK_alter() for form input templates.
 */
function at_theme_theme_suggestions_input_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];

  // Add per form theme hook suggestion.
  if (isset($element['#attributes']['data-twig-suggestion'])) {
    $suggestions[] = 'input__' . $element['#type'] . '__' . $element['#attributes']['data-twig-suggestion'];
  }
}
