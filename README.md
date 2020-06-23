# P-EBT
![Tests - develop](https://github.com/codeforamerica/pandemic-ebt/workflows/Tests/badge.svg)

Staging Environment: [https://ca-staging.p-ebt.org/](https://ca-staging.p-ebt.org/)

### Development
- `bundle`
- `yarn install`
- `rake db:setup`
- Run tests with `rake`.
- `rails s` to run the server.

### Run load tests
- `brew install k6`
- `k6 run -e ENVIRONMENT=<development|staging|demo|production> --vus <number of virtual users> --iterations <number of iterations> loadtest.js`

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

### CLI

`thor export:children FILE`
: Export children (by default, only completely submitted children) to FILE (by default `tmp/all.csv`). Run `thor help export:children` for more options

### Deployment Environment Variables
- `RAILS_ENV`: Rails environment. Currently one of `demo`, `staging`, `production`
- `RAILS_MASTER_KEY`: For decrypting env vars loaded from credentials file.
- `DATABASE_URL`: Postgres db connection string.
- `SENTRY_DSN`: [Sentry](https://docs.sentry.io/clients/ruby/) configuration.
- `EXPERIMENT_OVER`: For use in early launch experiments. Setting to `1` turns off `/early` endpoint.
- `SKYLIGHT_AUTHENTICATION`: [Skylight](https://www.skylight.io/support/getting-started) configuration.
- `DEMO_BANNER`: For use in non-prod environments. Setting to `1` shows a demo banner.
- `AUTH_USERNAME`: If set, the application will use `AUTH_USERNAME` and `AUTH_PASSWORD` via http authentication for each request.
- `METRICS_USERNAME` / `METRICS_PASSWORD`: Required to `access `/metrics`
- `GOOGLE_PLACES_API_KEY`: API key for [Google Places API](https://developers.google.com/places/web-service/autocomplete) for use in address autocomplete.
