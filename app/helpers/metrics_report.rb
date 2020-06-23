class MetricsReport
  def total_applications(date = nil)
    if date.present?
      Household.where(submitted_at: date.all_day).count
    else
      Household.where.not(submitted_at: nil).count
    end
  end

  def total_children
    Child.joins(:household).where.not('households.submitted_at' => nil).count
  end

  def application_experience(response)
    total_answered = Household.where.not(application_experience: 0).count
    experience = Household.where(application_experience: response.to_sym).count.to_f
    return '0%' if total_answered.zero?

    "#{((experience / total_answered) * 100).round(2)}%"
  end

  def median_ttc
    households = Household.where.not(submitted_at: nil).limit(5000).order(submitted_at: :desc)
    return 'N/A' if households.empty?

    median = median([].tap { |a| households.each { |hh| a << hh.submitted_at - hh.created_at } })
    Time.at(median).utc.strftime '%Mm %Ss'
  end

  def language_percents_for(households)
    count_by_language = households.group(:language).count
    total = count_by_language.values.sum.to_f
    count_by_language.map { |lang, count| [lang, ((count.to_f / total) * 100).round(2)] }.to_h
  end

  private

  def median(array)
    sorted = array.sort
    mid = (sorted.length - 1) / 2.0
    (sorted[mid.floor] + sorted[mid.ceil]) / 2.0
  end
end
