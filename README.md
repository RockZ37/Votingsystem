# DappVotes Project Proposal

## Overview

DappVotes is a decentralized application (dApp) designed to facilitate secure and transparent poll creation and voting using blockchain technology. It allows users to create polls, manage them, and participate in voting, ensuring immutability and trustworthiness of the results.

## Problem Statement

Traditional polling systems often suffer from issues such as lack of transparency, susceptibility to tampering, and limited accessibility. These issues undermine the trust in the polling process and can lead to disputes over the results.

## Objectives

- Develop a decentralized application for creating and managing polls.
- Ensure the transparency and immutability of the poll data using blockchain technology.
- Provide a secure and user-friendly interface for users to create polls and vote.

## Smart Contract Description

The DappVotes smart contract manages the lifecycle of polls, including their creation, retrieval, and updating. It ensures that all poll data is securely stored on the blockchain and can be accessed by users in a transparent manner.

### Key Functions

- **createPoll**: Allows the creation of a new poll with specified details such as title, description, image, start time, and end time.
- **getPolls**: Retrieves the list of all created polls.
- **updatePoll**: Allows updating the details of an existing poll.

## Test Files Description

The provided test files ensure the correct functionality of the DappVotes smart contract. They include tests for successful poll creation and updating, verifying that the contract behaves as expected.

### Sample Test Code

Here is a snippet from the test file:

```javascript
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DappVotes Contract', () => {
    let contract, result;

    const description = 'Lorem Ipsum';
    const title = 'Republican Primary Election';
    const image = 'https://image.png';
    const starts = Math.floor(Date.now() / 1000) - 10 * 60;  // Timestamp in seconds
    const ends = Math.floor(Date.now() / 1000) + 10 * 60;    // Timestamp in seconds

    beforeEach(async () => {
        const Contract = await ethers.getContractFactory('DappVotes');
        [deployer, contestant1, contestant2, voter1, voter2, voter3] = await ethers.getSigners();

        contract = await Contract.deploy();
        await contract.deployed();
    });

    describe('Poll Management', () => {
        describe('Successes', () => {
            it('should confirm poll creation success', async () => {
                result = await contract.getPolls();
                expect(result).to.have.lengthOf(0);

                await contract.createPoll(image, title, description, starts, ends);
                
                result = await contract.getPolls();
                expect(result).to.have.lengthOf(1);

                const poll = result[0];
                expect(poll.title).to.equal(title);
                expect(poll.description).to.equal(description);
                expect(poll.image).to.equal(image);
                expect(poll.startsAt).to.equal(starts);
                expect(poll.endsAt).to.equal(ends);
                expect(poll.director).to.equal(deployer.address);
            });

            it('should confirm poll update success', async () => {
                await contract.createPoll(image, title, description, starts, ends);
                // Add further assertions for poll update
            });
        });
    });
});


# Installtion And Setup

To set up the DappVotes project locally, follow these steps:

    CLONE THE REPOSITORY:
    -git clone https://github.com/RockZ37/Votingsystem.git
    -cd dappVotes
    

INSTALL DEPENDENCIES:
-npm install

COMPILE THE SMART CONTRACT:
-npx hardhat compile

DEPLOY THE SMART CONTRACT:
-npx hardhat run scripts/deploy.js --network your-network


Running Tests

To run the tests for the DappVotes contract, use the following command:
-npx hardhat test




Contributing

If you would like to contribute to DappVotes, please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Make your changes.
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-branch).
    Create a new Pull Request.

License

This project is licensed under the MIT License.
Contact

For any questions or feedback, please contact delalirock5@gmail.com, bamenorhu8@gmail.com.



