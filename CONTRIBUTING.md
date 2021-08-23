## how to contribute on Zarela webapp
the first thing to configure is the .env file, you can use the provided template in .env.example file

the `CONTRACT_ADDRESS` and `CONTRACT_ABI` are derived from [Zarela SmartContract](https://github.com/Zarela-dev/SmartContract).

third party APIs such as Etherscan API are used to provide wallet transactions list, in wallet section of the app. or in the create request page when we call submitNewRequest method on the smart contract we need the current gas price, we provide this value using gasstation API.

currently you can not effortlessly opt-out of these third parties, unless you manually change remove them from source code.


#### run the project locally
when you are done configuring the .env file, you can start the project using:
```
npm install
npm run start
```
#### build for production
```
npm install
npm run build
```
if you want a place to start working on the project checkout our issues.