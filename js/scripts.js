$(document).ready(function () {
    // Compile Handlebars Templates
    var source1 = $("#template").html();
    var template = Handlebars.compile(source1);
    var source2 = $("#modal-template").html();
    var modal_template = Handlebars.compile(source2);

    var imagenumber;
    var lastphoto;

    // Function to Display Template
    function showtemplate(template, data) {
        var html = template(data);
        $('#content').html(html);
    }

    // Function to Navigate Right in Modal
    function goright() {
        if (imagenumber < lastphoto) {
            imagenumber = imagenumber + 1;
            var html = modal_template(data.images[imagenumber]);
            $('#modal-container').html(html);
            $("#imageModal").modal('show');
        }
        if (imagenumber >= lastphoto) {
            imagenumber = imagenumber - data.images.length;
            var html = modal_template(data.images[imagenumber]);
            $('#modal-container').html(html);
            $("#imageModal").modal('show');
        }
    }

    // Home Tab Click Event
    $('#home-tab').click(function () {
        showtemplate(template, data);
        lastphoto = data.images.length;

        // Function to Display Modal
        function displayModal(event) {
            imagenumber = $(this).data("id");
            var html = modal_template(data.images[imagenumber]);
            $('#modal-container').html(html);
            $("#imageModal").modal('show');

            // Enable Carousel Controls
            $("#Right").click(goright);
        }

        // Attach Click Event to Thumbnails
        $('.thumbnail').click(displayModal);
    });

    // Search Functionality
    $('#searchbox').keypress(function (e) {
        if (e.which == 13) {
            var home_search_text = $('#searchbox').val();
            var filterd_data = {
                images: data.images.filter(function (d) {
                    if (d.title.search(home_search_text) > -1) {
                        return true;
                    }
                    if (d.author.search(home_search_text) > -1) {
                        return true;
                    }
                    return false;
                })
            };
            var html = template(filterd_data);
            $('#content').html(html);

            // Function to Display Filtered Modal
            function display_Filtered_Modal(event) {
                var filteredimagenumber = $(this).data("id");
                var html = modal_template(filterd_data.images[filteredimagenumber]);
                $('#modal-container').html(html);
                $("#imageModal").modal('show');
            };
            $('.thumbnail').click(display_Filtered_Modal);
        }
    });

    // Initialize Home Tab
    $('#home-tab').click();
});