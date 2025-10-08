"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
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
async function configScan() {
    core.info('Performing configuration scan request...');
    let endpoint = `${url}/data/api/v1/scan/config`;
    try {
        // Perform the post request for config scan
        await fetch(endpoint, {
            method: 'POST'
        }).then((response) => {
            if (!response.ok) {
                core.error(`Failed to initiate config scan: ${response.statusText}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }).finally(() => {
            core.info('Config scan completed');
        });
    }
    catch (error) {
        core.setFailed(`Config scan request failed: ${error.message}`);
    }
}
async function projectScan() {
    core.info('Performing project scan request...');
    let endpoint = `${url}/data/api/v1/scan/projects`;
    try {
        await fetch(endpoint, {
            method: 'POST'
        }).then((response) => {
            if (!response.ok) {
                core.error(`Failed to initiate project scan: ${response.statusText}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }).finally(() => {
            core.info('Project scan completed');
        });
    }
    catch (error) {
        core.setFailed(`Project scan request failed: ${error.message}`);
    }
}
async function run() {
    try {
        core.info('Starting Ignition Gateway configuration scan...');
        await configScan();
        core.info('Configuration scan completed successfully.');
        core.info('Starting Ignition Gateway project scan...');
        await projectScan();
        core.info('Project scan completed successfully.');
    }
    catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}
