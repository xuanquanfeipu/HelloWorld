/* global malarkey:false, moment:false */
(function () {
  'use strict';

  angular
    .module('smartCore')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('authEvents', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('userRoles', {
      all: '*',
      admin: 'admin',
      editor: 'editor',
      guest: 'guest'
    })
    .constant('sessionCacheTTL', 600000)  /* session缓存最大保存时长，单位为毫秒   */
    .constant('latestYear', '2016')
    .constant('appVersion', '0.0.1')
    //.constant('devUrl', 'http://localhost/webservice/')//测试环境
    .constant('devUrl', 'http://10.118.23.161:8080/webservice/')//
    .constant('topics', [//放到D B?
      {
        'title': '总体经济分析',
        'img': '../assets/images/icon_economic.png',
        'topicKey': 'ztjjfx',

        'indicators': [
          {'name': '总体GDP分析', 'link': '#/', 'indicatorsKey': 'ztjj-ztfx', 'icon': 'icon_overall'},
          {'name': '产业GDP分析', 'indicatorsKey': 'ztjj-cyfx', 'link': '', 'icon': 'icon_industry'},
          {'name': '行业GDP分析', 'link': '','indicatorsKey': 'ztjj-hyfx', 'icon': 'icon_industry1'},
          {'name': '地域GDP分析', 'link': '#/resource', 'indicatorsKey': 'ztjj-dyfx', 'icon': 'icon_regional'},
          {'name': '宏观经济预测', 'link': '#/', 'indicatorsKey': 'ztjj-jjyc', 'icon': 'icon_economy'}
        ]
      },
      {
        'title': '中部六省对比',
        'img': '../assets/images/icon_zbls_on.png',
        'topicKey': 'zbls',
        'isActive': false,
        'indicators': [
          {'name': '对比分析', 'link': '#/', 'indicatorsKey': 'zbls','icon': 'icon_contrast'},
          {'name': '时序分析', 'link': '', 'indicatorsKey': 'zbls-sxfx', 'icon': 'icon_trend'}
        ]
      },
      {
        'title': '固定资产投资分析',
        'img': '../assets/images/icon_fixed.png',
        'topicKey': 'gdzctzfx',
        'isActive': false,
        'indicators': [
          {'name': '总体投资分析', 'link': '#/', 'indicatorsKey': 'ztfx', 'icon': 'icon_overall'},
          {'name': '行业投资分析', 'link': '', 'indicatorsKey': 'hyfx', 'icon': 'icon_industry'},
          {'name': '房地产投资分析', 'link': '', 'indicatorsKey': 'cyfx', 'icon': 'icon_realty'},
          {'name': '地域投资分析', 'link': '', 'indicatorsKey': 'dyfx-sz', 'icon': 'icon_regional'}
        ]
      },
      {
        'title': '人口综合分析',
        'img': '../assets/images/icon_talent.png',
        'topicKey': 'population',
        'isActive': false,
        'indicators': [
          {'name': '人口总体分析', 'link': '/population/overview', 'indicatorsKey': 'population-overview', 'icon': 'icon-overall'},
          {'name': '人口分布分析', 'link': '/population/distribution', 'indicatorsKey': 'population-distribution', 'icon': 'icon_distribution'},
          //{'name': '人口迁移分析', 'link': '/population/migrate', 'indicatorsKey': 'population-migrate', 'icon': 'icon_China'},
          {'name': '人口文化分析', 'link': '/population/edu', 'indicatorsKey': 'population-edu', 'icon': 'icon_culture'},
          {'name': '地域人口分析', 'link': '/population/areaStatistics', 'indicatorsKey': 'population-areastat', 'icon': 'icon_regional'}
        ]
      },
      {
        'title': '医保情况分析',
        'img': '../assets/images/icon_healthcarexxx.png',
        'topicKey': 'ybfx',
        'isActive': false,
        'indicators': [
          {'name': '总体分析', 'link': '#/ybztfx', 'indicatorsKey': 'ybztfx', 'icon': 'icon_Health'},
          {'name': '次均费用', 'link': '#/cjfyfx', 'indicatorsKey': 'cjfyfx', 'icon': 'icon_cost'},
          {'name': '自费及支出', 'link': '', 'indicatorsKey': 'zfjzc', 'icon': 'icon_expense'},
          {'name': '疾病分析', 'link': '', 'indicatorsKey': 'jbfx', 'icon': 'icon_Health-care-costs'}]

      },
      {
        'title': '工伤情况',
        'img': '../assets/images/icon_injury.png',
        'topicKey': 'gsqk',
        'isActive': false,
        'indicators': [
          {'name': '行业分析', 'link': '#/gsfxhyfx', 'indicatorsKey': 'gsfxhyfx', 'icon': 'home'},
          {'name': '企业分析', 'link': '#/gsfxqyfx', 'indicatorsKey': 'gsfxqyfx', 'icon': 'sun-o'}
        ]
      },
      {
        'title': '人才供需',
        'img': '../assets/images/icon_talent.png',
        'topicKey': 'rcgx',
        'isActive': false,
        'indicators': [
          {'name': '就业分析', 'link': '#/rcgxjyfx', 'indicatorsKey': 'rcgxjyfx', 'icon': 'home'},
          {'name': '失业分析', 'indicatorsKey': 'rcgxsyfx', 'link': '', 'icon': 'sun-o'},
          {'name': '人才构成', 'link': '#/rcgxrcgc', 'indicatorsKey': 'rcgxrcgc', 'icon': 'book'},
          {'name': '供需关系', 'link': '#/resource', 'indicatorsKey': 'rcgxgxgx', 'icon': 'recycle'},
          {'name': '行业分析', 'link': '', 'indicatorsKey': 'rcgxhyfx', 'icon': 'file-o'},
          {'name': '市州分析', 'link': '#/rcgxhyfx', 'indicatorsKey': 'rcgxszfx', 'icon': 'line-chart'},
          {'name': '区县分析', 'link': '', 'indicatorsKey': 'rcgxqxfx', 'icon': 'file-o'}
        ]
      },
      {
        'title': '财政收入分析',
        'img': '../assets/images/icon_financial.png',
        'topicKey': 'czsrfx',
        'isActive': false,
        'indicators': [
          {'name': '总体财政收支分析', 'link': '#/czsrfx/ztfx', 'indicatorsKey': 'czsrfx-ztfx', 'icon': 'icon_cz_01'},
          {'name': '财政收入及构成', 'link': '#/czsrfx/srjgc', 'indicatorsKey': 'czsrfx-srjgc', 'icon': 'icon_cz_02'},
          {'name': '财政支出及构成', 'link': '#/czsrfx/zcjgc', 'indicatorsKey': 'czsrfx-zcjgc', 'icon': 'icon_cz_03'},
          {'name': '地域财政收支分析', 'link': '#/czsrfx/szdyfx', 'indicatorsKey': 'czsrfx-szdyfx', 'icon': 'icon_cz_04'}
        ]
      },
      {
        'title': '教育情况分析',
        'img': '../assets/images/icon_education.png',
        'topicKey': 'jyqkfx',
        'isActive': false,
        'indicators': [
          {'name': '总体分析', 'link': '#/jyqkztfx', 'indicatorsKey': 'jyqkztfx','icon': 'icon_overall'},
          {'name': '高等教育', 'link': '#/jyqkgdjy', 'indicatorsKey': 'jyqkgdjy', 'icon': 'jyfxgdjy'},
          {'name': '义务教育', 'link': '#/jyqkywjy', 'indicatorsKey': 'jyqkywjy', 'icon': 'jyfxywjy'},
          {'name': '教育经费', 'link': '#/jyqkjyjf', 'indicatorsKey': 'jyqkjyjf', 'icon': 'jyfxjyjf'}
        ]
      },
      {
        'title': '环保情况分析',
        'img': '../assets/images/icon_hb.png',
        'topicKey': 'hjbh',
        'isActive': false,
        'indicators': [
          {'name': '大气环境质量', 'link': '#/hjbh/dqhjzl', 'indicatorsKey': 'hjbh-dqhjzl','icon': 'icon_air'},
          {'name': '水环境质量', 'link': '#/hjbh/shjzl', 'indicatorsKey': 'hjbh-shjzl', 'icon': 'icon_water'},
          {'name': '噪声监测', 'link': '#/hjbh/zsjc', 'indicatorsKey': 'hjbh-zsjc', 'icon': 'icon_noise'}
        ]
      },
      {
        'title': '就业情况分析',
        'topicKey': 'jyfx',
        'img': '../assets/images/icon_employment.png',
        'isActive': false,
        'indicators': [
          {'name': '总体就业分析', 'link': '#/jyfxztfx', 'indicatorsKey': 'jyfxztfx','icon': 'icon_healthcare'},
          {'name': '产业就业分析', 'link': '#/jyfxcyfx1', 'indicatorsKey': 'jyfxcyfx1', 'icon': 'icon_industry'},
          {'name': '行业就业分析', 'link': '#/jyfxhyfx', 'indicatorsKey': 'jyfxhyfx', 'icon': 'icon_industry1'},
          {'name': '地域就业分析', 'link': '#/jyfxszfx', 'indicatorsKey': 'jyfxszfx', 'icon': 'icon_regional'},
          {'name': '职工工资分析', 'link': '#/jyfxzggz', 'indicatorsKey': 'jyfxzggz', 'icon': 'icon_-jobmoney'}
        ]
      },
      {
        'title': '社会保障分析',
        'img': '../assets/images/icon_social.png',
        'topicKey': 'shbzfx',
        'isActive': false,
        'indicators': [
          // {'name': '总体分析', 'link': '#/shbzfx/ztfx', 'indicatorsKey': 'shbzfx-ztfx', 'icon': 'icon_overall'},
          {'name': '养老保险分析', 'link': '#/shbzfx/yalbxfx', 'indicatorsKey': 'shbzfx-yalbxfx', 'icon': 'icon_shbz_endowment'},
          {'name': '医疗保险分析', 'link': '#/shbzfx/yilbxfx', 'indicatorsKey': 'shbzfx-yilbxfx', 'icon': 'icon_shbz_medical'},
          {'name': '工伤保险', 'link': '#/shbzfx/gsbxfx', 'indicatorsKey': 'shbzfx-gsbxfx', 'icon': 'icon_shbz_injury'},
          {'name': '生育保险', 'link': '#/shbzfx/syubxfx', 'indicatorsKey': 'shbzfx-syubxfx', 'icon': 'icon_shbz_maternity'},
          {'name': '失业保险', 'link': '#/shbzfx/syebxfx', 'indicatorsKey': 'shbzfx-syebxfx', 'icon': 'icon_shbz_unemployment'}
        ]
      },
      {
        'title': '医疗卫生分析',
        'img': '../assets/images/icon_medical.png',
        'topicKey': 'ylwsfx',
        'isActive': false,
        'indicators': [
          {'name': '医疗卫生总体分析', 'link': '#/ylwsfx/ylwsjbqk', 'indicatorsKey': 'ylwsjbqk','icon': 'icon_healthcare'},
          {'name': '医疗卫生机构分析', 'link': '#/ylwsfx/ylwsjgyxqk', 'indicatorsKey': 'ylwsjgyxqk', 'icon': 'icon_structure'},
          {'name': '传染病情况分析', 'link': '#/ylwsfx/crbqkfx', 'indicatorsKey': 'crbqkfx', 'icon': 'icon_infection'},
          {'name': '城市居民疾病分析', 'link': '#/ylwsfx/csjbfx', 'indicatorsKey': 'csjbfx', 'icon': 'icon_townsfolk'},
          /*{'name': '农村居民疾病分析', 'link': '#/ylwsfx/ncjbfx', 'indicatorsKey': 'ncjbfx', 'icon': 'icon_farmer'},*/
          {'name': '地域医疗分析', 'link': '#/ylwsfx/szyljbqk', 'indicatorsKey': 'szyljbqk', 'icon': 'icon_regional'}
        ]
      },
      {
        'title': '居民收入分析',
        'img': '../assets/images/icon_income.png',
        'topicKey': 'jmsrfx',
        'isActive': false,
        'indicators': [
          {'name': '总体居民收支分析', 'link': '#/jmsrfx/ztfx', 'indicatorsKey': 'jmsrfxztfx','icon': 'icon_jmsr'},
          {'name': '居民收入来源分析', 'link': '#/jmsrfx/jmsrlyfx', 'indicatorsKey': 'jmsrlyfx', 'icon': 'icon_jmsr_source'},
          {'name': '居民消费类型分析', 'link': '#/jmsrfx/jmxflxfx', 'indicatorsKey': 'jmxflxfx', 'icon': 'icon_jmsr_consume'},
          {'name': '地域居民收支分析', 'link': '#/jmsrfx/areaIEStat', 'indicatorsKey': 'jmsrfx-areaIEStat', 'icon': 'icon_jmsr_area'}
        ]
      }
    ])
  ;

})();

// /* global malarkey:false, moment:false */
// (function () {
//   'use strict';

//   angular
//     .module('smartCore')
//     .constant('malarkey', malarkey)
//     .constant('moment', moment)
//     .constant('authEvents', {
//       loginSuccess: 'auth-login-success',
//       loginFailed: 'auth-login-failed',
//       logoutSuccess: 'auth-logout-success',
//       sessionTimeout: 'auth-session-timeout',
//       notAuthenticated: 'auth-not-authenticated',
//       notAuthorized: 'auth-not-authorized'
//     })
//     .constant('userRoles', {
//       all: '*',
//       admin: 'admin',
//       editor: 'editor',
//       guest: 'guest'
//     })
//     .constant('latestYear', '2016')
//     .constant('appVersion', '0.0.1')
//     .constant('devUrl', 'http://10.118.20.41:8080/webservice/')
//     //.constant('devUrl', 'http://10.118.23.156:8080/webservice/')
//     .constant('topics', [//放到DB?
//       {
//         'title': '总体经济分析',
//         'img': '../assets/images/icon_economic.png',
//         'topicKey': 'ztjjfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '总体GDP分析', 'link': '#/', 'indicatorsKey': 'ztjj-ztfx', 'icon': 'home'},
//           {'name': '产业GDP分析', 'indicatorsKey': 'ztjj-cyfx', 'link': '', 'icon': 'sun-o'},
//           {'name': '行业GDP分析', 'link': '','indicatorsKey': 'ztjj-hyfx', 'icon': 'book'},
//           {'name': '地域GDP分析', 'link': '#/resource', 'indicatorsKey': 'ztjj-dyfx', 'icon': 'recycle'}
//         ]
//       },
//       {
//         'title': '固定资产投资分析',
//         'img': '../assets/images/icon_fixed.png',
//         'topicKey': 'gdzctzfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '总体分析', 'link': '#/', 'indicatorsKey': 'ztfx', 'icon': 'home'},
//           {'name': '房地产投资分析', 'link': '', 'indicatorsKey': 'cyfx', 'icon': 'sun-o'},
//           {'name': '行业分析', 'link': '', 'indicatorsKey': 'hyfx', 'icon': 'book'},
//           {'name': '地域分析-市州', 'link': '', 'indicatorsKey': 'dyfx-sz', 'icon': 'recycle'},
//           {'name': '地域分析-区县', 'link': '#/events', 'indicatorsKey': 'dyfx-qx', 'icon': 'file-o'},
//           {'name': '资金来源', 'link': '#/analytics', 'indicatorsKey': 'zjly', 'icon': 'line-chart'}
//         ]
//       },
//       {
//         'title': '人口综合分析',
//         'img': '../assets/images/icon_talent.png',
//         'topicKey': 'population',
//         'isActive': false,
//         'indicators': [
//           {'name': '人口总体分析', 'link': '/population/overview', 'indicatorsKey': 'population-overview', 'icon': 'icon-overall'},
//           {'name': '人口分布分析', 'link': '/population/distribution', 'indicatorsKey': 'population-distribution', 'icon': 'icon_distribution'}
//           {'name': '总体分析', 'link': '#/', 'indicatorsKey': 'ztfx', 'icon': 'home'},
//           {'name': '迁入分析', 'link': '', 'indicatorsKey': 'cyfx', 'icon': 'sun-o'},
//           {'name': '迁出分析', 'link': '', 'icon': 'book'},
//           {'name': '市州分析', 'link': '#/resource', 'icon': 'recycle'},
//           {'name': '区县分析', 'link': '#/events', 'icon': 'file-o'},
//           {'name': '市州贫困人口分析', 'link': '#/analytics', 'icon': 'line-chart'}
//         ]
//       },
//       {
//         'title': '医保分析',
//         'img': '../assets/images/icon_healthcare.png',
//         'topicKey': 'ybfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '次均费用', 'link': '#/cjfy', 'indicatorsKey': 'cjfy', 'icon': 'home'},
//           {'name': '费用及支出', 'link': '', 'indicatorsKey': 'fyjzc', 'icon': 'sun-o'},
//           {'name': '自费及支出', 'link': '', 'indicatorsKey': 'zfjzc', 'icon': 'book'},
//           {'name': '疾病分析', 'link': '', 'indicatorsKey': 'jbfx', 'icon': 'recycle'}
//         ]
//       },
//       {
//         'title': '工伤情况',
//         'img': '../assets/images/icon_injury.png',
//         'topicKey': 'gsqk',
//         'isActive': false,
//         'indicators': [
//           {'name': '行业分析', 'link': '#/gsfxhyfx', 'indicatorsKey': 'gsfxhyfx', 'icon': 'home'},
//           {'name': '企业分析', 'link': '#/gsfxqyfx', 'indicatorsKey': 'gsfxqyfx', 'icon': 'sun-o'}
//         ]
//       },
//       {
//         'title': '人才供需',
//         'img': '../assets/images/icon_talent.png',
//         'topicKey': 'rcgx',
//         'isActive': false,
//         'indicators': [
//           {'name': '就业分析', 'link': '#/rcgxjyfx', 'indicatorsKey': 'rcgxjyfx', 'icon': 'home'},
//           {'name': '失业分析', 'indicatorsKey': 'rcgxsyfx', 'link': '', 'icon': 'sun-o'},
//           {'name': '人才构成', 'link': '#/rcgxrcgc', 'indicatorsKey': 'rcgxrcgc', 'icon': 'book'},
//           {'name': '供需关系', 'link': '#/resource', 'indicatorsKey': 'rcgxgxgx', 'icon': 'recycle'},
//           {'name': '行业分析', 'link': '', 'indicatorsKey': 'rcgxhyfx', 'icon': 'file-o'},
//           {'name': '市州分析', 'link': '#/rcgxhyfx', 'indicatorsKey': 'rcgxszfx', 'icon': 'line-chart'},
//           {'name': '区县分析', 'link': '', 'indicatorsKey': 'rcgxqxfx', 'icon': 'file-o'}
//         ]
//       },
//       {
//         'title': '财政收入分析',
//         'img': '../assets/images/icon_financial.png',
//         'topicKey': 'czsrfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '总体财政收支分析', 'link': '#/czsrfx/ztfx', 'indicatorsKey': 'czsrfx-ztfx', 'icon': 'icon_cz_01'},
//           {'name': '财政收入及构成', 'link': '#/czsrfx/srgcfx', 'indicatorsKey': 'czsrfx-srgcfx', 'icon': 'icon_cz_02'},
//           {'name': '财政支出及构成', 'link': '#/czsrfx/zcjgc', 'indicatorsKey': 'czsrfx-zcjgc', 'icon': 'icon_cz_03'},
//           {'name': '地域财政收支分析', 'link': '#/czsrfx/szdyfx', 'indicatorsKey': 'czsrfx-szdyfx', 'icon': 'icon_cz_04'}
//         ]
//       },
//       {
//         'title': '教育情况分析',
//         'img': '../assets/images/icon_education.png',
//         'topicKey': 'jyqkfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '总体分析', 'link': '#/jyqkztfx', 'indicatorsKey': 'jyqkztfx','icon': 'icon_overall'},
//           {'name': '高等教育', 'link': '#/jyqkgdjy', 'indicatorsKey': 'jyqkgdjy', 'icon': 'jyfxgdjy'},
//           {'name': '义务教育', 'link': '#/jyqkywjy', 'indicatorsKey': 'jyqkywjy', 'icon': 'jyfxywjy'},
//           {'name': '教育经费', 'link': '#/jyqkjyjf', 'indicatorsKey': 'jyqkjyjf', 'icon': 'jyfxjyjf'}
//         ]
//       },
//       {
//         'title': '就业情况分析',
//         'topicKey': 'jyfx',
//         'img': '../assets/images/icon_employment.png',
//         'isActive': false,
//         'indicators': [
//           {'name': '总体就业分析', 'link': '#/jyfxztfx', 'indicatorsKey': 'jyfxztfx','icon': 'icon_healthcare'},
//           {'name': '产业就业分析', 'link': '#/jyfxcyfx', 'indicatorsKey': 'jyfxcyfx', 'icon': 'sun-o'},
//           {'name': '行业就业分析', 'link': '#/jyfxhyfx', 'indicatorsKey': 'jyfxhyfx', 'icon': 'recycle'},
//           {'name': '地域就业分析', 'link': '#/jyfxszfx', 'indicatorsKey': 'jyfxszfx', 'icon': 'icon_regional'},
//           {'name': '职工工资分析', 'link': '#/jyfxgwgzszfx', 'indicatorsKey': 'jyfxgwgzszfx', 'icon': 'icon_-jobmoney'}
//         ]
//       },
//       {
//         'title': '社会保障分析',
//         'img': '../assets/images/icon_social.png',
//         'topicKey': 'shbzfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '总体分析', 'link': '#/shbzfx/ztfx', 'indicatorsKey': 'shbzfx-ztfx', 'icon': 'icon_overall'},
//           {'name': '养老保险分析', 'link': '#/shbzfx/yalbxfx', 'indicatorsKey': 'shbzfx-yalbxfx', 'icon': 'icon_shbz_endowment'},
//           {'name': '医疗保险分析', 'link': '#/shbzfx/yilbxfx', 'indicatorsKey': 'shbzfx-yilbxfx', 'icon': 'icon_shbz_medical'},
//           {'name': '工伤保险', 'link': '#/shbzfx/gsbxfx', 'indicatorsKey': 'shbzfx-gsbxfx', 'icon': 'icon_shbz_injury'},
//           {'name': '生育保险', 'link': '#/shbzfx/syubxfx', 'indicatorsKey': 'shbzfx-syubxfx', 'icon': 'icon_shbz_maternity'},
//           {'name': '失业保险', 'link': '#/shbzfx/syebxfx', 'indicatorsKey': 'shbzfx-syebxfx', 'icon': 'icon_shbz_unemployment'}
//         ]
//       },
//       {
//         'title': '医疗卫生分析',
//         'img': '../assets/images/icon_medical.png',
//         'topicKey': 'ylwsfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '医疗卫生总体分析', 'link': '#/ylwsfx/ylwsjbqk', 'indicatorsKey': 'ylwsjbqk','icon': 'icon_healthcare'},
//           {'name': '医疗卫生结构分析', 'link': '#/ylwsfx/ylwsjgyxqk', 'indicatorsKey': 'ylwsjgyxqk', 'icon': 'icon_structure'},
//           {'name': '传染病情况分析', 'link': '#/ylwsfx/crbqkfx', 'indicatorsKey': 'crbqkfx', 'icon': 'icon_infection'},
//           {'name': '城市居民疾病分析', 'link': '#/ylwsfx/csjbfx', 'indicatorsKey': 'csjbfx', 'icon': 'icon_townsfolk'},
//           {'name': '农村居民疾病分析', 'link': '#/ylwsfx/ncjbfx', 'indicatorsKey': 'ncjbfx', 'icon': 'icon_farmer'},
//           {'name': '地域医疗分析', 'link': '#/ylwsfx/szyljbqk', 'indicatorsKey': 'szyljbqk', 'icon': 'icon_regional'}
//         ]
//       },
//       {
//         'title': '居民收入分析',
//         'img': '../assets/images/icon_income.png',
//         'topicKey': 'jmsrfx',
//         'isActive': false,
//         'indicators': [
//           {'name': '居民人均可支配收入总体情况', 'link': '#/jmsrfx/jmrjkzpsrztqk', 'indicatorsKey': 'jmrjkzpsrztqk','icon': 'home'},
//           {'name': '各市州居民人均可支配收入', 'link': '#/jmsrfx/gszjmrjkzpsr', 'indicatorsKey': 'gszjmrjkzpsr', 'icon': 'sun-o'},
//           {'name': '居民人均可支配收入来源分析', 'link': '#/jmsrfx/jmrjkzpsrlyfx', 'indicatorsKey': 'jmrjkzpsrlyfx', 'icon': 'recycle'},
//           {'name': '居民人均消费支出总体情况', 'link': '#/jmsrfx/jmrjxfzcztqk', 'indicatorsKey': 'jmrjxfzcztqk', 'icon': 'line-chart'},
//           {'name': '各市州居民人均消费支出', 'link': '#/jmsrfx/gszjmrjxfzc', 'indicatorsKey': 'gszjmrjxfzc', 'icon': 'line-chart'},
//           {'name': '居民人均消费支出类型分析', 'link': '#/jmsrfx/jmrjxfzclxfx', 'indicatorsKey': 'jmrjxfzclxfx', 'icon': 'line-chart'}
//         ]
//       }
//     ])
//   ;

// })();
