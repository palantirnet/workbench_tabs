<?php

namespace Drupal\workbench_tabs\Element;

use Drupal\Core\Render\Element;
use Drupal\Core\Render\Element\RenderElement;

/**
 * Provides a render element for the local task tabs.
 *
 * @RenderElement("workbench_tabs_local_tasks")
 */
class LocalTasks extends RenderElement {

  /**
   * {@inheritdoc}
   */
  public function getInfo() {
    $class = get_class($this);

    return [
      '#pre_render' => [[$class, 'preRenderLocalTasks']],
      '#theme' => 'menu_local_tasks',
      '#primary' => '',
      '#secondary' => '',
    ];
  }

  /**
   * @param array $element
   *   A renderable array.
   *
   * @return array
   *  A renderable array.
   */
  public static function preRenderLocalTasks($element) {
    // This is a workaround for entity pages whose routes have been taken over by
    // Page Manager, which breaks local tasks by messing with route names.
    $route_name = \Drupal::routeMatch()->getRouteName();
    if (preg_match('/^entity\.[^\.]+\.canonical/', $route_name, $matches)) {
      $route_name = $matches[0];
    }

    /** @var \Drupal\Core\Menu\LocalTaskManagerInterface $manager */
    $manager = \Drupal::service('plugin.manager.menu.local_task');

    foreach (['#primary', '#secondary'] as $i => $key) {
      $tabs = $manager->getLocalTasks($route_name, $i);
      if (count(Element::getVisibleChildren($tabs['tabs'])) > 1) {
        $element[$key] = $tabs['tabs'];
      }
    }

    return $element;
  }

}
