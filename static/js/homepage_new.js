(function() {
    // In HTML5 mode, the $location service getters and setters interact with the browser URL address through the HTML5 history API.
    TestSeries.config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);

    // Global functions can be used in multiple controller
    TestSeries.run(['$rootScope', '$sce', function($rootScope, $sce) {
        // To make HTML content trusted.
        $rootScope.toTrustedHTML = function(html) {
            return $sce.trustAsHtml(html);
        };

        // Convert seconds to minutes
        $rootScope.min_converter = function(sec_) {
            var min = Math.floor(sec_ / 60);
            var sec = Math.floor(sec_ - (min * 60));
            return min + ' Min ' + ((sec > 0) ? sec + ' Sec' : '');
        };
    }]);

    // Homepage controller
    TestSeries.controller('NewHomePageController', ['$scope', '$rootScope', '$http', '$timeout', '$q', '$interval', function($scope, $rootScope, $http, $timeout, $q, $interval) {

        // Initialized variables inside '$scope'
        $scope.offerData = {};
        $scope.analyticsData = {};
        $scope.popularExamsData = [];
        $scope.allExamsData = [];
        $scope.videoSliderData = [];
        $scope.featureSlidersData = [];
        $scope.currentL0Data = [];
        $scope.currentL1Data = [];
        $scope.allPacks = [];
        $scope.currentL0Index = 0;
        $scope.showL2 = false;
        var currentL1Index = 0;
        $scope.l0AjaxOngoing = false;
        $scope.l1AjaxOngoing = false;
        $scope.currentL1OngoingIndex = null;
        $scope.vernacularStaticTextContent = null;
        $scope.ft_show_news_and_current_affairs = false;
        $scope.ft_homepage_exam_vertical_data = false;
        $scope.currency_symbol = '₹';
        $scope.product_data = [];
        // Package id from banner click
        $scope.banner_click_ts_pack_id = null;
        $scope.banner_click_book_pack_id = null;
        $scope.banner_click_mi_pack_id = null;
        //Checking if the user is priveleged client
        $scope.is_priveledged_client = WHITELABEL_PRIVILEDGE_CLIENT;
        $scope.client_configurations = {
            "demo_multitutor": window.location.hostname === "demoportal.multitutor.in",
        }
        const observer = lozad();
        observer.observe();
        //Hide the contents of the tst_explore_test if the client is listed in the array below
        $scope.hideTstExploreText = ['demo-site-2e8ab2.edugorilla.com', 'testseries.javatpoint.com'].includes(location.host);
        //Checking if the user is from the sales team of edugorilla and accessing the demo site
        $scope.demoSite = location.host === 'demo-site-2e8ab2.edugorilla.com';
        $scope.kavala_app = location.host === 'kavala.app';
        $scope.oxfordonlineacademy = location.host === 'oxfordonlineacademy.com';
        $scope.learnexamchiragcom = location.host === 'learn.examchirag.com';
        $scope.sarvagyaclasses = location.host === 'sarvagyaclasses.com';
        $scope.clientWithCourse = ['ekagratapathshala.co.in', 'finefityoga.com', 'portal.araqsa.com'].includes(location.host);
        $scope.client_without_statistics = ['testseries.physicsbyasingh.com', 'testseries.gameacademy.in', 'abbalearning.com', 'finefityoga.com', 'meritbodhi.com', 'purpleframes.net', 'namoics.com', 'theinvestmaster.in'].includes(location.host);
        // Get url parameters
        let url_all_params = new URLSearchParams(window.location.search);
        let url_param = {
            utm_source: url_all_params.get('utm_source'),
            campaign_name: url_all_params.get('campaign_name')
        }
        let selection_rating_data = getSelectionsAndRating(Math.floor((Math.random() * 1000) + 100), url_all_params.get('text4'));
        $scope.rating = selection_rating_data.rating;
        $scope.total_selections = selection_rating_data.total_selections;
        CUSTOM_MOENGAGE_NAMESPACE.selection_rating = {
            'selection': $scope.total_selections,
            'rating': $scope.rating
        };

        $('body').on('client_features_status_created', function() {
            $scope.getCurencySymbol();
        });
        //############################ EXTERNAL FUNCTIONS ############################
        $scope.getCurencySymbol = function() {
            let features_cookie = $.cookie('client_features_status');
            if (features_cookie != null) {
                let features_cookie_data = JSON.parse(decodeURIComponent(features_cookie));
                $scope.currency_symbol = 'currency_symbol' in features_cookie_data ? features_cookie_data['currency_symbol'] : '₹';
            }
        }
        // Auto invoked after page load
        $scope.initialLoading = function() {
            $scope.getCurencySymbol();
            if ($scope.is_priveledged_client) {
                // If user logged in then trigger the event
                if (getCookie('eg_user')) {
                    CUSTOM_MOENGAGE_NAMESPACE.moengageCampaignUserSignedin(error_msg = null);
                }
            }
            getVernacularTextContent(getLanguageCode());
            let promise1 = getOffersData().then(function(_) {
                return _;
            });
            let promise2 = getPopularExamsData().then(function(_) {
                return _;
            });
            let promise3 = getAllExamsData().then(function(_) {
                return _;
            });
            let promise4 = checkNewsAndCurrentAffairs().then(function(_) {
                return _;
            });
            $q.all([promise1, promise2, promise3, promise4]).then(function(_) {
                observer.observe();
                // To reduce CLS score we are just hiding all block & showing those according from top to bottom
                angular.element('.testSeies_head').slideDown(50);
                angular.element('.Nhm_TestCounter').slideDown(60);
                angular.element('.Nhm_tsFeature').slideDown(70);
                angular.element('.Nhm_popularExam').slideDown(100);
                angular.element('.Nhm_examList').slideDown(200);
                angular.element('.Nh_whIblDiv').slideDown(200);
                angular.element('.Nhm_Media').slideDown(200);
                angular.element('.Nhm_partners').slideDown(200);
                angular.element('footer').slideDown(200);
                $("#NwBanner_offer").lightSlider({
                    loop: true,
                    keyPress: true,
                    item: 4,
                    auto: true,
                    speed: 500,
                    pauseOnHover: true,
                    pager: false
                });
                $(".NwBanner-Slider").lightSlider({
                    loop: true,
                    keyPress: true,
                    item: 1,
                    auto: true,
                    speed: 500,
                    pauseOnHover: true
                });
                // EduG TS features slider
                $("#EduG_features_slider").lightSlider({
                    loop: true,
                    keyPress: true,
                    item: 1,
                    auto: true,
                    speed: 500,
                    controls: false,
                    pause: 3000,
                    pauseOnHover: true,
                    pager: true
                });
                // exam list Slide
                $('#right-button').click(function(event) {
                    event.preventDefault();
                    $('#Nhm_content').animate({
                        scrollLeft: "+=300px"
                    }, "fast");
                });
                $('#left-button').click(function(event) {
                    event.preventDefault();
                    $('#Nhm_content').animate({
                        scrollLeft: "-=300px"
                    }, "fast");
                });
                //partner slide
                $(".NwPartnerSlider").lightSlider({
                    loop: true,
                    keyPress: true,
                    item: 7,
                    auto: true,
                    speed: 500,
                    pauseOnHover: true
                });
                //comment slide
                $("#NwH_partner_slider").lightSlider({
                    loop: true,
                    keyPress: true,
                    item: 3,
                    auto: true,
                    speed: 500,
                    pauseOnHover: true,
                    responsive: [{
                        breakpoint: 480,
                        settings: {
                            item: 1,
                            slideMove: 1
                        }
                    }],
                    onSliderLoad: function(el) {
                        let testimonial_max_height = 0;
                        let item_div = document.getElementsByClassName('NwH_studentComnt');
                        angular.forEach(item_div, function(node) {
                            if (node.offsetHeight > testimonial_max_height) {
                                testimonial_max_height = node.offsetHeight;
                            }
                        });
                        angular.forEach(item_div, function(node) {
                            $('.NwH_studentComnt').css('height', testimonial_max_height + 'px');
                        });
                    }
                });

                let ref = new URLSearchParams(window.location.search).get('ref');
                if (ref == 'popular_exams') {
                    document.getElementById("popular_exam_tracker").scrollIntoView();
                }
                if ($scope.clientWithCourse) {
                    $(`#question-count`).remove();
                    $(`#test-count`).remove();
                }
            });
        };

        // Check if the Object is empty or not
        $scope.isNotEmptyObj = function(obj) {
            return Object.keys(obj).length > 0;
        };

        // Fetch single L0 exam data
        $scope.fetchSingleL0ExamData = function(l0_index_id) {
            if ($scope.allExamsData.length == 0) return;
            $scope.showL2 = false;
            if ($scope.allExamsData[l0_index_id].L1.length > 0) {
                $scope.currentL0Data = $scope.allExamsData[l0_index_id];
            } else {
                $scope.l0AjaxOngoing = true;
                let url = $scope.allExamsData[l0_index_id].url;
                // Do Ajax GET request to fetch L1 data of that L0
                $http.get(url).then(
                    function(response) {
                        if (response.status) {
                            $scope.allExamsData[l0_index_id].L1 = response.data.result.data;
                            $scope.currentL0Data = $scope.allExamsData[l0_index_id];
                        }
                        $scope.l0AjaxOngoing = false;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
            $scope.currentL0Index = l0_index_id;
        };

        $scope.fetchL1L2ExamDataWithSelectedL0 = function(l0_index_id) {
            if ($scope.allExamsData.length == 0) return;
            let url = $scope.allExamsData[l0_index_id].url;
            if ($scope.allExamsData[l0_index_id].L1.length == 0) {
                $http.get(url).then(function(response) {
                        if (response.status) {
                            $scope.allExamsData[l0_index_id].L1 = response.data.result.data;
                        }
                    },
                    function(error) {
                        console.log(error);
                    })
            }
            $scope.currentL0Index = l0_index_id;
        };

        // Fetch single L1 exam data
        $scope.fetchSingleL1ExamData = function(l1_index_id, L0_index = null) {
            if (L0_index != null) {
                $scope.currentL0Index = L0_index
            }
            $scope.currentL1OngoingIndex = l1_index_id;
            if ($scope.allExamsData.length == 0) return;
            if ($scope.allExamsData[$scope.currentL0Index].L1[l1_index_id].L2.length > 0) {
                $scope.currentL1Data[l1_index_id] = $scope.allExamsData[$scope.currentL0Index].L1[l1_index_id];
                $scope.showL2 = true;
                modifyAtagForIframe();
            } else {
                $scope.l1AjaxOngoing = true;
                let url = '/api/v1/ecatalog/L2/' + $scope.allExamsData[$scope.currentL0Index].L1[l1_index_id].id;
                // Do Ajax GET request to fetch L2 data of that L1
                $http.get(url).then(
                    function(response) {
                        if (response.status) {
                            $scope.allExamsData[$scope.currentL0Index].L1[l1_index_id].L2 = response.data.result.data;
                            $scope.currentL1Data[l1_index_id] = $scope.allExamsData[$scope.currentL0Index].L1[l1_index_id];
                            $scope.showL2 = true;
                        }
                        $scope.l1AjaxOngoing = false;
                        modifyAtagForIframe();
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };

        $scope.generateOfferUrl = function(ts_pack_id, book_pack_id, pi_pack_id, coupon_code) {
            let url = "";
            if (coupon_code) {
                url = "?q=" + btoa(coupon_code) + "&source=homepage_banner";
            } else {
                url = "?source=homepage_banner";
            }
            // for 'priviledge_client' url structure is different 
            if ($('.testSeies_head').hasClass('priviledge_client') === true) {
                url = "/cart/exam_package/0" + url;
                if (ts_pack_id) {
                    url += `&ts_pack_id=${ts_pack_id}`;
                }
                if (book_pack_id) {
                    url += `&book_pack_id=${book_pack_id}`;
                }
                if (pi_pack_id) {
                    url += `&pi_pack_id=${pi_pack_id}`;
                }
            } else {
                url = "/cart/exam_package/" + ts_pack_id + url;
            }
            return url;
        };

        // Get parsed offer data
        $scope.parseOfferData = function(data, key) {
            var jsonData = JSON.parse(data);
            return jsonData[key];
        };

        //Moengage event to open when clicked on banner
        $scope.clickBannerMoengageEvent = function(offer, event) {
            event.preventDefault();
            let url = $(event.currentTarget)[0].href;
            if (url === '') {
                return false;
            }
            if ($scope.is_priveledged_client) {
                let parsed_offer_data = JSON.parse(offer[0]);
                let coupon_code = parsed_offer_data.coupon_code ? parsed_offer_data.coupon_code : null;
                let desktop_banner_image_url = parsed_offer_data.image_urls[0];
                $scope.banner_click_ts_pack_id = offer[2];
                $scope.banner_click_book_pack_id = offer[3];
                $scope.banner_click_mi_pack_id = offer[4];
                $scope.coupon_code = coupon_code;
                $scope.banner_name = desktop_banner_image_url;
                CUSTOM_MOENGAGE_NAMESPACE.moengageClickBanner($scope.coupon_code, $scope.banner_name).then((_) => {
                    location.href = url;
                }).catch((err) => {
                    return err;
                });
            } else {
                location.href = url;
            }
        }

        //Trigger when the user click on Current Affairs tab
        $scope.currentAffairsMoengageEvent = function(event) {
            event.preventDefault();
            let current_affair_url = '/current_affairs';
            if ($scope.is_priveledged_client) {
                CUSTOM_MOENGAGE_NAMESPACE.moengageCurrentAffairs(error_msg = null).then((_) => {
                    location.href = current_affair_url;
                }).catch((err) => {
                    return err;
                });
            } else {
                location.href = current_affair_url;
            }
        }

        //Trigger when the user click on Explore Test Series tab
        $scope.exploreYourExamMoengageEvent = function(event) {
            event.preventDefault();
            let explore_your_exam_url = '#explore_your_exam';
            if ($scope.is_priveledged_client) {
                CUSTOM_MOENGAGE_NAMESPACE.moengageCurrentAffairs(error_msg = null).then((_) => {
                    location.href = explore_your_exam_url;
                }).catch((err) => {
                    return err;
                });
            } else {
                location.href = explore_your_exam_url;
            }
        }

        //Trigger when the user click on Daily New tab
        $scope.dailyNewsMoengageEvent = function(event) {
            event.preventDefault();
            let daily_news_url = '/daily_news';
            if ($scope.is_priveledged_client) {
                CUSTOM_MOENGAGE_NAMESPACE.moengageDailyNews(error_msg = null).then((value) => {
                    location.href = daily_news_url;
                }).catch((err) => {
                    return err;
                });
            } else {
                location.href = daily_news_url;
            }
        }

        $scope.showTestseriesCard = function() {
            let clients_portal = ["visankhya.com", "testseries.multitutor.in", "theperfectlearning.com", "mocktests.thecatalystz.com", "pratirajeducations.com"];
            return clients_portal.includes(window.location.host) ? false : true
        }
        //############################################################################


        //############################ INTERNAL FUNCTIONS ############################

        // Get offers data
        function getOffersData() {
            return new Promise(function(resolve, reject) {
                let url = '/api/v3/offers';

                // Do Ajax GET request
                $http.get(url).then(
                    function(response) { // Success response
                        if (response.status) {
                            $rootScope.root_user_data = response.data.result.user;
                            $scope.offerData = response.data.result.data;
                            $timeout(function() {
                                if ($scope.offerData.length > 1) {
                                    let offer_slide = $("#NwBanner-Slider-Offer").lightSlider({
                                        loop: true,
                                        keyPress: true,
                                        item: 1,
                                        controls: true,
                                        auto: true,
                                        speed: 1500,
                                        pause: 5000,
                                        pauseOnHover: true,
                                        pager: true
                                    });

                                    window.addEventListener("focus", offer_slide.play);
                                    window.addEventListener("blur", offer_slide.pause);
                                } else {
                                    $("#NwBanner-Slider-Offer").lightSlider({
                                        loop: false,
                                        keyPress: false,
                                        item: 1,
                                        controls: false,
                                        auto: false,
                                        speed: 2000,
                                        enableTouch: false,
                                        pager: false,
                                        enableDrag: false
                                    });
                                }
                            });
                            $(".update_loading").fadeOut(1000);
                        }
                        resolve(1);
                    },
                    function(error) { // Error response
                        console.log(error);
                    }
                );
            });
        }

        // Get popular exams data
        function getPopularExamsData() {
            return new Promise(function(resolve, reject) {
                let url = '/api/v2/live_stats?p=homepage_popular_exams';
                // Do Ajax GET request
                $http.get(url).then(
                    function(response) { // Success response
                        if (response.data.status) {
                            if ('trending_l2s' in response.data.result.data) {
                                let exams_for_web_view = JSON.parse(response.data.result.data.trending_l2s);
                                $scope.popularExamsData = exams_for_web_view.slice(0, 10);
                            }
                        }
                        modifyAtagForIframe();
                        resolve(1);
                    },
                    function(error) { // Error response
                        console.log(error);
                    }
                );
            });
        }

        // check to enable or disable news and current affairs
        function checkNewsAndCurrentAffairs() {
            return new Promise(function(resolve, reject) {
                let url = '/api/v1/generic_handler?action=get_client_meta_and_feature_for_homepage';
                // Do Ajax GET request
                $http.get(url).then(
                    function(response) { // Success response
                        if (response.data.status) {
                            let data = response.data.result.data;
                            if (data.ft_show_news_and_current_affairs) {
                                $scope.ft_show_news_and_current_affairs = data.ft_show_news_and_current_affairs;
                            }
                            if (data.ft_homepage_exam_vertical_data) {
                                $scope.ft_homepage_exam_vertical_data = data.ft_homepage_exam_vertical_data;
                            }
                        }
                        resolve(1);
                    },
                    function(error) { // Error response
                        console.log(error);
                    }
                );
            });
        }

        // Get all exams data
        function getAllExamsData() {
            return new Promise(function(resolve, reject) {
                let url = '/api/v1/ecatalog/L0';

                // Do Ajax GET request
                $http.get(url).then(
                    function(response) { // Success response
                        if (response.status) {
                            let data = response.data.result.data;
                            let ft_allow_international_currency = $scope.currency_symbol !== '₹';
                            $scope.analyticsData = {
                                'exams': convertToNumberSystem(data.exams_covered, ft_allow_international_currency),
                                'questions_attempted': convertToNumberSystem(data.questions_attempted, ft_allow_international_currency),
                                'users': convertToNumberSystem(data.users_month, ft_allow_international_currency)
                            };
                            $scope.current_product = [];
                            $scope.product_index = 0;
                            if (data.tests_available > 0) {
                                let tests_count = convertToNumberSystem(data.tests_available, ft_allow_international_currency);
                                let title = !$scope.vernacularStaticTextContent || !$scope.vernacularStaticTextContent["analytics_data_text"][3] ? 'Tests' : $scope.vernacularStaticTextContent["analytics_data_text"][3];
                                $scope.product_data.push(["nobs_icon-4", tests_count, title]);
                                $scope.current_product = $scope.product_data[$scope.product_index];
                            }

                            if ('products' in data) {
                                if ('total_video_courses' in data.products) {
                                    let video_courses_count = convertToNumberSystem(data.products.total_video_courses, ft_allow_international_currency);
                                    let title = !$scope.vernacularStaticTextContent || !$scope.vernacularStaticTextContent['analytics_data_text'][5] ? 'Video Courses' : $scope.vernacularStaticTextContent['analytics_data_text'][5];
                                    $scope.product_data.push(["nobs_icon-5", video_courses_count, title]);
                                }
                                if ('total_live_classes_courses' in data.products) {
                                    let total_live_classes_courses = convertToNumberSystem(data.products.total_live_classes_courses, ft_allow_international_currency);
                                    let title = !$scope.vernacularStaticTextContent || !$scope.vernacularStaticTextContent['analytics_data_text'][6] ? 'Live Class Courses' : $scope.vernacularStaticTextContent['analytics_data_text'][6];
                                    $scope.product_data.push(["nobs_icon-6", total_live_classes_courses, title]);
                                }
                                if ('total_e_book_courses' in data.products) {
                                    let total_e_book_courses = convertToNumberSystem(data.products.total_e_book_courses, ft_allow_international_currency);
                                    let title = !$scope.vernacularStaticTextContent || !$scope.vernacularStaticTextContent['analytics_data_text'][7] ? 'E-Books' : $scope.vernacularStaticTextContent['analytics_data_text'][7];
                                    $scope.product_data.push(["nobs_icon-7", total_e_book_courses, title]);
                                }
                                if ('total_pi_count' in data.products) {
                                    let total_pi_count = convertToNumberSystem(data.products.total_pi_count, ft_allow_international_currency);
                                    let title = !$scope.vernacularStaticTextContent || !$scope.vernacularStaticTextContent['analytics_data_text'][8] ? 'Mock Interviews' : $scope.vernacularStaticTextContent['analytics_data_text'][8];
                                    $scope.product_data.push(["nobs_icon-8", total_pi_count, title]);
                                }
                                if ('total_books_count' in data.products) {
                                    let total_books_count = convertToNumberSystem(data.products.total_books_count, ft_allow_international_currency);
                                    let title = !$scope.vernacularStaticTextContent || !$scope.vernacularStaticTextContent['analytics_data_text'][9] ? 'Books' : $scope.vernacularStaticTextContent['analytics_data_text'][9];
                                    $scope.product_data.push(["nobs_icon-9", total_books_count, title]);
                                }
                                $scope.current_product = $scope.product_data[$scope.product_index];
                                if ($scope.product_data.length > 1) {
                                    setTimeout(() => {
                                        $('#products').fadeOut(2000);
                                    }, 1000)
                                    $interval(displayProducts, 3000);
                                } else {
                                    $scope.current_product = $scope.product_data[$scope.product_index];
                                }
                            }
                            $scope.allExamsData = data.L0;
                            $scope.fetchSingleL0ExamData(0);
                            $scope.fetchL1L2ExamDataWithSelectedL0(0);
                        }
                        resolve(1);
                    },
                    function(error) { // Error response
                        console.log(error);
                    }
                );
            });
        }

        function displayProducts() {
            if ($scope.product_index < $scope.product_data.length - 1) {
                $scope.product_index += 1;
            } else {
                $scope.product_index = 0;
            }
            $scope.current_product = $scope.product_data[$scope.product_index];
            $('#products').fadeIn();
            setTimeout(() => {
                $('#products').fadeOut(1000);
            }, 2000)
        }

        function convertToNumberSystem(number, ft_allow_international_currency) {
            if (ft_allow_international_currency) {
                // Convert count into international number system format
                if (number > 1000000000) {
                    number = Math.floor(number / 1000000000);
                    number = `${number} Billion+`;
                } else if (number > 1000000) {
                    number = Math.floor(number / 1000000);
                    number = `${number} Million+`;
                } else if (number) {
                    number = number.toLocaleString('en-US');
                }
            } else {
                // Convert count into indian number system format
                if (number > 10000000) {
                    number = Math.floor(number / 10000000);
                    number = `${number} Crore+`;
                } else if (number > 100000) {
                    number = Math.floor(number / 100000);
                    number = `${number} Lakh+`;
                } else if (number) {
                    number = number.toLocaleString('en-IN');
                }
            }
            return number;
        }

        // Get text data for different languages from json file to use on page
        function getVernacularTextContent(lang_code) {
            var json_file_path = 'static/json/final_static_text_json/homepage_' + lang_code + '.json'
            $http.get(json_file_path).then(function Success(response) {
                    $scope.vernacularStaticTextContent = response.data;
                },
                function Error(response) {
                    if (response.status == 404) {
                        getVernacularTextContent("1")
                    }
                });
        }

        // initialize language code
        function getLanguageCode() {
            var languageCode = $.cookie("lang");
            if (!languageCode) {
                languageCode = "1"
            }
            return languageCode
        }

        // Set '_top' in a tag when the site is accessed from iframe
        function modifyAtagForIframe() {
            function inIframe() {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            }
            setTimeout(function() {
                if (inIframe()) {
                    jQuery("a").attr("target", "_top");
                }
            }, 500);
        }

        // Get cookie
        function getCookie(key) {
            let keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2].replace(/"/g, '') : null;
        }

        CUSTOM_MOENGAGE_NAMESPACE.commonAttributeUpdaterFunction = function() {
            return {
                'type': "success",
                'custom_platform': isMobile() ? "mweb" : "web",
                'utm_source': url_param.utm_source,
                'error_msg': null,
                'selected_language': getLanguageCode() === '1' ? 'English' : 'Hindi',
                'campaign_name': url_param.campaign_name,
            }
        };

        CUSTOM_MOENGAGE_NAMESPACE.commonAttributeUpdaterPackageFunction = function() {
            return {
                'exam_id': null,
                'exam_name': null,
                'ts_pack_id': $scope.banner_click_ts_pack_id,
                'ts_validity': null,
                'ts_pack_name': null,
                'mi_pack_id': $scope.banner_click_mi_pack_id,
                'mi_pack_session': null,
                'mi_pack_name': null,
                'book_pack_id': $scope.banner_click_book_pack_id,
                'book_name': null,
                'amount': null,
                'package_name': null,
            }
        }

        if (window.location.host === "testportal.geoias.com") {
            $scope.exam_tab_style = {
                'cursor': 'pointer',
                'border': 'none',
                'color': '#fff',
                'background': '#00AFEF'
            }
        }
    }]);
})(angular);