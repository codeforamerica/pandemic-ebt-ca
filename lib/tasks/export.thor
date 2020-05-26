require 'thor'
require './config/environment' # Load Rails

class Export < Thor
  desc 'children FILE', 'Exports children from the database to FILE (defaults to tmp/all.csv)'
  method_option :after, aliases: '-a', desc: 'Export children submitted after AFTER.'
  method_option :before, aliases: '-b', desc: 'Export children submitted before BEFORE.'

  def children(file_name = Rails.root.join('tmp', 'all.csv'))
    children = Child.submitted
    if options['after'].present?
      children = children.submitted_after(DateTime.parse(options['after']))
      puts "Exporting children submitted after #{DateTime.parse(options['after']).strftime('%B %d %Y')}"
    end
    if options['before'].present?
      children = children.submitted_before(DateTime.parse(options['before']))
      puts "Exporting children submitted before #{DateTime.parse(options['before']).strftime('%B %d %Y')}"
    end

    output = ChildrenController.render :index, assigns: { children: children }
    File.delete(file_name) if File.exist?(file_name)
    File.open(file_name, 'w') do |file|
      file.puts output
    end
    puts "EXPORT COMPLETE! Exported to #{file_name}"
  end
end
