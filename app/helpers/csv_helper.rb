module CsvHelper
  def csv_field(txt, options = { last: false })
    "\"#{txt}\"#{options[:last] ? "\n" : ','}".html_safe
  end
end
