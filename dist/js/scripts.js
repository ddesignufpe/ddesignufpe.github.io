/*Gerar cadeiras
from http://github.com/caiobsouza */
window.onload = function () {
  var data = $.getJSON("./dist/js/cadeiras.json", function (data) {
      for (var i in data) {
          var el = document.getElementById(data[i].code);
          if (el) {
              var html = getDisciplina(data[i]);
              el.innerHTML += html;
          }
      }
  });

}

function getDisciplina(data) {
  if(data.ementa !== ""){
    return `<div class="grupo ${data.eixo}">
                <div class="codigo">
                    <span>${data.code}</span><span>${data.siga}</span>
                </div>
                <div class="conteudo">
                    <h4>${data.name}</h4>
                    <p class="professor">${data.teacher}</p>
                    <p class="ciclo">Ciclo ${data.ciclo}</p>
                    <p class="vagas">${data.vagas} vagas</p>
                    <p class="local">${data.local}</p>
                    <a href="http://${data.ementa}" target="_blank">
                        <button>Ementa</button>
                    </a>
                </div>
            </div>`;
} else {
    return `<div class="grupo ${data.eixo}">
                <div class="codigo">
                    <span>${data.code}</span><span>${data.siga}</span>
                </div>
                <div class="conteudo">
                <h4>${data.name}</h4>
                <p class="professor">${data.teacher}</p>
                <p class="ciclo">${data.ciclo}</p>
                <p class="vagas">${data.vagas} vagas</p>
                <p class="local">${data.local}</p>
                </div>
            </div>`;
}
}

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
From https://stackoverflow.com/questions/8644248/fix-div-when-browser-scrolls-to-it*/
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