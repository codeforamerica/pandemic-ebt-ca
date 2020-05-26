require 'thor'
require './config/environment' # Load Rails

class Export < Thor
  desc 'children FILE', 'Exports children from the database to FILE (defaults to tmp/all.csv)'
  method_option :include, default: 'complete', enum: %w[complete incomplete all], aliases: '-i', desc: 'Which applications to include'
  method_option :format, default: 'csv', enum: %w[csv], aliases: '-f', desc: 'Which format to output'
  method_option :after, aliases: '-a', desc: 'Export children submitted after BEGIN. Does not work with incomplete/all.'
  method_option :before, aliases: '-b', desc: 'Export children submitted before END. Does not work with incomplete/all.'
  method_option :today, type: :boolean, desc: 'Export children submitted today. Does not work with incomplete/all. Overwrites after/before.'
  method_option :yesterday, type: :boolean, desc: 'Export children submitted yesterday. Does not work with incomplete/all. Overwrites after/before.'
  method_option :count, type: :boolean, aliases: '-c', desc: 'Only counts the number that would be exported, but does not actually export anything.'
  method_option :hours_ago, type: :numeric, aliases: '-h', desc: 'Export children submitted after HOURS_AGO hours ago. Does not work with incomplete/all. Overwrites after.'
  def children(file_name = Rails.root.join('tmp', 'all.csv'))
    children = Child.all
    children = children.submitted if options['include'] == 'complete'
    children = children.unsubmitted if options['include'] == 'incomplete'

    raise 'Conflicting Params - please select either today or yesterday!' if options['today'] && options['yesterday']

    start_at = (
      (Time.zone.today if options['today']) ||
      (Time.zone.yesterday if options['yesterday']) ||
      (DateTime.parse(options['after']) if options['after'].present?)
    )
    children = children.submitted_after(start_at) if start_at

    end_at = (
      (Time.zone.today if options['yesterday']) ||
      (DateTime.parse(options['before']) if options['before'].present?)
    )
    children = children.submitted_before(end_at) if end_at

    if options['count']
      puts "Counted #{children.count} children"
    else
      output = ChildrenController.render :index, assigns: { children: children }
      File.delete(file_name) if File.exist?(file_name)
      File.open(file_name, 'w') do |file|
        file.puts output
      end
      puts "EXPORT COMPLETE! Exported to #{file_name}"
    end
  end
end
