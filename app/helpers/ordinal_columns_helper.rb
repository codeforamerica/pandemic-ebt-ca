module OrdinalColumnsHelper
  def ordinal_column_class(columns)
    case columns
    when 1
      ''
    when 2
      'width-one-half'
    when 3
      'width-one-third'
    when 4
      'width-one-fourth'
    when 5
      'width-one-fifth'
    when 6
      'width-one-sixth'
    when 7
      'width-one-seventh'
    when 8
      'width-one-eighth'
    when 9
      'width-one-nineth'
    when 10
      'width-one-tenth'
    when 11
      'width-one-eleventh'
    when 12
      'width-one-twelveth'
    else
      raise ArgumentError, 'Invalid number of columns; only 1-12 are supported'
    end
  end
end
