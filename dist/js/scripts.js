/* Tabs
from https://codepen.io/tgallimore/pen/awGzD */
$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.tabs a').click(function(e){
  e.preventDefault();
    var $this = $(this),
        tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();
  
})

/* Legenda Fixa
From */
jQuery(function($) {
  function fixDiv() {
    var $cache = $('#getFixed');
    if ($(window).scrollTop() > 300 && $(document).width() > 768)
      $cache.css({
        'position': 'fixed',
        'top': '20px',
        'width': '200px'
      });
    else
      $cache.css({
        'position': 'relative',
        'top': 'auto'
      });
  }
  $(window).scroll(fixDiv);
  fixDiv();
});