terraform {
  required_providers {
    azurerm = {
      version = "=2.20.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "blogs"
    storage_account_name = "xuapscomstorage"
    container_name       = "tfstatetesla"
    key                  = "prod.terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

variable "location" {}

variable "region" {
  type    = string
  default = "we"
}

variable "prefix" {
  type    = string
  default = "xuaps"
}

variable "resourceFunction" {
  type = string
}

variable "environment" {
  type = string
}

variable "storageAccountSku" {
  default = {
    tier = "Standard"
    type = "GRS"
  }
}

variable "apimSku" {
  type = string
}

variable "apimSkuCapacity" {
  type = number
}

variable "apimPublisherName" {
  type = string
}

variable "apimPublisherEmail" {
  type = string
}

locals {
  resourceGroupName  = "${var.prefix}-${var.resourceFunction}-${var.environment}-${var.region}"
  storageAccountName = "${var.prefix}${var.resourceFunction}sa${var.environment}${var.region}"
  apimName           = "${var.prefix}-${var.resourceFunction}-${var.environment}-${var.region}"
  kvName             = "${var.prefix}-${var.resourceFunction}-kv-${var.environment}-${var.region}"
  appInsightsName    = "${var.prefix}-${var.resourceFunction}-appinsights-${var.environment}-${var.region}"
}

# --- Get reference to logged on Azure subscription ---
data "azurerm_client_config" "current" {}

# create resource group
resource "azurerm_resource_group" "rg" {
  name     = local.resourceGroupName
  location = var.location
}

# Create Storage Account
resource "azurerm_storage_account" "sa" {
  name                      = local.storageAccountName
  resource_group_name       = azurerm_resource_group.rg.name
  location                  = azurerm_resource_group.rg.location
  account_tier              = var.storageAccountSku.tier
  account_replication_type  = var.storageAccountSku.type
  account_kind              = "StorageV2"
  enable_https_traffic_only = true

  static_website {
    index_document = "index.html"
  }
}

#Add index.html to blob storage
# resource "azurerm_storage_blob" "web" {
#   name                   = "index.html"
#   storage_account_name   = azurerm_storage_account.sa.name
#   storage_container_name = "$web"
#   type                   = "Block"
#   content_type           = "text/html"
#   source                 = "dist/index.html"
# }

output "storageAccountName" {
  value = azurerm_storage_account.sa.name
}
