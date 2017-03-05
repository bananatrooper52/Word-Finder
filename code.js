var wordsloc = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
var wordstring;
var words;
var blanks = ["-", ".", " "];

$.ajax({
  type: "GET",
  url: wordsloc,
  success: function(str) {
    wordstring = str;
    words = str.split(/\s+/);
    $("#loadscreen").fadeOut(400);
    $("#main").fadeIn(400);
  },
  error: function(XMLHttpRequest, s, e) {
    $("#loadscreen h1").fadeOut(function() {
      $(this).text("Could not load dictionary").fadeIn();
    });
  }
});

$("#word-form").submit(function() {
  showResults();
  return false;
});

function showResults() {
  word = $("#inputword").val();
  $("#inputword").val("");

  var results = [];

  for(var i = 0; i < words.length; i++) {
    var add = true;
    if(words[i].replace("'", "").length != word.replace("'", "").length) continue;
    for(var j = 0; j < word.length; j++) {
      if(word.charAt(j) == "-") continue;
      if(words[i].replace("'", "").charAt(j) != word.replace("'", "").charAt(j)) {
        add = false;
        break;
      }
    }
    if(add) results.push(words[i]);
  }

  $("#answers").html("<h3>Possible words (" + results.length + " matches): </h3>");

  for(var i = 0; i < results.length; i++) {
    $("#answers").append("<p><a target='_blank' href='http://www.dictionary.com/browse/" + results[i] + "?s=t'>" + results[i] + "</a><p>");
  }

  $("#answers").fadeIn(400);
}
