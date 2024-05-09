<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Notas::index');
$routes->post('/adicionar', 'Notas::adicionar');
$routes->post('/adicionar/(:num)', 'Notas::adicionar/$1');
$routes->post('/excluir/(:num)', 'Notas::excluir/$1');
