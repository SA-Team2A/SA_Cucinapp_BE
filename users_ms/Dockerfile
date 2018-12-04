FROM ruby:2.5.3

WORKDIR /usr/src/app

COPY Gemfile ./Gemfile
COPY Gemfile.lock ./Gemfile.lock

COPY . .

RUN bundle install
