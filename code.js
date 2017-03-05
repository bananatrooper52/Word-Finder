var wordsloc = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
var wordstring;
var words;

$.ajax({
  async: true,
  type: "GET",
  url: wordsloc,
  success: function(str) {
    wordstring = str;
    words = str.split(/\s+/);
    $("#loadscreen").fadeOut(400);
    $("#main").fadeIn(400);
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
  $("#answers").html("<h3>Possible words: </h3>");

  for(var i = 0; i < words.length; i++) {
    var add = true;
    if(words[i].length != word.length) continue;
    for(var j = 0; j < word.length; j++) {
      if(word.charAt(j) == "-") continue;
      if(words[i].charAt(j) != word.charAt(j)) {
        add = false;
        break;
      }
    }
    if(add) results.push(words[i]);
  }

  for(var i = 0; i < results.length; i++) {
    $("#answers").append("<p>" + results[i] + "</p>");
  }

  $("#answers").fadeIn(400);
}
