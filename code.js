var wordsloc = "https://raw.githubusercontent.com/bananatrooper52/word-finder/master/words.txt";
var wordstring;
var words;
var blanks = ["-", ".", " "];

$.ajax({
  async: true,
  type: "GET",
  url: wordsloc,
  success: function(str) {
    wordstring = str;
    wordstring = wordstring.slice(0, wordstring.indexOf("---") + "---".length);
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
  var word = $("#inputword").val();
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
    $("#answers").append("<p>" + results[i] + "</p>");
  }

  $("#answers").fadeIn(400);
}
