(function() {
    'use strict';

    angular
        .module('triangular')
        .provider('triSettings', settingsProvider);

    /* @ngInject */
    function settingsProvider() {
        // Provider
        var settings = {
            languages: [],
            name: '',
            logo: '',
            version: '',
            defaultSkin: ''
        };

        this.addLanguage = addLanguage;
        this.setDefaultSkin = setDefaultSkin;
        this.setLogo = setLogo;
        this.setName = setName;
        this.setVersion = setVersion;

        function addLanguage(newLanguage) {
            settings.languages.push(newLanguage);
        }

        function setDefaultSkin(defaultSkin) {
            settings.defaultSkin = defaultSkin;
        }

        function setLogo(logo) {
            settings.logo = logo;
        }

        function setName(name) {
            settings.name = name;
        }

        function setVersion(version) {
            settings.version = version;
        }

        // Service
        this.$get = function() {
            return {
                languages: settings.languages,
                name: settings.name,
                logo: settings.logo,
                version: settings.version,
                defaultSkin: settings.defaultSkin
            };
        };
    }
})();
