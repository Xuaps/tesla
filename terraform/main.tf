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
  appServicePlan     = "${var.prefix}-${var.resourceFunction}-appserviceplan-${var.environment}-${var.region}"
  functionApp        = "${var.prefix}-${var.resourceFunction}-functionapp-${var.environment}-${var.region}"
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

output "storageAccountName" {
  value = azurerm_storage_account.sa.name
}

#app insight
resource "azurerm_application_insights" "application_insights" {
  name                = local.appInsightsName
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "other"
}

#app service plan
resource "azurerm_app_service_plan" "app_service_plan" {
  name                = local.appServicePlan
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  kind                = "Linux"
  reserved            = true
  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}

#function app
resource "azurerm_function_app" "function_app" {
  name                       = local.functionApp
  resource_group_name        = azurerm_resource_group.rg.name
  location                   = var.location
  app_service_plan_id        = azurerm_app_service_plan.app_service_plan.id
  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE" = "",
    "FUNCTIONS_WORKER_RUNTIME" = "python",
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.application_insights.instrumentation_key,
  }
  os_type = "linux"
  storage_account_name       = azurerm_storage_account.sa.name
  storage_account_access_key = azurerm_storage_account.sa.primary_access_key
  version                    = "~3"

  site_config {
    linux_fx_version= "Python|3.9"        
    ftps_state = "Disabled"
  }

  lifecycle {
    ignore_changes = [
      app_settings["WEBSITE_RUN_FROM_PACKAGE"],
    ]
  }
}

output "function_app_name" {
  value = azurerm_function_app.function_app.name
  description = "Deployed function app name"
}

output "function_app_default_hostname" {
  value = azurerm_function_app.function_app.default_hostname
  description = "Deployed function app hostname"
}
