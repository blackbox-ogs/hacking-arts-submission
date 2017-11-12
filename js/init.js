
// ON PAGE LOAD
(function($){
    $(function(){

        var state = 'home';

        //STATE CHANGE DEFINITOIN
        function stateChecker(){
           if (state=='say'){
            $('.state').hide();
            $('.state.say').show();
          }
          else if (state=='explore'){
            $('.state').hide();
            $('.state.explore').show();
          }
          else if (state=='recording'){
            $('.state').hide();
            $('.state.recording').show();
          }
          else if (state=='submission'){
            $('.state').hide();
            $('.state.submission').show();
          }
          else if (state=='listen'){
            $('.state').hide();
            $('.state.listen').show();
          }
        };

        //STATE CHANGE TRIGGER
        $('.home .top.row').on('click', function(){
          state = 'say';
          stateChecker();
        });
        $('.home .bottom.row').on('click', function(){
          state = 'explore';
          stateChecker();
        });
        //INSERT FUNCTION TO SUBMIT TO START RECORDING
        $('.say .middle.row.initial').on('click', function(){
          state = 'recording';
          stateChecker();
        });
        $('.recording .stop-button').on('click', function(){
          state = 'submission';
          stateChecker();
        });
        //INSERT FUNCTION TO SUBMIT TO S3
        $('.submission .submit-button').on('click', function(){
          state = 'listen';
          stateChecker();
        });


        //INSERT FUNCTION TO PAUSE
        $('.playback.pause').on('click', function(){
          $(this).removeClass('pause').addClass('resume');
          $('.playback-text').html('<i class="material-icons middle-icon">play_arrow</i>resume');
        });

       //INSERT FUNCTION TO RESUME
        $('.playback.resume').on('click', function(){
          console.log('yooyooy');
          $(this).removeClass('resume').addClass('pause');
          $('.playback-text').html('<i class="material-icons middle-icon">pause</i>pause');
        });


    }); // end of document ready
})(jQuery); // end of jQuery name space
