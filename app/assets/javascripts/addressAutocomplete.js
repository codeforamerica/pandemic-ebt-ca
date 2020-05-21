const addressAutocomplete = function (formType) {
    const fieldMap = {
        street_number: {el: `form_${formType}_street`, nameType: 'short_name'},
        route: {el: `form_${formType}_street`, nameType: 'long_name'},
        locality: {el: `form_${formType}_city`, nameType: 'long_name'},
        postal_code: {el: `form_${formType}_zip_code`, nameType: 'short_name'},
    };
    const addressInput = document.getElementById(`form_${formType}_street`);
    // Prevent accidentally submitting form when selecting autocomplete option
    $(addressInput).on("keydown", function(event) {return event.key !== "Enter";})

    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
        types: ['address'],
        fields: ['address_component'],
        componentRestrictions: {country: "US"},
        bounds: google.maps.LatLngBounds(
            {lat: 32.5121, lng: -124.6509},
            {lat: 42.0126, lng: -114.1315}
        ) // Results biased to California
    })

    autocomplete.addListener('place_changed', function () {
        let addressComponents = autocomplete.getPlace().address_components;
        const fieldValues = {
            [`form_${formType}_street`]: [],
            [`form_${formType}_city`]: [],
            [`form_${formType}_zip_code`]: []
        }

        for (let field in fieldMap) {
            document.getElementById(fieldMap[field]["el"]).value = '';
        }

        for (let i = 0; i < addressComponents.length; i++) {
            for (let n = 0; n < addressComponents[i]['types'].length; n++) {
                let componentField = addressComponents[i]['types'][n];
                if (Object.keys(fieldMap).includes(componentField)) {
                    const fieldMapElement = fieldMap[componentField];
                    let fieldValue = fieldValues[fieldMapElement["el"]];

                    fieldValues[fieldMapElement["el"]] = fieldValue.concat(
                        addressComponents[i][fieldMapElement["nameType"]]
                    )
                }
            }
        }

        Object.keys(fieldValues).forEach(el => {
            document.getElementById(el).value = fieldValues[el].join(" ");
        });
    })
}
