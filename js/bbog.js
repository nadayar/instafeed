$(document).ready(function(){
    var instaAPI = "https://api.instagram.com/v1/tags/bbog/media/recent?callback=?";

    var params = {client_id: "c4cf1b77f3df45eba7e518a487332c09"};

    var results;

    var instaCallback = function(response){
        // console.log(response);
        results = response.data;
        instaAPI = response.pagination.next_url + "&callback=?";
        // console.log(results);
        $.each(results, function(index, result){
            var result_caption = "";
            if(result.caption !== null){
                result_caption = result.caption.text;
            }
            var result_thumbnail = result.images.thumbnail.url;
            var result_image = result.images.standard_resolution.url;

            var photo_div = '<div class="col-md-2">' +
                            '<div class="thumbnail">' +
                            '<img src=' + result_thumbnail + 'alt="...">' +
                            '<p class="hidden_p">' + result_image + '</p>' +
                            '<p class="hidden_p">' + result_caption + '</p>' +
                            '</div></div>'
                            ;

            $("#insta_results").prepend(photo_div);

        });


        $("#insta_results img").click(function(){
            var selected_img =  $(this).next().text();
            var selected_cap = $(this).next().next().text();

            var selected_div = '<div >' +
                                '<div class="thumbnail thumbnail_overlay">' +
                                '<img src=' + selected_img + 'height="400" width="400">' +
                                '<div class="caption">' +
                                '<p>' + selected_cap + '</p>' +
                                '</div></div></div>'
                                ;

            $("#insta_selected").html(selected_div);
            $(".overlay").show("slow");

        });

    };

    var more_div = '<div class="col-md-2">' +
                        '<button id= "more_btn" class="thumbnail btn btn-danger" style="height:160px; width:180px; background-color:transparent;">' +
                        'More Images' +
                        '</button></div>'
                        ;

    $("#insta_results").prepend(more_div);
    $("#more_btn").click(function(){
        $.getJSON(instaAPI, params, instaCallback);
    });

    $(".overlay").click(function(){
        $(this).hide("slow");
    });

    


    $.getJSON(instaAPI, params, instaCallback);

});