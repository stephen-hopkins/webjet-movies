######################################################################
###
###       INPUT VARIABLES
###
######################################################################
variable "appname" {
  type        = string
  default     = "webjetmovies"
  description = "The short name for the application"
}

variable "region" {
  type        = string
  default     = "australiaeast"
  description = "The Azure region used for resources"
}

variable "environment" {
  type        = string
  default     = "dev"
  description = "The environment (dev, stage, test, prod, etc.)"
}

######################################################################
###
###       LOCAL VARIABLES
###
######################################################################

variable "agent_client_id" {}
variable "agent_client_secret" {}
variable "subscription_id" {}
variable "tenant_id" {}

locals {
  defaultname = "${var.appname}-${var.environment}"
  storagename = "${var.appname}sdh"

  tags = {
    ApplicationName = var.appname
    Environment     = var.environment
    TERRAFORM       = "true"
  }
}

######################################################################
###
###       PROVIDER DEFINITIONS
###
######################################################################

terraform {
  backend "remote" {
    organization = "stephen-hopkins"

    workspaces {
      name = "webjet-movies"
    }
  }
}


provider "azurerm" {
  version         = ">= 2.3.0"
  tenant_id       = "${var.tenant_id}"
  subscription_id = "${var.subscription_id}"
  client_id       = "${var.agent_client_id}"
  client_secret   = "${var.agent_client_secret}"
  features {}
}

######################################################################
###
###       RESOURCES
###
######################################################################


resource "azurerm_resource_group" "rg" {
  name     = local.defaultname
  location = var.region
  tags     = local.tags
}

resource "azurerm_storage_account" "storage" {
  name                     = local.storagename
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  tags                     = local.tags
  allow_blob_public_access = true

  account_kind             = "StorageV2"
  account_tier             = "Standard"
  account_replication_type = "LRS"
  static_website {
    index_document = "index.html"
  }
}

resource "azurerm_cdn_profile" "cdn" {
  name                = "${var.appname}sdh"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "example" {
  name                = "${var.appname}sdh"
  profile_name        = azurerm_cdn_profile.cdn.name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  origin {
    name      = "webjetmoviesblob"
    host_name = "${var.appname}sdh.z8.web.core.windows.net"
  }
}
