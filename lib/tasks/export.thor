require 'thor'
require './config/environment'

class Export < Thor
  desc 'children FILE', 'Exports children from the database to FILE (defaults to tmp/all.csv)'
  method_option :include, default_value: 'complete', enum: %w[complete incomplete all], aliases: '-i', desc: 'Which applications to include'
  method_option :format, default_value: 'csv', enum: %w[csv], aliases: '-f', desc: 'Which format to output'
  method_option :begin, default_value: '', aliases: '-b', desc: 'Export children submitted after BEGIN. Does not work with incomplete/all'
  method_option :end, default_value: '', aliases: '-e', desc: 'Export children submitted before END. Does not work with incomplete/all'
  def children(file_name=Rails.root.join('tmp', 'all.csv'))
    output = ChildrenController.render :index, assigns: { children: Child.submitted }

    File.delete(file_name) if File.exist?(file_name)
    File.open(file_name, 'w') do |file|
      file.puts output
    end
    puts "EXPORT COMPLETE! Exported to #{filename}"
  end
end
