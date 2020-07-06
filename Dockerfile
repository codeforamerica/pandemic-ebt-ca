FROM ruby:2.6.6

# System prerequisites
RUN apt-get update \
 && apt-get -y install build-essential libpq-dev nodejs \
 && rm -rf /var/lib/apt/lists/*

 # AWS Cli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
 && unzip awscliv2.zip \
 && ./aws/install \
 && apt-get update \
 && apt-get install -y groff

# Supercronic for cron jobs
ENV SUPERCRONIC_URL=https://github.com/aptible/supercronic/releases/download/v0.1.9/supercronic-linux-amd64 \
    SUPERCRONIC=supercronic-linux-amd64 \
    SUPERCRONIC_SHA1SUM=5ddf8ea26b56d4a7ff6faecdd8966610d5cb9d85

RUN curl -fsSLO "$SUPERCRONIC_URL" \
 && echo "${SUPERCRONIC_SHA1SUM}  ${SUPERCRONIC}" | sha1sum -c - \
 && chmod +x "$SUPERCRONIC" \
 && mv "$SUPERCRONIC" "/usr/local/bin/${SUPERCRONIC}" \
 && ln -s "/usr/local/bin/${SUPERCRONIC}" /usr/local/bin/supercronic
 ADD config/crontab /app/crontab

ADD Gemfile /app/
ADD Gemfile.lock /app/
WORKDIR /app
RUN gem install bundler:2.1.4
RUN bundle update --bundler
RUN bundle install

ADD . /app

# Collect assets. This approach is not fully production-ready, but
# will help you experiment with Aptible Deploy before bothering with assets.
# Review http://go.aptible.com/assets for production-ready advice.
RUN set -a \
 && . ./.aptible.env \
 && bin/rails assets:precompile \
 && bin/rails db:migrate

EXPOSE 3000
