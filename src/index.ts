import { run } from './main';
import * as core from '@actions/core';
try{
    // Run config and project scan requests
    core.info('Beginning updates..')
    run();
} catch (error) {
    core.setFailed(`Action failed with error ${error}`);
}