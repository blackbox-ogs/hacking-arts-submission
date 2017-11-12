// ON PAGE LOAD
(function ($) {

  let clock;

  let mediaRecorder;
  navigator.mediaDevices.getUserMedia({audio: true})
  .then(function (stream) {
    mediaRecorder = new MediaRecorder(stream);
    let chunks = [];
    console.log(mediaRecorder.state);

    /* get data */
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    /* on pause */
    mediaRecorder.onstop = function () {
      const blob = new Blob(chunks,
          {'type': 'audio/ogg; codecs=opus'});
      // not doing anything with the blob yet
    }

  }).catch(error => console.log(error));

  $(function () {

    var state = 'home';

    // play a track from s3
    function playATrack() {
      const sound = new Audio(
          "https://s3.amazonaws.com/voices-entwined/ZOOM0040_LR.WAV");
      sound.play();
    }

    //STATE CHANGE DEFINITOIN
    function stateChecker() {
      if (state == 'say') {
        $('.state').hide();
        $('.state.say').fadeIn(300);
      }
      else if (state == 'home') {
        $('.state').hide();
        $('.state.home').fadeIn(300);
      }
      else if (state == 'explore') {
        $('.state').hide();
        $('.state.explore').fadeIn(300);
      }
      else if (state == 'recording') {
        $('.state').hide();
        $('.state.recording').fadeIn(300);
      }
      else if (state == 'submission') {
        $('.state').hide();
        $('.state.submission').show();
      }
      else if (state == 'listen') {
        $('.state').hide();
        $('.state.listen').fadeIn(300);
      }
    };

    //STATE CHANGE TRIGGER
    $('.home .top.row').on('click', function () {
      state = 'say';
      stateChecker();
    });

    $('.home .bottom.row').on('click', function () {
      state = 'explore';
      stateChecker();
    });

    //INSERT FUNCTION TO SUBMIT TO START RECORDING
    $('.say .middle.row.initial').on('click', function () {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      state = 'recording';
      stateChecker();
    });

    $('.recording .stop-button').on('click', function () {
      mediaRecorder.pause();
      console.log(mediaRecorder.state);
      state = 'submission';
      stateChecker();
    });

    //INSERT FUNCTION TO SUBMIT TO S3
    $('.submission .submit-button').on('click', function () {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      playATrack();
      state = 'listen';
      stateChecker();
    });

    $('.cancel-btn').on('click', function () {
      state = 'say';
      stateChecker();
    });

    //INSERT FUNCTION TO PAUSE
    $('.playback.pause').on('click', function () {
      if ($(this).hasClass('pause')) {
        $(this).removeClass('pause').addClass('resume');
        mediaRecorder.pause();
        console.log(mediaRecorder.state);
        $('.playback-text').html(
            '<i class="material-icons middle-icon">play_arrow</i>resume');
      } else if ($(this).hasClass('resume')) {
        $(this).removeClass('resume').addClass('pause');
        mediaRecorder.resume();
        console.log(mediaRecorder.state);
        $('.playback-text').html(
            '<i class="material-icons middle-icon">pause</i>pause');
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space