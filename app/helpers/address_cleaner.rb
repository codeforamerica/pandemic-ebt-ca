class AddressCleaner
  def run(household)
    result = get_result(household)

    if result.blank?
      household.clean_street_1 = household.street,
      household.clean_street_2 = household.street_2,
      household.clean_city = household.city,
      household.clean_zip_code = household.zip_code
    else
      household.clean_street_1 = result.delivery_line_1
      household.clean_street_2 = result.delivery_line_2
      household.clean_city = result.components.city_name
      household.clean_zip_code = result.components.zipcode
    end

    household.cleaned_address = true
    household.save
  end

  def get_result(household)
    auth_id = ENV['SMARTY_AUTH_ID'] || Rails.application.credentials.smarty_streets[:auth_id]
    auth_token = ENV['SMARTY_AUTH_TOKEN'] || Rails.application.credentials.smarty_streets[:auth_token]
    credentials = SmartyStreets::StaticCredentials.new(auth_id, auth_token)
    client = SmartyStreets::ClientBuilder.new(credentials).build_us_street_api_client

    lookup = SmartyStreets::USStreet::Lookup.new
    lookup.input_id = household.id
    lookup.street = household.street,
    lookup.street2 = household.street_2,
    lookup.city = household.city,
    lookup.state = 'CA'
    lookup.zipcode = household.zip_code
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
