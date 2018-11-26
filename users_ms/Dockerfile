FROM ruby:2.5.3

RUN mkdir /users_ms

WORKDIR /users_ms

COPY Gemfile /users_ms/Gemfile
COPY Gemfile.lock /users_ms/Gemfile.lock

RUN bundle install

COPY . /users_ms
