// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract HelloWorld {
    string public message = "Hello, World!";

    constructor() {
        // Add an explicit message to indicate constructor is called
        message = "Hello, World from Constructor!";
    }
}
