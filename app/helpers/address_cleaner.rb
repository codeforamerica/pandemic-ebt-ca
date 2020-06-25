class AddressCleaner
  def run(household)
    if household.mailing_street.present?
      result = get_result(household.id, household.mailing_street, household.mailing_street_2, household.mailing_city, household.mailing_zip_code)

      if result.present?
        household.clean_mailing_street = result.delivery_line_1
        household.clean_mailing_street_2 = result.delivery_line_2
        household.clean_mailing_city = result.components.city_name
        household.clean_mailing_zip_code = result.components.zipcode
      end
    end

    unless household.registered_homeless_yes?
      result = get_result(household.id, household.residential_street, household.residential_street_2, household.residential_city, household.residential_zip_code)

      if result.present?
        household.clean_residential_street = result.delivery_line_1
        household.clean_residential_street_2 = result.delivery_line_2
        household.clean_residential_city = result.components.city_name
        household.clean_residential_zip_code = result.components.zipcode
      end
    end

    household.cleaned_addresses = true
    household.save
  end

  def get_result(id, street, street2, city, zip_code)
    auth_id = ENV['SMARTY_AUTH_ID'] || Rails.application.credentials.smarty_streets[:auth_id]
    auth_token = ENV['SMARTY_AUTH_TOKEN'] || Rails.application.credentials.smarty_streets[:auth_token]
    credentials = SmartyStreets::StaticCredentials.new(auth_id, auth_token)
    client = SmartyStreets::ClientBuilder.new(credentials).build_us_street_api_client

    lookup = SmartyStreets::USStreet::Lookup.new
    lookup.input_id = id
    lookup.street = street
    lookup.street2 = street2
    lookup.city = city
    lookup.zipcode = zip_code
    lookup.state = 'CA'
    lookup.candidates = 1
    lookup.match = 'invalid'

    begin
      client.send_lookup(lookup)
    rescue SmartyStreets::SmartyError => _e
      return
    end

    lookup.result[0]
  end
end
