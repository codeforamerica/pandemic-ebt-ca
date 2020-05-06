const mixpanelLoader = function (lib = mixpanel, jQuery = $) {
    return {
        trackLinks() {
            jQuery('a, button').click(function (e) {
                lib.track("Click", {
                    destination: e.currentTarget.href,
                    text: e.currentTarget.text
                })
            });
        },
        trackPageLoad() {
            lib.track("Page View")
        }
    }
}