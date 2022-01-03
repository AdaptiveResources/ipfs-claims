# ipfs-claims
Validate data created in the Adaptive Resources claims application.

For testing, the claim hash can be added to the constants.js file.

It is important to run get claim data tests`npm test test/test-getClaimData.js`, before performing risk management tests `npm test test/test-riskManagement.js`.

## Test Scripts
- getClaimData.js
- riskMitigation.js

### getClaimData.js
- Test 1:
    -  Loads data from claim to create claim object. If the object has missing or undefined properties the test will fail.
- Test 2: 
    - Verify claim composed of more than one element.
    - Verify the purity percents total less than or equal to 100%.
    - Validate commodity value and token price.
    - Require specific cerificates depending on the claims country of origin.
    - Require claim creator to be pre-approved.

### riskMitigation.js
- Test 1:
    - Are beneficiaries in claim pre-approved?
    - Is there one or more support directive recorded in claim?
    - Is the beneficiary approved to respond to the directives selected?
    - 

## Test commands
```
npm run test-getClaimData
npm run test-riskMitigation
```

## Maintainance
- Verify constants are up to date and reflects current pre-approved partners.
- Verify the commodity prices reflect current pricing. 
- 