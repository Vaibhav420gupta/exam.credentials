var TestSeries = angular.module('TestSeries', ['ngAnimate']);
TestSeries.filter('ceil', function() {
    return function(input) {
        return Math.ceil(input);
    };
});
TestSeries.run(['$rootScope', '$timeout', function($rootScope, $timeout) {
    $rootScope.root_user_data;
    $rootScope.setAlertBoxTimeout = function(title, msg) {
        $rootScope.boughtPackageExpired = true;
        $rootScope.errorTitle = title;
        $rootScope.errorIMsg = msg;
        $timeout(function() {
            $rootScope.boughtPackageExpired = false;
        }, 3000);
    }
    $rootScope.setAlertBoxTimeoutClose = function() {
        $rootScope.boughtPackageExpired = false;
    }
    $rootScope.adjustStudentCount = function(no) {
        if (no > 10000000) {
            no = Math.floor(no / 10000000) + ' Crore+'
        } else if (no > 10000000) {
            no = Math.floor(no / 100000) + ' Lakh+'
        } else if (no) {
            no = no.toLocaleString('en-IN') + '+';
        }
        return no;
    }
}]);
(function() {
    jQuery(document).ready(function($) {
        function getCookie(key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        }
        if (getCookie('eg_user') !== null) {
            $(".myaccountbtn").show();
            $(".loginbtn").hide();
            $(".signupbtn").hide();
            $("#signup_big_btn").hide();
            $("#join_now").css("visibility", "hidden");
        } else {
            $(".myaccountbtn").hide();
            $(".loginbtn").show();
            $(".signupbtn").show();
            $("#signup_big_btn").show();
            $("#join_now").show();
        }
        $(".p_year").html(new Date().getFullYear());
        $('.eg_footer_menu_heading').click(function() {
            $(this).find('i.fa').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
            $(this).siblings('ul.sub_menu').slideToggle();
        });
        $(".mobQS_mobbars").click(function() {
            $("#mobQ_mobSidenav").css('width', '276px');
            $(".kill_menu_close").css('right', '300px');
            $('.lazyloading').css('filter', 'blur(5px)');
        });
        $(".mobQS_closebtn").click(function() {
            $("#mobQ_mobSidenav").css('width', '0');
            $(".kill_menu_close").css('right', '-50px');
            $('.lazyloading').css('filter', '');
        });
        $("#exams_tab").click(function() {
            $(this).find('i.fa').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
            $(".mob_ts_exam_name").slideToggle();
        });
        $(".l0_name").click(function() {
            $(this).find('i.fa').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
            $(this).siblings('ul.ts_mob_examlist_one').slideToggle();
        });
        // Get the modal
        var modal = ""
        if (document.getElementById('more_examModal')) {
            modal = document.getElementById('more_examModal');
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
        // Get the button that opens the modal
        var btn = "";
        if (document.getElementById("more_exam_click")) {
            btn = document.getElementById("more_exam_click");
            btn.onclick = function() {
                modal.style.display = "block";
            }
        }

        //langswitcher header and footer

        let arrLang = {
            '1': {
                'mail': 'Mail:',
                'follow': 'Follow Us On',
                'about': 'ABOUT',
                'aboutus': 'About Us',
                'impact': 'Impact Stories',
                'media': 'Media',
                'help': 'HELP',
                'contact': 'Contact',
                'career': 'Career With Us',
                'examCalendar': 'Exam Calendar',
                'support': 'Support',
                'student': 'STUDENT',
                'listofcoaching': 'List of Coachings',
                'listofschools': 'List of Schools',
                'forum': 'Forum',
                'allcareers': 'All Careers',
                'blog': 'Blog',
                'marketplace': 'Market Place',
                'business': 'BUSINESS',
                'onlineseries': 'Start Your Online Educational Academy',
                'edugorilla_publication': 'EduGorilla Publication',
                'download': 'Download Our App',
                'changelanguage': 'Change Language',
                'disclaimer': 'Disclaimer',
                'TndC': 'Terms and Conditions',
                'ethics': 'Our Code of ethics',
                'privacypolicy': 'Privacy Policy',
                'copyright': 'Copyright',
                'returnpolicy': 'Return Policy',
                'sitemap': 'Sitemap',
                'signin': 'Sign in',
                'searchexams': 'Search Exams',
                'bitsat': '"e.g. BITSAT, Bank, MBA"',
                'nrfound': 'No Result Found',
                'login': 'Log In',
                'signup': 'Sign Up',
                'myprofile': 'My Profile',
                'admin': 'Admin Panel',
                'logout': 'Logout',
                'timings': '(10 AM to 7 PM)',
                'activation': 'Activation Key',
                'diglogboxdata': 'Please enter your 10 digit Activation Key below',
                'submit': 'Submit',
                'search_exams': 'Search Exams',
            },
            '2': {
                'mail': 'मेल:',
                'follow': 'हमारा अनुसरण करें',
                'about': 'बारे में',
                'aboutus': 'हमारे बारे में',
                'impact': 'प्रभाव कहानियां',
                'media': 'मीडिया',
                'help': 'मदद',
                'contact': 'संपर्क करें',
                'career': 'हमारे साथ करियर',
                'examCalendar': 'परीक्षा कैलेंडर',
                'support': 'सहयोग',
                'student': 'छात्र',
                'listofcoaching': 'कोचिंग की सूची',
                'listofschools': 'स्कूलों की सूची',
                'forum': 'मंच',
                'allcareers': 'सभी करियर',
                'blog': 'ब्लॉग',
                'marketplace': 'मार्केट प्लेस',
                'business': 'व्यापार',
                'onlineseries': 'अपनी ऑनलाइन शैक्षिक अकादमी शुरू करें',
                'edugorilla_publication': 'EduGorilla प्रकाशन',
                'download': 'हमारा ऐप डाउनलोड करें',
                'changelanguage': 'भाषा बदलें',
                'disclaimer': 'अस्वीकरण',
                'TndC': 'नियम और शर्तें',
                'ethics': 'हमारी आचार संहिता',
                'privacypolicy': 'गोपनीयता नीति',
                'copyright': ' कॉपीराइट',
                'returnpolicy': 'वापसी नीति',
                'sitemap': 'साइट मैप',
                'signin': 'साइनइन ',
                'searchexams': 'परीक्षा खोज',
                'bitsat': '"उदाहरण.बिटसैट, बैंक, एमबीए"',
                'nrfound': 'कोई परिणाम नहीं मिला',
                'login': 'लॉगइन ',
                'signup': 'साइनअप',
                'myprofile': 'मेरी प्रोफाइल',
                'admin': 'प्रशासन',
                'logout': 'लॉगआउट',
                'timings': '(सुबह 10 से शाम 7 बजे)',
                'activation': 'सक्रियण कुंजी',
                'diglogboxdata': 'कृपया नीचे अपनी १० अंकों की सक्रियकरण कुंजी दर्ज करें',
                'submit': 'प्रस्तुत',
                'search_exams': 'परीक्षा खोजें'
            },
            '14': {
                'mail': 'Correo:',
                'follow': 'Siga con nosotros',
                'about': 'ACERCA DE',
                'aboutus': 'Sobre nosotras',
                'impact': 'Historias de impacto',
                'media': 'Medios de comunicación',
                'help': 'AYUDA',
                'contact': 'Contacto',
                'career': 'Carrera con nosotras',
                'examCalendar': 'Calendario de exámenes',
                'support': 'Apoyo',
                'student': 'ALUMNO',
                'listofcoaching': 'Lista de Entrenamientos',
                'listofschools': 'Lista de escuelas',
                'forum': 'Foro',
                'allcareers': 'Todas las carreras',
                'blog': 'Blog',
                'marketplace': 'Mercado',
                'business': 'NEGOCIO',
                'onlineseries': 'Inicie su academia educativa en línea',
                'edugorilla_publication': 'Publicación EduGorilla',
                'download': 'Descarga nuestra aplicación',
                'changelanguage': 'Cambiar idioma',
                'disclaimer': 'Descargo de responsabilidad',
                'TndC': 'Términos y condiciones',
                'ethics': 'Nuestro código de ética',
                'privacypolicy': 'política de privacidad',
                'copyright': 'Derechos de autor',
                'returnpolicy': 'Política de devoluciones',
                'sitemap': 'mapa del sitio',
                'signin': 'Iniciar sesión',
                'searchexams': 'Buscar exámenes',
                'bitsat': '"e.g. BITSAT, Bank, MBA"',
                'nrfound': 'No se han encontrado resultados',
                'login': 'Acceso',
                'signup': 'Inscribirse',
                'myprofile': 'Mi perfil',
                'admin': 'Panel de administrador',
                'logout': 'Cerrar sesión',
                'timings': '(10 AM to 7 PM)',
                'activation': 'Clave de activación',
                'diglogboxdata': 'Ingrese su clave de activación de 10 dígitos a continuación',
                'submit': 'Entregar',
                'search_exams': 'Buscar Exámenes',
            }
        };
        let lang = $.cookie('lang') || 1;
        $(document).ready(function() {
            $(".search_box").attr('placeholder', arrLang[lang]['search_exams']);
            $(".lang").each(function(index, element) {
                $(this).text(arrLang[lang][$(this).attr("key")]);
            });
        });

        // Get the <span> element that closes the modal
        var span = "";
        if (document.getElementsByClassName("exam_popupclose")[0]) {
            span = document.getElementsByClassName("exam_popupclose")[0];
            span.onclick = function() {
                modal.style.display = "none";
            }
        }
        $(".Ts_more_sublist").hide();
        $(".Ts_more_exm_name").show();

        $('.Ts_more_exm_name').click(function() {
            $(this).find(".Ts_more_sublist").slideToggle();
            $(this).children('a').toggleClass('active');
        });
        $('.TS_PromoMmodal').css('display', 'block');
    });

    TestSeries.controller('MenuCtrl', ['$scope', '$http', '$q', '$timeout', '$rootScope', function($scope, $http, $q, $timeout, $rootScope) {

        $scope.rmodel = false;
        $scope.rmodel_sub = 1;
        $scope.couponResponse = [];
        $scope.errorMsg = "";
        $scope.packageId = "";
        $scope.successCoupon = "";
        $scope.dropdown_menu_data = null;
        $scope.btnStatus = true;
        $scope.selectedPack = [];
        $scope.showCouponData = [];

        $scope.examSearchStatusHead = false;
        $scope.searchExamResultHead = [];
        var ajaxSerchOngoing = false;

        $scope.go_fb_login = 1;
        $scope.go_fb_login_error = "";
        $scope.phoneVerifyProgress = false;
        $scope.go_fb_login_error_otp = "";
        $scope.resent_fb_go = false;
        $scope.resend_fb_go_msg = "";
        $scope.fb_go_otp_verified = false;
        $scope.currentSearchTitle = "";
        $scope.currentSearchHref = "";

        var canceller = $q.defer();
        $scope.examSearchLoadingHead = false;

        $scope.header_init = function() {
            generateMenu()
        }

        function getCookie(key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        }
        $scope.isLoggedIn = function() {
            return getCookie('eg_user') ? true : false;
        }
        $scope.red_link = function(pid) {
            window.location.href = '/?pid=' + pid;
        }
        $scope.checkCouponClick = function(event) {
            if (event.target.className == 'TS_PromoMmodal') {
                $scope.close_rmodel_sub();
            }
        }
        $scope.open_redeem_promo = function() {
            $scope.rmodel = true;
            $scope.rmodel_sub = 1;
        }
        $scope.close_rmodel_sub = function() {
            $scope.rmodel = false;
            $scope.rmodel_sub = 1;
            $scope.headerCouponCode = null;
            $scope.couponResponse = [];
            $scope.errorMsg = "";
            $scope.packageId = "";
            $scope.successCoupon = "";
            $scope.btnStatus = true;
            $scope.selectedPack = [];
            $scope.showCouponData = [];
        }
        $scope.fetchRedeemPacks = function() {
            var couponCode = $scope.headerCouponCode;
            var req = {
                method: 'POST',
                url: '/api/v1/packageActivationCodeAjax',
                data: {
                    'coupon': couponCode.toLowerCase()
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            $http(req).then(function(response) {
                    var data = response.data;
                    if (data.status) {
                        var req = {
                            method: 'GET',
                            url: data.result.data,
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Content-Type': 'application/json'
                            }
                        };
                        $http(req).then(function(response) {
                                var data_j = response.data;
                                $scope.couponResponse = data_j;
                                $scope.rmodel_sub = 2;
                                $scope.successCoupon = couponCode;
                                Moengage.track_event('successfully_added_activation_key', {
                                    'coupon_code': couponCode
                                });
                            },
                            function(error) {
                                console.log("Something went wrong! Please try again later!");
                                Moengage.track_event('failed_activation_key', {
                                    'coupon_code': couponCode
                                });
                            });
                    } else {
                        $scope.errorMsg = response.data.msg;
                        Moengage.track_event('failed_activation_key', {
                            'coupon_code': couponCode
                        });
                    }
                },
                function(error) {
                    console.log("Something went wrong! Please try again later!");
                    Moengage.track_event('failed_activation_key', {
                        'coupon_code': couponCode
                    });
                });

            Moengage.track_event('activation_key', {
                'coupon_code': couponCode
            });
        }
        $scope.getPackCid = function(coupon_radio) {
            if (!coupon_radio) {
                return;
            }
            $scope.packageId = coupon_radio;
            if ($scope.packageId) {
                $scope.btnStatus = false;
                var index_id = $scope.couponResponse.findIndex(a_key => a_key[1] === $scope.packageId);
                if (index_id > -1) {
                    $scope.showCouponData = $scope.couponResponse[index_id][2];
                } else {
                    $scope.showCouponData = [];
                }
            }
            $scope.selectPack(coupon_radio);
        }
        $scope.unlockCouponCode = function() {
            $scope.rmodel_sub = 3;
            Moengage.track_event('unlock', {
                'coupon_code': $scope.headerCouponCode
            });
        }
        $scope.sanL2 = function(L2Data) {
            return L2Data.join(', ');
        }
        $scope.checkInArray = function(name) {
            if (name == 'Civil Services (Prelims)' || name == 'Engineering All India' || name == 'UG Medical Entrance (NEET, AIIMS, JIPMER)') {
                return true;
            } else {
                return false;
            }
        }
        $scope.selectPack = function(data) {
            var hId = 'radioH' + data;
            // var pId = 'radioP'+data;
            $scope.selectedPack[0] = document.getElementById(hId).innerText;
            // $scope.selectedPack[1] = document.getElementById(pId).innerText;
        }
        $scope.examAjaxSearchHead = function(arg, e) {
            if (!arg) {
                $('.TsH_searchView').removeClass('searchViewFocus');
                $scope.examSearchStatusHead = false;
                return;
            }
            if (e.key == "Enter") {
                if ($scope.currentSearchHref) {
                    window.location.href = $scope.currentSearchHref;
                }
                return;
            }
            if (e.key == "ArrowDown" || e.key == "ArrowUp") {
                var all_li = $(".list_full li");
                var active_li = $(".li_active");
                if (active_li.length == 0) {
                    all_li.eq(0).addClass("li_active");
                } else {
                    if (e.key == "ArrowDown") {
                        if (all_li.length > active_li.index() + 1) {
                            active_li.removeClass("li_active");
                            active_li.next().addClass("li_active");
                        }
                    } else {
                        if (active_li.index() > 0) {
                            active_li.removeClass("li_active");
                            active_li.prev().addClass("li_active");
                        }
                    }
                }
                $scope.currentSearchTitle = $(".li_active a").text();
                $scope.currentSearchHref = $(".li_active a").attr('href');
            } else {
                if (arg.length < 3) {
                    $('.TsH_searchView').removeClass('searchViewFocus');
                    $scope.examSearchStatusHead = false;
                    return;
                }
                if (ajaxSerchOngoing) {
                    canceller.resolve();
                    canceller = $q.defer();
                    ajaxSerchOngoing = false;
                }
                $scope.examSearchLoadingHead = true;
                var req = {
                    method: 'POST',
                    url: '/api/v1/ecatalog/examajaxsearch',
                    timeout: canceller.promise,
                    data: {
                        'keyword': arg
                    }
                }
                ajaxSerchOngoing = true;
                $http(req).then(function(response) {
                        if (response.data.status) {
                            $scope.examSearchStatusHead = true;
                            ajaxSerchOngoing = false;
                            var data = response.data.result.data;
                            $scope.searchExamResultHead = [];
                            for (var i = 0; i < data.length; i++) {
                                $scope.searchExamResultHead.push({
                                    name: data[i].name,
                                    url: data[i].url
                                });
                            }
                            $scope.examSearchLoadingHead = false;
                            $('.TsH_searchView').addClass('searchViewFocus');
                        }
                    },
                    function(error) {
                        console.log("Something went wrong! Please try again later!");
                    });
            }
        }

        $scope.verify_go_fb_phone = function(phone_no) {
            var token = document.getElementById('temp').value;
            if (phone_no && token) {
                $scope.go_fb_login_error = "";
                $scope.go_fb_login_error_otp = "";
                $scope.phoneVerifyProgress = true;
                var req = {
                    method: 'POST',
                    url: '/api/v1/auth/loginsignup/fb/go/st2',
                    data: {
                        'phone_no': phone_no,
                        'token': token
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http(req).then(function(response) {
                        if (response.data.status) {
                            $scope.go_fb_login = 2;
                            $scope.token_re = token;
                            $scope.fb_go_phone_no_re = phone_no;
                        } else {
                            $scope.go_fb_login_error = response.data.msg;
                        }
                        $scope.phoneVerifyProgress = false;
                    },
                    function(error) {
                        console.log("Something went wrong! Please try again later!");
                    });
            }
        }

        $scope.otp_verify_fb_go_user = function(otp, phone, token) {
            if (otp && phone && token) {
                $scope.go_fb_login_error_otp = "";
                $scope.fb_go_otp_verified = true;
                $scope.resend_fb_go_msg = "";
                var req = {
                    method: 'POST',
                    url: '/api/v1/auth/loginsignup/fb/go/st3',
                    data: {
                        'otp': otp,
                        'phone_no': phone,
                        'token': token
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http(req).then(function(response) {
                        if (response.data.status) {
                            if (location.host == 'testseries.edugorilla.com') {
                                fbq('track', 'CompleteRegistration');
                            }
                            $scope.go_fb_login = 3;
                            $timeout(function() {
                                next = getUrlArgument("next");
                                if (next) {
                                    window.location.href = getUrlArgument("next");
                                } else {
                                    location.reload();
                                }
                            }, 2000);
                        } else {
                            $scope.go_fb_login_error_otp = "Invalid OTP!";
                        }
                        $scope.fb_go_otp_verified = false;
                    },
                    function(error) {
                        console.log("Something went wrong! Please try again later!");
                    });
            }
        }

        $scope.resend_otp_go_fb = function(phone_no, token) {
            if (phone_no && token) {
                $scope.resent_fb_go = true;
                $scope.resend_fb_go_msg = "";
                $scope.go_fb_login_error_otp = "";
                var req = {
                    method: 'POST',
                    url: '/api/v1/auth/loginsignup/fb/go/st2',
                    data: {
                        'phone_no': phone_no,
                        'token': token
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http(req).then(function(response) {
                        if (response.data.status) {
                            $scope.resent_fb_go = false;
                            $scope.resend_fb_go_msg = "success";
                        }
                    },
                    function(error) {
                        console.log("Something went wrong! Please try again later!");
                    });
            }
        }
        // function to decode and get query argument in url based on key, if present
        function getUrlArgument(arg) {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                vars[key] = value;
            });
            if (arg in vars) {
                return decodeURIComponent(vars[arg]);
            }
            return "";
        }
        $scope.createLogin = function() {
            var url = "/login"
            next = getUrlArgument("next");
            if (next != "") {
                url = "/login" + "?next=" + encodeURIComponent(next)
            }
            return url;
        }
        $scope.createSignup = function() {
            var url = "/signup"
            next = getUrlArgument("next");
            if (next != "") {
                url = "/signup" + "?next=" + encodeURIComponent(next)
            }
            return url;
        }
        $scope.sendCouponConf = function() {
            cou = document.getElementById('coupon_code_header').value;
            pac = document.getElementById('pack_id_header').value;
            var req = {
                method: 'POST',
                url: '/payment',
                data: {
                    'coupon_code': cou,
                    'pack_id': pac,
                    'gateway_type': 'razor'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(response) {
                    if (response.data.status) {
                        var paymentResponseData = response.data.result.data;
                        var payment_html_code = `
                        <form method="POST" action="${paymentResponseData.surl}" name="activation_code_success_form">
                            <input type="hidden" name="txnid" value="${paymentResponseData.txnid}">
                            <input type="hidden" name="status" value="success">
                            <input type="hidden" name="amount" value="${paymentResponseData.amount}">
                        </form>
                    `;
                        $("#activation_code_form_div").html(payment_html_code);
                        document.activation_code_success_form.submit();
                    }
                },
                function() {
                    console.log("Something went wrong! Please try again later!");
                });
        };

        function generateMenu() {
            let check_menu_url = '/api/v1/generic_handler?action=get_exam_menu_json_url';
            $http.get(check_menu_url).then(function(response) {
                    let data = response.data;
                    if (data.status) {
                        let json_menu_url = data.result.data.exam_menu_url;
                        $http.get(json_menu_url).then(function(response) {
                                $scope.dropdown_menu_data = response.data;
                                $('.TsH_rgtMenu_link').prepend(generateHTMLforMenu());
                                initilizeMenuHoverJs();
                            },
                            function(error) {
                                console.log("Something went wrong. Please try again later!");
                            });
                    }
                },
                function(error) {
                    console.log('Something went wrong. Please try again later!');
                });
        }

        function generateHTMLforSubMenu(exam_data) {
            let html = "",
                main_menu_html = '',
                sub_menu_html = '',
                l0_count = 0;
            if (Object.entries(exam_data).length > 0) {
                for (let [_, l0_exam] of Object.entries(exam_data)) {
                    l0_count += 1;
                    main_menu_html += `
                        <li class="main-li test">
                            <span class="exam-img"><img src="${l0_exam[1][1]}" width="23" height="22"></span>
                            <a href="${generateExamLink(0, l0_exam[0], l0_exam[1][0])}" target="_self" class="nav-child main-exam showSingle" title="${l0_exam[1][0]}">${l0_exam[1][0]}</a>
                            <span class="exam-icon"><i class="fa fa-chevron-right grater-than" aria-hidden="true"></i></span>
                        </li>
                    `;
                    let temp_submenu_html = '';
                    for (let [l1_id, l1_exam] of Object.entries(l0_exam[1][2])) {
                        temp_submenu_html += `
                            <li>
                                <a href="${generateExamLink(1, l1_id, l1_exam[0])}" target="_self" class="nav-child side-main">
                                    <span class="l1_name" title="${l1_exam[0]}">${l1_exam[0]}</span>
                                    <span class="l1_arrow"> <i class="fa fa-chevron-right grater-than-2" aria-hidden="true"></i></span>
                                </a>
                            </li>
                        `;
                        for (let l2_exam of l1_exam[1]) {
                            temp_submenu_html += `
                                <li>
                                    <a href="${generateExamLink(2, l2_exam[0], l2_exam[1])}" target="_self" class="side-not-main" title="${l2_exam[1]}">${l2_exam[1]}</a>
                                </li>
                            `;
                        }
                    }
                    sub_menu_html += `
                        <ul class="targetDiv hide-div div${l0_count}">
                            ${temp_submenu_html}
                        </ul>
                    `;
                }

                html = `
                    <ul class="dropdown-menu megamenu row menu-drop" style="overflow:hidden;">
                        <li class="col-xs-3 col-3 menu_lo_list">
                            <ul>
                                ${main_menu_html}
                            </ul>
                        </li>
                        <div class="col-xs-9 col-9 child_exam_div">
                            <li class="child_exams">
                                ${sub_menu_html}
                            </li>
                        </div>
                    </ul>`;
            }
            return html;
        }

        function generateHTMLforMenu() {
            let custom_header_class = '';
            let lang = $.cookie('lang') || 1;
            let text = {
                '1': {
                    'courses': "Courses",
                    'exams': "Exams"
                },
                '2': {
                    'courses': "पाठ्यक्रम",
                    'exams': "परीक्षाएं"
                },
                '14': {
                    'courses': "Cursos",
                    'exams': "Exámenes"
                }
            }
            if ($('#Tst_Fixed_navbar').css("background-color") !== 'rgb(255, 255, 255)') {
                custom_header_class = 'custom_header';
            }
            let html = `
                <li class="dropdown menu-large">
                    <a class="dropdown-toggle exam-head ${custom_header_class}" data-toggle="dropdown">  ${['ekagratapathshala.co.in', 'finefityoga.com', 'portal.araqsa.com'].includes(window.location.host) ? text[lang]['courses'] : text[lang]['exams'] }
                        <span style="padding-left: 5px;">
                            <i class="fa fa-chevron-right fa-rotate-90" aria-hidden="true" style="font-size: 10px;"></i>
                        </span>
                    </a>
                </li>`;
            return html;
        }

        function generateExamLink(exam_level, exam_id, exam_name) {
            function seo_transform(name) {
                // Keeping only alphabets, numbers and space
                let t1 = name.split('').filter(function(ch) {
                    if (ch.match(/^[0-9A-Za-z/ ]$/)) {
                        return ch;
                    }
                }).join('');

                // Remove consecutive space
                let t2 = t1.replace(/\s+/g, ' ');
                // (Converting space and '/' to '-') and (Converting overall to lowercase)
                let t3 = t2.replace(/\s/g, '-').replace(/\//g, '-');
                return t3;
            }

            let url = '';
            if (exam_level == 0) {
                url = `/exams/${seo_transform(exam_name)}/${exam_id}`;
            } else if (exam_level == 1) {
                url = `/ecatalog/${exam_id}/${seo_transform(exam_name)}`;
            } else {
                url = `/tests/${exam_id}/${seo_transform(exam_name)}`;
            }
            return url.toLowerCase();
        }

        function initilizeMenuHoverJs() {
            $(".dropdown").hover(function() {
                    if ($('.dropdown-menu').length === 0) {
                        let html = generateHTMLforSubMenu($scope.dropdown_menu_data);
                        $('.menu-large').append(html);
                        $('.div1').show();
                        $('.main-li:first').addClass('menu_selected');
                        $('.showSingle').hover(function() {
                            $('.main-li').removeClass('menu_selected');
                            $(this).parent().addClass('menu_selected');
                            $('.targetDiv').hide();
                            $('.div' + ($(this).parent().index() + 1)).show();
                        });
                    }
                    $('.dropdown-menu', this).stop().fadeIn("fast");
                },
                function() {
                    $('.dropdown-menu', this).stop().fadeOut("fast");
                });

        }
    }]);
})();