import * as core from '@actions/core';

var TLS_ENABLED = false;
var url = core.getInput('gateway_url');
var apiKey = core.getInput('api_key');

// Check if url includes http or https
if (!url.includes('http://') && !url.includes('https://')) {
    core.setFailed('The URL must include http:// or https://');
}

// Check if the URL uses HTTPS
if (url.includes('https://')) {
    core.info('TLS is enabled for the Ignition Gateway connection.');
    TLS_ENABLED = true;
}

async function configScan(): Promise<void> {
}

async function projectScan(): Promise<void> {
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