(function(){
    var app = angular.module('tweetFeed', []);


    app.controller("tweetController", ["$http", function($http){
        var instas = this;
        var instaAPI = "https://api.instagram.com/v1/tags/bbog/media/recent";
        var config = {
            params: {
                client_id: "c4cf1b77f3df45eba7e518a487332c09",
                callback: "JSON_CALLBACK"
            }
        };

        $http.jsonp(instaAPI, config).success(function(data){
          instas.results = data.data;
          instas.next_page = data.pagination.next_url;
        });

        this.selected = {};

        this.isSelected = false;

        this.selectInsta = function(val){
            this.selected = val;
            this.isSelected = true;
        };

        this.unselectInsta = function(){
            this.selected = {};
            this.isSelected = false;
        };

        this.moreInstas = function(){
            $http.jsonp(instas.next_page, config).success(function(data){
                instas.results.push.apply(instas.results, data.data);
                instas.next_page = data.pagination.next_url;
            });

        };

    }]);

})();

