require 'thor'
require 'csv'
require './config/environment' # Load Rails
require 'aws-sdk-s3'

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
    export(children, file_name)
  end

  desc 'last_x_days DAYS FILE', 'Exports children from the database for the last DAYS days (defaults to 7) to FILE (defaults to tmp/all.csv). Does not include the day the script is run'
  def last_x_days(days = 7, file_name = Rails.root.join('tmp', 'all.csv'))
    children = Child.submitted
    children = children.submitted_after(DateTime.now.midnight - days.to_i.days)
    children = children.submitted_before(DateTime.now.midnight)
    export(children, file_name)
  end

  desc 'upload_export_to_aws FILE', 'Uploads an export file to the S3 bucket specified in environment variables. Will overwrite files with the same name.'
  STATE_BUCKET = 'ca'.freeze
  def upload_export_to_aws(file)
    required_variables = %w[AWS_REGION AWS_EXPORT_UPLOAD_BUCKET AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY]
    required_variables.each do |var|
      raise Thor::Error, "ERROR: #{var} is required to be set as an environment variable" unless ENV.key?(var)
    end
    raise Thor::Error, "ERROR: #{file} does not exist" unless File.exist?(file)

    s3 = Aws::S3::Resource.new
    filename = file.split('/')[-1]
    obj = s3.bucket(ENV['AWS_EXPORT_UPLOAD_BUCKET']).object("#{STATE_BUCKET}/#{Rails.env}/#{filename}")
    obj.upload_file(file)
    puts 'Upload Complete!'
  end

  no_commands do
    def export(children, file_name)
      File.delete(file_name) if File.exist?(file_name)
      CSV.open(file_name, 'w') do |file|
        file << Child.csv_headers
        children.in_batches.each_record do |row|
          file << row.csv_row
        end
      end
      puts "EXPORT COMPLETE! Exported to #{file_name}"
    end
  end
end
