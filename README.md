# Mint QA GitHub Action

Run Mint QA against your pull requests using server-issued missions.

## Installation

Add this action to your GitHub workflow:

```yaml
- uses: getmint/action@v1
  with:
    api-key: ${{ secrets.MINT_API_KEY }}
    mission-id: ${{ github.event.client_payload.mission_id }}
```

## Inputs

| Input | Description | Required |
|-------|-------------|----------|
| `api-key` | MINT_API_KEY from your getmint.com dashboard | Yes |
| `mission-id` | Mission UUID dispatched by the Mint GitHub App | Yes |
| `api-base` | Override the Mint API base URL (defaults to https://app.getmint.com) | No |

## Example Workflow

```yaml
name: Mint QA

on:
  repository_dispatch:
    types: [mint-mission]

jobs:
  mint-qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: getmint/action@v1
        with:
          api-key: ${{ secrets.MINT_API_KEY }}
          mission-id: ${{ github.event.client_payload.mission_id }}
```

## Documentation

For more information, visit [getmint.com](https://getmint.com)
