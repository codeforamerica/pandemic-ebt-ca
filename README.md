# P-EBT
![Tests - develop](https://github.com/codeforamerica/pandemic-ebt/workflows/Tests/badge.svg)

Staging Environment: [https://ca-staging.p-ebt.org/](https://ca-staging.p-ebt.org/)

### Development
- `bundle`
- `yarn install`
- `rake db:setup`
- Run tests with `rake`.
- `rails s` to run the server.

### Implementing New Screens

This Rails app has a few unique constructs:

- Because each screen asks only limited questions, validations on the ActiveRecord models can't be run on each save. 
  Therefore, we use a `Form` Model (which subclasses ActiveModel) to perform validations and param whitelisting.
- A corresponding `FormsController` works in tandem with the `Form` model.
- The `FormNavigation` holds the logic for flow control: the order of the screens as well as the next screen. 

Use Outside-In Test-Driven Development to implement a new screen:

1. Start with the main Journey spec (`journey_spec.rb`). Add to the Journey spec and watch it fail.
2. Write a spec for and implement a new `FormsController`. Add the class name to the `FormNavigation`.
3. Write a spec for and implement a new `Form`.
4. Implement any updates to the back-end models (`Household` and `Child`) while updating corresponding unit specs.
5. Implement the screen as an ERB template (`edit.html.erb`). The Journey spec should now pass.

#### Environment Settings

`CACHE_STATIC_PAGES`
: Set to `false` to turn off page caching, `true` to enable. Default is `true`.
