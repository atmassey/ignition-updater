# Ignition Project and Config Updater Action

A GitHub Action that triggers configuration and project scans on an Ignition Gateway through API requests.

## Description

This action connects to an Ignition Gateway and performs both configuration and project scans using the Ignition Gateway's REST API. It's useful for triggering updates and scans of your Ignition projects and configurations as part of your CI/CD pipeline.

## Features

- ✅ Trigger configuration scans via Ignition Gateway API
- ✅ Trigger project scans via Ignition Gateway API  
- ✅ Support for both HTTP and HTTPS connections

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `gateway_url` | The URL of the Ignition Gateway (e.g., `localhost:8088`) | Yes | `localhost:8088` |
| `api_token` | The API key for the Ignition Gateway | Yes | N/A |
| `tls_enabled` | Set to `true` if the Ignition Gateway is using TLS/SSL (https) | No | `false` |

## Usage

### Basic Usage

```yaml
name: Gateway Updater
on:
  push:
    branches:
      main

jobs:

  update:
    runs-on: self-hosted
    steps:
      - name: Update Ignition Gateway
        uses: atmassey/ignition-updater@v2
        with:
          gateway_url: 'localhost:8088'
          api_token: ${{ secrets.IGNITION_API_TOKEN }}
```

### With TLS/SSL Enabled

```yaml
name: Gateway Updater
on:
  push:
    branches:
      main

jobs:

  update:
    runs-on: self-hosted
    steps:
      - name: Update Ignition Gateway
        uses: atmassey/ignition-updater@v2
        with:
          gateway_url: 'localhost:8088'
          api_token: ${{ secrets.IGNITION_API_TOKEN }}
          tls_enabled: true
```

## Prerequisites

1. **Ignition Gateway**: You need access to an Ignition Gateway running v8.3
2. **API Token**: Generate an API token in your Ignition Gateway for authentication
3. **Network Access**: The GitHub runner must be able to reach your Ignition Gateway (self-host runner)

### Setting up API Token

1. Log into your Ignition Gateway web interface
2. Navigate to **Config > Security > Users, Roles & Zones**
3. Create or edit a user account
4. Generate an API token for the user
5. Store the token as a GitHub secret (e.g., `IGNITION_API_TOKEN`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:

- 📝 [Open an issue](https://github.com/atmassey/ignition-updater/issues)
- 📖 [Check the documentation](https://github.com/atmassey/ignition-updater#readme)
