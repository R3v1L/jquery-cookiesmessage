(function($) {

	$.fn.cookiesMessage = function(options) {

		return this.each(function() {
			var elem = $( this );

			var settings = {
				cookieName: 'cookiesaccepted',
				legalURL: '/legal/',
				declineURL: 'about:blank',
				acceptSelector: '.accept',
				declineSelector: '.decline',
				acceptCallback: acceptCallback,
				declineCallback: declineCallback,
				hideOnAccept: true,
				hideOnDecline: false
			};

			$.extend(settings, options);

			// Connect signals
			function hasCookie() {
				return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(settings.cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
			}

			function setCookie() {
				document.cookie = encodeURIComponent(settings.cookieName) + "=" + encodeURIComponent(1) + "; path=/";
			}

			function acceptClicked() {
				setCookie();
				if (settings.hideOnAccept) elem.hide();
				if (typeof(settings.acceptCallback) === 'function') settings.acceptCallback(elem);
			}

			function declineClicked() {
				if (settings.hideOnDecline) elem.hide();
				if (typeof(settings.declineCallback) === 'function') settings.declineCallback(elem);
			}

			function acceptCallback(elem) {}

			function declineCallback(elem) {}

			elem.find(settings.acceptSelector).click(acceptClicked);
			elem.find(settings.declineSelector).click(declineClicked);

			if (!hasCookie()) {
				elem.show();
			} else {
				elem.hide();
			}
		});
	};
}(jQuery));


