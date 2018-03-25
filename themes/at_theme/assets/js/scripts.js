
/**
 * @file
 * Contains js for same page tab functionality (sticky & collapsed on mobile).
 */

(function ($) {
  Drupal.behaviors.opVideos = {
    attach: function() {
      // Attach the behaviour only after all slideshows on the page initialized.
      if ($(".paragraph--slideshow").length > 0) {
        var ready = false;
        var readyCount = 0;
        var countSlideshows = $(".paragraph--slideshow").length;

        $(window).on("op-slideshow-ready", function() {
          if (!ready) {
            readyCount++;
            if (readyCount === countSlideshows) {
              ready = true;
              $('body').once('op-videos').each(function() {
                Drupal.behaviors.opVideos.initialize();
              });
            }
          }
        });
      }
      else {
        $('body').once('op-videos').each(function() {
          Drupal.behaviors.opVideos.initialize();
        });
      }
    },
    initialize: function() {
      // Check if it's iOS Safari.
      // For iOS Safari for video slide we don't show video thumbnail.
      // Instead we show video player. It's needed because iOS Safari
      // doesn't support API call to start playing video.
      var isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      // Array of youtube player objects we need to control on.
      // The key is iframe id attribute value and the value is player object.
      var players = [];

      // Get count of videos in the gallery.
      var countVideos = $('.video iframe').length;

      // Array with #id of youtube iframes.
      var playerRefs = [];

      // We are getting #ids here because slick slider populates
      // some of slides for its purposes. So on the moment when
      // Youtube API is ready some of iframes might be cloned with
      // empty #id.
      $('.video iframe').each(function(index) {
        var attr = 'video-' + index;
        $(this).attr('data-id', attr);
        playerRefs.push(attr);
      });

      // If there are any videos on the page
      if (countVideos > 0) {

        // Load youtube iframe api script so that we can control video players.
        $.getScript("https://www.youtube.com/iframe_api", function() {

          // On youtube API ready
          window.onYouTubeIframeAPIReady = function() {

            function onPlayerStateChange(e, currentPlayerRef) {
              if (e.data === window.YT.PlayerState.PLAYING) {
                // Pause all videos on the page which started playing.
                for (var playerRef in players) {
                  // If video started playing, pause it.
                  if ((playerRef !== currentPlayerRef) && (players[playerRef].getCurrentTime() > 0)) {
                    players[playerRef].pauseVideo();
                  }
                }
              }
            }

            // On player is ready.
            function onPlayerReady() {
              countVideos--;
              // If all players are ready trigger youtube ready event.
              if (countVideos === 0) {
                // Trigger custom event to notify listeners that all players are ready to be used.
                $(window).trigger("op-youtube-ready");
              }
            }

            // Create player object for each existing youtube iframe on the page,
            // add it to players array. Also attach onReady event so that
            // we can be sure that all players were initialized we can control them.
            $.each(playerRefs, function( index, playerRef ) {
              // Make the player refer to the existing <iframe> on the page.
              players[playerRef] = new window.YT.Player($('.video iframe[data-id="' + playerRef + '"]')[0], {
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': function(event) {
                    onPlayerStateChange(event, playerRef);
                  }
                }
              });
            });

            // Attach video behaviour.
            Drupal.behaviors.opVideos.videoProcess(isiOS, players);
          };
        });
      }
    },
    videoProcess: function(isiOS, players) {
      if ($('.video').length > 0) {

        // On iOS hide video play ico forever.
        if (isiOS) {
          $('.video').addClass('ios');
        }

        // Is youtube API ready.
        var youtubeAPIready = false;

        // Flag which prevents setTimeout from running twice or more times when youtube API is not
        // ready and after user already clicked on video play icon so setTimeout is already run.
        var isTimeoutRun = false;

        $(window).on("op-youtube-ready", function() {
          youtubeAPIready = true;
        });

        // Process click on video play icon.
        var clickVideoPlayIcon = function(players, video) {
          $(video).addClass('video-player-shown');

          // Start playing the video.
          var playerRef = $(video).find('iframe').attr('data-id');

          // Start playing video.
          players[playerRef].playVideo();
          players[playerRef].setPlaybackQuality('hd720');
        };

        $(window).on("op-youtube-stop-video", function(e, data) {
          if (youtubeAPIready) {
            // Stop playing the video.
            var playerRef = $(data.video).find('iframe').attr('data-id');

            // If video started playing, pause it.
            if (players[playerRef].getCurrentTime() > 0) {
              players[playerRef].pauseVideo();
            }
          }
        });

        // Event handler on clicking on video play ico.
        $('.video .play-icon').click(function() {
          // If API is ready, process click.
          if (youtubeAPIready) {
            clickVideoPlayIcon(players, $(this).parents('.video'));
          }
          // If youtube API is NOT ready, try to check API in 0.5 sec and if API is ready,
          // process clicking on video player ico.
          // Also check if timer has been run in order not to run it again and again.
          else if (!youtubeAPIready && !isTimeoutRun) {
            // Set flat that timer is run.
            isTimeoutRun = true;

            // Set timer for 0.5 sec
            setTimeout(function() {
              if (youtubeAPIready) {
                clickVideoPlayIcon(players, $(this).parents('.video'));
              }
            }, 500);
          }

        });
      }
    }
  };
})(jQuery);

//# sourceMappingURL=scripts.js.map
