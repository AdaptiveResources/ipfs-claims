# IPFS Claims for Responsible Sourcing
Validate data created in the Adaptive Resources claims application.

## Exported Functions
- `getClaimData(IPFS_Hash)` 
    - This returns an abject with all required fields filled. If the Hash inputted does not return proper fields, or unexpected data the function will revert.
- `writeToDesktop(filename, claim_data)`
    - Passing the name you want the file to be called and the returned data object from `getClaimData` you can save a copy to your Desktop. 

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

## Maintainance
- Verify constants are up to date and reflects current pre-approved partners.
- Verify the commodity prices reflect current pricing. 
- 