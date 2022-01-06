Validate and retrieve Adaptive Claims (AC) token data stored on IPFS.

## Install
```
npm i ipfs-claims
```

## Usage
From the command line
```
ipfs-claims <IPFS hash>
```
Library in JS
```
const claims = require ('ipfs-claims');
const data = await claims.getClaimData(<IPFS hash>);
const report = await claims.riskMitigation(data);
```
### Exported Functions
- `getClaimData(IPFS_Hash)` 
    - This returns an object with all required fields filled. If the Hash provided to the function does not return proper fields, or unexpected data the function will return an empty object.
- `riskMitigation(data)`
    - This returns true or false if the data passed to the function passes all the tests proving authenticity of the claim. The checks are described below. 
- `writeToDesktop(filename, claim_data)`
    - Passing the name you want the file to be called and the returned data object from `getClaimData` you can save a copy to your Desktop. 


#### Claim Tests
1. Verify more than one purity to be submitted.
    - Verify the purity percents total less than or equal to 100%.
2. Verify commodity value and token price.
3. Require claim creator to be pre-approved.
4. Are beneficiaries in claim pre-approved?
    - Is the beneficiary approved to respond to the directives selected?
5. Are one or more risk treatment areas recorded in claim?
6. 

## Testing
For testing, the claim hash can be added to the constants.js file.

It is important to run get claim data tests`npm run test-getClaimData`, before performing risk management tests `npm run test-riskMitigation`.

### Test Scripts
- getClaimData.js
- riskMitigation.js

#### getClaimData.js
- Test 1:
    -  Loads data from claim to create claim object. If the object has missing or undefined properties the test will fail.
- Test 2: 
    - Verify more than one purity to be submitted..
    - Verify the purity percents total less than or equal to 100%.
    - Verify commodity value and token price.
    - Require claim creator to be pre-approved.

#### riskMitigation.js
- Test 1:
    - Are beneficiaries in claim pre-approved?
    - Is there one or more support directive recorded in claim?
    - Is the beneficiary approved to respond to the directives selected?
    - Require specific cerificates depending on the claims country of origin.


### Test commands
```
npm run test-getClaimData
npm run test-riskMitigation
```

## License
* MIT ([LICENSE-MIT](LICENSE-MIT) / http://opensource.org/licenses/MIT)