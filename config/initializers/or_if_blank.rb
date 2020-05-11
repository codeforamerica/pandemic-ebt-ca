class String
  def or_if_blank(string_if_blank)
    present? ? self : string_if_blank
  end
end
