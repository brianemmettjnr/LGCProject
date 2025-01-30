FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["./LGC.API/LGC.API.csproj", "LGC.API/"]
RUN dotnet restore "LGC.API/LGC.API.csproj"
COPY . .
WORKDIR "/src/LGC.API"
RUN dotnet build "LGC.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LGC.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LGC.API.dll"]