//funzioni--------

function random_int_number(min, max) {
  return Math.floor(Math.random() * (max - min +  1) + min);
}

//creazione del codice alfanumerico
function code_generator(n) {
  var letters = ['a','b','c','d','e','f','g','h','i','l','m','n','o','p','q','r','s','t','u','v','z'];
  var numbers = [1,2,3,4,5,6,7,8,9,0];
  var arr = [];
  for (var i = 0; i < (n/2); i++) {
    var pos = letters[random_int_number(0, letters.length - 1)]
    var res = pos.toUpperCase(pos);
    arr.push(res)
  }
  for (var i = 3; i < n; i++) {
    arr.push(numbers[random_int_number(0, numbers.length - 1)])
  }
  // console.log(arr);
  var str = arr.join('')
  // console.log(str);
  return str
}

function cifre_decimali(x) {
  return Number.parseFloat(x).toFixed(2);
}

//---------------------------------
//creazione degli oggetti giocatore, tutti in un array

var giocatori = [];

for (var i = 0; i < 100; i++) {

  var gioc = {
    'codice' : '',
    punti : 0,
    rimbalzi : 0,
    falli : 0,
    perc_tiri2 : 0,
    perc_tiri3 : 0,
  };

  gioc.codice = code_generator(6);
  gioc.punti = random_int_number(0, 60);
  gioc.rimbalzi = random_int_number(0, 50);
  gioc.falli = random_int_number(0, 20);

  //questa parte riguarda la generazione della percentuale (ovviamente casuale) di tiri da 2 e di tiri da 3.
  var tiri2 = (gioc.punti - random_int_number(0, gioc.punti)) / 2;
  var tiri3 = (gioc.punti - tiri2*2) / 3;
  gioc.perc_tiri2 = cifre_decimali((tiri2/(gioc.punti/2)) * 100) + '%';
  gioc.perc_tiri3 = cifre_decimali((tiri3/(gioc.punti/3)) * 100) + '%';


  // console.log(tiri2 + ' tiri2, ' + i);
  // console.log(tiri3 + ' tiri3, ' + i);
  // console.log(gioc.perc_tiri2 + ' % tiri2, ' + i);
  // console.log(gioc.perc_tiri3 + ' % tiri3, ' + i);
  console.log(gioc.codice);
  //infine pusho l'oggetto creato nell array.
  giocatori.push(gioc)

  //handlebars-----
  var template_base = $('#my-template').html();
  var template = Handlebars.compile(template_base);

  var context = {
    codice: gioc.codice,
  };

  var html = template(context);

  $('.sidebar').append(html)
  //-------------
}

//al clicl sui codici nella lista, faccio saltare fuori i valori del giocatore sulla destra.
$('.entry h1').click(function(event) {
      var code = $(this).text()
      $('.title h1').text('Player code: '  + code)

      for (var i = 0; i < giocatori.length; i++) {
        var gioc = giocatori[i];
        if (code == gioc['codice'] || code == gioc['codice'].toLowerCase()) {
          // scelto.push(gioc)
          var mioGioc = gioc;
          console.log(mioGioc);

          //handlebars------
          var template_base = $('#my-template-2').html();
          var template = Handlebars.compile(template_base);

          var html_2 = template(mioGioc);
          console.log(html_2);

          $('.contMail .entry').hide();
          $('.contMail').append(html_2)

          //-------------
        }
      }
});
