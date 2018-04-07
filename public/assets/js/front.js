(function($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });
    //username = ''
    $(function() {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function() {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Scrolly.
        $('.scrolly').scrolly({
            offset: function() {
                return $header.height();
            }
        });

        $('.submit_login')
            .click(function(e) {
                console.log('jou')
                e.preventDefault();
                var username = $("input:first").val()
                console.log('username : ' + username);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/rest/login",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({ "user": username }),
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(data) {
                        if (data.statusText == "OK") {
                            window.location.replace("chose.html");
                            return;
                        }
                        console.log('error');
                        console.log(data);
                    }
                });
            })

        $(document).ready(function() {
            if (window.location.pathname == "/chose.html") {
                $.ajax({
                    type: "GET",
                    url: "http://localhost:3000/rest/getuser",
                    success: function(data) {
                        username = data;
                        var e = $('<div>Hello ' + data + '</div>');
                        $('#hello-message').append(e);

                        $('#loadingDiv')
                            .hide() // Hide it initially
                            .ajaxStart(function() {
                                $(this).show();
                            })
                            .ajaxStop(function() {
                                $(this).hide();
                            });

                        
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3000/rest/search",
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify({ "user": username }),
                            success: function(results) {
                                
                                $.get("../sectionTemplate.html", function(html_string){
                                  var template = html_string;
                                  Mustache.parse(template);   // optional, speeds up future uses
                                  var rendered = "";
                                  for (var i = 0; i < results.length; i++)  {
                                    rendered += Mustache.render(template, results[i]);
                                  }
                                  //console.log(rendered);
                                  $('#target').html(rendered);
                                },'html');
                              
                            }
                        });
                      }
                });
            }
        });


        // Menu.
        $('#menu')
            .append('<a href="#menu" class="close"></a>')
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'right'
            });

    });

})(jQuery);