var script = function() {

    this.globalScript = function() {

            jQuery(window).on('resize', doThisInstead);

            function doThisInstead() {
                var width = $(window).width();
                var targetElement = $('div.search-heading').closest('form').find('ul').first();
                //$('div.search-heading h3').text(width);
                if (width > 991) {
                    if (!targetElement.is(':visible')) {
                        targetElement.css('display', 'block');
                    }
                }
            }

            /*
             $('div.search-heading')
             .find('.search-toggle')
             .click(function(){
             $(this)
             .closest('form')
             .find('ul')
             .first()
             .slideToggle()
             ;
             });
             */
            $('div.search-heading')
                .click(function() {
                    $(this)
                        .closest('form')
                        .find('ul')
                        .first()
                        .slideToggle();
                });

            /******************************************
             * SELECT2 //Chosen Responsive
             *******************************************/

            $(".chzn-select").select2({
                minimumResultsForSearch: Infinity,
                tags: true
            });

            //$('.chzn-search').hide();
            /*$$(".chzn-select").chosen({"allow_single_deselect":true, "disable_search": true});
             $('.chzn-search').hide();
             resizeChosen();
             jQuery(window).on('resize', resizeChosen);
             function resizeChosen() {
             $(".chzn-container").each(function() {
             $(this).attr('style', 'width: 100%');
             });
             }*/

            /******************************************
             * Mobile Navigation
             *******************************************/
            $("header .mobile-nav .burger").click(function() {
                $("header .mobile-nav .navigation").animate({
                    left: "0"
                }, 100, function() {
                    $("header .mobile-nav .background-black").css({
                        display: "block"
                    });
                    $("header .mobile-nav .background-black").animate({
                        "opacity": "1"
                    }, 200);
                });
                return false;
            });

            $("header .mobile-nav .background-black").click(function() {
                $("header .mobile-nav .background-black").animate({
                    "opacity": "-0"
                }, 100, function() {
                    $(this).css({
                        display: "none"
                    });
                    $("header .mobile-nav .navigation").animate({
                        left: "-300px"
                    }, 100);
                });
                return false;
            });

            /******************************************
             * Footer menu toggle
             *******************************************/
            $('.footer-box').each(function() {
                if ($(window).width() < 447) {
                    var box = $(this);
                    var header = $(this).find('h3');
                    var list = $(this).find('ul');
                    header.click(function() {
                        box.toggleClass('open');
                    });
                }
            });
        },


        /******************************************
         * Home page slider
         *******************************************/
        this.homePage = function() {
            var slickMain = {
                infinite: false,
                slidesToShow: 1,
                autoplay: false,
                autoplaySpeed: 6000,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                fade: false,
                focusOnSelect: true
            };
            $('.home-slider').slick(slickMain);
        },


        /******************************************
         * Google Maps
         *******************************************/
        this.mapDisplay = function(latitude, longitude, id, zoom, json) {
            function initMap() {
                // Specify features and elements to define styles.
                var styleArray = [{
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#444444"
                        }]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#f2f2f2"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "poi.business",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{
                            "saturation": -100
                        }, {
                            "lightness": 45
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#b4d4e1"
                        }, {
                            "visibility": "on"
                        }]
                    }
                ];

                var isDraggable = $(document).width() > 1024 ? true : false;
                var myLatLng = {
                    lat: latitude,
                    lng: longitude
                }

                // Create a map object and specify the DOM element for display.
                var map = new google.maps.Map(document.getElementById(id), {
                    center: myLatLng,
                    scrollwheel: false,
                    // Apply the map style array to the map.
                    styles: styleArray,
                    draggable: isDraggable,
                    zoom: zoom
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: 'Riusech Real Estate',
                    icon: '/assets/images/map-pin.svg'
                });

                if (typeof json != 'undefined' && json) {
                    htmldata = JSON.parse(json);
                    html = '';
                    if (htmldata.city) html += htmldata.city + '<br>';
                    if (htmldata.state) html += htmldata.state + ' ';
                    if (htmldata.zip) html += htmldata.zip + '<br>';
                    if (htmldata.address) html += htmldata.address;
                    var infowindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(html);
                        infowindow.open(map, marker);
                    });
                }
            }

            google.maps.event.addDomListener(window, 'load', initMap);

        },


        /******************************************
         * Property page image slider
         *******************************************/
        this.propertySlider = function() {

            $('.property-photos-slider').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                adaptiveHeight: false,
            });

            $('.property-thumbs-slider').slick({
                infinite: false,
                dots: false,
                arrows: false,
                centerMode: false,
                focusOnSelect: true,
                rows: 4,
                slidesPerRow: 5,
                responsive: [

                    {
                        breakpoint: 415,
                        settings: {
                            slidesPerRow: 2,
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesPerRow: 3,
                        }
                    },
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesPerRow: 4,
                        }
                    }
                ]
            });

            // Open the lighbox when clicking on the tour this property button
            $('.show-photos').click(function() {
                $(".property-photos-slider #slider-photo-0.fancy-img").trigger('click');
            });


            // Link the grid gallery with the slider
            $('.slick-slide div div img').click(function() {
                $(".property-photos-slider" + " #slider-" + this.id + ".fancy-img").trigger('click');
            });


            $(document).ready(function() {
                $("a.fancy-img").fancybox({
                    fitToView: false,
                    beforeShow: function() {
                        //this.width = 1920;
                        //this.height = 1280;
                    }
                });

                $(".fancy-iframe").fancybox({
                    width: 719,
                    height: 480,
                    autoScale: false,
                    transitionIn: 'none',
                    transitionOut: 'none',
                    type: 'iframe',
                    scrolling: 'no',
                    centerOnScroll: true, // and not 'true',
                    autoCenter: true // and not 'true'
                });

            });

        },


        /******************************************
         * Contact form
         *******************************************/
        this.ajax_form = function() {

            $('.ajax-form').each(function() {
                var form = $(this);

                form.submit(function(e) {
                    e.preventDefault();

                    var form_url = form.data('action') ? form.data('action') : 'ajax.php';
                    var form_data = form.serialize();

                    // disable feilds
                    var btntxt = form.find('input[type="submit"]').val();
                    var btntxt_onprocess = form.find('input[type="submit"]').data('processtxt');
                    var btntxt_onprocess = !btntxt_onprocess ? 'Sending...' : btntxt_onprocess;
                    form.find('input[type="submit"]').val(btntxt_onprocess);
                    form.find('.input-editable').attr('disabled', 'disabled');

                    form.find('.notif').html('');

                    $.post(form_url, form_data, function(data) {
                        var obj = JSON.parse(data);

                        // show notification
                        form.find('.notif').html(obj.alert);

                        // re-enable feilds
                        form.find('.input-editable').removeAttr('disabled');
                        form.find('input[type="submit"]').val(btntxt);

                        // clear textboxes
                        if (obj.status == 'success') {
                            form.find('.input-editable').val('');
                        }

                    });
                })

            });
        },


        /******************************************
         * Search map modal
         *******************************************/
        this.searchMapModal = function() {
            /*
             $('.show-modal_map').click(function(e){
             e.preventDefault();

             var list_id = $(this).attr('href');
             var magjs = '/assets/js/map-modal.js';

             $('#current_query').val($(list_id).val());
             $('#current_singular').val('');
             $('#current_elem_id').val('property_map');

             var map_query = $('#current_query').val();

             // clear map
             $('#property_map').html('');

             $('#property_map_modal').modal();

             setTimeout(function(){
             if (! map_query)
             {
             $('#property_map').html('<h4>Map of the selected property is not available.</h4>');
             } else {
             $.getScript( magjs );
             }
             }, 200);

             });
             */
            var list_id = "#map_queries";
            var magjs = '/assets/js/map-modal.js';
            $('#current_query').val($(list_id).val());
            $('#current_singular').val('');
            $('#current_elem_id').val('property_map');
            var map_query = $('#current_query').val();
            $.getScript(magjs);
        }

}


/******************************************
 * Smooth scroll to all links
 *******************************************/
$(document).ready(function() {
    // Add smooth scrolling to all links
    if ($('.icon-wrap').css('display') === 'block') {
        $(".search-heading").on('click', function(event) {

            $('html,body').animate({
                scrollTop: $(this).offset().top - 20
            }, 800);

        });
    }
});


/******************************************
 * Open modal
 *******************************************/
function openModal(element) {

    // check if the element is already active
    // close it if it is
    if ($("#" + element).hasClass("active")) {
        $("#" + element).removeClass("active");

    } else {
        $("#" + element).addClass("active");

        setTimeout(function() {
            closeModal(element);
        }, 100)
    }

}

function closeModal(element) {

    $(document).click(function(e) {
        //if you click on anything except the modal itself, close the modal
        if (!$(e.target).closest("#share-buttons").length) {
            $("#" + element).removeClass("active");

            // remove event listener
            $(document).off("click");
            $(window).off("keyup");
        }
    });

    $(document).on({
        'touchend': function(e) {
            //if you tap on anything except the modal itself, close the modal
            if (!$(e.target).closest("#share-buttons").length) {
                $("#" + element).removeClass("active");

                // remove event listener
                $(document).off("click");
                $(window).off("keyup");

            }
        }
    });

    // Close modal when click escape key
    window.onkeyup = function(event) {
        if (event.keyCode == 27) {
            $("#" + element).removeClass("active");

            // remove event listener
            $(document).off("click");
            $(window).off("keyup");
        }
    }
}


/******************************************
 * Copy to clipboard
 *******************************************/
function copyToClipboard() {

    var copyText = document.getElementById("id_url");
    copyText.select();
    document.execCommand("copy");

    // check page language
    var lang = $("html").closest('[lang]').attr('lang');

    // get original text
    var initialText = $("#copyLink span").html();

    // change confirmation text depending on language
    switch (lang) {
        case "en":
            $("#copyLink span").html("Link copied");
            break;
        case "es":
            $("#copyLink span").html("Enlace copiado");
            break;
            // default:
            //     $("#copyLink span").html("Link copied");
    }

    // revert to original text
    setTimeout(function() {
        $("#copyLink span").html(initialText);
    }, 3000)
}


/******************************************
 * Print property page
 *******************************************/
function printPage() {
    // Setting the value originally, remember the previous value first:
    window.document.previousTitle = document.title;
    window.document.title = '\u00A0';

    window.print();

    // Restoring the previous title:
    window.document.title = document.previousTitle;
    window.document.previousTitle = undefined;
}