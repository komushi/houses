/* ============================================================
 * File: config.translation.js
 * Configure modules for pascalprecht. These are grouped by 
 * vendor libraries. 
 * ============================================================ */

angular.module('app')
    .config(['$translateProvider', '$asyncTranslatorProvider', function($translateProvider, $asyncTranslatorProvider) {

        // // add translation tables
        $translateProvider.useLoader('$asyncTranslator');

        // $translateProvider.translations('en-US', {});
        // $translateProvider.translations('zh-CN', {});
        // $translateProvider.translations('zh-TW', {});
        // $translateProvider.fallbackLanguage('en-US');
        $translateProvider.forceAsyncReload(true);
        // $translateProvider.preferredLanguage('en-US');
        

        // asyncTranslatorProvider.activateViewInfos = function(localeCode, viewInfos){
        //     asyncTranslatorProvider.queryTranslations(localeCode, viewInfos).then(function(translationData){
        //         $translateProvider.translations(localeCode, translationData);    
        //     })
            
        // };

    }]);