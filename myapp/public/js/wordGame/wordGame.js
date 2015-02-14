function WordGame() {
    var m_currentGameId = 0;
    var m_guesses = [];
    var m_message = "";

    var m_guessAreaElement = $('.guesses');
    var m_messageElement = $('.messages');
    var m_selectedLetters = [];

    var numOccurences = function(arr, target) {
        return $.grep(arr, function (elem) {
            return elem === target;
        }).length;
    };

    var isValidGuess = function(guess) {
        if (guess.length != 5) { return false; }
        for (var letter in guess) {
            if (numOccurences(guess, guess[letter]) > 1) { return false; }
        }
        for (var oldGuess in m_guesses) {
            if (m_guesses[oldGuess].word == guess) { return false; }
            var localOcc = 0;
            for (var letter in guess) {
                localOcc += numOccurences(m_guesses[oldGuess].word, guess[letter]);
            }
            if (localOcc != m_guesses[oldGuess].num) { return false; }
        }
        return true;
    };

    var createGuessElement = function(word, correctLetters) {
        var wordElement = $('<div class="word"/>', {id: word});
        wordElement.append( $('<div class="correctNum">'+correctLetters+'</div>') );
        for (letter in word) {
            wordElement.append( $('<div class="letter '+word[letter]+'">'+word[letter]+'</div>') );
        }
        return wordElement;
    };

    var renderGuesses = function() {
        m_guessAreaElement.empty();
        for (var guess in m_guesses) {
            m_guessAreaElement.append(createGuessElement(m_guesses[guess].word, m_guesses[guess].num));
        }

        for (var selectedLetter in m_selectedLetters) {
            $("."+m_selectedLetters[selectedLetter].replace(" ",".")).addClass('selected');
        }

        // Set letter onclicks
        var letterElements = $('.letter');
        letterElements.click(function(e){
            var target = $(e.target);
            if (target.hasClass("selected")) {
                target.removeClass("selected");
                var letterClass = e.target.className;
                m_selectedLetters.splice(m_selectedLetters.indexOf(letterClass), 1);
            }
            else {
                var letterClass = target.attr('class');
                m_selectedLetters.push(letterClass);
            }
            renderGuesses();
        });
    };

    var getUserName = function() {
        return $(".userName").val();
    };

    var updateFromServer = function(userGuess) {
        $.ajax({
            dataType: "json",
            url: "/wordGameAjax",
            data: {guess: userGuess, user: getUserName()},
            success: function(data) {
                if( data.currentGameId == m_currentGameId ){
                    m_guesses = data.guesses;
                    renderGuesses();
                }
                else {
                    m_selectedLetters = [];
                    m_currentGameId = data.currentGameId;
                    m_guesses = data.guesses;
                    renderGuesses();
                }
                m_messageElement.text(data.message);
            }
        });
    };

    this.update = function() {
        updateFromServer();
    };

    this.makeGuess = function(guess) {
        updateFromServer( guess );
    };
}

$(document).ready((function(){
    var w = new WordGame();

    var inputElement = $('.userGuess');

    if( !inputElement.length ){
        return;
    }

    inputElement.keypress(function(e){
        if (e.which == 13 || e.keyCode == 13) {
            w.makeGuess(inputElement.val().toLowerCase());
        }
    });

    w.update();

    console.log("interval");
    var interval = setInterval(function(){
        w.update();
    }, 1000);
}));
