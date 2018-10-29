FROM microsoft/aspnetcore:2.0.0
ARG WEBAPP_VERSION=0.0.1
LABEL maintainer=soorloffr@unal.edu.co \
	Name=collectionsapp \
	Version=${WEBAPP_VERSION}
ARG URL_PORT
WORKDIR /app
ENV NUGET_XMLDOC_MODE skip
ENV ASPNETCORE_URLS http://*:${URL_PORT}
EXPOSE ${URL_PORT}
COPY ./publish .
ENTRYPOINT [ "dotnet", "CollectionMS.dll" ]