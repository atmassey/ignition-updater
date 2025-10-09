import { run } from './main';
import * as core from '@actions/core';
try{
    run();
} catch (error) {
    core.setFailed(`Action failed with error ${error}`);
}