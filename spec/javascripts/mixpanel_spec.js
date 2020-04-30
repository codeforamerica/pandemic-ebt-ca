//= require 'jasmine'

describe('mixpanelLoader', function () {
    describe('#track_links', function () {
        it('sets the click event', function () {
            let clickSpy = jasmine.createSpy();
            const mixpanelLib = {
                track: jasmine.createSpy()
            }
            const jquery = function () {
                return {click: clickSpy}
            };
            window.mixpanel = mixpanelLib;

            const mixpanel = mixpanelLoader(mixpanelLib, jquery)
            mixpanel.track_links();
            expect(clickSpy).toHaveBeenCalled();
        })
    })
})
