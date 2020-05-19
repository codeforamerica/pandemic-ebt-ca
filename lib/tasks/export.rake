namespace :export do
  namespace :csv do
    desc 'Export all children as a csv file to /tmp/all.csv'
    task all: :environment do
      output = ChildrenController.render :index, assigns: { children: Child.submitted }

      file_name = Rails.root.join('tmp', 'all.csv')
      File.delete(file_name) if File.exist?(file_name)
      File.open(file_name, 'w') do |file|
        file.puts output
      end
      puts 'EXPORT COMPLETE! Exported to /tmp/all.csv'
    end
  end
end
