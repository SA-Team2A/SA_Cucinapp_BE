FROM ruby:2.5.3

RUN apt-get update && apt-get install -y build-essential nodejs

RUN mkdir /users_ms

WORKDIR /users_ms

COPY Gemfile /users_ms/Gemfile
COPY Gemfile.lock /users_ms/Gemfile.lock

RUN bundle install

COPY . /users_ms
