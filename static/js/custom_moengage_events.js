//=================================================================== CAMPAIGN PAGE MOENGAGE EVENTS ============================================================================================================

function getSelectionsAndRating(exam_id, selection_para) {
    // The logic followed here is that we reduce the exam id to less than 1 by dividing it.
    // Then we add 4 to the number, if the final rating is less than 4.2 then we take 4.2 as rating
    random_rating = (exam_id / 10 ** exam_id.toString().length) + 4;
    let min_rating_value = 4.83;
    if (random_rating < min_rating_value) {
        random_rating = min_rating_value;
    }
    // Get ratings user count
    let rating_user_count = parseInt(random_rating * 100 + 100);
    total_selections = /((\d)+ Selections)/.exec(selection_para) != null ? Number(/((\d)+ Selections)/.exec(selection_para)[0].split(' ')[0]) : Math.round(rating_user_count * 1.5);

    return {
        'rating': random_rating,
        'total_selections': total_selections,
        'rating_user_count': rating_user_count
    };
}

function round2DecimalPlaces(value) {
    return Number(Math.round(value + 'e2') + 'e-2');
}

var CUSTOM_MOENGAGE_NAMESPACE = {
    /* Ref A:
        Initialize name space with default function "commonAttributeUpdaterFunction" which takes argument 'is_success' to update type. This function is responsible for update DS which will be used for calling moengage events
        DS holds following common attributes data:
        {
            'type': "success",
            'custom_platform': isMobile() ? "mweb" : "web",
            'utm_source': url_param.utm_source,
            'error_msg': null,
            'selected_language': getLanguageName(),
            'campaign_name': url_param.campaign_name,
        }
    */
    commonAttributeUpdaterFunction: null,

    /* Ref B:
        Initialize name space with default function "commonAttributeUpdaterPackageFunction". This function is responsible for update DS which will be used for calling moengage events
        DS holds following common attributes data:
        {
            'exam_id': L2 ID,
            'exam_name': L2 Name,
            'ts_pack_id': Testseries Package ID,
            'ts_validity': Testseries Package Validity,
            'ts_pack_name': Testseries Package Name,
            'book_name': Book Name,
            'book_pack_id': Book Package ID,
            'mi_pack_id': Mock Interview Package ID,
            'mi_pack_session': Mock Interview Package Sessions,
            'amount': Total Package Price,
            'package_name': Selected Packages Names added with +
        }
    */
    commonAttributeUpdaterPackageFunction: null,

    /* Ref D:
        Initialize name space with default function "commonAttributeL0ExamUpdaterFunction". This function is responsible for update DS which will be used for calling moengage events
        DS holds following common attributes data:
        {
            'exam_category_name': L0 Name,
            'exam_category_id': L0 ID,
            'exam_category_url':L0 page URL
        }
    */
    commonAttributeL0ExamUpdaterFunction: null,

    /* Ref E:
        Initialize name space with default function "commonAttributeL1ExamUpdaterFunction". This function is responsible for update DS which will be used for calling moengage events
        DS holds following common attributes data:
        {
            'exam_sub_category_name': L1 Name,
            'exam_sub_category_id': L1 ID,
            'exam_sub_category_url':L1 page URL
        }
    */
    commonAttributeL1ExamUpdaterFunction: null,

    /* Ref F:
        Initialize name space with default function "commonAttributeL2ExamUpdaterFunction". This function is responsible for update DS which will be used for calling moengage events
        DS holds following common attributes data:
        {
            'exam_name': L2 Name,
            'exam_id': L2 ID,
            'exam_url':L2 page URL
        }
    */
    commonAttributeL2ExamUpdaterFunction: null,

    /* Ref G:
        Initialize name space with default function "commonAttributeTestUpdaterFunction". This function is responsible for update DS which will be used for calling moengage events
        DS holds following common attributes data:
        {
            'test_name': Test Name,
            'test_id': Test ID,
            'test_url':Test page URL,
            'test_type': free or paid
        }
    */
    commonAttributeTestUpdaterFunction: null,

    /* Ref H:
        Initialize name space with default function "commonAttributeQuizUpdaterFunction". This function is responsible for update DS which will be used for calling moengage events
        DS holds following common attributes data:
        {
            'quiz_name': Quiz Name,
            'quiz_id': Quiz ID
    */
    commonAttributeQuizUpdaterFunction: null,

    // Selection and rating value to use for campaing page events attribute
    selection_rating: null
}

Moengage.track_event = (event_name, attributes_ds) => {
    return new Promise(function(resolve, reject) {
        resolve();
    });
};

CUSTOM_MOENGAGE_NAMESPACE = {
    sendMoengageUserAttributes: function(name, email, phone_no, address, user_id) {
        Moengage.add_user_name(name);
        Moengage.add_email(email);
        Moengage.add_mobile(phone_no);
        Moengage.add_user_attribute("address", address);
        Moengage.add_unique_user_id(user_id);
    },

    moengageUserVisit: function() {
        // User has visited marketing page (event should fire when page is loaded)
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeUpdaterPackageFunction(), this.selection_rating);
        Moengage.track_event('on_dynamic_page', attributes_ds);
    },

    moengageBuyNow: function() {
        // User clicked on the ‘BUY_NOW’ button. 
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeUpdaterPackageFunction(), this.selection_rating);
        return Moengage.track_event('buy_now', attributes_ds);
    },

    moengageAddToCart: function(coupon_code) {
        // It will be triggered when a user has successfully signed-in/logged-in/signed-up & he clicks on ‘buy now’ button.
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeUpdaterPackageFunction(), this.selection_rating);
        attributes_ds['coupon_code'] = coupon_code;
        Moengage.track_event('add_to_cart', attributes_ds);
    },

    moengagePackageOnChange: function(coupon_code) {
        // If any edits are done on the ‘add_to_cart’ screen by the user.
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeUpdaterPackageFunction(), this.selection_rating);
        attributes_ds['coupon_code'] = coupon_code;
        Moengage.track_event('package_change', attributes_ds);
    },

    moengagePaymentInitiation: function(coupon_code) {
        // Click on the ‘Checkout’ button. This will be marked as ‘payment_initiate’.
        // Here copy the ds object instead of reference
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeUpdaterPackageFunction(), this.selection_rating);
        attributes_ds['coupon_code'] = coupon_code;
        attributes_ds['payment_gateway'] = 'razorpay';
        Moengage.track_event('payment_initiate', attributes_ds);
    },

    moengagePaymentComplete: function(error_msg, coupon_code) {
        // User has completed the payment. This will be marked as ‘payement_complete’.
        // Here copy the ds object instead of reference
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(error_msg), this.commonAttributeUpdaterPackageFunction(), this.selection_rating);
        attributes_ds['coupon_code'] = coupon_code;
        attributes_ds['payment_gateway'] = 'razorpay';
        return Moengage.track_event('payment_complete', attributes_ds);
    },

    moengageCampaignUserSignedin: function(error_msg) {
        // It is triggered when user is signed in
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(error_msg));
        Moengage.track_event('signed_in', attributes_ds);
    },

    moengageUserLoginSignup: function(source, error_msg, event_type) {
        // Triggered on successful authorization from Google/Facebook.
        if (event_type === "login" || event_type === "signup") {
            let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(error_msg));
            attributes_ds['login_source'] = source;
            Moengage.track_event(event_type, attributes_ds);
        }
    },

    moengageViewExamPage: function() {
        // User has visited exam page
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.selection_rating, this.commonAttributeL0ExamUpdaterFunction(), this.commonAttributeL1ExamUpdaterFunction(), this.commonAttributeL2ExamUpdaterFunction());
        Moengage.track_event('on_exam_page', attributes_ds);
    },

    moengageStartTest: function(test_id, test_name, test_url, test_type) {
        // It is triggered when user click on start test
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeL2ExamUpdaterFunction(), this.commonAttributeTestUpdaterFunction(test_id, test_name, test_url, test_type));
        return Moengage.track_event('start_test', attributes_ds);
    },

    moengageReAttemptTest: function(test_id, test_name, test_url, test_type) {
        // It is triggered when user click on reattempt test
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeL2ExamUpdaterFunction(), this.commonAttributeTestUpdaterFunction(test_id, test_name, test_url, test_type));
        return Moengage.track_event('re_attempt', attributes_ds);
    },

    moengageQuizStart: function(quiz_id, quiz_name) {
        // It is triggered when user click on start quiz
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.commonAttributeL2ExamUpdaterFunction(), this.commonAttributeQuizUpdaterFunction(quiz_id, quiz_name));
        return Moengage.track_event('quiz_start', attributes_ds);
    },

    moengageClickBanner: function(coupon_code, banner_name) {
        //It is triggered when user click on banner
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(), this.selection_rating, this.commonAttributeUpdaterPackageFunction());
        attributes_ds['coupon_code'] = coupon_code;
        attributes_ds['banner_name'] = banner_name;
        return Moengage.track_event('click_banner', attributes_ds);
    },

    moengageLocaleLanguage: function(error_msg) {
        // It is triggered when user change the UI language
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(error_msg));
        Moengage.track_event('locale_language', attributes_ds);
    },

    moengageDailyNews: function(error_msg) {
        // It is triggered when user click on daily news tab
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(error_msg));
        return Moengage.track_event('daily_news', attributes_ds);
    },

    moengageCurrentAffairs: function(error_msg) {
        // It is triggered when user click on current affairs tab
        let attributes_ds = Object.assign({}, this.commonAttributeUpdaterFunction(error_msg));
        return Moengage.track_event('current_affairs', attributes_ds);
    },
}