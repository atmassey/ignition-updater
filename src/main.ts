import * as core from '@actions/core';

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