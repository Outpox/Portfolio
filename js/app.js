var app = new Vue({
    el: '#app',
    data: {
        age: '',
        currentLang: 'en',
        jsonData: {}
    },
    ready: function () {
        var self = this;

        self.age = self.getAge();

        if (localStorage.getItem("lang") == null) {
            localStorage.setItem("lang", self.currentLang);
        }
        else {
            self.currentLang = localStorage.getItem("lang");
        }
        self.setSelectedLanguage(self.currentLang);

        self.callAjax("data/" + this.currentLang + ".json", function (data) {
            self.jsonData = JSON.parse(data);
        });

        //jQuery part
        (function ($) {
            $(function () {

            });
        })(jQuery);
    },
    methods: {
        setLanguage: function (lang) {
            var self = this;
            localStorage.setItem("lang", lang);
            self.callAjax("data/" + lang + ".json", function (data) {
                self.jsonData = JSON.parse(data);
            });
            self.setSelectedLanguage(lang);
        },
        setSelectedLanguage: function (lang) {
            var classes = "z-depth-1 green lighten-4";

            var li = $("#language").find("li");
            for (var i = 0, l = li.length; i < l; i++) {
                $("#" + li[i].id).removeClass(classes);
            }

            $("#" + lang).addClass(classes);
        },
        //Source : http://stackoverflow.com/questions/4060004/calculate-age-in-javascript/7091965#7091965
        getAge: function () {
            var today = new Date();
            var birthDate = new Date("1993/02/02");
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        callAjax: function (url, callback) {
            var xmlhttp;
            // compatible with IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
    }
});