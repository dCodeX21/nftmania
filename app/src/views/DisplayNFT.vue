<template>
  <div>
    <h1>Working with Web3.js</h1>
    <div>
      <h2>Listing NFTs</h2>
    </div>
    <br>
    <h3>
      Account: <span>{{ account }}</span>
    </h3>
    <h3>
      Chain ID: <span>{{ chainID }}</span>
    </h3>
    <br>
    <div>
      <button @click='detectMetamask'>Login &amp; Save Address</button>
    </div>
    <br/>
    <div>
      <button @click='retrieveAssets'>Retrieve NFTs</button>
    </div>
  </div>
</template>

<script>
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios'

export default {
  name: 'DisplayNFT',
  data() {
    return {
      account: 'Login First!',
      chainID: 'Select Network'
    }
  },

  methods: {
    detectMetamask: async function() {
      try {
        // This function detects most providers injected at window.ethereum
        // let web3 : Web3;// Will hold the web3 instance
        const provider = await detectEthereumProvider()

        if (provider) {
          // From now on, this should always be true:
          // provider === window.ethereum
          // startApp(provider); // initialize your app
          console.log('Metamask Installed')
          // await window.ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
          // let web3 = new Web3(window.ethereum);
          // const publicAddress = web3.eth.coinbase.toLowerCase();

          const chainId = await provider.request({ method: 'eth_chainId' });
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          this.account = accounts[0];
          this.chainID = chainId

          // axios.create({
          //   baseURL: 'http://localhost:3000/api'  ,   //this.apiUrl,
          //   headers: {
          //     'Content-Type': 'application/json;charset=UTF-8',
          //     'Accept': 'application/json',
          //     // 'Authorization': `Bearer ${this.token}`
          //   }
          // })
          // .post('/new', 
          // })
          // .then((res) => {
          //   console.log(res)
          //   // if (res) {
          //   //   console.log('Existing User!')
          //   // } else {

          //   // }
          // })
          // this.account = publicAddress
          // let formData = new FormData();
          // formData.append('form_data', JSON.stringify({ newAddress: this.account }));
          let formData = { newAddress: this.account };

          await axios.create({
            baseURL: 'http://localhost:3000/api'  ,   //this.apiUrl,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Accept': 'application/json'
              // 'Authorization': `Bearer ${this.token}`
            }
          }).post('/new', formData).then(res => {
            console.log(res);
          });
        } else {
          console.log('Please install MetaMask!')
        }
      } catch (exception) {
        throw new Error(exception.message)
      }
    },

    retrieveAssets: async function() {
      try {
        const walletAddress = this.account
        console.log(walletAddress)
        // const balance = ERC721.methods.balanceOf(walletAddress).call();
        // console.log(balance)
        const apiKey = 't7DhhDqOJM1_gSg4ETf5ghDt17qDKOdO';
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
        // replace with the wallet address you want to query for NFTs
        const ownerAddr = walletAddress;

        var config = {
          method: 'get',
          url: `${baseURL}?owner=${ownerAddr}`
        };

        await axios(config)
        .then(res => {
          console.log(JSON.stringify(res.data, null, 2))
        })
        .catch(error => console.log(error));
      } catch (exception) {
        throw new Error(exception.message)
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
