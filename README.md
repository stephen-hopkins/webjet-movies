# Webjet Movies App

React app to load movies from provided API and display cheapest price.
Deploys via Terraform and Github Actions to Azure Storage with CDN.  
Simple Azure functions backend that acts as a proxy so API secret is not exposed, also sidesteps issue with API not returning CORS headers.

To dos:
Unit tests.
Add Azure functions to terraform.
Enhance Azure functions back end to cache results instead of just proxying.
Give user more information about loading status of providers within each movie card.
Have cards clickable to show detailed information about each movie.
