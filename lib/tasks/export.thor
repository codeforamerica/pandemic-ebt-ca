require 'thor'
require './config/environment' # Load Rails

class Export < Thor
  desc 'children FILE', 'Exports children from the database to FILE (defaults to tmp/all.csv)'
  method_option :after, aliases: '-a', desc: 'Export children submitted after AFTER.'
  method_option :before, aliases: '-b', desc: 'Export children submitted before BEFORE.'
  def children(file_name = Rails.root.join('tmp', 'all.csv'))
    children = Child.submitted
    children = children.submitted_after(DateTime.parse(options['after'])) if options['after'].present?
    children = children.submitted_before(DateTime.parse(options['before'])) if options['before'].present?

    output = ChildrenController.render :index, assigns: { children: children }
    File.delete(file_name) if File.exist?(file_name)
    File.open(file_name, 'w') do |file|
      file.puts output
    end
    puts "EXPORT COMPLETE! Exported to #{file_name}"
  end
end
