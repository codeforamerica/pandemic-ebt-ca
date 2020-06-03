module CsvHelper
  def csv_field(txt, options = { last: false })
    txt = txt.to_s.gsub(/\"/, '""')
    "\"#{txt}\"#{options[:last] ? "\n" : ','}".html_safe
  end
end
