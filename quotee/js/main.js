$(document).ready(function() {
  var $authorQuote = $("#quote");
  var $authorName = $("#author-name");
  var $authorName = $("#author-photo");
  const tweet = document.querySelector('#tweet');
  var quoteArr = [
    ['collier.jpg','Success is the sum of small efforts, repeated day in and day out.','Robert J. Collier'],
    ['wiesel.jpg','Just as man cannot live without dreams, he cannot live without hope. If dreams reflect the past, hope summons the future.', 'Elie Wiesel'],
    ['garyvee.jpeg','Being Yourself Always Plays Out.', 'Garyvee'],
    ['zappa.jpg','Art is making something out of nothing and selling it.', 'Frank Zappa'],
    ['france.jpg','If the path be beautiful, let us not ask where it leads.', 'Anatole France'],
    ['hubbard.jpg','Life in abundance comes only through great love.', 'Elbert Hubbard'],
    ['garyvee.jpeg','Excuses are the currency that allow you to not act.', 'Garyvee'],
    ['einstein.jpg','Imagination is more important than knowledge.', 'Albert Einstein']
  ];

  $('#generate-btn').click(function() {

    $.ajax({
      url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
      type: 'GET',
      dataType: 'jsonp',
      success(response) {
        $('#quote').html(response.quoteText);
        $('#author-name').html(response.quoteAuthor);
        if (response.quoteAuthor) {
          tweet.href = `https://twitter.com/home/?status=${response.quoteText} -${response.quoteAuthor}`;
        } else {
          tweet.href = `https://twitter.com/home/?status=${response.quoteText}`;
        }
      },
      error(jqXHR,status,errorThrown) {
        var random = Math.floor(Math.random()*quoteArr.length);
        var photo = quoteArr[random][0];
        $authorPhoto.css('background-image','url(data/' + photo + ')');
        $authorQuote.html(quoteArr[random][1]);
        $authorName.html(quoteArr[random][2]);
        tweet.href = `https://twitter.com/home/?status=${quoteArr[random][0]} -${quoteArr[random][1]}`;
        quoteArr.splice(random,1);
        if (quoteArr.length < 1) {
          $authorQuote.html('Sorry, No More Quotes.<br>');
          $authorName.html('Please Reload to View Again.');
          $authorPhoto.css('background-image','url(data/brain.jpg)');
        }
      }
    });
  });
});
