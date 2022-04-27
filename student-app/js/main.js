
"use strict";
var Dashboard = function () {
  var global = {
    tooltipOptions: {
      placement: "right"
    },
    menuClass: ".c-menu"
  }; 
  var menuChangeActive = function menuChangeActive(el) {
    var hasSubmenu = $(el).hasClass("has-submenu");
    $(global.menuClass + " .is-active").removeClass("is-active");
    $(el).addClass("is-active");
  };
  var sidebarChangeWidth = function sidebarChangeWidth() {
    var $menuItemsTitle = $("li .menu-item__title");
    $("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
    $(".hamburger-toggle").toggleClass("is-opened");
    if ($("body").hasClass("sidebar-is-expanded")) {
      $('[data-toggle="tooltip"]').tooltip("destroy");
    } else {
      $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
    }
  };
  return {
    init: function init() {
      $(".js-hamburger").on("click", sidebarChangeWidth);
      $(".js-menu li").on("click", function (e) {
        menuChangeActive(e.currentTarget);
      });
      $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
    }
  };
}();
Dashboard.init();


/**
 * Element.requestFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Element.prototype.requestFullscreen) {
    Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
  }
  
  /**
   * document.exitFullScreen() polyfill
   * @author Chris Ferdinandi
   * @license MIT
   */
  if (!document.exitFullscreen) {
      document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
  }
  
  /**
   * document.fullscreenElement polyfill
   * Adapted from https://shaka-player-demo.appspot.com/docs/api/lib_polyfill_fullscreen.js.html
   * @author Chris Ferdinandi
   * @license MIT
   */
  if (!document.fullscreenElement) {
  
      Object.defineProperty(document, 'fullscreenElement', {
          get: function() {
              return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
          }
      });
  
      Object.defineProperty(document, 'fullscreenEnabled', {
          get: function() {
              return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
          }
      });
  }
  
  document.addEventListener('click', function (event) {
  
      // Ignore clicks that weren't on the toggle button
      if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
  
      // If there's an element in fullscreen, exit
      // Otherwise, enter it
      if (document.fullscreenElement) {
          document.exitFullscreen();
      } else {
          document.documentElement.requestFullscreen();
      }
  
  }, false);
    
