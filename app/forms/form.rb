class Form
  include ActiveModel::Model
  include ActiveModel::AttributeAssignment
  include ActiveModel::Validations::Callbacks

  class_attribute :attribute_names
  attr_accessor :household

  def initialize(household, params = {})
    @household = household
    super(params)
  end

  # def assign_attribute(name, value)
  #   assign_attributes(name => value)
  # end
  #
  def attributes_for(model)
    self.class.scoped_attributes[model].index_with do |attribute_name|
      send(attribute_name)
    end
  end

  class << self
    def set_attributes_for(model, *attributes)
      scoped_attributes[model] = attributes
      self.attribute_names = scoped_attributes.values.flatten
      attribute_strings = Attributes.new(attributes).to_s

      attr_accessor(*attribute_strings)
    end

    def from_household(household)
      attribute_keys = Attributes.new(attribute_names).to_sym
      new(household, existing_attributes(household).slice(*attribute_keys))
    end

    def scoped_attributes
      @scoped_attributes ||= {}
    end

    #
    #   def analytics_event_name
    #     name.underscore.gsub("_form", "")
    #   end
    #
    #   # Override in subclasses if needed
    #
    def existing_attributes(household)
      HashWithIndifferentAccess.new(household.attributes)
    end
  end
  #
  # private
  #
  # def strip_dashes(field_name)
  #   strip_characters("-", field_name)
  # end
  #
  # def strip_commas(field_name)
  #   strip_characters(",", field_name)
  # end
  #
  # def strip_characters(character, field_name)
  #   send("#{field_name}=", send(field_name).delete(character)) unless send(field_name).nil?
  # end
  #
  # def to_datetime(year, month, day)
  #   DateTime.new(year.to_i, month.to_i, day.to_i)
  # end
end
