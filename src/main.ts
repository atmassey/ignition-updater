import * as core from '@actions/core';

var TLS_ENABLED = false;
var url = core.getInput('gateway_url');
var apiToken = core.getInput('api_token');
var tlsEnabled = core.getInput('tls_enabled');

if (tlsEnabled && tlsEnabled.toLowerCase() === 'true') {
    TLS_ENABLED = true;
}

async function configScan(): Promise<void> {
    core.info('Building configuration scan endpoint...');
    let endpoint;
    if (TLS_ENABLED) {
        endpoint = `https://${url}/data/api/v1/scan/config`
    } else {
        endpoint = `http://${url}/data/api/v1/scan/config`
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }
    try {
    core.info('Performing configuration scan request...');
    // Perform the post request for config scan
    await fetch(endpoint, {
        method: 'POST',
        headers: {
            'X-Ignition-API-Token': apiToken,
            'Accept': 'application/json',
        }
    }).then((response) => {
        if (!response.ok) {
          core.error(`Failed to initiate config scan: ${response.statusText}`)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      }).finally(() => {
        core.info('Config scan completed')
      });
    } catch (error: any) {
        core.setFailed(`Config scan request failed: ${error.message}`);
    }
}

async function projectScan(): Promise<void> {
    core.info('Performing project scan request...');
    let endpoint;
    if (TLS_ENABLED) {
        endpoint = `https://${url}/data/api/v1/scan/projects`
    } else {
        endpoint = `http://${url}/data/api/v1/scan/projects`
    }
    try {
        await fetch(endpoint, {
            method: 'POST',
            headers: {
                'X-Ignition-API-Token': apiToken,
                'Accept': 'application/json',
            }
        }).then((response) => {
            if (!response.ok) {
                core.error(`Failed to initiate project scan: ${response.statusText}`)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }).finally(() => {
            core.info('Project scan completed')
        });
    } catch (error: any) {
        core.setFailed(`Project scan request failed: ${error.message}`);
    }
}

export async function run(): Promise<void> {
    try {
        core.info('Starting Ignition Gateway configuration scan...');
        await configScan();
        core.info('Configuration scan completed successfully.');
        core.info('Starting Ignition Gateway project scan...');
        await projectScan();
        core.info('Project scan completed successfully.');
    } catch (error: any) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}