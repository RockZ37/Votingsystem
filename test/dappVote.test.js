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
            })
        });
    });
});