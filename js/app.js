var app = new Vue({
    el: '#app',
    data: {
        languages: ['french', 'english'],
        age: '',
        currentLang: 'fr',
        jsonData: {}
    },
    ready: function () {
        var self = this;

        self.age = self.getAge();

        self.callAjax("data/" + this.currentLang + ".json", function (data) {
            self.jsonData = JSON.parse(data);
            console.log(self.jsonData);
        });

        //jQuery part
        (function ($) {
            $(function () {

            });
        })(jQuery);
    },
    methods: {
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